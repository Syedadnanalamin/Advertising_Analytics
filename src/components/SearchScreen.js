import { Search, ChevronRight } from "lucide-react";

export default function SearchScreen({
  searchQuery,
  setSearchQuery,
  onSubmit
}) {
  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center p-6 bg-[#0b0b0f]">
      {/* Background glow assets */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl text-center space-y-8 z-10">
        {/* Header/Logo */}
        <div className="inline-flex items-center gap-2.5 sm:gap-4 text-left">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#12121a]/80 border border-white/10 flex items-center justify-center p-1.5 sm:p-2 overflow-hidden shadow-xl shadow-indigo-500/5 shrink-0">
            <img
              src="/logo.jpg"
              alt="Boost House Agency Logo"
              className="w-full h-full object-contain rounded-lg sm:rounded-xl"
            />
          </div>
          <span className="text-left text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
            BOOST HOUSE AGENCY
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Campaign Results Portal
          </h1>
          <p className="text-zinc-400 text-lg max-w-md mx-auto">
            Enter your campaign identifier below to check live statistics, message metrics, and performance charts.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
          <div className="relative flex items-center bg-[#12121a] rounded-2xl border border-white/5 p-2 gap-2">
            <Search className="w-6 h-6 text-zinc-500 ml-3" />
            <input
              type="text"
              placeholder="Enter Facebook Campaign ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-0 text-base"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2"
            >
              Track
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
