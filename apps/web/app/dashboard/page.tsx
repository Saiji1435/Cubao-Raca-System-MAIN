"use client";

import React from "react";
import { useActionState } from "react";
import { Upload, Calendar, Package, MapPin, CheckCircle, Activity } from "lucide-react";
import { submitRacaRequest } from "../../lib/actions";
import EventLogTable from "../../components/admin/EventLogTable"; 

const recentLogs = [
  {
    id: "1",
    action: "RACA_SUBMITTED",
    summary: "New request for Room 502 (Broadcasting Room)",
    createdAt: new Date().toISOString(),
    user: { name: "Admin Head", email: "admin@sticubao.edu.ph" }
  }
];

export default function AdminDashboard() {
  const [state, formAction, isPending] = useActionState(submitRacaRequest, null);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">RACA Operational Hub</h1>
        <p className="text-slate-500 text-sm font-medium">STI College Cubao • Department Management</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT COLUMN: Submission Form */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-6">
            <div className="bg-[#0f172a] p-4 text-white flex items-center gap-2">
              <Upload className="h-4 w-4 text-blue-400" />
              <h2 className="text-[11px] font-black uppercase tracking-widest">New Activity Request</h2>
            </div>
            
            <form action={formAction} className="p-5 space-y-4">
              <button type="button" className="w-full py-4 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all">
                <Upload className="h-5 w-5" />
                <span className="text-[10px] font-bold uppercase">Upload File</span>
              </button>
              
              <div className="space-y-3">
                <FormInput name="room" label="Select a Room" icon={<MapPin className="h-3 w-3" />} />
                <FormInput name="items" label="Select Items" icon={<Package className="h-3 w-3" />} />
                
                <div className="grid grid-cols-2 gap-3">
                  <FormInput name="startTime" label="Start Time" icon={<Calendar className="h-3 w-3" />} />
                  <FormInput name="endTime" label="End Time" icon={<Calendar className="h-3 w-3" />} />
                </div>
                
                <textarea 
                  name="purpose"
                  className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-[11px] h-24 outline-none focus:ring-1 focus:ring-blue-500" 
                  placeholder="Purpose of Activity..."
                  required
                />
                
                {state?.error && (
                  <div className="p-2 bg-red-50 border border-red-100 rounded">
                    <p className="text-red-600 text-[10px] font-bold uppercase">{state.error}</p>
                  </div>
                )}

                {state?.success && (
                  <div className="p-2 bg-emerald-50 border border-emerald-100 rounded">
                    <p className="text-emerald-600 text-[10px] font-bold uppercase">Request Sent Successfully!</p>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white py-3 rounded font-black text-[11px] uppercase tracking-widest transition-all shadow-lg active:scale-[0.98]"
                >
                  {isPending ? "Processing..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Stats and Feed */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AvailabilityCard title="Available Items" count="24" color="bg-emerald-500" />
            <AvailabilityCard title="Available Rooms" count="12" color="bg-blue-500" />
          </div>
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
              <Activity className="h-4 w-4 text-slate-500" />
              <h3 className="font-bold text-slate-700 text-xs uppercase tracking-wider">System Activity Feed</h3>
            </div>
            <div className="p-4">
               <EventLogTable logs={recentLogs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function FormInput({ label, icon, name }: { label: string, icon: React.ReactNode, name: string }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-3 text-slate-400">{icon}</div>
      <input 
        name={name}
        className="w-full bg-slate-50 border border-slate-200 rounded py-2.5 pl-9 pr-4 text-[11px] font-medium focus:ring-1 focus:ring-blue-500 outline-none" 
        placeholder={label} 
        required
      />
    </div>
  );
}

function AvailabilityCard({ title, count, color }: { title: string, count: string, color: string }) {
  return (
    <div className="flex-1 bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex items-center justify-between">
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
        <p className="text-2xl font-black text-slate-900 mt-1">{count}</p>
      </div>
      <div className={`h-12 w-12 ${color} rounded-lg bg-opacity-10 flex items-center justify-center`}>
        <CheckCircle className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
  );
}