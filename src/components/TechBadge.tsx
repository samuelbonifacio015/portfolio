
import { cn } from '@/lib/utils';

interface TechBadgeProps {
  name: string;
  className?: string;
}

const colorMap: Record<string, string> = {
  "React": "bg-blue-500 text-blue-950 border-blue-500 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30",
  "Angular": "bg-red-500 text-red-950 border-red-500 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/30",
  "Vue": "bg-green-500 text-green-950 border-green-500 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/30",
  "Next.js": "bg-slate-800 text-white border-slate-800 dark:bg-black/20 dark:text-white/90 dark:border-white/20",
  "TypeScript": "bg-blue-700 text-blue-50 border-blue-700 dark:bg-blue-700/10 dark:text-blue-400 dark:border-blue-700/30",
  "JavaScript": "bg-yellow-500 text-yellow-950 border-yellow-500 dark:bg-yellow-500/10 dark:text-yellow-300 dark:border-yellow-500/30",
  "MongoDB": "bg-green-600 text-green-50 border-green-600 dark:bg-green-600/10 dark:text-green-400 dark:border-green-600/30",
  "SQL": "bg-blue-400 text-blue-950 border-blue-400 dark:bg-blue-400/10 dark:text-blue-300 dark:border-blue-400/30",
  "Tailwind": "bg-cyan-500 text-cyan-950 border-cyan-500 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/30",
  "CSS": "bg-blue-600 text-blue-50 border-blue-600 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30",
  "HTML": "bg-orange-500 text-orange-950 border-orange-500 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/30",
  "Git": "bg-orange-700 text-orange-50 border-orange-700 dark:bg-orange-700/10 dark:text-orange-400 dark:border-orange-700/30",
  "Docker": "bg-blue-500 text-blue-950 border-blue-500 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30",
  "AWS": "bg-orange-500 text-orange-950 border-orange-500 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/30",
  "Firebase": "bg-yellow-600 text-yellow-50 border-yellow-600 dark:bg-yellow-600/10 dark:text-yellow-400 dark:border-yellow-600/30",
  "Figma": "bg-purple-600 text-purple-50 border-purple-600 dark:bg-purple-600/10 dark:text-purple-400 dark:border-purple-600/30",
  "Python" : "bg-yellow-500 text-yellow-950 border-yellow-500 dark:bg-yellow-500/10 dark:text-yellow-300 dark:border-yellow-500/30",
  "C++" : "bg-blue-500 text-blue-950 border-blue-500 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30",
  "C#" : "bg-purple-500 text-purple-950 border-purple-500 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/30",
  "Java" : "bg-orange-500 text-orange-950 border-orange-500 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/30",
  "Spring Boot" : "bg-green-500 text-green-950 border-green-500 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/30",
  ".NET" : "bg-purple-500 text-purple-950 border-purple-500 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/30",
  "Postman": "bg-orange-500 text-orange-950 border-orange-500 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/30",
  "Cursor": "bg-indigo-500 text-indigo-950 border-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/30",
  "TestSprite MCP": "bg-teal-500 text-teal-950 border-teal-500 dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/30",
  "Claude Code": "bg-gray-700 text-gray-50 border-gray-700 dark:bg-gray-700/10 dark:text-gray-400 dark:border-gray-200/60",
};

const TechBadge = ({ name, className }: TechBadgeProps) => {
  const colorClass = colorMap[name] || "bg-gray-700/30 text-gray-300 border-gray-600";

  return (
    <span 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        colorClass,
        className
      )}
    >
      {name}
    </span>
  );
};

export default TechBadge;
