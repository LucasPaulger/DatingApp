import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flyrt | Modern Dating Made Simple",
  description: "Find your perfect match with Flyrt - where meaningful connections take flight",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SubscriptionProvider>
          <Navigation />
          
          {/* Main Content */}
          <main>{children}</main>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-rose-500 mb-4">Flyrt</h3>
                  <p className="text-gray-400">Modern dating made simple.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2">
                    <li><Link href="/matches" className="text-gray-400 hover:text-white">Matches</Link></li>
                    <li><Link href="/messages" className="text-gray-400 hover:text-white">Messages</Link></li>
                    <li><Link href="/profile" className="text-gray-400 hover:text-white">Profile</Link></li>
                    <li><Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Company</h4>
                  <ul className="space-y-2">
                    <li><Link href="#" className="text-gray-400 hover:text-white">About Us</Link></li>
                    <li><Link href="#" className="text-gray-400 hover:text-white">Careers</Link></li>
                    <li><Link href="#" className="text-gray-400 hover:text-white">Press</Link></li>
                    <li><Link href="#" className="text-gray-400 hover:text-white">Blog</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Legal</h4>
                  <ul className="space-y-2">
                    <li><Link href="#" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                    <li><Link href="#" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                    <li><Link href="#" className="text-gray-400 hover:text-white">Cookie Policy</Link></li>
                    <li><Link href="#" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                <p>&copy; 2024 Flyrt. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </SubscriptionProvider>
      </body>
    </html>
  );
}
