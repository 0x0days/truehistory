'use client';

import { useCallback } from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';
import StarfieldBackground from '@/components/sdam/StarfieldBackground';
import InvestigationSelector, {
  INVESTIGATIONS,
} from '@/components/InvestigationSelector';
import BackToSelectorButton from '@/components/BackToSelectorButton';
import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';

// Gravity (Vol. I)
import ScrollProgressGravity from '@/components/sdam/ScrollProgress';
import HeroSectionGravity from '@/components/sdam/HeroSection';
import MythSectionGravity from '@/components/sdam/MythSection';
import TranslationGapSectionGravity from '@/components/sdam/TranslationGapSection';
import DiscoverySectionGravity from '@/components/sdam/DiscoverySection';
import ProofSectionGravity from '@/components/sdam/ProofSection';
import MathematicalProofSectionGravity from '@/components/sdam/MathematicalProofSection';
import GravityLibraryTheftSection from '@/components/sdam/GravityLibraryTheftSection';
import PillarsSectionGravity from '@/components/sdam/PillarsSection';
import VerdictSectionGravity from '@/components/sdam/VerdictSection';
import ManuscriptEvidenceSectionGravity from '@/components/sdam/ManuscriptEvidenceSection';
import GravitySimulator from '@/components/sdam/GravitySimulator';
import PriorityTimelineGravity from '@/components/sdam/PriorityTimeline';
import CounterArcadeGravity from '@/components/sdam/CounterArcade';
import FinaleSectionGravity from '@/components/sdam/FinaleSection';

// Optics (Vol. II)
import ScrollProgressOptics from '@/components/sdam-optics/ScrollProgress';
import OpticsHeroSection from '@/components/sdam-optics/OpticsHeroSection';
import OpticsMythSection from '@/components/sdam-optics/OpticsMythSection';
import OpticsTranslationGapSection from '@/components/sdam-optics/OpticsTranslationGapSection';
import OpticsDiscoverySection from '@/components/sdam-optics/OpticsDiscoverySection';
import OpticsProofSection from '@/components/sdam-optics/OpticsProofSection';
import OpticsMathematicalProofSection from '@/components/sdam-optics/OpticsMathematicalProofSection';
import OtherMuslimsSection from '@/components/sdam-optics/OtherMuslimsSection';
import OpticsPillarsSection from '@/components/sdam-optics/OpticsPillarsSection';
import OpticsVerdictSection from '@/components/sdam-optics/OpticsVerdictSection';
import OpticsManuscriptEvidenceSection from '@/components/sdam-optics/OpticsManuscriptEvidenceSection';
import OpticsSimulator from '@/components/sdam-optics/OpticsSimulator';
import PhotographyChainSection from '@/components/sdam-optics/PhotographyChainSection';
import OpticsPriorityTimeline from '@/components/sdam-optics/OpticsPriorityTimeline';
import OpticsCounterArcade from '@/components/sdam-optics/OpticsCounterArcade';
import OpticsFinaleSection from '@/components/sdam-optics/OpticsFinaleSection';

// Method (Vol. III)
import ScrollProgressMethod from '@/components/sdam-method/ScrollProgress';
import MethodHeroSection from '@/components/sdam-method/MethodHeroSection';
import MethodMythSection from '@/components/sdam-method/MethodMythSection';
import MethodTranslationGapSection from '@/components/sdam-method/MethodTranslationGapSection';
import MethodDiscoverySection from '@/components/sdam-method/MethodDiscoverySection';
import MethodProofSection from '@/components/sdam-method/MethodProofSection';
import TheMethodSection from '@/components/sdam-method/TheMethodSection';
import MethodOtherMuslimsSection from '@/components/sdam-method/MethodOtherMuslimsSection';
import MethodPillarsSection from '@/components/sdam-method/MethodPillarsSection';
import MethodVerdictSection from '@/components/sdam-method/MethodVerdictSection';
import MethodManuscriptEvidenceSection from '@/components/sdam-method/MethodManuscriptEvidenceSection';
import MethodInteractiveSection from '@/components/sdam-method/MethodInteractiveSection';
import MethodTransmissionChainSection from '@/components/sdam-method/MethodTransmissionChainSection';
import MethodPriorityTimeline from '@/components/sdam-method/MethodPriorityTimeline';
import MethodCounterArcade from '@/components/sdam-method/MethodCounterArcade';
import MethodFinaleSection from '@/components/sdam-method/MethodFinaleSection';

