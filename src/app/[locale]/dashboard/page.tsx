import ComponentChart from '@/features/stats/_components/component-chart';
import { getStatsAdminApi } from '@/features/stats/apis/stats.api';
import { AlertTriangle } from 'lucide-react';

const AdminPage = async () => {

  const statusData = await getStatsAdminApi()

  if (!statusData.success) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
        <AlertTriangle className="size-10 text-destructive" />
        <p className="text-lg font-medium text-foreground">حدث خطأ أثناء جلب البيانات</p>
        <p className="text-sm text-muted-foreground">يرجى المحاولة مرة أخرى لاحقاً</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-foreground">لوحة التحكم</h1>
        <p className="text-muted-foreground">مرحباً بك في لوحة التحكم الرئيسية</p>
      </div>
      <ComponentChart stats={statusData.data}/>
    </div>
  )
}

export default AdminPage