import "./globals.css";
import Image from "next/image";
// 1. IMPORT THE LOGO DIRECTLY
import StiLogo from "../components/Logo/StiLogo.png"; 
import { Sidebar } from "../components/layout/sidebar";
import { QueryProvider } from "../components/providers/query-provider";
import { Menu } from "lucide-react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen overflow-hidden bg-[#f8fafc] antialiased text-slate-900">
        <QueryProvider>
          {/* HEADER - RACA Branding */}
          <header className="h-[56px] bg-[#0f172a] text-white flex items-center justify-between px-6 z-50 shrink-0 border-b border-blue-500/20 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {/* 2. USE THE IMPORTED LOGO OBJECT */}
                <Image 
                  src={StiLogo} 
                  alt="STI Logo" 
                  width={24} 
                  height={24} 
                  priority
                />
                <div className="flex flex-col leading-none">
                  <span className="font-black tracking-tight text-[12px] uppercase">RACA SYSTEM</span>
                  <span className="text-[8px] font-bold text-blue-400 uppercase tracking-widest">STI College Cubao</span>
                </div>
              </div>
              <Menu className="h-4 w-4 text-slate-400 ml-4 cursor-pointer hover:text-white transition-colors" />
              <span className="text-[11px] font-medium text-slate-300 hidden md:block uppercase tracking-tighter">
                Request for Approval of Campus Activity/Venue
              </span>
            </div>

            {/* Admin Profile - MIS_Admin */}
            <div className="flex items-center gap-4">
              <div className="text-right leading-tight hidden sm:block">
                <p className="text-[11px] font-bold text-white uppercase tracking-tight">MIS_Admin</p>
                <p className="text-[9px] text-[#d4e157] font-black uppercase tracking-tighter">MIS | IT Specialist 1</p>
              </div>
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 border border-white/10 flex items-center justify-center text-white font-black text-xs shadow-lg">
                SA
              </div>
            </div>
          </header>

          <div className="flex flex-1 overflow-hidden">
            {/* SIDEBAR */}
            <aside className="w-[240px] bg-[#1e293b] text-slate-400 hidden md:block overflow-y-auto border-r border-slate-800">
              <Sidebar />
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                {/* 3. ENSURE DASHBOARD CONTAINER WRAPS CHILDREN */}
                <div className="max-w-[1600px] mx-auto min-h-full">
                  {children}
                </div>
              </div>
              
              {/* Institutional Footer */}
              <footer className="py-3 text-center border-t bg-white shrink-0 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.25em]">
                  © 2026 - STI College Cubao | RACA
                </p>
              </footer>
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}