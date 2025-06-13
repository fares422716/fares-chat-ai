// app/layout.tsx

import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'واجهة الفارس الذكية',
  description: 'نظام ذكي لإدارة وصياغة القضايا القانونية.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
