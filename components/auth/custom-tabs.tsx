type TabValue = "signin" | "signup";

interface CustomTabsProps {
  activeTab: TabValue;
  onTabChange: (value: TabValue) => void;
}

export function CustomTabs({ activeTab, onTabChange }: CustomTabsProps) {
  return (
    <div className="relative w-full p-1 bg-neutral-900/60 dark:bg-zinc-900/80 border border-white/4 rounded-xl flex items-center">
      
      {/* Dynamic Animated Capsule Background */}
      <div
        className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-zinc-800 dark:bg-zinc-800/80 rounded-lg shadow-md transition-transform duration-300 ease-out border border-white/4 ${
          activeTab === "signup" ? "translate-x-full" : "translate-x-0"
        }`}
      />

      {/* Sign In Button */}
      <button
        type="button"
        onClick={() => onTabChange("signin")}
        className={`relative z-10 flex-1 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors duration-200 focus:outline-none ${
          activeTab === "signin"
            ? "text-white"
            : "text-neutral-400 hover:text-neutral-200"
        }`}
      >
        Sign In
      </button>

      {/* Sign Up Button */}
      <button
        type="button"
        onClick={() => onTabChange("signup")}
        className={`relative z-10 flex-1 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors duration-200 focus:outline-none ${
          activeTab === "signup"
            ? "text-white"
            : "text-neutral-400 hover:text-neutral-200"
        }`}
      >
        Sign Up
      </button>
    </div>
  );
}