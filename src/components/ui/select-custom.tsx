import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface Option {
  value: string;
  label: string;
}

interface SelectCustomProps {
  options: readonly Option[] | Option[];
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SelectCustom({ options, placeholder, value, onChange, className }: SelectCustomProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn("w-full h-12 rounded-xl border-2 border-border/50 bg-white/50 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-200", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded-xl border-border/50 shadow-xl">
        {options.map((option) => (
          <SelectItem 
            key={option.value} 
            value={option.value}
            className="cursor-pointer py-3 px-4 focus:bg-secondary focus:text-secondary-foreground rounded-lg my-1"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
