import { useEffect, useState } from "react";
import { getProjects, addProject } from "../services/projectService";
import { getCurrentUser, logout } from "../services/authService";
import Auth from "./Auth";
import AddProjectButton from "../components/AddProjectButton";
import ProjectForm from "../components/ProjectForm";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import SearchAndFilter from "../components/SearchAndFilter";

import { HiOutlineLogout, HiUserCircle } from "react-icons/hi";
import { LuLayoutDashboard, LuFolderSearch } from "react-icons/lu";

export default function Home() {
    const [user, setUser] = useState(getCurrentUser());
    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selected, setSelected] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const fetchAll = () => {
        if (user) {
            getProjects(user.id).then((data) => {
                // REVERSE the data so the newest project (last in DB) appears first
                setProjects([...data].reverse());
            });
        }
    };

    useEffect(() => {
        fetchAll();
    }, [user]);

    const handleOpenModal = (project, edit = false) => {
        setSelected(project);
        setIsEditMode(edit);
    };

    if (!user) return <Auth onLoginSuccess={(u) => setUser(u)} />;

    const firstName = user.name ? user.name.split(" ")[0] : "User";

    const filtered = projects.filter(p =>
        (!status || p.status === status) &&
        Object.values(p).join(" ").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-6">
            <header className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto mb-8 bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-100">
                        <LuLayoutDashboard className="text-white text-2xl" />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight italic">
                            MY <span className="text-indigo-600">WORKSPACE</span>
                        </h1>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-tight">
                            Personal Project Manager
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
                    <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                        <HiUserCircle className="text-indigo-500 text-xl" />
                        <span className="text-slate-600 font-extrabold text-sm whitespace-nowrap">
                            {firstName}
                        </span>
                    </div>
                    
                    <button 
                        onClick={logout} 
                        className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase border border-rose-100 px-4 py-2 rounded-xl hover:bg-rose-50 transition-all active:scale-95"
                    >
                        <HiOutlineLogout className="text-base" />
                        Logout
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto">
                <AddProjectButton onClick={() => setShowForm(true)} />

                <SearchAndFilter
                    search={search}
                    setSearch={setSearch}
                    status={status}
                    setStatus={setStatus}
                    count={filtered.length}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map(p => (
                        <ProjectCard 
                            key={p.id} 
                            project={p} 
                            onOpen={handleOpenModal} 
                            onRefresh={fetchAll} 
                        />
                    ))}
                </div>
                
                {filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                        <LuFolderSearch className="text-slate-300 text-6xl mb-4" />
                        <p className="text-slate-400 font-bold px-4 text-center">No projects found. Click the button above to start tracking!</p>
                    </div>
                )}
            </main>

            {showForm && (
                <ProjectForm
                    onSubmit={(p) => addProject(user.id, p).then(fetchAll)}
                    onClose={() => setShowForm(false)}
                />
            )}

            <ProjectModal
                project={selected}
                initialEdit={isEditMode}
                onClose={() => setSelected(null)}
                onRefresh={fetchAll}
            />
        </div>
    );
}