import { format, parseISO } from "date-fns"

import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Activity } from "@/components/contribution-graph"
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/contribution-graph"

export function GitHubContributions({
  contributions,
  githubProfileUrl,
  className,
}: {
  contributions: Activity[]
  githubProfileUrl: string
  className?: string
}) {
  return (
    <ContributionGraph
      className={cn("mx-auto py-2", className)}
      data={contributions}
      blockSize={11}
      blockMargin={3}
      blockRadius={2}
      labels={{
        months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        weekdays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        legend: { less: "Menos", more: "Más" },
      }}
    >
      <ContributionGraphCalendar
        className="no-scrollbar px-2"
        title="GitHub Contributions"
      >
        {({ activity, dayIndex, weekIndex }) => (
          <Tooltip>
            <TooltipTrigger asChild>
              <g>
                <ContributionGraphBlock
                  activity={activity}
                  dayIndex={dayIndex}
                  weekIndex={weekIndex}
                />
              </g>
            </TooltipTrigger>
            <TooltipContent className="font-sans">
              <p>
                {activity.count} {activity.count === 1 ? "contribución" : "contribuciones"}{" "}
                el {format(parseISO(activity.date), "dd.MM.yyyy")}
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      </ContributionGraphCalendar>

      <ContributionGraphFooter className="px-2">
        <ContributionGraphTotalCount>
          {({ totalCount, year }) => (
            <div className="text-muted-foreground">
              {totalCount.toLocaleString("es-PE")} contribuciones desde {year} en{" "}
              <a
                className="text-foreground underline decoration-current/30 underline-offset-4 transition-colors hover:decoration-current"
                href={githubProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </div>
          )}
        </ContributionGraphTotalCount>

        <ContributionGraphLegend />
      </ContributionGraphFooter>
    </ContributionGraph>
  )
}

export function GitHubContributionsFallback() {
  return (
    <div className="flex h-40 w-full items-center justify-center">
      <Spinner className="text-muted-foreground" />
    </div>
  )
}
