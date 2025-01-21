import type { AppProps } from "next/app";
import { AuthProvider } from "../../contexts/authContext";
import "./globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="flex flex-col items-center min-h-screen w-screen bg-gradient-to-r from-teal-300 to-cyan-300 font-sans">
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}
