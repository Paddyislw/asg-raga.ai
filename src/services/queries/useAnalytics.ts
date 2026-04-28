import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS, STALE_TIME } from '@/constants/api'
import { fetchAnalyticsOverview, fetchAnalyticsTrends } from '@/services/api/analytics'

export function useAnalyticsOverview() {
  return useQuery({
    queryKey: QUERY_KEYS.analyticsOverview,
    queryFn: fetchAnalyticsOverview,
    staleTime: STALE_TIME.MEDIUM,
  })
}

export function useAnalyticsTrends() {
  return useQuery({
    queryKey: QUERY_KEYS.analyticsTrends,
    queryFn: fetchAnalyticsTrends,
    staleTime: STALE_TIME.MEDIUM,
  })
}
