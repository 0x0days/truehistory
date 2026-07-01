// Root layout — minimal, just passes through to the [locale] segment.
// The actual <html> tag is in [locale]/layout.tsx so we can set
// lang and dir attributes per locale.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
