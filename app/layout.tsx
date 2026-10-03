import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

import ClientLayoutWrapper from "./components/ClientLayoutWrapper";
import { Metadata } from "next";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"], // Add "cyrillic" if your Russian text requires it!
  weight: ["300", "400", "500", "700", "900"], // Select only the weights you actually use
  variable: "--font-montserrat", // Define a CSS custom property variable name
  display: "swap" // Prevents layout shifts while loading
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair", // Defines the custom CSS variable name
  display: "swap" // Ensures text is visible instantly while loading
});

export const metadata = {
  title: {
    default: "GRAMMZ | Immersive Experience", // The title for your Home route (/)
    template: "GRAMMZ | %s" // The pattern child pages will use (%s is the placeholder)
  },
  description: "Interactive 3D interior design showcase."
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        {/* <Header />
        <main className="fixed inset-0 w-screen h-screen  text-white overflow-hidden select-none m-0 p-0 border-0">
          <Scene3D />
        </main>
 
        {appState !== "entered" && (
          <LoaderScreen
            appState={appState}
            onReady={setReady}
            onEnter={setEntered}
          />
        )}
        {children}
        <AudioController /> */}
      </body>
    </html>
  );
}
