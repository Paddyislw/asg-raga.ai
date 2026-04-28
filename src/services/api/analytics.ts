import type { AnalyticsOverview, AnalyticsTrends } from '@/types/analytics'
import { MOCK_ANALYTICS_OVERVIEW, MOCK_ANALYTICS_TRENDS } from './mockData'
import { sleep } from '@/utils/helpers'

export async function fetchAnalyticsOverview(): Promise<AnalyticsOverview> {
  await sleep(500)
  return MOCK_ANALYTICS_OVERVIEW
}

export async function fetchAnalyticsTrends(): Promise<AnalyticsTrends> {
  await sleep(450)
  return MOCK_ANALYTICS_TRENDS
}
