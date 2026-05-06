import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlineBadgeCheck, HiOutlineArrowRight } from "react-icons/hi";

export default function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (isLogin) {
        const user = await loginUser({ email: form.email, password: form.password });
        onLoginSuccess(user);
      } else {
        await registerUser(form);
        setSuccessMsg("Account created successfully!");
        setTimeout(() => {
          setSuccessMsg("");
          setIsLogin(true);
        }, 2000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans selection:bg-indigo-100">
      
      {/* --- SUCCESS POPUP --- */}
      {successMsg && (
        <div className="fixed top-6 sm:top-10 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-xs animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-emerald-500 text-white px-4 py-3 rounded-2xl shadow-2xl shadow-emerald-200 flex items-center justify-center gap-3 border border-emerald-400">
            <HiOutlineBadgeCheck className="text-xl sm:text-2xl shrink-0" />
            <span className="font-bold tracking-tight text-sm sm:text-base">{successMsg}</span>
          </div>
        </div>
      )}

      {/* Main Card Container */}
      <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/60 w-full max-w-md border border-slate-100 relative overflow-hidden max-h-[95vh] overflow-y-auto">
        
        {/* Decorative Background Element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="relative">
          <header className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-2 tracking-tight">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mb-6 sm:mb-8 font-medium">
              {isLogin ? "Login to manage your projects" : "Join us to start tracking tasks"}
            </p>
          </header>
          
          {error && (
            <div className="text-rose-500 bg-rose-50 p-3 sm:p-4 rounded-2xl text-[11px] sm:text-xs mb-6 border border-rose-100 flex items-center gap-3 animate-in fade-in zoom-in duration-200">
               <div className="bg-rose-500 text-white p-1 rounded-lg font-bold text-[10px] shrink-0">⚠️</div> 
               <span className="font-semibold">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {!isLogin && (
              <div className="relative group">
                <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors text-lg" />
                <input 
                  className="w-full pl-11 pr-4 py-3 sm:py-3.5 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all font-medium text-slate-700 text-sm sm:text-base" 
                  placeholder="Full Name" 
                  onChange={e => setForm({...form, name: e.target.value})} 
                  required 
                />
              </div>
            )}

            <div className="relative group">
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors text-lg" />
              <input 
                className="w-full pl-11 pr-4 py-3 sm:py-3.5 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all font-medium text-slate-700 text-sm sm:text-base" 
                type="email" 
                placeholder="Email Address" 
                onChange={e => setForm({...form, email: e.target.value})} 
                required 
              />
            </div>

            <div className="relative group">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors text-lg" />
              <input 
                className="w-full pl-11 pr-4 py-3 sm:py-3.5 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all font-medium text-slate-700 text-sm sm:text-base" 
                type="password" 
                placeholder="Password" 
                onChange={e => setForm({...form, password: e.target.value})} 
                required 
              />
            </div>
            
            <button 
              disabled={loading}
              className={`group w-full relative overflow-hidden mt-2 ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white py-3.5 sm:py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition transform active:scale-[0.98] flex items-center justify-center gap-2 text-sm sm:text-base`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? "Login to Workspace" : "Get Started Now"}</span>
                  <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform hidden xs:block" />
                </>
              )}
            </button>
          </form>

          <footer className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-50 text-center">
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(""); setSuccessMsg(""); }} 
              className="text-slate-400 text-[10px] sm:text-[11px] hover:text-indigo-600 transition font-bold uppercase tracking-wider"
            >
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}