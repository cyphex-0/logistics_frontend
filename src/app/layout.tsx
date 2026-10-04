import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { GlobalLoadingIndicator } from "@/components/feedback/global-loading-indicator";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { GoogleOAuthWrapper } from "@/components/providers/GoogleOAuthWrapper";

import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shiply",
  description: "Next-generation courier and logistics platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <GoogleOAuthWrapper>
          <QueryProvider>
            <GlobalLoadingIndicator />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AuthProvider>{children}</AuthProvider>
            </ThemeProvider>
          </QueryProvider>
        </GoogleOAuthWrapper>
        <Toaster />
      </body>
    </html>
  );
}

