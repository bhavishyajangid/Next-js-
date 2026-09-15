
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/Header"
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
      }}>
      <html
        lang="en"
        suppressHydrationWarning
        className={`h-full antialiased`}
      >
        <body className={`min-h-full flex flex-col ${inter.className}`}>
          <ThemeProvider>
            <Header />
            <main>{children}</main>
            <footer className="container bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>
                  Made with ❤️ by <a href="https://github.com" target="_blank" rel="noopener noreferrer">Bhavishya Jangid </a>
                </p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
