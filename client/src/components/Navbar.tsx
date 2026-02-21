import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="flex items-center gap-2.5 text-xl font-bold text-indigo-600"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <Search className="h-4 w-4 text-white" />
          </div>
          UniKhoj
        </a>
        <a
          href="#form"
          className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-200 active:scale-[0.98]"
        >
          Find My University
        </a>
      </div>
    </nav>
  );
}
