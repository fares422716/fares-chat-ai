// app/layout.tsx
export const metadata = {
  title: "واجهة الفارس الذكية",
  description: "نظام قضايا ذكي مقدم من شركة الفارس للمحاماة",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
