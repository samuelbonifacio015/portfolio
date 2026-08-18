import type { Activity } from "@/components/contribution-graph"

type GitHubContributionsResponse = {
  contributions?: Activity[]
}

const GITHUB_CONTRIBUTIONS_API_URL =
  "https://github-contributions-api.jogruber.de"

export async function getContributions(
  username: string,
  signal?: AbortSignal
): Promise<Activity[]> {
  const response = await fetch(
    `${GITHUB_CONTRIBUTIONS_API_URL}/v4/${username}?y=last`,
    { signal }
  )

  if (!response.ok) {
    throw new Error(`GitHub contributions request failed: ${response.status}`)
  }

  const data = (await response.json()) as GitHubContributionsResponse
  return data.contributions ?? []
}
