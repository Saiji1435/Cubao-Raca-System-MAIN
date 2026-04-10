// apps/web/app/layout.tsx
import "./globals.css";
import Image from "next/image";
import StiLogo from "../components/Logo/StiLogo.png"; 
import { QueryProvider } from "../components/providers/query-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen overflow-hidden bg-white antialiased text-slate-900 font-sans">
        <QueryProvider>
          {/* HEADER - Minimalist RACA Branding as requested */}
          <header className="h-[56px] bg-[#dbeafe] flex items-center justify-between px-6 z-50 shrink-0 border-b border-[#BFDBFE]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Image 
                  src={StiLogo} 
                  alt="STI" 
                  width={24} 
                  height={24} 
                  priority 
                />
                {/* Clean, official RACA text from your whiteboard */}
                <div className="flex flex-col leading-none">
                  <span className="font-black text-[12px] uppercase">RACA</span>
                  <span className="text-[10px] font-bold text-slate-600 uppercase">REQUEST FOR APPROVAL OF CAMPUS ACTIVITY/VENUE</span>
                </div>
              </div>
            </div>

            {/* Admin Profile - Simplified for Acting Head */}
            <div className="flex items-center gap-4">
              <div className="text-right leading-tight hidden sm:block">
                <p className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">MIS_Admin</p>
                <p className="text-[10px] text-blue-700 font-black uppercase tracking-tighter">Acting Head</p>
              </div>
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 border border-white/10 flex items-center justify-center text-white font-black text-xs shadow-lg">
                SA
              </div>
            </div>
          </header>

          <div className="flex flex-1 overflow-hidden">
            {/* SCROLLABLE CONTENT AREA */}
            <main className="flex-1 overflow-y-auto p-6 scroll-smooth bg-white">
              <div className="max-w-[1600px] mx-auto min-h-full">
                {children}
              </div>
            </main>
          </div>
          
          {/* FOOTER - Branded as requested */}
          <footer className="py-3 text-center border-t bg-slate-50 shrink-0 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.25em]">
              © 2026 - STI College Cubao | RACA
            </p>
          </footer>
        </QueryProvider>
      </body>
    </html>
  );
}