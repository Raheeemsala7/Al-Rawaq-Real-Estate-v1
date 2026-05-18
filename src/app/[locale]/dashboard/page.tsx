import ComponentChart from '@/features/stats/_components/component-chart';
import { getStatsAdminApi } from '@/features/stats/apis/stats.api';






const AdminPage = async () => {

  const statusData = await getStatsAdminApi()

  console.log(statusData)

  if (!statusData.success) {
    return <p>حدث خطأ اثناء جلب البيانات</p>
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">لوحة التحكم</h1>
        <p className="text-muted-foreground">مرحباً بك في لوحة التحكم الرئيسية</p>
      </div>
      <ComponentChart stats={statusData.data}/>

    </div>
  )
}

export default AdminPage