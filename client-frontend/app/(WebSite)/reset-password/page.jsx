// app/reset-password/page.jsx
import ResetPasswordClient from '@/components/othersPages/ResetPasswordClient';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
}
