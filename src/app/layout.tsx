import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster  position="bottom-center" 
          toastOptions={{
            className: '',
            style: {
              backgroundColor: 'black',
              padding: '8px',
              color: 'white',
            },
          }}
        />
          {children}
      </body>
    </html>
  );
}
