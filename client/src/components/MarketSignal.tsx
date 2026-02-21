import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Users, Target } from "lucide-react";

function AnimatedCounter({
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
    let start = 0;
    const duration = 2000;
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

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  {
    icon: Users,
    value: 100000,
    suffix: "+",
    label: "Nepali students go abroad every year",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Target,
    value: 80,
    suffix: "%",
    label: "end up at universities they didn't research",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

export default function MarketSignal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_60%)]" />

      <div ref={ref} className="relative mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-sm">
            <TrendingUp className="h-3.5 w-3.5" />
            The Numbers
          </div>

          <div className="flex flex-col items-center gap-16 sm:flex-row sm:justify-center sm:gap-24">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${s.bg} ${s.color}`}
                >
                  <s.icon className="h-7 w-7" />
                </div>
                <p className="text-5xl font-extrabold text-white sm:text-6xl">
                  <AnimatedCounter
                    target={s.value}
                    suffix={s.suffix}
                    inView={inView}
                  />
                </p>
                <p className="mt-3 max-w-[16rem] text-base text-slate-400">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-20"
          >
            <h3 className="text-3xl font-bold text-white sm:text-4xl">
              We're{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                changing
              </span>{" "}
              that.
            </h3>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-400">
              UniKhoj is building Nepal's first student-first university
              discovery platform — powered by data, not commissions.
            </p>
            <a
              href="#form"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-lg transition-all hover:bg-slate-100 hover:shadow-xl active:scale-[0.98]"
            >
              Start Your Search
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
