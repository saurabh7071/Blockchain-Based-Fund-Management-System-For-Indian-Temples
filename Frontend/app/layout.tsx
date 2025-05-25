// app/layout.tsx
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#FEF3E2] text-[#3A0519] font-sans">
        {children}
      </body>
    </html>
  );
}
