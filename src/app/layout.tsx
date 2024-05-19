
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import Navigation from '@/components/Navigations';
import { CartProvider } from '../context/context'; // Importa el CartProvider

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'xcosas',
  description: 'tienda colombiana',
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <main className="container mx-auto">
              <Navbar />
            </main>
            {children}
            <Navigation />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}