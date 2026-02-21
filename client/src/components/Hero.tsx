import { motion } from "framer-motion";
import { ArrowDown, GraduationCap, Globe, TrendingUp } from "lucide-react";

const floatingBadges = [
  { label: "USA", flag: "🇺🇸", x: "8%", y: "22%", delay: 0.6, drift: 3.2 },
  { label: "Australia", flag: "🇦🇺", x: "82%", y: "18%", delay: 0.9, drift: 4.1 },
  { label: "UK", flag: "🇬🇧", x: "5%", y: "65%", delay: 1.2, drift: 3.7 },
  { label: "Canada", flag: "🇨🇦", x: "88%", y: "60%", delay: 0.75, drift: 4.5 },
];

const trustStats = [
  { icon: GraduationCap, value: "200+", label: "Universities" },
  { icon: Globe, value: "7+", label: "Countries" },
  { icon: TrendingUp, value: "Free", label: "Always" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-amber-50" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.06),transparent_60%)]" />

      {/* Dot grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #94a3b8 0.8px, transparent 0.8px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Floating country badges */}
      {floatingBadges.map((b) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: b.delay, duration: 0.5, ease: "easeOut" }}
          className="pointer-events-none absolute z-10 hidden sm:block"
          style={{ left: b.x, top: b.y }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: b.drift,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="rounded-full border border-white/60 bg-white/80 px-4 py-2 shadow-lg shadow-slate-200/50 backdrop-blur-sm"
          >
            <span className="mr-1.5 text-base">{b.flag}</span>
            <span className="text-xs font-semibold text-slate-700">
              {b.label}
            </span>
          </motion.div>
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 max-w-3xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-4 py-1.5 text-xs font-semibold text-indigo-600 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
          </span>
          Nepal's first data-driven college finder
        </motion.div>

        <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
          Stop guessing.
          <br />
          <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
            Start finding.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-500 sm:text-xl">
          The smartest way for Nepali students to find universities they can
          actually afford and get into — in 2 minutes.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#form"
            className="group inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-300 active:scale-[0.98]"
          >
            Find My University
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <span className="text-sm text-slate-400">
            100% free &middot; No login required
          </span>
        </div>
      </motion.div>

      {/* Trust bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="relative z-10 mt-20 flex items-center gap-8 rounded-2xl border border-slate-200/80 bg-white/70 px-8 py-4 shadow-sm backdrop-blur-md sm:gap-12"
      >
        {trustStats.map((s, i) => (
          <div key={s.label} className="flex items-center gap-3">
            {i > 0 && (
              <div className="mr-3 hidden h-8 w-px bg-slate-200 sm:block" />
            )}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
