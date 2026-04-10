import { Monitor, MapPin, AlertCircle, CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* 1. TOP LEVEL STATS - Actionable Data */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <QuickStat label="Live Requests" value="08" icon={<AlertCircle className="text-amber-500" />} trend="+2 since 8AM" />
        <QuickStat label="Room Occupancy" value="84%" icon={<MapPin className="text-blue-500" />} trend="High Demand" />
        <QuickStat label="Assets Deployed" value="142" icon={<Monitor className="text-indigo-500" />} trend="Inventory Normal" />
        <QuickStat label="Resolved Today" value="24" icon={<CheckCircle2 className="text-emerald-500" />} trend="Efficiency: 98%" />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* 2. MAIN OPERATIONS PANEL (8 Cols) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white">
              <h1 className="text-2xl font-black italic tracking-tighter uppercase">Operations Overview</h1>
              <p className="text-blue-100 text-xs font-medium mt-1">Real-time status of STI Cubao Campus Resources</p>
            </div>
            
            <div className="p-0">
               <div className="grid grid-cols-2 divide-x border-b">
                  <div className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                    <span className="text-[11px] font-black uppercase text-slate-500">Active Schedules</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold">12 Rooms</span>
                  </div>
                  <div className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                    <span className="text-[11px] font-black uppercase text-slate-500">Pending Approvals</span>
                    <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold">5 Pending</span>
                  </div>
               </div>
               <div className="h-[300px] flex items-center justify-center bg-slate-50/50 italic text-slate-400 text-xs">
                 [Interactive Schedule Visualization Placeholder]
               </div>
            </div>
          </div>
        </div>

        {/* 3. LOGS & ACTIVITY (4 Cols) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-slate-50/50">
              <h3 className="text-[11px] font-black text-slate-700 uppercase tracking-tight">System Activity Log</h3>
            </div>
            <div className="divide-y divide-slate-100">
              <LogItem user="R. Jhon" action="Approved Room 302" time="2m ago" />
              <LogItem user="M. Sample" action="Returned Projector B" time="14m ago" />
              <LogItem user="System" action="Conflict Detected: AVR 1" time="1h ago" type="alert" />
              <LogItem user="A. Sample" action="Reserved Lab 1" time="3h ago" />
            </div>
            <button className="w-full py-3 text-[10px] font-bold text-blue-600 uppercase hover:bg-blue-50 transition-colors">
              View All System Logs
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

function QuickStat({ label, value, icon, trend }: any) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{value}</p>
        </div>
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      </div>
      <p className="text-[9px] font-bold text-slate-400 mt-3 uppercase">{trend}</p>
    </div>
  );
}

function LogItem({ user, action, time, type }: any) {
  return (
    <div className="p-4 flex items-start gap-3">
      <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${type === 'alert' ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`} />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] leading-tight">
          <span className="font-bold text-slate-900">{user}</span>
          <span className="text-slate-500 mx-1">{action}</span>
        </p>
        <p className="text-[9px] text-slate-400 mt-1 font-medium">{time}</p>
      </div>
    </div>
  );
}