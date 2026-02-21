import { motion } from "framer-motion";
import { UserRoundPen, BrainCircuit, MessageCircle } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: UserRoundPen,
    title: "Tell us about yourself",
    description:
      "Share your GPA, test scores, budget, and dream country. It takes less than 2 minutes.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    ring: "ring-indigo-100",
  },
  {
    num: "02",
    icon: BrainCircuit,
    title: "We crunch the data",
    description:
      "Our system matches you with universities you actually qualify for — filtered by budget in NPR.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    ring: "ring-violet-100",
  },
  {
    num: "03",
    icon: MessageCircle,
    title: "Get your personalized list",
    description:
      "Join the waitlist and be among the first to receive your curated shortlist when we launch. Free.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    ring: "ring-emerald-100",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-slate-50 px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.04),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-600">
            How It Works
          </span>
          <h2 className="mx-auto mt-5 max-w-xl text-3xl font-bold text-slate-900 sm:text-4xl">
            Three steps. Two minutes.{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              Zero confusion.
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
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              {/* Connector line between cards */}
              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 z-10 hidden h-px w-6 bg-slate-300 sm:block" />
              )}

              {/* Step number badge */}
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${s.bg} ${s.color} ring-4 ${s.ring} text-sm font-bold transition-transform duration-300 group-hover:scale-110`}
                >
                  {s.num}
                </div>
              </div>

              {/* Icon */}
              <div
                className={`mt-6 flex h-14 w-14 items-center justify-center rounded-2xl ${s.bg} ${s.color} transition-transform duration-300 group-hover:scale-105`}
              >
                <s.icon className="h-7 w-7" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {s.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 text-center"
        >
          <a
            href="#form"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-300 active:scale-[0.98]"
          >
            Get Started — It's Free
          </a>
        </motion.div>
      </div>
    </section>
  );
}
