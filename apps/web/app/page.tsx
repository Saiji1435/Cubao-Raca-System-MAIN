// apps/web/app/dashboard/page.tsx
"use client";
import { useActionState } from "react";
import { submitRacaRequest } from "../lib/actions";
import EventLogTable from "../components/admin/EventLogTable";
import { MapPin, Package, Calendar, Activity, CheckCircle } from "lucide-react";

export default function AdminDashboard() {
  const [state, formAction, isPending] = useActionState(submitRacaRequest, null);

  return (
    <div className="space-y-6">
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Live Requests" value="12" icon={<Activity className="text-blue-500" />} />
        <StatCard label="Rooms Busy" value="8" icon={<MapPin className="text-amber-500" />} />
        <StatCard label="Items Out" value="45" icon={<Package className="text-indigo-500" />} />
        <StatCard label="Completed" value="124" icon={<CheckCircle className="text-emerald-500" />} />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* REQUEST FORM */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-900 p-4 text-white font-bold text-[10px] uppercase tracking-widest">New RACA Submission</div>
          <form action={formAction} className="p-5 space-y-4">
            <div className="space-y-3">
              <input name="room" placeholder="Room (e.g. Lab 1)" className="w-full bg-slate-50 border p-2.5 rounded text-xs outline-none focus:border-blue-500" />
              <input name="items" placeholder="Equipment Needed" className="w-full bg-slate-50 border p-2.5 rounded text-xs outline-none focus:border-blue-500" />
              <div className="grid grid-cols-2 gap-2">
                <input name="startTime" type="datetime-local" className="bg-slate-50 border p-2 text-[10px] rounded" />
                <input name="endTime" type="datetime-local" className="bg-slate-50 border p-2 text-[10px] rounded" />
              </div>
              <textarea name="purpose" placeholder="Purpose of activity..." className="w-full bg-slate-50 border p-2.5 rounded text-xs h-20" />
              
              {state?.success && <p className="text-emerald-600 text-[10px] font-bold uppercase">Success: Request Logged</p>}
              
              <button disabled={isPending} className="w-full bg-blue-600 text-white py-3 rounded font-black text-[11px] uppercase tracking-tighter hover:bg-blue-700 transition-all">
                {isPending ? "Sending..." : "Submit RACA Request"}
              </button>
            </div>
          </form>
        </div>

        {/* RECENT ACTIVITY TABLE */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
             <h3 className="text-xs font-black uppercase text-slate-700">System Logs</h3>
             <button className="text-[10px] font-bold text-blue-600 hover:underline">Full Report</button>
          </div>
          <div className="p-2">
            <EventLogTable logs={[]} /> {/* Passes real DB logs here */}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: any) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase">{label}</p>
        <p className="text-2xl font-black text-slate-900">{value}</p>
      </div>
      <div className="p-3 bg-slate-50 rounded-lg">{icon}</div>
    </div>
  );
}