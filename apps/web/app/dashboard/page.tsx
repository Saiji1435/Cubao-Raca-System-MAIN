export default function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-10">
      {/* Centered Stats from your drawing */}
      <div className="flex justify-center gap-10">
        <button className="px-8 py-4 border-2 border-black rounded-xl font-bold hover:bg-slate-50 transition-colors">
          Available Items
        </button>
        <button className="px-8 py-4 border-2 border-black rounded-xl font-bold hover:bg-slate-50 transition-colors">
          Available Rooms
        </button>
      </div>

      {/* Main Request Form - Clean & Minimalist */}
      <div className="bg-white border-2 border-black rounded-2xl p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
        <h2 className="text-xl font-black mb-6 uppercase italic">New Facility Request</h2>
        
        <form className="space-y-4">
          <input type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          
          <select className="w-full p-3 border-2 border-black rounded-lg font-bold outline-none focus:ring-2 focus:ring-yellow-400">
            <option>Select a Room</option>
          </select>

          <select className="w-full p-3 border-2 border-black rounded-lg font-bold outline-none focus:ring-2 focus:ring-yellow-400">
            <option>Select Items</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input type="time" placeholder="Start Time" className="p-3 border-2 border-black rounded-lg font-bold" />
            <input type="time" placeholder="End Time" className="p-3 border-2 border-black rounded-lg font-bold" />
          </div>

          <textarea placeholder="Purpose (e.g., Department Meeting)" className="w-full p-3 border-2 border-black rounded-lg font-bold min-h-[100px]" />

          <button className="w-full bg-[#FFD447] border-2 border-black py-4 rounded-xl font-black uppercase tracking-widest hover:translate-y-[-2px] hover:shadow-[0_4px_0_rgba(0,0,0,1)] active:translate-y-[0px] transition-all">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}