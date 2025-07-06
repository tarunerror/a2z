import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { UserProvider } from "@/context/UserContext";
import { Navigation } from "@/components/Navigation";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DSA Learning Hub",
  description: "Learn Data Structures and Algorithms with organized topics and questions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-background dark:bg-background-dark min-h-screen antialiased`}>
        <ThemeProvider>
          <UserProvider>
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <main className="flex-grow container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="bg-white dark:bg-card-dark rounded-xl shadow-lg border border-border dark:border-border-dark overflow-hidden">
                  <div className="p-6 sm:p-8">
                    {children}
                  </div>
                </div>
              </main>
              <footer className="bg-white dark:bg-card-dark border-t border-border dark:border-border-dark py-8 mt-auto">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
                      <span className="font-semibold text-primary dark:text-primary-dark">DSA Learning Hub</span>
                      <span className="hidden md:inline-block text-gray-400">|</span>
                      <span className="text-gray-600 dark:text-gray-400">&copy; {new Date().getFullYear()} All rights reserved.</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <a 
                        href="https://github.com/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-500 hover:text-primary dark:hover:text-primary-dark transition-colors"
                      >
                        <FaGithub size={20} />
                      </a>
                      <a 
                        href="https://linkedin.com/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-500 hover:text-primary dark:hover:text-primary-dark transition-colors"
                      >
                        <FaLinkedin size={20} />
                      </a>
                      <a 
                        href="https://twitter.com/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-500 hover:text-primary dark:hover:text-primary-dark transition-colors"
                      >
                        <FaTwitter size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 