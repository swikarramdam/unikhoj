import { motion } from "framer-motion";
import { AlertTriangle, ShieldOff, HelpCircle } from "lucide-react";

const problems = [
  {
    icon: HelpCircle,
    title: "1,500+ universities.",
    subtitle: "Zero clarity.",
    description:
      "Scattered information across thousands of websites. No single place gives you the full picture tailored to Nepal.",
    gradient: "from-blue-500/10 to-indigo-500/10",
    iconBg: "bg-blue-100 text-blue-600",
    border: "hover:border-blue-200",
  },
  {
    icon: ShieldOff,
    title: "Biased recommendations.",
    subtitle: "Hidden commissions.",
    description:
      "Consultancies push universities that pay them the most, not the ones that fit you best.",
    gradient: "from-amber-500/10 to-orange-500/10",
    iconBg: "bg-amber-100 text-amber-600",
    border: "hover:border-amber-200",
  },
  {
    icon: AlertTriangle,
    title: "Your future.",
    subtitle: "Left to guesswork.",
    description:
      "You deserve data-driven decisions about the biggest investment of your life — not someone else's sales pitch.",
    gradient: "from-rose-500/10 to-red-500/10",
    iconBg: "bg-rose-100 text-rose-600",
    border: "hover:border-rose-200",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Problem() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600">
            <AlertTriangle className="h-3.5 w-3.5" />
            The Problem
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold text-slate-900 sm:text-4xl">
            The study-abroad process is{" "}
            <span className="relative">
              broken
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 120 8"
                fill="none"
              >
                <path
                  d="M2 6C30 2 90 2 118 6"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-6 sm:grid-cols-3"
        >
          {problems.map((p) => (
            <motion.div
              key={p.title}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg ${p.border}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="relative">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${p.iconBg} transition-transform duration-300 group-hover:scale-110`}
                >
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  {p.title}{" "}
                  <span className="text-slate-400">{p.subtitle}</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
