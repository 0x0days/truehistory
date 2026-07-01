'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';

/**
 * AutoTranslator — universal runtime DOM translation.
 *
 * This component solves the "everything still in English" problem by
 * translating ALL visible text on the page at runtime, using Google
 * Translate's free unofficial API endpoint.
 *
 * How it works:
 *   1. Detects current locale from next-intl
 *   2. If locale is 'en' → does nothing (English is the source)
 *   3. If locale is non-English:
 *      a. Walks the DOM, collecting all text nodes
 *      b. Batches them and sends to Google Translate API
 *      c. Replaces each text node with its translation
 *      d. Caches translations in localStorage to avoid repeated calls
 *      e. Uses MutationObserver to translate new content as it appears
 *
 * This translates EVERYTHING — data arrays, body paragraphs, headings,
 * labels — without needing to wire up individual useTranslations() calls.
 *
 * Skips:
 *   - <script>, <style>, <code>, <pre> tags
 *   - Elements with data-no-translate attribute
 *   - Already-translated text (tracked via data-translated attribute)
 *   - Text that's only numbers/symbols
 */

interface CacheEntry {
  [text: string]: string;
}

const CACHE_KEY_PREFIX = 'auto_translate_cache_';
const BATCH_SIZE = 50; // texts per API call
const BATCH_DELAY = 300; // ms between batches to avoid rate limiting

