import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Terminal as TerminalIcon } from 'lucide-react';

interface TerminalProps {
    className?: string;
}

const Terminal: React.FC<TerminalProps> = ({ className }) => {
    const [lines] = useState<string[]>([
        "samuel@admin:~$",
        "Loading user profile...",
        "Access granted.",
        "Welcome, visitor.",
        "Type 'help' to see available commands."
    ]);
    const containerRef = useRef<HTMLElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    return (
        <section
            ref={containerRef}
            className={cn(
                "w-full flex justify-center mt-12 px-4 transition-all duration-1000 ease-out transform",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                className
            )}
        >
            <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-border bg-black/95 backdrop-blur-md font-mono text-sm sm:text-base ring-1 ring-white/10">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10 select-none">
                    <div className="flex items-center gap-2">
                        <div className="flex space-x-2 group">
                            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-600 transition-colors shadow-sm shadow-red-500/20" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-600 transition-colors shadow-sm shadow-yellow-500/20" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-600 transition-colors shadow-sm shadow-green-500/20" />
                        </div>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted-foreground/60">
                        <TerminalIcon size={14} />
                        <span className="text-xs font-medium tracking-wide">bash — samuel@portfolio</span>
                    </div>

                    <div className="w-10" />
                </div>

                {/* Terminal Content */}
                <div
                    ref={scrollRef}
                    className="p-4 sm:p-6 space-y-2 h-[300px] sm:h-[400px] overflow-y-auto overflow-x-hidden bg-black/50 scroll-smooth [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20"
                >
                    <div className="text-green-400/90 leading-relaxed font-normal">
                        {isVisible && lines.map((line, i) => (
                            <div
                                key={i}
                                className="flex gap-2 animate-fade-in"
                                style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'backwards' }}
                            >
                                <span className="shrink-0 select-none opacity-50 text-blue-400">➜</span>
                                <span className="shrink-0 select-none opacity-50 text-purple-400">~</span>
                                <span className="break-all">{line}</span>
                            </div>
                        ))}

                        {isVisible && (
                            <div className="flex items-center gap-2 mt-2 animate-fade-in" style={{ animationDelay: `${lines.length * 150}ms`, animationFillMode: 'backwards' }}>
                                <span className="shrink-0 text-blue-400">➜</span>
                                <span className="shrink-0 text-purple-400">~</span>
                                <div className="relative flex items-center">
                                    <span className="w-2.5 h-5 bg-green-500/90 animate-pulse rounded-sm shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Terminal;
