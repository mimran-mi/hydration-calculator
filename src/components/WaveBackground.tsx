import { motion } from "framer-motion";

export function WaveBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-10 pointer-events-none">
        <svg
          className="absolute w-[200%] h-[200%] left-[-50%] top-[-50%] animate-[spin_60s_linear_infinite]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" style={{ stopColor: "var(--primary)", stopOpacity: 0.2 }} />
              <stop offset="100%" style={{ stopColor: "transparent", stopOpacity: 0 }} />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill="url(#grad1)" />
        </svg>
      </div>

      {/* Decorative blobs */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl dark:bg-cyan-900/20"
      />
      
      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-3xl dark:bg-blue-900/20"
      />
    </div>
  );
}
