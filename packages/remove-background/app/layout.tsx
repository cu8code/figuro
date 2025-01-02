import type { Metadata } from "next";
import "./globals.css";
import { ModelProvider } from "@/components/ModalContex";

export const metadata: Metadata = {
  title: "Remove Background",
  description: "Remove Background",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
        {/* rest of your scripts go under */}
      </head>
      <body>
				<ModelProvider>
				{children}
				</ModelProvider>
			</body>
    </html>
  )
}
