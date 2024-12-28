import { useTheme } from "@/contexts/ThemeProvider";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
      />
      <Moon className="h-4 w-4" />
    </div>
  );
};

export default ThemeToggle;
