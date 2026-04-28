import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardInner } from '@/components/ui/Card'
import { PageLoader } from '@/components/shared/LoadingSpinner'
import { useAnalyticsOverview, useAnalyticsTrends } from '@/services/queries/useAnalytics'
import { formatNumber } from '@/utils/formatters'
import { cn } from '@/lib/utils'

const PIE_COLORS = ['#7d52f4', '#335cff', '#1fc16b', '#f6b51e', '#fb3748', '#47c2ff', '#22d3bb', '#fb4ba3']

function Analytics() {
  const { data: overview, isLoading: loadingOverview } = useAnalyticsOverview()
  const { data: trends, isLoading: loadingTrends } = useAnalyticsTrends()

  if (loadingOverview || loadingTrends) return <PageLoader />

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-ibm-plex-serif text-lg font-semibold text-strong">Analytics</h2>
        <p className="text-xs text-soft mt-0.5">Hospital performance metrics and trends</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {overview?.stats.slice(0, 4).map((stat) => {
          const isUp = stat.trend === 'up'
          return (
            <Card key={stat.label}>
              <CardInner>
                <p className="text-xs text-soft mb-1">{stat.label}</p>
                <p className="text-xl font-semibold text-strong">{stat.value}</p>
                <div
                  className={cn(
                    'flex items-center gap-0.5 text-xs font-medium mt-1',
                    isUp ? 'text-success-base' : 'text-error-base',
                  )}
                >
                  {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {Math.abs(stat.change)}% vs last month
                </div>
              </CardInner>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card>
          <h3 className="text-base font-semibold text-strong mb-3">Admissions & Discharges</h3>
          <CardInner className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trends?.monthly} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e2e3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8a8a8a' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#8a8a8a' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 20,
                    border: '2px solid #ffffff',
                    background: '#f2f2f2',
                    fontSize: 12,
                  }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 12, paddingBottom: 12 }}
                />
                <Bar dataKey="admissions" fill="#335cff" radius={[6, 6, 0, 0]} name="Admissions" />
                <Bar dataKey="discharges" fill="#1fc16b" radius={[6, 6, 0, 0]} name="Discharges" />
              </BarChart>
            </ResponsiveContainer>
          </CardInner>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-strong mb-3">Revenue Trend</h3>
          <CardInner className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trends?.monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e2e3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8a8a8a' }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 12, fill: '#8a8a8a' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => formatNumber(v)}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 20,
                    border: '2px solid #ffffff',
                    background: '#f2f2f2',
                    fontSize: 12,
                  }}
                  formatter={(value) => [`$${formatNumber(Number(value))}`, 'Revenue']}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#7d52f4"
                  strokeWidth={2}
                  dot={{ fill: '#7d52f4', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardInner>
        </Card>
      </div>

      <Card>
        <h3 className="text-base font-semibold text-strong mb-3">Department Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <CardInner className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={overview?.departmentBreakdown}
                  dataKey="patients"
                  nameKey="department"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {overview?.departmentBreakdown.map((_entry, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 20,
                    border: '2px solid #ffffff',
                    background: '#f2f2f2',
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardInner>
          <CardInner>
            <div className="flex flex-col gap-3">
              {overview?.departmentBreakdown.map((dept, i) => (
                <div key={dept.department} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                  />
                  <span className="text-sm text-sub flex-1">{dept.department}</span>
                  <span className="text-sm font-medium text-strong">{dept.patients}</span>
                  <span className="text-xs text-soft w-12 text-right">{dept.percentage}%</span>
                </div>
              ))}
            </div>
          </CardInner>
        </div>
      </Card>
    </div>
  )
}

export default Analytics