// Calculus (Vol. IV)
import ScrollProgressCalculus from '@/components/sdam-calculus/ScrollProgress';
import CalculusHeroSection from '@/components/sdam-calculus/CalculusHeroSection';
import CalculusMythSection from '@/components/sdam-calculus/CalculusMythSection';
import CalculusTranslationGapSection from '@/components/sdam-calculus/CalculusTranslationGapSection';
import CalculusDiscoverySection from '@/components/sdam-calculus/CalculusDiscoverySection';
import CalculusProofSection from '@/components/sdam-calculus/CalculusProofSection';
import CalculusMathematicalProofSection from '@/components/sdam-calculus/CalculusMathematicalProofSection';
import LibraryTheftSection from '@/components/sdam-calculus/LibraryTheftSection';
import CalculusPillarsSection from '@/components/sdam-calculus/CalculusPillarsSection';
import CalculusVerdictSection from '@/components/sdam-calculus/CalculusVerdictSection';
import CalculusManuscriptEvidenceSection from '@/components/sdam-calculus/CalculusManuscriptEvidenceSection';
import CalculusSimulator from '@/components/sdam-calculus/CalculusSimulator';
import CalculusPriorityTimeline from '@/components/sdam-calculus/CalculusPriorityTimeline';
import CalculusCounterArcade from '@/components/sdam-calculus/CalculusCounterArcade';
import CalculusFinaleSection from '@/components/sdam-calculus/CalculusFinaleSection';

// Astronomy (Vol. V)
import ScrollProgressAstro from '@/components/sdam-astro/ScrollProgress';
import AstroHeroSection from '@/components/sdam-astro/AstroHeroSection';
import AstroMythSection from '@/components/sdam-astro/AstroMythSection';
import AstroTranslationGapSection from '@/components/sdam-astro/AstroTranslationGapSection';
import AstroDiscoverySection from '@/components/sdam-astro/AstroDiscoverySection';
import AstroProofSection from '@/components/sdam-astro/AstroProofSection';
import AstroMathematicalProofSection from '@/components/sdam-astro/AstroMathematicalProofSection';
import AstroLibraryTheftSection from '@/components/sdam-astro/AstroLibraryTheftSection';
import AstroPillarsSection from '@/components/sdam-astro/AstroPillarsSection';
import AstroVerdictSection from '@/components/sdam-astro/AstroVerdictSection';
import AstroManuscriptEvidenceSection from '@/components/sdam-astro/AstroManuscriptEvidenceSection';
import AstroSimulator from '@/components/sdam-astro/AstroSimulator';
import AstroPriorityTimeline from '@/components/sdam-astro/AstroPriorityTimeline';
import AstroCounterArcade from '@/components/sdam-astro/AstroCounterArcade';
import AstroFinaleSection from '@/components/sdam-astro/AstroFinaleSection';

// Navigation (Vol. VI)
import ScrollProgressNav from '@/components/sdam-nav/ScrollProgress';
import NavHeroSection from '@/components/sdam-nav/NavHeroSection';
import NavMythSection from '@/components/sdam-nav/NavMythSection';
import NavTranslationGapSection from '@/components/sdam-nav/NavTranslationGapSection';
import NavDiscoverySection from '@/components/sdam-nav/NavDiscoverySection';
import NavProofSection from '@/components/sdam-nav/NavProofSection';
import NavMathematicalProofSection from '@/components/sdam-nav/NavMathematicalProofSection';
import NavLibraryTheftSection from '@/components/sdam-nav/NavLibraryTheftSection';
import NavPillarsSection from '@/components/sdam-nav/NavPillarsSection';
import NavVerdictSection from '@/components/sdam-nav/NavVerdictSection';
import NavManuscriptEvidenceSection from '@/components/sdam-nav/NavManuscriptEvidenceSection';
import NavSimulator from '@/components/sdam-nav/NavSimulator';
import NavPriorityTimeline from '@/components/sdam-nav/NavPriorityTimeline';
import NavCounterArcade from '@/components/sdam-nav/NavCounterArcade';
import NavFinaleSection from '@/components/sdam-nav/NavFinaleSection';

