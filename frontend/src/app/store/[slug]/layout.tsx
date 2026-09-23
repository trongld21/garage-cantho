export function generateStaticParams() {
  return [{ slug: '_' }];
}

export default function DetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
