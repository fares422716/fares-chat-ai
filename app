// app/layout.tsx
import '../globals.css'; // تأكد أن ملف globals.css في جذر المشروع

export const metadata = {
  title: 'Fars Law Platform',
  description: 'Legal services platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