export default function AutoTranslator() {
  const locale = useLocale() as string;
  const observerRef = useRef<MutationObserver | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const translationQueueRef = useRef<Set<string>>(new Set());

  // Load cache from localStorage
  const loadCache = (loc: string): CacheEntry => {
    try {
      const cached = localStorage.getItem(CACHE_KEY_PREFIX + loc);
      return cached ? JSON.parse(cached) : {};
    } catch {
      return {};
    }
  };

  // Save cache to localStorage
  const saveCache = (loc: string, cache: CacheEntry) => {
    try {
      localStorage.setItem(CACHE_KEY_PREFIX + loc, JSON.stringify(cache));
    } catch {
      // localStorage might be full — ignore
    }
  };

  // Call Google Translate's free API
  const translateBatch = async (
    texts: string[],
    targetLang: string
  ): Promise<Record<string, string>> => {
    const results: Record<string, string> = {};

    // Join texts with a unique separator that won't appear in normal text
    const separator = '\n[SEP]\n';
    const joined = texts.join(separator);

    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(joined)}`;
      const response = await fetch(url);
      const data = await response.json();

      // Google Translate returns nested arrays: [[[translated, original, ...], ...], ...]
      if (data && data[0] && Array.isArray(data[0])) {
        // Reconstruct the translations — they come back in the same order
        const translatedParts: string[] = [];
        for (const segment of data[0]) {
          if (segment && segment[0]) {
            translatedParts.push(segment[0]);
          }
        }

        // The API may split on the separator differently, so we join and re-split
        const fullTranslation = translatedParts.join('');
        const translatedTexts = fullTranslation.split('[SEP]');

        // Map back to original texts
        for (let i = 0; i < texts.length; i++) {
          if (i < translatedTexts.length) {
            results[texts[i]] = translatedTexts[i].trim();
          }
        }
      }
    } catch (err) {
      // Network error or rate limiting — return empty (text stays English)
      console.warn('[AutoTranslator] Translation API error:', err);
    }

    return results;
  };

  // Check if a text node should be translated
  const shouldTranslate = (text: string): boolean => {
    const trimmed = text.trim();
    if (trimmed.length < 2) return false; // skip very short text
    if (!/[a-zA-Z]/.test(trimmed)) return false; // skip numbers/symbols only
    return true;
  };

  // Check if an element should be skipped
  const shouldSkipElement = (el: Element): boolean => {
    const skipTags = ['SCRIPT', 'STYLE', 'CODE', 'PRE', 'TEXTAREA', 'INPUT', 'NOSCRIPT'];
    if (skipTags.includes(el.tagName)) return true;
    if (el.hasAttribute('data-no-translate')) return true;
    if (el.closest('[data-no-translate]')) return true;
    return false;
  };

  // Collect all translatable text nodes from the DOM
  const collectTextNodes = (root: Node = document.body): { node: Text; text: string }[] => {
    const results: { node: Text; text: string }[] = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        const text = node.textContent?.trim() || '';
        if (!shouldTranslate(text)) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || shouldSkipElement(parent)) return NodeFilter.FILTER_REJECT;
        // Skip already translated
        if (parent.hasAttribute('data-translated')) return NodeFilter.FILTER_REJECT;
        // Skip elements inside our own translator UI
        if (parent.closest('[data-translator-ui]')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    let node: Text | null;
    while ((node = walker.nextNode() as Text | null)) {
      results.push({ node, text: node.textContent || '' });
    }
    return results;
  };

  // Process a batch of text nodes
  const processBatch = async (
    items: { node: Text; text: string }[],
    cache: CacheEntry,
    targetLang: string
  ): Promise<void> => {
    // Separate cached vs uncached
    const uncached: { node: Text; text: string }[] = [];
    const cached: { node: Text; text: string; translation: string }[] = [];

    for (const item of items) {
      if (cache[item.text]) {
        cached.push({ ...item, translation: cache[item.text] });
      } else {
        uncached.push(item);
      }
    }

    // Apply cached translations immediately
    for (const item of cached) {
      if (item.node.parentElement) {
        item.node.textContent = item.translation;
        item.node.parentElement.setAttribute('data-translated', 'true');
      }
    }

    // Translate uncached in batches
    for (let i = 0; i < uncached.length; i += BATCH_SIZE) {
      const batch = uncached.slice(i, i + BATCH_SIZE);
      const textsToTranslate = batch.map((b) => b.text);

      const translations = await translateBatch(textsToTranslate, targetLang);

      // Apply translations and update cache
      for (const item of batch) {
        const translation = translations[item.text];
        if (translation && item.node.parentElement) {
          item.node.textContent = translation;
          item.node.parentElement.setAttribute('data-translated', 'true');
          cache[item.text] = translation;
        }
      }

      // Save cache after each batch
      saveCache(targetLang, cache);

      // Small delay between batches
      if (i + BATCH_SIZE < uncached.length) {
        await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY));
      }
    }
  };

  // Main translation function — translates entire page
  const translatePage = async (targetLang: string) => {
    if (targetLang === 'en') return;

    setIsTranslating(true);
    const cache = loadCache(targetLang);

    // Collect all text nodes
    const textNodes = collectTextNodes();

    if (textNodes.length === 0) {
      setIsTranslating(false);
      return;
    }

    // Process in batches
    await processBatch(textNodes, cache, targetLang);
    setIsTranslating(false);
  };

  // Translate new nodes (from MutationObserver)
  const translateNewNodes = async (targetLang: string, nodes: Node[]) => {
    const cache = loadCache(targetLang);
    const allTextNodes: { node: Text; text: string }[] = [];

    for (const node of nodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element;
        if (shouldSkipElement(el)) continue;
        const collected = collectTextNodes(el);
        allTextNodes.push(...collected);
      }
    }

    if (allTextNodes.length > 0) {
      await processBatch(allTextNodes, cache, targetLang);
    }
  };

  useEffect(() => {
    if (locale === 'en') {
      // Clean up observer for English
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      return;
    }

    // Initial translation after a short delay (let React render first)
    const initialTimer = setTimeout(() => {
      translatePage(locale);
    }, 500);

    // Set up MutationObserver to translate new content as it appears
    // (e.g., when user scrolls and new sections mount)
    const observer = new MutationObserver((mutations) => {
      const newNodes: Node[] = [];
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          newNodes.push(node);
        }
      }

      if (newNodes.length > 0) {
        // Debounce — collect nodes and translate after a short delay
        clearTimeout((window as any).__autoTranslateDebounce);
        (window as any).__autoTranslateDebounce = setTimeout(() => {
          translateNewNodes(locale, newNodes);
        }, 200);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    observerRef.current = observer;

    return () => {
      clearTimeout(initialTimer);
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [locale]);

  // Show a small translation indicator
  if (locale === 'en') return null;

  return (
    <div
      data-translator-ui
      data-no-translate
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '1rem',
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: isTranslating ? 0.8 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.375rem 0.75rem',
          borderRadius: '9999px',
          background: 'rgba(7, 9, 26, 0.8)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(232, 149, 72, 0.3)',
          color: '#f5ecd8',
          fontSize: '0.625rem',
          fontFamily: 'monospace',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        <span
          style={{
            width: '0.5rem',
            height: '0.5rem',
            borderRadius: '9999px',
            background: '#e89548',
            animation: 'pulse 1s ease-in-out infinite',
          }}
        />
        {isTranslating ? 'Translating...' : 'Translated'}
      </div>
    </div>
  );
}
