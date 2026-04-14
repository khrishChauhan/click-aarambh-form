"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [countdown, setCountdown] = useState(5);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setSubmittedName(data.name as string);

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

  useEffect(() => {
    if (isSuccess && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isSuccess && countdown === 0) {
      // Force use of the specific sandbox number to bypass old Vercel env variables
      const waNumber = "15556337541";
      console.log(`Redirecting to WhatsApp: ${waNumber}`);
      
      const message = `Hi, I just submitted the ClickRM form. My name is ${submittedName} and I'm interested in your services.`;
      const encodedMessage = encodeURIComponent(message);
      window.location.href = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodedMessage}`;
    }
  }, [isSuccess, countdown, submittedName]);

  if (isSuccess) {
    const waNumber = "15556337541";
    const message = `Hi, I just submitted the ClickRM form. My name is ${submittedName} and I'm interested in your services.`;
    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodedMessage}`;

    return (
      <div className="flex-1 flex items-center justify-center p-4 min-h-screen relative z-10 w-full overflow-hidden">
        <div className="w-full max-w-[550px] p-10 rounded-2xl bg-[#0b2e2b]/80 backdrop-blur-md border border-white/5 shadow-2xl text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#82C21C]/20 flex items-center justify-center mb-4 border border-[#82C21C]/30 relative overflow-hidden">
             
             {/* Simple visual indicator for WhatsApp */}
            <svg className="w-8 h-8 text-[#82C21C] relative z-10 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
               <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 1.966.527 3.818 1.455 5.419l-1.454 4.58 4.792-1.258c1.545.86 3.327 1.259 5.206 1.259 5.519 0 9.997-4.477 9.997-9.999 0-5.522-4.478-9.999-9.997-9.999zm.006 17.5c-1.634 0-3.21-.439-4.597-1.261l-.33-.195-2.83.743.86-2.761-.215-.342c-.9-1.433-1.376-3.085-1.376-4.835 0-4.704 3.826-8.528 8.536-8.528 4.71 0 8.532 3.824 8.532 8.528 0 4.705-3.822 8.528-8.532 8.528h-.048z"/>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Thank you!</h2>
          <p className="text-emerald-100/90 text-lg leading-relaxed">
            We are redirecting you to WhatsApp to continue the conversation.
          </p>
          
          <div className="py-6 flex flex-col items-center justify-center">
            <span className="text-5xl font-mono text-[#82C21C] font-extrabold tabular-nums transition-all">
              {countdown}
            </span>
            <span className="text-emerald-100/50 text-sm mt-2 uppercase tracking-widest font-semibold">seconds remaining</span>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <a 
              href={waLink} 
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#82C21C] hover:bg-[#96d62d] text-[#082220] rounded-xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(130,194,28,0.2)] hover:shadow-[0_0_25px_rgba(130,194,28,0.4)]"
            >
              CLICK HERE IF NOT REDIRECTED
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center py-12 sm:py-20 px-4">
      {/* Hero Section */}
      <div className="w-full max-w-3xl text-center mb-12 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5">
          <span className="text-white">Don&apos;t Be Afraid Man ! </span>
          <span className="text-[#82C21C]">
            Say <span className="animate-soft-pulse">Hello</span>
          </span>
        </h1>
        <p className="text-[#9BA7A3] text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
          Our Customer Care team are available for support Monday – Saturday from 9am to 7pm GMT.
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-[550px] p-8 sm:p-10 rounded-2xl bg-[#0b2e2b]/80 backdrop-blur-md border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-medium text-white mb-2 tracking-tight">Let&apos;s work together</h2>
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