// Universities (Vol. VII)
import ScrollProgressUni from '@/components/sdam-uni/ScrollProgress';
import UniHeroSection from '@/components/sdam-uni/UniHeroSection';
import UniMythSection from '@/components/sdam-uni/UniMythSection';
import UniTranslationGapSection from '@/components/sdam-uni/UniTranslationGapSection';
import UniDiscoverySection from '@/components/sdam-uni/UniDiscoverySection';
import UniProofSection from '@/components/sdam-uni/UniProofSection';
import UniWomenScholarsSection from '@/components/sdam-uni/UniWomenScholarsSection';
import UniEuropeanDarknessSection from '@/components/sdam-uni/UniEuropeanDarknessSection';
import UniPillarsSection from '@/components/sdam-uni/UniPillarsSection';
import UniVerdictSection from '@/components/sdam-uni/UniVerdictSection';
import UniManuscriptEvidenceSection from '@/components/sdam-uni/UniManuscriptEvidenceSection';
import UniPriorityTimeline from '@/components/sdam-uni/UniPriorityTimeline';
import UniCounterArcade from '@/components/sdam-uni/UniCounterArcade';
import UniFinaleSection from '@/components/sdam-uni/UniFinaleSection';

// Medicine (Vol. VIII)
import ScrollProgressMed from '@/components/sdam-med/ScrollProgress';
import MedHeroSection from '@/components/sdam-med/MedHeroSection';
import MedMythSection from '@/components/sdam-med/MedMythSection';
import MedTranslationGapSection from '@/components/sdam-med/MedTranslationGapSection';
import MedDiscoverySection from '@/components/sdam-med/MedDiscoverySection';
import MedProofSection from '@/components/sdam-med/MedProofSection';
import MedClinicalProofSection from '@/components/sdam-med/MedClinicalProofSection';
import MedLibraryTheftSection from '@/components/sdam-med/MedLibraryTheftSection';
import MedPillarsSection from '@/components/sdam-med/MedPillarsSection';
import MedVerdictSection from '@/components/sdam-med/MedVerdictSection';
import MedManuscriptEvidenceSection from '@/components/sdam-med/MedManuscriptEvidenceSection';
import MedPriorityTimeline from '@/components/sdam-med/MedPriorityTimeline';
import MedCounterArcade from '@/components/sdam-med/MedCounterArcade';
import MedFinaleSection from '@/components/sdam-med/MedFinaleSection';

// Algorithms (Vol. IX)
import ScrollProgressAlg from '@/components/sdam-alg/ScrollProgress';
import AlgHeroSection from '@/components/sdam-alg/AlgHeroSection';
import AlgMythSection from '@/components/sdam-alg/AlgMythSection';
import AlgTranslationGapSection from '@/components/sdam-alg/AlgTranslationGapSection';
import AlgDiscoverySection from '@/components/sdam-alg/AlgDiscoverySection';
import AlgProofSection from '@/components/sdam-alg/AlgProofSection';
import AlgMathematicalProofSection from '@/components/sdam-alg/AlgMathematicalProofSection';
import AlgLibraryTheftSection from '@/components/sdam-alg/AlgLibraryTheftSection';
import AlgPillarsSection from '@/components/sdam-alg/AlgPillarsSection';
import AlgVerdictSection from '@/components/sdam-alg/AlgVerdictSection';
import AlgManuscriptEvidenceSection from '@/components/sdam-alg/AlgManuscriptEvidenceSection';
import AlgPriorityTimeline from '@/components/sdam-alg/AlgPriorityTimeline';
import AlgCounterArcade from '@/components/sdam-alg/AlgCounterArcade';
import AlgFinaleSection from '@/components/sdam-alg/AlgFinaleSection';

