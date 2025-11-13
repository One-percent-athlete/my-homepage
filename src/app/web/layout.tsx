import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bridges to a Global Audience | Multilingual Web Development',
  description: 'We build multilingual websites that connect your business with a global audience.',
};

export default function WebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}