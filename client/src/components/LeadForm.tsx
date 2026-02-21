import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  ArrowLeft,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

interface FormData {
  degree: string;
  country: string;
  budget: string;
  gpa: string;
  testType: string;
  testScore: string;
  fullName: string;
  phone: string;
  email: string;
}

const countries = [
  { name: "USA", flag: "🇺🇸" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "UK", flag: "🇬🇧" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "Other", flag: "🌍" },
];

const budgetOptions = [
  { label: "Under 15 Lakhs", value: "Under 15L" },
  { label: "15 – 25 Lakhs", value: "15-25L" },
  { label: "25 – 40 Lakhs", value: "25-40L" },
  { label: "40 Lakhs +", value: "40L+" },
];

const TOTAL_STEPS = 3;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function LeadForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      degree: "",
      country: "",
      budget: "",
      gpa: "",
      testType: "",
      testScore: "",
      fullName: "",
      phone: "",
      email: "",
    },
  });

  const degree = watch("degree");
  const country = watch("country");
  const budget = watch("budget");
  const testType = watch("testType");

  const clearFieldError = (field: string) => {
    setStepErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const setFieldValue = (
    field: keyof FormData,
    value: string,
    alsoClears?: string,
  ) => {
    setValue(field, value, { shouldValidate: false });
    clearFieldError(field);
    if (alsoClears) clearFieldError(alsoClears);
    if (step === 3) setServerError("");
  };

  const validateStep = (s: number): boolean => {
    const errs: Record<string, string> = {};
    const v = getValues();

    if (s === 1) {
      if (!v.degree) errs.degree = "Please select a degree level";
      if (!v.country) errs.country = "Please select a country";
      if (!v.budget) errs.budget = "Please select your budget range";
    } else if (s === 2) {
      if (!v.gpa || !v.gpa.trim()) errs.gpa = "Please enter your GPA or percentage";
      if (!v.testType) errs.testType = "Please select a test";
      if (v.testType && v.testType !== "none" && (!v.testScore || !v.testScore.trim())) {
        errs.testScore = "Please enter your score";
      }
    } else if (s === 3) {
      if (!v.fullName || !v.fullName.trim()) errs.fullName = "Please enter your name";
      if (!v.phone || !v.phone.trim()) {
        errs.phone = "Please enter your phone number";
      } else if (!/^[0-9]{10}$/.test(v.phone.trim())) {
        errs.phone = "Enter a valid 10-digit number";
      }
      if (v.email && v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) {
        errs.email = "Enter a valid email address";
      }
    }

    setStepErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const goBack = () => {
    setStepErrors({});
    setServerError("");
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const onSubmit = async (data: FormData) => {
    if (!validateStep(3)) return;
    setServerError("");
    try {
      const API_URL = import.meta.env.PROD
        ? "https://unikhoj.onrender.com/api/leads"
        : "/api/leads";
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Something went wrong. Please try again.");
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Submission failed.");
    }
  };

  if (submitted) {
    return (
      <section id="form" className="bg-slate-50 px-6 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-md text-center"
        >
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
          <h3 className="mt-6 text-2xl font-bold text-slate-900">
            You're on the list!
          </h3>
          <p className="mt-3 text-base text-slate-500">
            We've added you to the UniKhoj waitlist. You'll be among the first
            to get your personalized university matches when we launch.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Keep an eye on your inbox — we'll reach out soon.
          </p>
        </motion.div>
      </section>
    );
  }

  const PillButton = ({
    selected,
    onClick,
    children,
    className = "",
  }: {
    selected: boolean;
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border-2 px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
        selected
          ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
      } ${className}`}
    >
      {children}
    </button>
  );

  const CountryCard = ({
    name,
    flag,
    selected,
    onClick,
  }: {
    name: string;
    flag: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl border-2 px-5 py-3.5 text-sm font-medium transition-all duration-200 ${
        selected
          ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <span className="text-xl">{flag}</span>
      <span>{name}</span>
    </button>
  );

  const FieldError = ({ message }: { message?: string }) =>
    message ? (
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-1.5 text-xs font-medium text-red-500"
      >
        {message}
      </motion.p>
    ) : null;

  return (
    <section id="form" className="bg-slate-50 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
            <GraduationCap className="h-7 w-7 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Join the Waitlist
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-slate-500">
            Tell us about yourself and be first in line to get personalized
            university matches when we launch.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mx-auto mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          {/* Card header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4 sm:px-8">
            <h3 className="text-lg font-semibold text-slate-800">
              College Finder
            </h3>
            <span className="text-sm font-semibold text-indigo-600">
              Step {step} of {TOTAL_STEPS}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-slate-100">
            <motion.div
              className="h-full bg-indigo-600"
              initial={false}
              animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative min-h-[380px] px-6 py-8 sm:px-8">
              <AnimatePresence mode="wait" custom={direction}>
                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-8"
                  >
                    {/* Degree */}
                    <div>
                      <label className="mb-3 block text-sm font-semibold text-slate-700">
                        What degree do you plan to study?
                        <span className="text-red-400">*</span>
                      </label>
                      <div className="flex flex-wrap gap-3">
                        <PillButton
                          selected={degree === "bachelors"}
                          onClick={() => setFieldValue("degree", "bachelors")}
                        >
                          Bachelor's
                        </PillButton>
                        <PillButton
                          selected={degree === "masters"}
                          onClick={() => setFieldValue("degree", "masters")}
                        >
                          Master's
                        </PillButton>
                      </div>
                      <FieldError message={stepErrors.degree} />
                    </div>

                    {/* Country */}
                    <div>
                      <label className="mb-3 block text-sm font-semibold text-slate-700">
                        Where do you want to study?
                        <span className="text-red-400">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {countries.map((c) => (
                          <CountryCard
                            key={c.name}
                            name={c.name}
                            flag={c.flag}
                            selected={country === c.name}
                            onClick={() =>
                              setFieldValue("country", c.name)
                            }
                          />
                        ))}
                      </div>
                      <FieldError message={stepErrors.country} />
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="mb-3 block text-sm font-semibold text-slate-700">
                        What's your total budget?
                        <span className="ml-1 text-xs font-normal text-slate-400">
                          (in NPR)
                        </span>
                        <span className="text-red-400">*</span>
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {budgetOptions.map((b) => (
                          <PillButton
                            key={b.value}
                            selected={budget === b.value}
                            onClick={() =>
                              setFieldValue("budget", b.value)
                            }
                          >
                            {b.label}
                          </PillButton>
                        ))}
                      </div>
                      <FieldError message={stepErrors.budget} />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-8"
                  >
                    {/* GPA */}
                    <div>
                      <label className="mb-3 block text-sm font-semibold text-slate-700">
                        What is your GPA or percentage?
                        <span className="text-red-400">*</span>
                      </label>
                      <input
                        {...register("gpa", {
                          onChange: () => clearFieldError("gpa"),
                        })}
                        placeholder="e.g. 3.5 or 78%"
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:max-w-xs"
                      />
                      <FieldError message={stepErrors.gpa} />
                    </div>

                    {/* English Test */}
                    <div>
                      <label className="mb-3 block text-sm font-semibold text-slate-700">
                        Which English test did you take?
                        <span className="text-red-400">*</span>
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {(
                          [
                            { label: "IELTS", value: "ielts" },
                            { label: "PTE", value: "pte" },
                            { label: "TOEFL", value: "toefl" },
                            { label: "None", value: "none" },
                          ] as const
                        ).map((t) => (
                          <PillButton
                            key={t.value}
                            selected={testType === t.value}
                            onClick={() => {
                              setFieldValue("testType", t.value, "testScore");
                              if (t.value === "none") setValue("testScore", "");
                            }}
                          >
                            {t.label}
                          </PillButton>
                        ))}
                      </div>
                      <FieldError message={stepErrors.testType} />

                      <AnimatePresence>
                        {testType && testType !== "none" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4">
                              <label className="mb-1.5 block text-xs font-medium text-slate-500">
                                Overall score
                              </label>
                              <input
                                {...register("testScore", {
                                  onChange: () => clearFieldError("testScore"),
                                })}
                                placeholder={
                                  testType === "ielts"
                                    ? "e.g. 6.5"
                                    : testType === "pte"
                                      ? "e.g. 58"
                                      : "e.g. 95"
                                }
                                className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:max-w-xs"
                              />
                              <FieldError message={stepErrors.testScore} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-8"
                  >
                    <div>
                      <p className="text-sm text-slate-500">
                        Almost there! Join the waitlist and be first to get your
                        personalized university matches.
                      </p>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="mb-3 block text-sm font-semibold text-slate-700">
                        Full Name
                        <span className="text-red-400">*</span>
                      </label>
                      <input
                        {...register("fullName", {
                          onChange: () => {
                            clearFieldError("fullName");
                            setServerError("");
                          },
                        })}
                        placeholder="Ram Sharma"
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                      <FieldError message={stepErrors.fullName} />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-3 block text-sm font-semibold text-slate-700">
                        Phone Number
                        <span className="text-red-400">*</span>
                      </label>
                      <div className="flex items-stretch">
                        <span className="flex items-center rounded-l-xl border-2 border-r-0 border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-500">
                          +977
                        </span>
                        <input
                          {...register("phone", {
                            onChange: () => {
                              clearFieldError("phone");
                              setServerError("");
                            },
                          })}
                          placeholder="98XXXXXXXX"
                          className="w-full rounded-r-xl border-2 border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>
                      <FieldError message={stepErrors.phone} />
                    </div>

                    {/* Email (optional) */}
                    <div>
                      <label className="mb-3 block text-sm font-semibold text-slate-700">
                        Email Address
                        <span className="ml-1 text-xs font-normal text-slate-400">
                          (optional)
                        </span>
                      </label>
                      <input
                        {...register("email", {
                          onChange: () => {
                            clearFieldError("email");
                            setServerError("");
                          },
                        })}
                        type="email"
                        placeholder="ram@example.com"
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                      <FieldError message={stepErrors.email} />
                    </div>

                    {serverError && (
                      <p className="text-sm font-medium text-red-500">
                        {serverError}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-5 sm:px-8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-800"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-[0.98]"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-60"
                >
                  {isSubmitting && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  {isSubmitting ? "Joining…" : "Join the Waitlist"}
                </button>
              )}
            </div>
          </form>
        </motion.div>

        <p className="mt-4 text-center text-xs text-slate-400">
          No spam. We'll notify you as soon as UniKhoj launches.
        </p>
      </div>
    </section>
  );
}
