"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      const waNumber = "15556337541";
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
      <div className="flex-1 flex items-center justify-center p-6 h-screen relative z-10 w-full overflow-hidden bg-[#001715]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#82C21C]/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#82C21C]/10 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[500px] p-12 rounded-[32px] bg-[#051F1D]/80 backdrop-blur-2xl shadow-2xl text-center space-y-8 relative z-10"
        >
          <div className="mx-auto w-20 h-20 rounded-2xl bg-[#82C21C]/10 flex items-center justify-center mb-6 relative overflow-hidden">
            <div className="w-3 h-3 rounded-full bg-[#82C21C] animate-ping opacity-75" />
            <div className="absolute inset-0 rounded-2xl" />
          </div>

          <div className="space-y-3">
            <h2 className="text-4xl font-bold text-[#CDE8E4] tracking-tight">Precision Received</h2>
            <p className="text-[#C2CAB1] text-lg leading-relaxed">
              Redirecting to WhatsApp to finalize your request.
            </p>
          </div>

          <div className="py-8 flex flex-col items-center justify-center">
            <span className="text-7xl font-mono text-[#9CDF3B] font-black tabular-nums">
              {countdown}
            </span>
            <span className="text-[#C2CAB1] text-xs mt-4 uppercase tracking-[0.3em] font-semibold">Initiating Sync</span>
          </div>

          <div className="pt-8">
            <a
              href={waLink}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#82C21C] hover:brightness-110 text-[#112000] rounded-2xl font-bold text-sm transition-all shadow-[0_15px_35px_-10px_rgba(130,194,28,0.4)] hover:-translate-y-1 active:translate-y-0"
            >
              CLICK TO SYNC NOW
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#001715] overflow-hidden text-[#CDE8E4]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-[#9CDF3B]/5 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-[#9CDF3B]/3 rounded-full blur-[100px]"></div>
      </div>

      <header className="fixed top-0 w-full flex justify-between items-center px-8 h-20 bg-gradient-to-b from-[#001715] to-transparent z-50">
        <div className="flex items-center gap-4">
          {/* Logo and Menu Removed per request */}
        </div>
      </header>

      <main className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-6 h-full pt-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex flex-col gap-6 w-1/3"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[#9CDF3B] font-semibold tracking-widest text-[10px] uppercase">Concierge Access</span>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-none text-[#CDE8E4]">Submerged <br /> Precision</h1>
          </div>
          <p className="text-[#C2CAB1] text-sm leading-relaxed max-w-xs">
            Enter our private ecosystem. A bespoke interface designed for those who value quiet sophistication and intentional data management.
          </p>
          
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#152e2c] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#9CDF3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <span className="text-xs font-medium text-[#C2CAB1]">End-to-End Encryption</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#152e2c] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#9CDF3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
              </div>
              <span className="text-xs font-medium text-[#C2CAB1]">AI-Driven Insights</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md glass-panel rounded-[24px] p-8 lg:p-10 relative flex-1 max-h-[85vh] flex flex-col justify-center"
        >
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-semibold text-[#CDE8E4] tracking-tight">Initiate Inquiry</h2>
              <p className="text-xs text-[#C2CAB1] opacity-70">Please provide your credentials below.</p>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-xs text-center border border-red-500/20">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1 input-focus-line group">
                <label htmlFor="name" className="text-[10px] font-semibold uppercase tracking-widest text-[#C2CAB1] transition-colors group-focus-within:text-[#9CDF3B] ml-1">Full Name</label>
                <input required type="text" id="name" name="name" placeholder="ALEXANDER VANCE" className="bg-[#152e2c]/40 border-none outline-none focus:ring-0 text-sm py-3 px-4 rounded-lg placeholder:text-[#C2CAB1]/30 text-[#CDE8E4] w-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 input-focus-line group">
                  <label htmlFor="email" className="text-[10px] font-semibold uppercase tracking-widest text-[#C2CAB1] transition-colors group-focus-within:text-[#9CDF3B] ml-1">Email Address</label>
                  <input required type="email" id="email" name="email" placeholder="vance@emerald.io" className="bg-[#152e2c]/40 border-none outline-none focus:ring-0 text-sm py-3 px-4 rounded-lg placeholder:text-[#C2CAB1]/30 text-[#CDE8E4] w-full" />
                </div>
                <div className="flex flex-col gap-1 input-focus-line group">
                  <label htmlFor="phone" className="text-[10px] font-semibold uppercase tracking-widest text-[#C2CAB1] transition-colors group-focus-within:text-[#9CDF3B] ml-1">Phone</label>
                  <input required type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" className="bg-[#152e2c]/40 border-none outline-none focus:ring-0 text-sm py-3 px-4 rounded-lg placeholder:text-[#C2CAB1]/30 text-[#CDE8E4] w-full" />
                </div>
              </div>

              <div className="flex flex-col gap-1 input-focus-line group">
                <label htmlFor="service" className="text-[10px] font-semibold uppercase tracking-widest text-[#C2CAB1] transition-colors group-focus-within:text-[#9CDF3B] ml-1">Service Selection</label>
                <select required id="service" name="service" defaultValue="" className="bg-[#152e2c]/40 border-none outline-none focus:ring-0 text-sm py-3 px-4 rounded-lg text-[#CDE8E4] w-full appearance-none cursor-pointer">
                  <option value="" disabled className="bg-[#051F1D]">Choose a service...</option>
                  <option value="wealth" className="bg-[#051F1D]">Wealth Management Architecture</option>
                  <option value="private" className="bg-[#051F1D]">Private Asset Intelligence</option>
                  <option value="enterprise" className="bg-[#051F1D]">Enterprise Logistics Node</option>
                  <option value="other" className="bg-[#051F1D]">Other Inquiry</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 input-focus-line group">
                <label htmlFor="message" className="text-[10px] font-semibold uppercase tracking-widest text-[#C2CAB1] transition-colors group-focus-within:text-[#9CDF3B] ml-1">Message</label>
                <textarea required id="message" name="message" placeholder="Define your objective..." rows={2} className="bg-[#152e2c]/40 border-none outline-none focus:ring-0 text-sm py-3 px-4 rounded-lg placeholder:text-[#C2CAB1]/30 text-[#CDE8E4] w-full resize-none" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 bg-[#82C21C] text-[#112000] font-bold py-4 rounded-lg text-sm tracking-widest uppercase shadow-[0_0_20px_-5px_rgba(130,194,28,0.3)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-[#112000]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    SYNCING...
                  </span>
                ) : (
                  <>
                    Initiate Contact
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </main>

      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
        body, html {
          overflow: hidden;
          height: 100%;
          background-color: #001715;
        }
        .glass-panel {
          background: rgba(10, 36, 33, 0.6);
          backdrop-filter: blur(24px);
        }
        .input-focus-line {
          position: relative;
        }
        .input-focus-line::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 1px;
          background: #9cdf3b;
          transition: width 0.4s ease, left 0.4s ease;
        }
        .input-focus-line:focus-within::after {
          width: 100%;
          left: 0;
        }
      `}</style>
    </div>
  );
}

