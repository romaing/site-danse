'use client';

import StripeProvider from '../components/StripeProvider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <StripeProvider>
      {children}
    </StripeProvider>
  );
}