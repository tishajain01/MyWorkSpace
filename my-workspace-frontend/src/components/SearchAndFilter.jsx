import { useState, useRef, useEffect } from "react";
import { HiSearch, HiFilter, HiX, HiChevronDown, HiCheck } from "react-icons/hi";
import { LuActivity } from "react-icons/lu";

export default function SearchAndFilter({ search, setSearch, status, setStatus, count }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const statuses = ["Pending", "Running", "Completed", "On Hold"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
      
      {/* IMPROVED ACTIVE RESULTS UI */}
      <div className="flex flex-col gap-1 w-full md:w-auto">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Workspace Explorer</h2>
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </div>
                <span className="text-indigo-700 font-black text-[10px] uppercase tracking-tighter">
                    {count} {count === 1 ? 'Result' : 'Results'} Found
                </span>
            </div>
            <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest hidden sm:block">Filtered Stream</p>
        </div>
      </div>
      
      {/* Container for Search and Filter - Stacks on mobile, inline on md (768px) */}
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        {/* Search Bar */}
        <div className="relative w-full md:w-72 group">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-indigo-600 transition-colors" />
          <input 
            className="w-full bg-slate-50 border-none rounded-xl p-3 pl-10 pr-10 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all text-sm font-medium text-slate-700" 
            placeholder="Search projects..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
          />
          {search.length > 0 && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-rose-500">
              <HiX className="text-xl" />
            </button>
          )}
        </div>
        
        {/* CUSTOM DROPDOWN UI */}
        <div className="relative w-full sm:w-48" ref={dropdownRef}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3 px-4 outline-none transition-all hover:bg-slate-100 ${isOpen ? 'ring-2 ring-indigo-500 border-transparent' : ''}`}
          >
            <div className="flex items-center gap-2">
              <HiFilter className={`${status ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">
                {status || "All Statuses"}
              </span>
            </div>
            <HiChevronDown className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
              <div 
                onClick={() => { setStatus(""); setIsOpen(false); }}
                className={`flex items-center justify-between p-3 px-4 text-xs font-bold cursor-pointer transition-colors ${!status ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                All Statuses
                {!status && <HiCheck />}
              </div>
              
              {statuses.map((s) => (
                <div 
                  key={s}
                  onClick={() => { setStatus(s); setIsOpen(false); }}
                  className={`flex items-center justify-between p-3 px-4 text-xs font-bold cursor-pointer transition-colors ${status === s ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  {s}
                  {status === s && <HiCheck />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}