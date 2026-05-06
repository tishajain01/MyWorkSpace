import { useState, useEffect, useRef } from "react";
import { updateProject, deleteProject } from "../services/projectService";
import {
  HiOutlineUser, HiOutlineCalendar, HiOutlineFlag, HiOutlineDocumentText,
  HiOutlinePencilAlt, HiOutlineTrash, HiOutlineCheckCircle, HiX, HiChevronDown, HiCheck
} from "react-icons/hi";

export default function ProjectModal({ project, initialEdit, onClose, onRefresh }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editForm, setEditForm] = useState(null);

  const [statusOpen, setStatusOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const statusRef = useRef(null);
  const priorityRef = useRef(null);

  const statuses = ["Pending", "Running", "On Hold", "Completed"];
  const priorities = ["Low", "Medium", "High"];

  useEffect(() => {
    if (project) setEditForm({ ...project });
  }, [project]);

  useEffect(() => {
    if (project) {
      setIsEditing(!!initialEdit);
    }
  }, [project, initialEdit]);

  useEffect(() => {
    const clickOutside = (e) => {
      if (statusRef.current && !statusRef.current.contains(e.target)) setStatusOpen(false);
      if (priorityRef.current && !priorityRef.current.contains(e.target)) setPriorityOpen(false);
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  if (!project || !editForm) return null;

  const handleChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleCancel = () => {
    setEditForm({ ...project });
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      await updateProject(project.id, editForm);
      setIsEditing(false);
      onRefresh();
    } catch (err) {
      alert("Error: Update failed.");
    }
  };

  const handleDelete = async () => {
    await deleteProject(project.id);
    onClose();
    onRefresh();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 font-sans text-slate-900">
      <div className="bg-white p-5 sm:p-8 rounded-[2rem] w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200 overflow-y-auto max-h-[95vh] sm:max-h-[90vh]">

        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-rose-500 transition-colors z-10">
          <HiX className="text-2xl" />
        </button>

        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            {isEditing ? <HiOutlinePencilAlt className="text-indigo-600" /> : <HiOutlineDocumentText className="text-indigo-600" />}
            {isEditing ? "Modify Project" : "Project Insights"}
          </h2>
        </div>

        <div className="space-y-6">
          {isEditing ? (
            <div className="space-y-5">
              {/* --- EDITING MODE FIELDS --- */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Project Name</label>
                  <input name="projectName" className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-700" value={editForm.projectName} onChange={handleChange} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Manage by</label>
                  <input name="managerName" className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-700" value={editForm.managerName} onChange={handleChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Start Date</label>
                  <input type="date" name="startDate" className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl outline-none text-sm font-semibold text-slate-600" value={editForm.startDate} onChange={handleChange} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">End Date</label>
                  <input type="date" name="endDate" className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl outline-none text-sm font-semibold text-slate-600" value={editForm.endDate} onChange={handleChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5" ref={statusRef}>
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Status</label>
                  <div className="relative">
                    <button type="button" onClick={() => setStatusOpen(!statusOpen)} className="w-full flex justify-between items-center bg-slate-50 border border-slate-100 p-3 rounded-xl text-xs font-bold text-slate-600">
                      {editForm.status} <HiChevronDown />
                    </button>
                    {statusOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-100 shadow-xl rounded-xl overflow-hidden z-50">
                        {statuses.map(s => (
                          <div key={s} onClick={() => { setEditForm({ ...editForm, status: s }); setStatusOpen(false); }} className={`p-3 text-xs font-bold cursor-pointer flex justify-between ${editForm.status === s ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-50'}`}>
                            {s} {editForm.status === s && <HiCheck />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5" ref={priorityRef}>
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Priority</label>
                  <div className="relative">
                    <button type="button" onClick={() => setPriorityOpen(!priorityOpen)} className="w-full flex justify-between items-center bg-slate-50 border border-slate-100 p-3 rounded-xl text-xs font-bold text-slate-600">
                      {editForm.priority} <HiChevronDown />
                    </button>
                    {priorityOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-100 shadow-xl rounded-xl overflow-hidden z-50">
                        {priorities.map(p => (
                          <div key={p} onClick={() => { setEditForm({ ...editForm, priority: p }); setPriorityOpen(false); }} className={`p-3 text-xs font-bold cursor-pointer flex justify-between ${editForm.priority === p ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-50'}`}>
                            {p} {editForm.priority === p && <HiCheck />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Description</label>
                <textarea name="description" className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl h-24 outline-none resize-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-600" value={editForm.description} onChange={handleChange} />
              </div>
            </div>
          ) : (
            /* --- VIEWING MODE --- */
            <div className="space-y-6">
              <div>
                {/* FIXED: Added break-words to ensure name wraps to next line */}
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-3 tracking-tight break-words">{editForm.projectName}</h1>
                <div className="flex flex-wrap gap-2">
                  <span className="flex items-center gap-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold px-3 py-1 rounded-lg border border-indigo-100 uppercase">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" /> {editForm.status}
                  </span>
                  <span className={`flex items-center gap-1 text-[10px] font-bold px-3 py-1 rounded-lg border uppercase ${editForm.priority === 'High' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-slate-50 text-slate-600 border-slate-100'}`}>
                    <HiOutlineFlag /> {editForm.priority} Priority
                  </span>
                </div>
              </div>

              {/* --- IMPROVED PROJECT LEAD & TIMELINE SECTION --- */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-y border-slate-100">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                  <div className="p-2 bg-white rounded-xl shadow-sm text-indigo-600 border border-slate-100">
                    <HiOutlineUser className="text-lg" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project Lead</p>
                    <p className="text-sm font-bold text-slate-700">{editForm.managerName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                  <div className="p-2 bg-white rounded-xl shadow-sm text-indigo-600 border border-slate-100">
                    <HiOutlineCalendar className="text-lg" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Timeline</p>
                    <p className="text-sm font-bold text-slate-700 tabular-nums">
                      {editForm.startDate} <span className="text-slate-300 font-normal mx-1">—</span> {editForm.endDate}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">Project Narrative</p>
                <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100">
                  <p className="text-slate-600 leading-relaxed text-sm font-medium whitespace-pre-wrap text-left break-words">
                    {editForm.description || "No specific narrative provided."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- DYNAMIC ACTIONS SECTION --- */}
        <div className="mt-8 flex flex-col gap-3">
          {showDeleteConfirm ? (
            /* --- CUSTOM DELETE UI --- */
            <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100 animate-in slide-in-from-bottom-2 duration-200">
              <p className="text-rose-700 font-bold text-center text-sm mb-3 px-4">
                Are you sure? This action cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="w-full bg-white text-slate-600 py-3 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition-colors order-2 sm:order-1"
                >
                  No, Keep it
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full bg-rose-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-rose-100 hover:bg-rose-700 transition-colors flex items-center justify-center gap-2 order-1 sm:order-2"
                >
                  <HiOutlineTrash /> Yes, Delete
                </button>
              </div>
            </div>
          ) : (
            /* --- NORMAL ACTIONS --- */
            <>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={isEditing ? handleCancel : onClose}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 order-2 sm:order-1"
                >
                  {isEditing ? "Cancel" : "Close"}
                </button>
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold shadow-lg transition flex items-center justify-center gap-2 order-1 sm:order-2"
                >
                  {isEditing ? <><HiOutlineCheckCircle className="text-lg" /> Apply Changes</> : <><HiOutlinePencilAlt className="text-lg" /> Edit Project</>}
                </button>
              </div>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="group flex items-center justify-center gap-2 py-3 mt-2 rounded-xl border-2 border-rose-50 hover:bg-rose-500 hover:border-rose-500 transition-all duration-300"
              >
                <HiOutlineTrash className="text-rose-500 group-hover:text-white" />
                <span className="text-rose-500 group-hover:text-white text-[10px] font-bold uppercase tracking-widest">
                  Delete Project Permanently
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}