function GravityInvestigation({ onBack }: { onBack: () => void }) {
  return (
    <>
      <ScrollProgressGravity />
      <BackToSelectorButton onBack={onBack} />
      <div className="flex-1">
        <HeroSectionGravity />
        <MythSectionGravity />
        <TranslationGapSectionGravity />
        <DiscoverySectionGravity />
        <ProofSectionGravity />
        <MathematicalProofSectionGravity />
        <GravityLibraryTheftSection />
        <PillarsSectionGravity />
        <VerdictSectionGravity />
        <ManuscriptEvidenceSectionGravity />
        <GravitySimulator />
        <PriorityTimelineGravity />
        <CounterArcadeGravity />
        <FinaleSectionGravity />
      </div>
    </>
  );
}

function OpticsInvestigation({ onBack }: { onBack: () => void }) {
  return (
    <>
      <ScrollProgressOptics />
      <BackToSelectorButton onBack={onBack} />
      <div className="flex-1">
        <OpticsHeroSection />
        <OpticsMythSection />
        <OpticsTranslationGapSection />
        <OpticsDiscoverySection />
        <OpticsProofSection />
        <OpticsMathematicalProofSection />
        <OtherMuslimsSection />
        <OpticsPillarsSection />
        <OpticsVerdictSection />
        <OpticsManuscriptEvidenceSection />
        <OpticsSimulator />
        <PhotographyChainSection />
        <OpticsPriorityTimeline />
        <OpticsCounterArcade />
        <OpticsFinaleSection />
      </div>
    </>
  );
}

function MethodInvestigation({ onBack }: { onBack: () => void }) {
  return (
    <>
      <ScrollProgressMethod />
      <BackToSelectorButton onBack={onBack} />
      <div className="flex-1">
        <MethodHeroSection />
        <MethodMythSection />
        <MethodTranslationGapSection />
        <MethodDiscoverySection />
        <MethodProofSection />
        <TheMethodSection />
        <MethodOtherMuslimsSection />
        <MethodPillarsSection />
        <MethodVerdictSection />
        <MethodManuscriptEvidenceSection />
        <MethodInteractiveSection />
        <MethodTransmissionChainSection />
        <MethodPriorityTimeline />
        <MethodCounterArcade />
        <MethodFinaleSection />
      </div>
    </>
  );
}

function CalculusInvestigation({ onBack }: { onBack: () => void }) {
  return (
    <>
      <ScrollProgressCalculus />
      <BackToSelectorButton onBack={onBack} />
      <div className="flex-1">
        <CalculusHeroSection />
        <CalculusMythSection />
        <CalculusTranslationGapSection />
        <CalculusDiscoverySection />
        <CalculusProofSection />
        <CalculusMathematicalProofSection />
        <LibraryTheftSection />
        <CalculusPillarsSection />
        <CalculusVerdictSection />
        <CalculusManuscriptEvidenceSection />
        <CalculusSimulator />
        <CalculusPriorityTimeline />
        <CalculusCounterArcade />
        <CalculusFinaleSection />
      </div>
    </>
  );
}

function AstroInvestigation({ onBack }: { onBack: () => void }) {
  return (
    <>
      <ScrollProgressAstro />
      <BackToSelectorButton onBack={onBack} />
      <div className="flex-1">
        <AstroHeroSection />
        <AstroMythSection />
        <AstroTranslationGapSection />
        <AstroDiscoverySection />
        <AstroProofSection />
        <AstroMathematicalProofSection />
        <AstroLibraryTheftSection />
        <AstroPillarsSection />
        <AstroVerdictSection />
        <AstroManuscriptEvidenceSection />
        <AstroSimulator />
        <AstroPriorityTimeline />
        <AstroCounterArcade />
        <AstroFinaleSection />
      </div>
    </>
  );
}

function NavInvestigation({ onBack }: { onBack: () => void }) {
  return (
    <>
      <ScrollProgressNav />
      <BackToSelectorButton onBack={onBack} />
      <div className="flex-1">
        <NavHeroSection />
        <NavMythSection />
        <NavTranslationGapSection />
        <NavDiscoverySection />
        <NavProofSection />
        <NavMathematicalProofSection />
        <NavLibraryTheftSection />
        <NavPillarsSection />
        <NavVerdictSection />
        <NavManuscriptEvidenceSection />
        <NavSimulator />
        <NavPriorityTimeline />
        <NavCounterArcade />
        <NavFinaleSection />
      </div>
    </>
  );
}

