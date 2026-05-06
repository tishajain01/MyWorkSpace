import { useState, useRef, useEffect } from "react";
import { getCurrentUser } from "../services/authService";
import { 
  HiOutlineBriefcase, 
  HiOutlineUser, 
  HiOutlineCalendar, 
  HiOutlineFlag, 
  HiOutlineDocumentText, 
  HiX,
  HiChevronDown,
  HiCheck
} from "react-icons/hi";

export default function ProjectForm({ onSubmit, onClose }) {
  const user = getCurrentUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [form, setForm] = useState({
    projectName: "",
    managerName: "",
    startDate: "",
    endDate: "",
    description: "",
    status: "Pending",
    priority: "Medium"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const priorities = ["Low", "Medium", "High"];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const selectPriority = (val) => {
    setForm({ ...form, priority: val });
    setIsDropdownOpen(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (new Date(form.endDate) < new Date(form.startDate)) {
      setError("End date cannot be earlier than start date.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      setError("Failed to create project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans text-slate-900">
      {/* Added max-h and overflow for small mobile screens */}
      <div className="bg-white p-6 md:p-8 rounded-3xl w-full max-w-md shadow-2xl relative animate-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-rose-500 transition-colors z-10">
          <HiX className="text-2xl" />
        </button>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">New Project</h2>
          <p className="text-slate-400 text-xs font-semibold mt-1 uppercase tracking-widest">Setup Workspace Entry</p>
        </div>
        
        {error && (
          <div className="flex items-center gap-2 text-rose-500 text-[11px] font-bold mb-6 bg-rose-50 p-4 rounded-xl border border-rose-100">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5 md:space-y-6">
          {/* Project Name */}
          <div className="relative group">
            <HiOutlineBriefcase className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              className="w-full bg-slate-50 border border-slate-100 p-3 pl-10 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-semibold text-slate-700 placeholder:text-slate-400" 
              name="projectName" 
              placeholder="Project Title *" 
              onChange={handleChange} 
              required 
            />
          </div>
          
          {/* Dates Row - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-wider">
                <HiOutlineCalendar className="text-xs" /> Start Date
              </label>
              <input 
                type="date" 
                name="startDate" 
                className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-xs font-bold text-slate-600" 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-wider">
                <HiOutlineCalendar className="text-xs" /> End Date
              </label>
              <input 
                type="date" 
                name="endDate" 
                className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-xs font-bold text-slate-600" 
                min={form.startDate} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          {/* Priority Dropdown & Manager - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5" ref={dropdownRef}>
              <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-wider">
                <HiOutlineFlag className="text-xs" /> Priority
              </label>
              <div className="relative">
                <button 
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full flex items-center justify-between bg-slate-50 border border-slate-100 p-3 rounded-xl text-xs font-bold text-slate-600 transition-all ${isDropdownOpen ? 'ring-2 ring-indigo-500' : ''}`}
                >
                  {form.priority}
                  <HiChevronDown className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2">
                    {priorities.map(p => (
                      <div 
                        key={p} 
                        onClick={() => selectPriority(p)}
                        className={`flex items-center justify-between p-3 px-4 text-xs font-bold cursor-pointer transition-colors ${form.priority === p ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
                      >
                        {p}
                        {form.priority === p && <HiCheck />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-wider">
                <HiOutlineUser className="text-xs" /> Manage by
              </label>
              <input 
                name="managerName" 
                className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-xs font-bold text-slate-600 placeholder:font-normal" 
                placeholder="Assignee Name" 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          {/* Description */}
          <div className="relative group">
            <HiOutlineDocumentText className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <textarea 
              name="description" 
              className="w-full bg-slate-50 border border-slate-100 p-3 pl-10 rounded-xl h-24 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-xs font-bold text-slate-600 resize-none placeholder:font-normal" 
              placeholder="Brief project overview..." 
              onChange={handleChange} 
            />
          </div>

          {/* Submit Button */}
          <button 
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-100 transition transform active:scale-95 ${loading ? 'bg-slate-300' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {loading ? "Establishing Entry..." : "Create Workspace Project"}
          </button>
        </form>
      </div>
    </div>
  );
}