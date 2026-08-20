"use client";

import { FormEvent, useEffect, useState, type InputHTMLAttributes } from "react";
import { GlassCard } from "@/components/GlassCard";

const PROPERTY_TYPES = [
  "Residential",
  "Commercial office",
  "Retail",
  "Industrial",
  "Hospitality",
  "Mixed use",
  "Other",
] as const;

type Fields = {
  name: string;
  email: string;
  propertyType: string;
  squareFootage: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = {
  name: "",
  email: "",
  propertyType: "",
  squareFootage: "",
  message: "",
};

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("spectacly-sqft");
      if (stored) {
        setFields((prev) =>
          prev.squareFootage ? prev : { ...prev, squareFootage: stored }
        );
      }
    } catch {
      /* ignore */
    }
  }, []);

  const set =
    (key: keyof Fields) =>
    (value: string) => {
      setFields((prev) => ({ ...prev, [key]: value }));
      if (touched[key]) {
        setErrors((prev) => ({ ...prev, [key]: validateField(key, value) }));
      }
    };

  const blur = (key: keyof Fields) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validateField(key, fields[key]) }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next: Errors = {
      name: validateField("name", fields.name),
      email: validateField("email", fields.email),
      propertyType: validateField("propertyType", fields.propertyType),
      squareFootage: validateField("squareFootage", fields.squareFootage),
      message: validateField("message", fields.message),
    };
    setTouched({
      name: true,
      email: true,
      propertyType: true,
      squareFootage: true,
      message: true,
    });
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <GlassCard hover={false} className="p-8 sm:p-10">
        <p className="eyebrow">Received</p>
        <h3 className="mt-3 text-[28px] font-semibold tracking-[-0.03em] text-text">
          Quote request sent.
        </h3>
        <p className="mt-3 max-w-md text-[17px] leading-[1.7] text-[var(--text-dim)]">
          Thanks, {fields.name.trim()}. We will follow up at {fields.email.trim()} with
          a firm number for this space.
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard hover={false} className="p-6 sm:p-8 md:p-10">
      <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          value={fields.name}
          error={touched.name ? errors.name : undefined}
          onChange={set("name")}
          onBlur={() => blur("name")}
          autoComplete="name"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          value={fields.email}
          error={touched.email ? errors.email : undefined}
          onChange={set("email")}
          onBlur={() => blur("email")}
          autoComplete="email"
        />
        <div>
          <label htmlFor="propertyType" className="mb-2 block text-[13px] text-[var(--text-dim)]">
            Property type
          </label>
          <select
            id="propertyType"
            className="field appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 fill=%22none%22%3E%3Cpath d=%22M1 1.5 6 6.5 11 1.5%22 stroke=%22%23F4F4F5%22 stroke-opacity=%22.5%22 stroke-width=%221.4%22 stroke-linecap=%22round%22/%3E%3C/svg%3E')] bg-[length:12px_8px] bg-[right_16px_center] bg-no-repeat pr-10"
            value={fields.propertyType}
            aria-invalid={touched.propertyType && Boolean(errors.propertyType)}
            onChange={(e) => set("propertyType")(e.target.value)}
            onBlur={() => blur("propertyType")}
          >
            <option value="">Select property type</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type} className="bg-[#111114] text-text">
                {type}
              </option>
            ))}
          </select>
          {touched.propertyType && errors.propertyType ? (
            <p className="mt-1.5 text-[13px] text-red-300">{errors.propertyType}</p>
          ) : null}
        </div>
        <Field
          id="squareFootage"
          label="Approximate square footage"
          inputMode="numeric"
          value={fields.squareFootage}
          error={touched.squareFootage ? errors.squareFootage : undefined}
          onChange={set("squareFootage")}
          onBlur={() => blur("squareFootage")}
        />
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-2 block text-[13px] text-[var(--text-dim)]">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            className="field min-h-[140px] resize-y"
            placeholder="Access notes, timing, or anything that affects capture."
            value={fields.message}
            aria-invalid={touched.message && Boolean(errors.message)}
            onChange={(e) => set("message")(e.target.value)}
            onBlur={() => blur("message")}
          />
          {touched.message && errors.message ? (
            <p className="mt-1.5 text-[13px] text-red-300">{errors.message}</p>
          ) : null}
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="cta-gradient w-full rounded-[20px] py-3.5 text-[15px] font-semibold sm:w-auto sm:px-8"
          >
            Request a quote
          </button>
        </div>
      </form>
    </GlassCard>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  onBlur,
  type = "text",
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  type?: string;
  autoComplete?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[13px] text-[var(--text-dim)]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="field"
        value={value}
        aria-invalid={Boolean(error)}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
      {error ? <p className="mt-1.5 text-[13px] text-red-300">{error}</p> : null}
    </div>
  );
}

function validateField(key: keyof Fields, value: string): string | undefined {
  const trimmed = value.trim();
  if (key === "name") {
    if (!trimmed) return "Enter your name.";
    if (trimmed.length < 2) return "Name needs at least two characters.";
  }
  if (key === "email") {
    if (!trimmed) return "Enter your email.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Enter a valid email.";
  }
  if (key === "propertyType") {
    if (!trimmed) return "Select a property type.";
  }
  if (key === "squareFootage") {
    if (!trimmed) return "Enter approximate square footage.";
    const n = Number(trimmed.replace(/,/g, ""));
    if (!Number.isFinite(n) || n <= 0) return "Enter a positive number.";
    if (n > 1_000_000) return "Check the square footage and try again.";
  }
  if (key === "message" && trimmed.length > 2000) {
    return "Keep the message under 2,000 characters.";
  }
  return undefined;
}
