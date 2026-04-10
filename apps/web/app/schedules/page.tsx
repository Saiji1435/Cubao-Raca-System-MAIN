"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { RoomCard } from "../../components/raca/room-card";
import { RequestForm } from "../../components/raca/request-form";
import { Calendar, Bell, User, LayoutDashboard, Building2, ClipboardList } from "lucide-react";

async function getRooms() {
  const res = await fetch("http://localhost:3001/schedules");
  if (!res.ok) throw new Error("Failed to fetch rooms");
  return res.json();
}

export default function SchedulesPage() {
  const [selectedFloor, setSelectedFloor] = useState("All");

  const { data: rooms, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  const floors = ["All", ...new Set(rooms?.map((r: any) => r.floor).filter(Boolean))];
  const filteredRooms = selectedFloor === "All" 
    ? rooms 
    : rooms?.filter((r: any) => r.floor === selectedFloor);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* 1. TOP NAVIGATION BAR */}
      <header className="h-14 border-b bg-[#2a2d34] text-white flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <span className="font-bold tracking-tight text-lg">STI EMPLOYEES PORTAL</span>
          <div className="h-4 w-px bg-white/20 mx-2" />
          <span className="text-sm text-slate-300">RACA System / Home</span>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="h-5 w-5 text-slate-400 cursor-pointer" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Huzben Jhon Santos</span>
            <div className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center text-blue-900 font-bold text-xs">
              RS
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-[1600px] mx-auto grid grid-cols-12 gap-6">
        
        {/* 2. LEFT & CENTER COLUMN (Main Content) */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          
          {/* Hero Stats Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-blue-600 h-2 w-full" />
            <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Facility Dashboard</h2>
                <p className="text-slate-500">Manage room availability and institutional requests.</p>
              </div>
              <div className="mt-4 md:mt-0">
                 <RequestForm rooms={rooms || []} />
              </div>
            </div>
          </div>

          {/* Floor Filters */}
          <div className="flex items-center gap-2 overflow-x-auto py-2">
            <LayoutDashboard className="h-5 w-5 text-slate-400 mr-2" />
            {floors.map((floor: any) => (
              <button
                key={floor}
                onClick={() => setSelectedFloor(floor)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedFloor === floor 
                  ? "bg-blue-700 text-white shadow-md" 
                  : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {floor === "All" ? "All Areas" : `${floor} Floor`}
              </button>
            ))}
          </div>

          {/* Room Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {isLoading ? (
              <div className="col-span-full h-64 flex items-center justify-center text-slate-400 italic">
                Syncing with STI database...
              </div>
            ) : (
              filteredRooms?.map((room: any) => (
                <RoomCard 
                  key={room.id}
                  name={room.name} 
                  type={room.type} 
                  capacity={room.capacity}
                  status="available"
                />
              ))
            )}
          </div>
        </div>

        {/* 3. RIGHT COLUMN (Portal Sidebar Feeds) */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          
          {/* Today's Bookings - Portal "Birthday" Style */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-700 text-sm">Today's Bookings</h3>
              <Calendar className="h-4 w-4 text-slate-400" />
            </div>
            <div className="p-4 space-y-4">
              {/* Dummy data for visual - link to real schedules later */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">
                  301
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 uppercase">Faculty Meeting</p>
                  <p className="text-[10px] text-slate-500">09:00 AM - 11:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold text-xs shrink-0">
                  GYM
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 uppercase">PE Basketball Class</p>
                  <p className="text-[10px] text-slate-500">01:00 PM - 03:00 PM</p>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Inventory/Logs - Portal "New Employees" Style */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-700 text-sm">Recent Activity</h3>
              <ClipboardList className="h-4 w-4 text-slate-400" />
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
                  ML
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Movable TV Borrowed</p>
                  <p className="text-[10px] text-slate-500">By Jayson Maño • 2m ago</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
      
      {/* Footer - Matches Portal Photo */}
      <footer className="mt-12 py-6 text-center border-t bg-white">
        <p className="text-xs text-slate-400">© 2026 - STI Education Services Group, Inc.</p>
      </footer>
    </div>
  );
}