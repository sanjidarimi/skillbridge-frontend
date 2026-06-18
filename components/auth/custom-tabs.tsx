type TabValue = "signin" | "signup";

interface CustomTabsProps {
  activeTab: TabValue;
  onTabChange: (value: TabValue) => void;
}

export function CustomTabs({ activeTab, onTabChange }: CustomTabsProps) {
  return (
    <div className="relative w-full p-1 bg-muted text-muted-foreground border border-border rounded-xl flex items-center">
      
      {/* Dynamic Animated Capsule Background */}
      <div
        className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-card rounded-lg shadow-sm transition-transform duration-300 ease-out border border-border ${
          activeTab === "signup" ? "translate-x-full" : "translate-x-0"
        }`}
      />

      {/* Sign In Button */}
      <button
        type="button"
        onClick={() => onTabChange("signin")}
        className={`relative z-10 cursor-pointer flex-1 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors duration-200 focus:outline-none ${
          activeTab === "signin"
            ? "text-foreground"
            : "hover:text-foreground"
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
            ? "text-foreground"
            : "hover:text-foreground"
        }`}
      >
        Sign Up
      </button>
    </div>
  );
}