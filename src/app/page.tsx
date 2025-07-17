// app/page.tsx
'use client';

import dynamic from 'next/dynamic';

const ChatClient = dynamic(() => import('@/app/components/chat-client'), {
  ssr: false,
  loading: () => <p className='text-center mt-4'>Memuat Chat...</p>,
});

export default function Home() {
  return (
    <main>
      <ChatClient />
    </main>
  );
}
