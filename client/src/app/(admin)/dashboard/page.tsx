import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTableDemo } from "@/components/admin/table/table.teacherdetail";
<<<<<<< HEAD
import { StudentTable } from "@/components/admin/table/table.student";


const data = [
  { name: "Week 01", thisWeek: 240000, lastWeek: 480000 },
  { name: "Week 02", thisWeek: 380000, lastWeek: 320000 },
  { name: "Week 03", thisWeek: 320000, lastWeek: 400000 },
  { name: "Week 04", thisWeek: 400000, lastWeek: 240000 },
  { name: "Week 05", thisWeek: 260000, lastWeek: 480000 },
  { name: "Week 06", thisWeek: 340000, lastWeek: 300000 },
];

const datacharts = [
  { day: "Sun", students: 70, revenue: 50, teachers: 25 },
  { day: "Mon", students: 80, revenue: 65, teachers: 30 },
  { day: "Tue", students: 70, revenue: 75, teachers: 28 },
  { day: "Wed", students: 95, revenue: 85, teachers: 26 },
  { day: "Thu", students: 40, revenue: 55, teachers: 22 },
  { day: "Fri", students: 90, revenue: 70, teachers: 27 },
  { day: "Sat", students: 75, revenue: 60, teachers: 29 },
];

const DashboardPage = () => {
=======
import StatsDashboard from "@/components/admin/main/dashboard/stats.dashboard";
import SidebarDashboard from "@/components/admin/main/dashboard/sidebar.dashboard";
import ChartPerfomance from "@/components/admin/main/dashboard/chart.perfomance";
import ChartOverview from "@/components/admin/main/dashboard/chart.overview";
import { getListTeacher } from "@/components/common/action";


const DashboardPage = async() => {
  const getListTeachers = await getListTeacher();
>>>>>>> 352c292a8e6599c0376715732d6d84608ed1a5ce
  return (
    <div className="flex flex-col lg:flex-row p-2 py-4">
      <div className="flex-grow space-y-6 px-3">
        {/* Thống kê */}
<<<<<<< HEAD
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Students", value: "93K", icon: <Users color="white" />, color: "#4D44B5" },
            { title: "Teachers", value: "74K", icon: <UserPen color="white" />, color: "#FB7D5B" },
            { title: "Events", value: "40K", icon: <CalendarRange color="white" />, color: "#fcc43e" },
            { title: "Courses", value: "32K", icon: <BookOpenText color="white" />, color: "#303972" },
          ].map((item, index) => (
            <div key={index} className="bg-white p-4 shadow-lg rounded-lg flex items-center">
              <div className={`w-16 h-16 flex items-center justify-center rounded-full`} style={{ backgroundColor: item.color }}>
                {item.icon}
              </div>
              <div className="p-3">
                <h2 className="text-[#a098ae]">{item.title}</h2>
                <p className="text-2xl font-bold text-[#303972]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Biểu đồ 1 */}
=======
        <StatsDashboard/>
>>>>>>> 352c292a8e6599c0376715732d6d84608ed1a5ce
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
              <CardTitle className="text-[#303972] text-xl font-semibold">Teacher Details</CardTitle>
            </CardHeader>

            <CardContent>
              <DataTableDemo data={getListTeachers}/>
            </CardContent>
          </Card>
        </div>

        {/* Student */}
        <div className="w-full mt-6">
          <Card className="flex-1 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#303972] text-xl font-semibold">Student</CardTitle>
            </CardHeader>

            <CardContent>
              <StudentTable></StudentTable>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sidebar bên phải */}
<<<<<<< HEAD
      <div className="w-full lg:w-80 space-y-6"> 
      </div>
=======
      <SidebarDashboard/>
>>>>>>> 352c292a8e6599c0376715732d6d84608ed1a5ce
    </div>
  );
};

export default DashboardPage;
