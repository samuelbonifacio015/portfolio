
import { cn } from '@/lib/utils';

interface TechBadgeProps {
  name: string;
  className?: string;
}

const colorMap: Record<string, string> = {
  "React": "bg-blue-500/10 text-blue-400 border-blue-500/70",
  "Angular": "bg-red-500/10 text-red-400 border-red-500/30",
  "Vue": "bg-green-500/10 text-green-400 border-green-500/30",
  "Next.js": "bg-black/20 text-white/90 border-white/20",
  "TypeScript": "bg-blue-700/10 text-blue-400 border-blue-700/70",
  "JavaScript": "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
  "Node.js": "bg-green-500/10 text-green-400 border-green-500/30",
  "Express": "bg-gray-500/10 text-gray-300 border-gray-500/30",
  "MongoDB": "bg-green-600/10 text-green-400 border-green-600/30",
  "SQL": "bg-blue-400/10 text-blue-300 border-blue-400/30",
  "Tailwind": "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  "CSS": "bg-blue-600/10 text-blue-400 border-blue-600/55",
  "HTML": "bg-orange-500/10 text-orange-400 border-orange-500/30",
  "Git": "bg-orange-700/10 text-orange-400 border-orange-700/30",
  "Docker": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "AWS": "bg-orange-500/10 text-orange-400 border-orange-500/30",
  "Firebase": "bg-yellow-600/10 text-yellow-400 border-yellow-600/30",
  "GraphQL": "bg-pink-600/10 text-pink-400 border-pink-600/30",
  "Figma": "bg-purple-600/10 text-purple-400 border-purple-600/60",
  "Python" : "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
  "C++" : "bg-blue-500/10 text-blue-400 border-blue-500/70"
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
