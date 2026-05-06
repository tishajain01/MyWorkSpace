import { HiPlus, HiFolderAdd } from "react-icons/hi";

export default function AddProjectButton({ onClick }) {
  return (
    <div className="flex justify-center mb-8">
      <button
        onClick={onClick}
        className="group flex items-center gap-3 bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all transform active:scale-95 tracking-tight"
      >
        <HiFolderAdd className="text-2xl" />
        <span>ADD NEW PROJECT</span>
        <HiPlus className="text-xl group-hover:rotate-90 transition-transform duration-300" />
      </button>
    </div>
  );
}