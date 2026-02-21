import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Sparkles,
  School,
  Globe,
  Banknote,
  CheckCircle2,
} from "lucide-react";

const stats = [
  {
    icon: School,
    value: 200,
    suffix: "+",
    label: "Curated Universities",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Globe,
    value: 7,
    suffix: "+",
    label: "Countries Covered",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Banknote,
    value: 0,
    suffix: "NPR",
    label: "Budget in Lakhs",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const features = [
  "Real tuition costs converted to NPR",
  "Actual entry requirements — no guessing",
  "Current visa acceptance trends",
  "Personalized to your GPA, scores & budget",
];

function AnimatedNumber({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (target === 0) return;

    let start = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, inView]);

  if (target === 0) return <span>{suffix}</span>;
  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Solution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-indigo-50/40 to-white" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-600">
            <Sparkles className="h-3.5 w-3.5" />
            Our Solution
          </div>

          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            UniKhoj matches you to universities based on{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              your budget, your grades, and your goals.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
            Not someone else's commission. We use real data to give you a
            shortlist that actually makes sense for you.
          </p>
        </motion.div>

        <div
          ref={ref}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${s.bg} ${s.color} transition-transform duration-300 group-hover:scale-110`}
              >
                <s.icon className="h-6 w-6" />
              </div>
              <p className={`mt-5 text-4xl font-extrabold ${s.color}`}>
                <AnimatedNumber
                  target={s.value}
                  suffix={s.suffix}
                  inView={inView}
                />
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mt-12 max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            What makes us different
          </h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                <span className="text-sm text-slate-600">{f}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
