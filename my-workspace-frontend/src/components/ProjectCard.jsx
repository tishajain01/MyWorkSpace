import { useState } from "react";
import { 
  HiOutlineUser, HiOutlineCalendar, HiOutlineArrowRight, 
  HiOutlineFlag, HiOutlineTrash, HiX, HiCheck, HiOutlinePencilAlt 
} from "react-icons/hi";
import { deleteProject } from "../services/projectService";

const statusColors = {
  Running: "bg-blue-50 text-blue-600 border-blue-100",
  Pending: "bg-amber-50 text-amber-600 border-amber-100",
  Completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
  "On Hold": "bg-rose-50 text-rose-600 border-rose-100",
};

const priorityColors = {
  High: "text-rose-600 bg-rose-50 border-rose-100",
  Medium: "text-amber-600 bg-amber-50 border-amber-100",
  Low: "text-emerald-600 bg-emerald-50 border-emerald-100",
};

const getRemainingDays = (endDate) => {
  const diff = new Date(endDate) - new Date();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? `${days} Days Left` : "Overdue";
};

export default function ProjectCard({ project, onOpen, onRefresh }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const isRunning = project.status === "Running";

  const handleDeleteTrigger = (e) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const handleEditTrigger = (e) => {
    e.stopPropagation();
    onOpen(project, true);
  };

  const handleCancelDelete = (e) => {
    e.stopPropagation();
    setShowConfirm(false);
  };

  const handleConfirmDelete = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    try {
      await deleteProject(project.id);
      if (typeof onRefresh === "function") onRefresh();
    } catch (error) {
      console.error("Delete failed:", error);
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div 
      onClick={() => !showConfirm && onOpen(project, false)}
      className="group cursor-pointer bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden h-full flex flex-col"
    >
      {/* --- DELETE UI OVERLAY --- */}
      {showConfirm && (
        <div className="absolute inset-0 z-50 bg-rose-600/95 backdrop-blur-sm p-6 flex flex-col justify-center items-center text-center animate-in fade-in zoom-in duration-200">
          <HiOutlineTrash className={`text-white text-4xl mb-2 ${isDeleting ? 'animate-bounce' : ''}`} />
          <p className="text-white font-bold text-sm mb-4 leading-tight">Delete this project permanently?</p>
          {!isDeleting && (
            <div className="flex gap-3 w-full px-2">
              <button onClick={handleCancelDelete} className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2.5 rounded-xl text-[10px] font-bold uppercase transition-colors flex items-center justify-center gap-1"><HiX /> No</button>
              <button onClick={handleConfirmDelete} className="flex-1 bg-white text-rose-600 hover:bg-rose-50 py-2.5 rounded-xl text-[10px] font-bold uppercase shadow-lg transition-colors flex items-center justify-center gap-1"><HiCheck /> Yes</button>
            </div>
          )}
        </div>
      )}

      {/* Priority Tag */}
      <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-[10px] font-bold uppercase border-l border-b flex items-center gap-1.5 ${priorityColors[project.priority]}`}>
        <HiOutlineFlag className="text-xs" />
        {project.priority}
      </div>

      {/* ACTION BUTTONS: Now visible on touch devices by default */}
      {!showConfirm && (
        <div className="absolute top-12 right-4 flex flex-col gap-2 z-10">
          <button 
            onClick={handleDeleteTrigger}
            className="p-2 bg-rose-50 text-rose-500 rounded-xl md:opacity-0 md:group-hover:opacity-100 hover:bg-rose-500 hover:text-white transition-all duration-200 shadow-sm border border-rose-100"
          >
            <HiOutlineTrash className="text-lg" />
          </button>
          
          <button 
            onClick={handleEditTrigger}
            className="p-2 bg-indigo-50 text-indigo-500 rounded-xl md:opacity-0 md:group-hover:opacity-100 hover:bg-indigo-500 hover:text-white transition-all duration-200 shadow-sm border border-indigo-100"
          >
            <HiOutlinePencilAlt className="text-lg" />
          </button>
        </div>
      )}

      <div className="mb-4 pr-12">
        <h3 className="font-bold text-slate-700 text-lg group-hover:text-indigo-600 transition-colors truncate tracking-tight">{project.projectName}</h3>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <span className={`flex items-center gap-1.5 text-[10px] font-bold px-3 py-1 rounded-lg border shadow-sm ${statusColors[project.status] || "bg-gray-50"}`}>
          {isRunning && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
          )}
          {project.status}
        </span>
      </div>
      
      <div className="space-y-3 flex-grow">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400"><HiOutlineUser /></div>
          <p className="font-medium truncate"><span className="text-slate-400 font-normal">Manage by:</span> {project.managerName}</p>
        </div>

        <div className="flex justify-between items-end mt-4 pt-4 border-t border-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-500"><HiOutlineCalendar /></div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Deadline</p>
              <p className="text-xs font-bold text-slate-600">{project.endDate}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-[10px] font-black uppercase tracking-tight px-2 py-0.5 rounded-md ${getRemainingDays(project.endDate) === "Overdue" ? "text-rose-500 bg-rose-50" : "text-indigo-600 bg-indigo-50"}`}>
              {getRemainingDays(project.endDate)}
            </p>
          </div>
        </div>
      </div>
      
      {/* SLIDE-UP BUTTON: Now always visible at bottom on touch devices */}
      {!showConfirm && (
        <div className="mt-4 md:absolute md:bottom-0 md:left-0 md:w-full md:p-4 md:bg-white md:translate-y-full md:group-hover:translate-y-0 md:transition-transform md:duration-300 z-20">
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white text-[11px] font-bold rounded-xl shadow-lg shadow-indigo-100 active:scale-95 transition-transform uppercase tracking-wider">
            VIEW DETAILS <HiOutlineArrowRight className="text-sm" />
          </button>
        </div>
      )}
    </div>
  );
}