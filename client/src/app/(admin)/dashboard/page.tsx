import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTableDemo } from "@/components/admin/table/table.teacherdetail";
import StatsDashboard from "@/components/admin/main/dashboard/stats.dashboard";
import SidebarDashboard from "@/components/admin/main/dashboard/sidebar.dashboard";
import ChartPerfomance from "@/components/admin/main/dashboard/chart.perfomance";
import ChartOverview from "@/components/admin/main/dashboard/chart.overview";
import { getListTeacher } from "@/components/common/action";


const DashboardPage = async() => {
  const getListTeachers = await getListTeacher();
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-grow space-y-6 p-6">
        {/* Thống kê */}
        <StatsDashboard/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Biểu đồ 1 */}
          <ChartPerfomance/>
          {/* Biểu đồ 2 */}
          <ChartOverview/>
        </div>

        {/* Lịch */}
        <div className="w-full flex flex-col lg:flex-row gap-4 mt-6">
          {/* School Calendar */}
          <Card className="shadow-lg text-[#303972] text-xl font-semibold">
            <CardHeader>
              <CardTitle>School Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar className="w-full max-w-md h-auto p-4 "/>
            </CardContent>
          </Card>

          {/* Teacher Details */}
          <Card className="flex-1 min-w-[300px] shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#303972] text-xl font-semibold">List Teacher:</CardTitle>
            </CardHeader>

            <CardContent>
              <DataTableDemo data={getListTeachers}/>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sidebar bên phải */}
      <SidebarDashboard/>
    </div>
  );
};

export default DashboardPage;