function UniInvestigation({ onBack }: { onBack: () => void }) {
  return (
    <>
      <ScrollProgressUni />
      <BackToSelectorButton onBack={onBack} />
      <div className="flex-1">
        <UniHeroSection />
        <UniMythSection />
        <UniTranslationGapSection />
        <UniDiscoverySection />
        <UniProofSection />
        <UniWomenScholarsSection />
        <UniEuropeanDarknessSection />
        <UniPillarsSection />
        <UniVerdictSection />
        <UniManuscriptEvidenceSection />
        <UniPriorityTimeline />
        <UniCounterArcade />
        <UniFinaleSection />
      </div>
    </>
  );
}

function MedInvestigation({ onBack }: { onBack: () => void }) {
  return (
    <>
      <ScrollProgressMed />
      <BackToSelectorButton onBack={onBack} />
      <div className="flex-1">
        <MedHeroSection />
        <MedMythSection />
        <MedTranslationGapSection />
        <MedDiscoverySection />
        <MedProofSection />
        <MedClinicalProofSection />
        <MedLibraryTheftSection />
        <MedPillarsSection />
        <MedVerdictSection />
        <MedManuscriptEvidenceSection />
        <MedPriorityTimeline />
        <MedCounterArcade />
        <MedFinaleSection />
      </div>
    </>
  );
}

function AlgInvestigation({ onBack }: { onBack: () => void }) {
  return (
    <>
      <ScrollProgressAlg />
      <BackToSelectorButton onBack={onBack} />
      <div className="flex-1">
        <AlgHeroSection />
        <AlgMythSection />
        <AlgTranslationGapSection />
        <AlgDiscoverySection />
        <AlgProofSection />
        <AlgMathematicalProofSection />
        <AlgLibraryTheftSection />
        <AlgPillarsSection />
        <AlgVerdictSection />
        <AlgManuscriptEvidenceSection />
        <AlgPriorityTimeline />
        <AlgCounterArcade />
        <AlgFinaleSection />
      </div>
    </>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const v = searchParams.get('v');

  const selectInvestigation = useCallback((id: string) => {
    // i18n-aware router — preserves current locale prefix automatically
    router.push(`?v=${id}`);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [router]);

  const backToSelector = useCallback(() => {
    // i18n-aware — goes to /en, /fr, /de, or /ar depending on current locale
    router.push('/');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [router]);

  // Selector view (default, or invalid param)
  if (!v || !INVESTIGATIONS.find((inv) => inv.id === v)) {
    return (
      <main className="relative min-h-screen flex flex-col bg-cosmos">
        <InvestigationSelector onSelect={selectInvestigation} />
      </main>
    );
  }

  // Investigation views — pass investigation ID to SEOHead + StructuredData
  return (
    <main className="relative min-h-screen flex flex-col bg-cosmos">
      <SEOHead investigation={v} />
      <StructuredData investigation={v} />
      {v === 'gravity' && <GravityInvestigation onBack={backToSelector} />}
      {v === 'optics' && <OpticsInvestigation onBack={backToSelector} />}
      {v === 'method' && <MethodInvestigation onBack={backToSelector} />}
      {v === 'calculus' && <CalculusInvestigation onBack={backToSelector} />}
      {v === 'astro' && <AstroInvestigation onBack={backToSelector} />}
      {v === 'nav' && <NavInvestigation onBack={backToSelector} />}
      {v === 'uni' && <UniInvestigation onBack={backToSelector} />}
      {v === 'med' && <MedInvestigation onBack={backToSelector} />}
      {v === 'alg' && <AlgInvestigation onBack={backToSelector} />}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <main className="relative min-h-screen flex flex-col bg-cosmos" />
      }
    >
      <StarfieldBackground />
      <HomeContent />
    </Suspense>
  );
}
