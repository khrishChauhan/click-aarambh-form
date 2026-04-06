"use client";

import { useState } from "react";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setIsSuccess(true);
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-[550px] p-10 rounded-2xl bg-[#0b2e2b]/80 backdrop-blur-md border border-white/5 shadow-2xl text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#82C21C]/20 flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-[#82C21C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-medium text-white">Message Sent</h2>
          <p className="text-emerald-100/70">
            Thank you for reaching out. We&apos;ll get back to you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-[550px] p-8 sm:p-10 rounded-2xl bg-[#0b2e2b]/80 backdrop-blur-md border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-medium text-white mb-2 tracking-tight">Let&apos;s work together</h1>
          <p className="text-emerald-100/60 text-sm">Fill out the form below and we&apos;ll be in touch.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-medium text-emerald-50/90 ml-1">Full Name</label>
            <input
              required
              type="text"
              id="name"
              name="name"
              placeholder="Jane Doe"
              className="w-full px-4 py-3.5 rounded-xl bg-[#082220]/50 border border-white/10 text-white placeholder-emerald-100/30 focus:outline-none focus:border-[#82C21C] focus:ring-1 focus:ring-[#82C21C] transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-emerald-50/90 ml-1">Email Address</label>
            <input
              required
              type="email"
              id="email"
              name="email"
              placeholder="jane@example.com"
              className="w-full px-4 py-3.5 rounded-xl bg-[#082220]/50 border border-white/10 text-white placeholder-emerald-100/30 focus:outline-none focus:border-[#82C21C] focus:ring-1 focus:ring-[#82C21C] transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-sm font-medium text-emerald-50/90 ml-1">Phone Number</label>
            <input
              required
              type="tel"
              id="phone"
              name="phone"
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-3.5 rounded-xl bg-[#082220]/50 border border-white/10 text-white placeholder-emerald-100/30 focus:outline-none focus:border-[#82C21C] focus:ring-1 focus:ring-[#82C21C] transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="service" className="text-sm font-medium text-emerald-50/90 ml-1">Select Service</label>
            <div className="relative">
              <select
                required
                id="service"
                name="service"
                defaultValue=""
                className="w-full px-4 py-3.5 rounded-xl bg-[#082220]/50 border border-white/10 text-white appearance-none focus:outline-none focus:border-[#82C21C] focus:ring-1 focus:ring-[#82C21C] transition-all"
              >
                <option value="" disabled>Choose a service...</option>
                <option value="consulting">Consulting</option>
                <option value="development">Development</option>
                <option value="design">Design</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-100/50">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message" className="text-sm font-medium text-emerald-50/90 ml-1">Message</label>
            <textarea
              required
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us about your project..."
              className="w-full px-4 py-3.5 rounded-xl bg-[#082220]/50 border border-white/10 text-white placeholder-emerald-100/30 focus:outline-none focus:border-[#82C21C] focus:ring-1 focus:ring-[#82C21C] transition-all resize-none"
            />
          </div>

          <div className="flex items-start gap-3 py-2">
            <div className="flex items-center h-5">
              <input
                required
                id="consent"
                name="consent"
                type="checkbox"
                className="w-4 h-4 rounded border-white/20 bg-[#082220]/50 text-[#82C21C] focus:ring-[#82C21C] focus:ring-offset-0 focus:ring-1 accent-[#82C21C]"
              />
            </div>
            <label htmlFor="consent" className="text-sm text-emerald-100/60 leading-tight">
              I consent to storage of my data according to Privacy Policy
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 mt-2 rounded-xl bg-[#82C21C] hover:bg-[#96d62d] text-[#082220] font-semibold text-sm transition-all duration-200 hover:shadow-[0_0_20px_rgba(130,194,28,0.3)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#082220]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                SENDING...
              </>
            ) : (
              "SEND MESSAGE"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
