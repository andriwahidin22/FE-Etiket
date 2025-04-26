import Head from 'next/head';
import Sidebar from './Sidebar';
import FloatingButton from './FloatingButton';

export default function Layout({ children }) {
  return (
    <div className="bg-[#f4f7f6] min-h-screen flex items-start justify-center p-4">
      <Head>
        <title>Material Tailwind React Dashboard</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
      </Head>
      
      <div className="max-w-[1280px] w-full flex flex-col md:flex-row gap-6">
        <Sidebar />
        <main className="flex-1 flex flex-col gap-6">
          {children}
        </main>
      </div>
      
      <FloatingButton />
    </div>
  );
}