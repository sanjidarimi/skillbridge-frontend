import { mockCategories } from "@/data/mock.data";
import { BookOpen, DollarSign } from "lucide-react";

interface SidebarContentProps {
  selectedCategories: string[];
  handleCategoryChange: (id: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  priceSliderId: string;
}

export default function SidebarContent({
  selectedCategories,
  handleCategoryChange,
  maxPrice,
  setMaxPrice,
  priceSliderId,
}: SidebarContentProps) {
  return (
    <div className="space-y-6">

      <div>
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase mb-3 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" /> Categories
        </h3>
        <div className="space-y-2.5">
          {mockCategories.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-3 text-sm font-medium cursor-pointer select-none group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
                className="w-4 h-4 rounded border-input text-primary focus:ring-ring accent-[oklch(0.685_0.169_237.323)]"
              />
              <span className="text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-border" />

      {/* Pricing Range Filter Block */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3
            id={priceSliderId}
            className="text-sm font-semibold tracking-wide text-muted-foreground uppercase flex items-center gap-1.5"
          >
            <DollarSign className="w-3.5 h-3.5" /> Max Hourly Rate
          </h3>
          <span className="text-sm font-bold text-primary px-2 py-0.5 rounded bg-secondary border border-border">
            ${maxPrice}/hr
          </span>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            aria-labelledby={priceSliderId}
            min="10"
            max="50"
            step="5"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-[oklch(0.685_0.169_237.323)] focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex justify-between text-xs text-muted-foreground px-0.5">
            <span>$10</span>
            <span>$30</span>
            <span>$50</span>
          </div>
        </div>
      </div>
    </div>
  );
}
