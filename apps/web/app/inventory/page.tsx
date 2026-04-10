"use client";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";
import { Package, MapPin, Loader2 } from "lucide-react";

export default function InventoryPage() {
  const { data: items, isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: () => apiFetch("/inventory"),
  });

  if (isLoading) return (
    <div className="flex items-center justify-center h-64 border-2 border-dashed border-slate-200 rounded-xl">
       <div className="flex flex-col items-center gap-2">
         <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
         <span className="text-[10px] font-black uppercase text-slate-400">Syncing STI Assets...</span>
       </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="bg-[#0f172a] p-4 flex justify-between items-center">
        <h2 className="text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2">
          <Package className="h-4 w-4 text-blue-400" /> Equipment Management
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-[10px] font-black uppercase text-slate-500">Asset Name & Info</th>
              <th className="p-4 text-[10px] font-black uppercase text-slate-500 text-center">Qty</th>
              <th className="p-4 text-[10px] font-black uppercase text-slate-500">Assigned Room</th>
              <th className="p-4 text-[10px] font-black uppercase text-slate-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items?.map((item: any) => (
              <tr key={item.id} className="hover:bg-blue-50/50 transition-colors group">
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-800 uppercase group-hover:text-blue-600 transition-colors">
                      {item.itemName}
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">ID: {item.id}</span>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className="bg-slate-100 px-2 py-1 rounded text-[10px] font-black text-slate-600">
                    {item.quantity}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <MapPin className="h-3 w-3 text-slate-400" />
                    <span className="text-[10px] font-bold uppercase">{item.room?.name || "Unassigned"}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`text-[9px] font-black px-2 py-1 rounded uppercase tracking-tighter ${
                    item.quantity > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}