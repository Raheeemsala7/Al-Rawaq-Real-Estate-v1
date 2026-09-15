"use client"
import { StatCard } from './stats-card'
import { DashboardStats } from '../types/stats'
import { Building2, Home, ShoppingBag, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/components/ui/chart';
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

// Use CSS variable chart tokens so colors adapt automatically in dark/light mode
const CHART_COLORS = {
  primary: "var(--chart-1)",
  secondary: "var(--chart-2)",
  tertiary: "var(--chart-3)",
  available: "var(--chart-2)",
  soldOrRented: "var(--chart-1)",
};

const ComponentChart = ({ stats }: { stats: DashboardStats }) => {
  const propertyTypeData = stats?.propertiesPerMonth.map(p => ({
    name: `شهر ${p._id}`,
    value: p.count,
    color: CHART_COLORS.primary,
  })) || [];

  const propertyStatusData = [
    { name: "متاح", value: stats?.availableProperties || 0, color: CHART_COLORS.available },
    { name: "مباع/مؤجر", value: stats?.soldOrRented || 0, color: CHART_COLORS.soldOrRented },
  ];

  return (
    <div className='space-y-6'>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="إجمالي المستخدمين" value={stats?.usersCount} icon={Users} trend="up" trendValue="+12% هذا الشهر" />
        <StatCard title="إجمالي العقارات" value={stats?.propertiesCount} icon={Home} trend="up" trendValue="+8% هذا الشهر" />
        <StatCard title="العقارات المتاحة" value={stats?.availableProperties} icon={Building2} trend="up" trendValue="+5% هذا الشهر" />
        <StatCard title="العقارات المباعة/المؤجرة" value={stats?.soldOrRented} icon={ShoppingBag} trend="up" trendValue="+3% هذا الشهر" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>عقارات الشهر</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-[300px] w-full"
              config={{
                عقارات: { label: "عقارات", color: CHART_COLORS.primary },
              }}
            >
              <BarChart data={propertyTypeData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>العقارات حسب الحالة</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                متاح: { label: "متاح", color: CHART_COLORS.available },
                "مباع/مؤجر": { label: "مباع/مؤجر", color: CHART_COLORS.soldOrRented },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={propertyStatusData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                  >
                    {propertyStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    wrapperStyle={{ marginTop: 10 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ComponentChart