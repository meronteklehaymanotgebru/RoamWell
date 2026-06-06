import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';
const geist = Geist({ subsets: ['latin'] });
const geistMono = Geist_Mono({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f5f2' },
    { media: '(prefers-color-scheme: dark)', color: '#1f1f1f' },
  ],
};

export const metadata: Metadata = {
  title: 'RoamWell - Know your risk. Protect your health.',
  description: 'AI-powered interactive health risk map and wellness guardian for Ethiopia. Tap your region to get personalized, offline-ready wellness advice.',
  keywords: ['health', 'wellness', 'Ethiopia', 'AI', 'health risks', 'travel health', 'RoamWell'],
  openGraph: {
    title: 'RoamWell',
    description: 'Personalized health risk assessment powered by AI for Ethiopia.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background scroll-smooth">
      <body className={`${geist.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}