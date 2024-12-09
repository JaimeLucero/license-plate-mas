// app/page.tsx or pages/index.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  // Change this import

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard')
  }, [router]);

  return null;
}