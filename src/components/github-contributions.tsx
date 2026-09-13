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
import { useI18n } from '@/lib/i18n'

export function GitHubContributions({
  contributions,
  githubProfileUrl,
  className,
}: {
  contributions: Activity[]
  githubProfileUrl: string
  className?: string
}) {
  const { language, t } = useI18n()
  return (
    <ContributionGraph
      className={cn("mx-auto py-2", className)}
      data={contributions}
      blockSize={11}
      blockMargin={3}
      blockRadius={2}
      labels={{
        months: language === 'en' ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] : ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        weekdays: language === 'en' ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] : ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        legend: { less: language === 'en' ? "Less" : "Menos", more: language === 'en' ? "More" : "Más" },
      }}
    >
      <ContributionGraphCalendar
        className="no-scrollbar px-2"
        title={language === 'en' ? 'GitHub Contributions' : 'Contribuciones de GitHub'}
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
                {activity.count} {activity.count === 1 ? t('contribución') : t('contribuciones')} {t('el')} {format(parseISO(activity.date), "dd.MM.yyyy")}
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      </ContributionGraphCalendar>

      <ContributionGraphFooter className="px-2">
        <ContributionGraphTotalCount>
          {({ totalCount, year }) => (
            <div className="text-muted-foreground">
              {totalCount.toLocaleString(language === 'en' ? "en-US" : "es-PE")} {t('contribuciones desde')} {year} {t('en')}{" "}
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
