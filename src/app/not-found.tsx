import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-theme(spacing.20)-theme(spacing.12))] bg-white">
      <h1 className="text-9xl font-bold text-black mb-8">404</h1>
      <Link href="/" passHref>
        <Button variant="outline" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}