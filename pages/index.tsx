import { Inter } from "next/font/google";
import TesseractOCR from "@/components/TesseractOCR";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`p-5 ${inter.className}`}>
      <div>
        <TesseractOCR />
      </div>
    </main>
  );
}
