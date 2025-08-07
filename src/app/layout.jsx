import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavigationBar } from "../components/AppNavigation";
import { ToastProvider } from "../components/ToastProvider";
import { AuthProvider } from "../contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TelecomShop - Professional Electronics & Telecom Equipment",
  description: "Your trusted partner for professional electronics and telecommunications equipment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ToastProvider>
            <NavigationBar />
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
