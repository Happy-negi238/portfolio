'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { AdminDialog } from '@/components/admindialog/admindialog';
import { ContactPeople } from '@/components/contactpeople/contactpeople';

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  const handleSuccess = () => {
    setAuthenticated(true);
  };

  const handleFail = () => {
    router.replace('/');
  };
  return (
    <>
      {!authenticated && (
        <AdminDialog
          open={true}
          onSuccess={handleSuccess}
          onFail={handleFail}
        />
      )}

      {authenticated && <ContactPeople />}
    </>
  );
}
