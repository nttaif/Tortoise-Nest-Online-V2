'use client'
import { Users, UserPen, CalendarRange, BookOpenText, Mail, Plus } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Bar, BarChart, CartesianGrid } from "recharts";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableCell } from "@/components/ui/table";
import { DataTableDemo } from "@/components/admin/table/table.teacherdetail";
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
  return (
    <div className="flex flex-col lg:flex-row p-2 py-4">
      <div className="flex-grow space-y-6 px-3">
        {/* Thống kê */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-[#303972] mb-2">School Performance</h2>
            <div className="flex items-center space-x-4 text-sm mb-4">
              <div className="flex items-center space-x-1">
                <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                <span className="text-gray-700">This Week</span>
                <span className="font-bold text-blue-600">1.245</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                <span className="text-gray-700">Last Week</span>
                <span className="font-bold text-orange-500">1.356</span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="name" tick={{ fill: "#6B7280" }} />
                <YAxis tick={{ fill: "#6B7280" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="thisWeek" stroke="#1D4ED8" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="lastWeek" stroke="#F97316" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-lg">
            {/* Tiêu đề và Tab */}
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-xl font-semibold text-[#303972]">School Overview</h2>
              <div className="flex space-x-2">
                {["Week", "Month", "Year", "All"].map((tab, index) => (
                  <button
                    key={index}
                    className={`px-4 py-1 text-sm font-medium rounded-lg ${
                      tab === "Week" ? "bg-[#4d44b51a] text-[#303972]" : "text-gray-500"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Biểu đồ 2 */}
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={datacharts} barCategoryGap={20}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#5A4AD1" name="Number of Student" barSize={20} radius={[5, 5, 0, 0]} />
                <LineChart>
                  <Line type="monotone" dataKey="revenue" stroke="#38A169" strokeWidth={2} name="Revenue" />
                  <Line type="monotone" dataKey="teachers" stroke="#E53E3E" strokeDasharray="4 4" strokeWidth={1.5} name="Active Teacher" />
                </LineChart>
              </BarChart>
            </ResponsiveContainer>
          </div>
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
              <DataTableDemo/>
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
      <div className="w-full lg:w-80 space-y-6"> 
      </div>
    </div>
  );
};

export default DashboardPage;
