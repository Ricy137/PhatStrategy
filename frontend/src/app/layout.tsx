import "./globals.css";
import type { Metadata } from "next";
import { ToastRender } from "@/components/Toast";
import Navbar from "@/modules/Navbar";
import InfoBoard from "@/modules/InfoBoard";
import Providers from "@/modules/Providers";

export const metadata: Metadata = {
  title: "Phat Strategy",
  description: "A game built on Phala and Lens Network",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ToastRender />
          <Navbar />
          <main className="p-[24px] flex flex-col justify-center items-center gap-y-[32px] w-full max-w-[1920px] min-h-screen">
            <div className="w-[90%]">
              <InfoBoard />
            </div>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
