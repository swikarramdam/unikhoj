import { Search, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <a
              href="#"
              className="flex items-center gap-2 text-xl font-bold text-indigo-600"
            >
              <Search className="h-5 w-5" />
              UniKhoj
            </a>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Nepal's first data-driven university discovery platform. Built
              for students, not consultancies.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Quick Links
              </h4>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="#form"
                  className="text-sm text-slate-600 transition hover:text-indigo-600"
                >
                  College Finder
                </a>
                <a
                  href="#"
                  className="text-sm text-slate-600 transition hover:text-indigo-600"
                >
                  How It Works
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Connect
              </h4>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-indigo-600"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-indigo-600"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.28 8.28 0 0 0 3.76.97V6.21a4.85 4.85 0 0 1-0 .48z" />
                  </svg>
                  TikTok
                </a>
                <a
                  href="mailto:hello@unikhoj.com"
                  className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-indigo-600"
                >
                  <Mail className="h-4 w-4" />
                  hello@unikhoj.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} UniKhoj. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            Built with care in Kathmandu
          </p>
        </div>
      </div>
    </footer>
  );
}
