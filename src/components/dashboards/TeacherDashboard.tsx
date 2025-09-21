import React, { useState } from 'react';
import { CommonLayout } from '../CommonLayout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  BookOpen, 
  Calendar, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageCircle,
  Star,
  Target,
  BarChart3,
  FileText,
  Upload,
  Home,
  UserCheck,
  CalendarDays,
  PlusCircle,
  Edit,
  Eye,
  Send,
  Filter,
  Search,
  GraduationCap,
  Activity,
  ClipboardCheck,
  FileUpload,
  Bell
} from 'lucide-react';

interface TeacherDashboardProps {
  teacherData?: {
    name: string;
    employeeId: string;
    department: string;
    subjects: string[];
    classes: number;
    students: number;
  };
}

export function TeacherDashboard({ teacherData = {
  name: 'Dr. Sarah Williams',
  employeeId: 'FAC2023001',
  department: 'Computer Science',
  subjects: ['Data Structures', 'Database Management', 'Software Engineering'],
  classes: 8,
  students: 156
}}: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');

  // Sidebar navigation items for Teacher
  const sidebarItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard', active: true },
    { icon: Users, label: 'My Students', path: '/students' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: UserCheck, label: 'Attendance', path: '/attendance' },
    { icon: FileText, label: 'Gradebook', path: '/gradebook' },
    { icon: CalendarDays, label: 'Schedule', path: '/schedule' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' }
  ];

  // Role theme - Dark Green + White, professional
  const roleTheme = {
    primary: 'bg-gradient-to-r from-emerald-600 to-green-600',
    secondary: 'bg-green-50',
    accent: 'text-green-600',
    gradient: 'from-emerald-600 to-green-600'
  };

  const todayClasses = [
    { subject: 'Data Structures', class: 'CS-6A', time: '09:00 AM', room: 'CS-101', students: 45 },
    { subject: 'Database Management', class: 'CS-6B', time: '11:00 AM', room: 'CS-203', students: 42 },
    { subject: 'Software Engineering', class: 'CS-8A', time: '02:00 PM', room: 'CS-105', students: 38 },
  ];

  const studentRequests = [
    { name: 'Alex Johnson', type: 'Leave Request', subject: 'Medical Leave', date: '2025-09-25', status: 'pending' },
    { name: 'Emma Davis', type: 'OD Request', subject: 'Technical Event', date: '2025-09-26', status: 'pending' },
    { name: 'Michael Brown', type: 'Assignment Extension', subject: 'Database Project', date: '2025-09-24', status: 'approved' },
  ];

  const notifications = [
    {
      id: '1',
      type: 'info' as const,
      title: 'Faculty Meeting',
      message: 'Department meeting scheduled for tomorrow at 2:00 PM',
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'warning' as const,
      title: 'Grade Submission Due',
      message: 'Midterm grades must be submitted by Friday',
      time: '1 day ago'
    },
    {
      id: '3',
      type: 'success' as const,
      title: 'Class Feedback',
      message: 'Received positive feedback from CS-6A students',
      time: '2 days ago'
    }
  ];

  const classPerformance = [
    { class: 'CS-6A', subject: 'Data Structures', students: 45, avgGrade: 8.2, attendance: 89 },
    { class: 'CS-6B', subject: 'Database Management', students: 42, avgGrade: 7.8, attendance: 92 },
    { class: 'CS-8A', subject: 'Software Engineering', students: 38, avgGrade: 8.5, attendance: 87 },
  ];

  // Quick Actions Component
  const QuickActions = () => (
    <div className="space-y-3">
      <Button 
        className="w-full justify-start bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white"
        onClick={() => setShowAttendanceModal(true)}
      >
        <UserCheck className="h-4 w-4 mr-2" />
        Take Attendance
      </Button>
      <Button className="w-full justify-start" variant="outline">
        <Upload className="h-4 w-4 mr-2" />
        Upload Grades
      </Button>
      <Button className="w-full justify-start" variant="outline">
        <CalendarDays className="h-4 w-4 mr-2" />
        Manage Timetable
      </Button>
      <Button className="w-full justify-start" variant="outline">
        <MessageCircle className="h-4 w-4 mr-2" />
        Send Announcement
      </Button>
      <Button className="w-full justify-start" variant="outline">
        <FileText className="h-4 w-4 mr-2" />
        Generate Reports
      </Button>
    </div>
  );

  // Main Dashboard Content
  const DashboardContent = () => (
    <div className="p-6 space-y-6">
      {/* Welcome Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Good Morning, {teacherData.name}! 👩‍🏫
              </h1>
              <p className="text-green-100 text-lg">
                {teacherData.department} Department • {teacherData.employeeId}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                  <div className="text-sm text-green-100">Today's Classes</div>
                  <div className="text-2xl font-bold">{todayClasses.length}</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                  <div className="text-sm text-green-100">Total Students</div>
                  <div className="text-2xl font-bold">{teacherData.students}</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                  <div className="text-sm text-green-100">Subjects</div>
                  <div className="text-2xl font-bold">{teacherData.subjects.length}</div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <GraduationCap className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Notifications */}
      {notifications.filter(n => n.type === 'warning').map((notification, index) => (
        <Alert key={index} className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-700 flex items-center justify-between">
            <span><strong>{notification.title}:</strong> {notification.message}</span>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
              Action Required
            </Button>
          </AlertDescription>
        </Alert>
      ))}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-600 rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-700">{teacherData.students}</div>
              <div className="text-sm text-green-600">Total Students</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-700">{teacherData.classes}</div>
              <div className="text-sm text-blue-600">Weekly Classes</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-600 rounded-xl">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-700">8.2</div>
              <div className="text-sm text-purple-600">Avg Class Grade</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-600 rounded-xl">
              <ClipboardCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-700">{studentRequests.filter(r => r.status === 'pending').length}</div>
              <div className="text-sm text-orange-600">Pending Requests</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">Today's Classes</TabsTrigger>
          <TabsTrigger value="performance">Class Performance</TabsTrigger>
          <TabsTrigger value="requests">Student Requests</TabsTrigger>
          <TabsTrigger value="gradebook">Gradebook</TabsTrigger>
        </TabsList>

        {/* Today's Classes Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Today's Schedule
            </h3>
            <div className="space-y-4">
              {todayClasses.map((classItem, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-600 rounded-lg">
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-green-800">{classItem.subject}</div>
                      <div className="text-sm text-green-600">{classItem.class} • {classItem.room}</div>
                      <div className="text-xs text-green-500">{classItem.students} students enrolled</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-700">{classItem.time}</div>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <UserCheck className="h-3 w-3 mr-1" />
                        Take Attendance
                      </Button>
                      <Button size="sm" variant="outline" className="border-green-300 text-green-700">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Schedule Changes */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-green-600" />
                Schedule Notifications
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-medium text-blue-800">Lab Session Rescheduled</div>
                  <div className="text-sm text-blue-600 mt-1">
                    Database Lab moved from CS-203 to CS-301 due to maintenance
                  </div>
                  <div className="text-xs text-blue-500 mt-2">2 hours ago</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="font-medium text-orange-800">Extra Class Request</div>
                  <div className="text-sm text-orange-600 mt-1">
                    CS-6A students requested extra doubt clearing session
                  </div>
                  <div className="text-xs text-orange-500 mt-2">1 day ago</div>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                Quick Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Attendance</span>
                  <span className="font-semibold text-green-600">89.3%</span>
                </div>
                <Progress value={89.3} className="h-2 [&>div]:bg-green-500" />
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Assignment Submissions</span>
                  <span className="font-semibold text-blue-600">92%</span>
                </div>
                <Progress value={92} className="h-2 [&>div]:bg-blue-500" />
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Grade Processing</span>
                  <span className="font-semibold text-purple-600">78%</span>
                </div>
                <Progress value={78} className="h-2 [&>div]:bg-purple-500" />
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Class Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              Class Performance Analytics
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-semibold text-gray-700">Class</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Subject</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Students</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Avg Grade</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Attendance</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classPerformance.map((classData, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3 font-medium">{classData.class}</td>
                      <td className="p-3">{classData.subject}</td>
                      <td className="p-3">{classData.students}</td>
                      <td className="p-3">
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          {classData.avgGrade}/10
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge variant={classData.attendance >= 85 ? 'default' : 'destructive'}>
                          {classData.attendance}%
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="text-green-600">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-blue-600">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Student Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-green-600" />
                Student Requests ({studentRequests.filter(r => r.status === 'pending').length} pending)
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {studentRequests.map((request, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-green-500 text-white">
                        {request.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{request.name}</div>
                      <div className="text-sm text-gray-600">{request.type} • {request.subject}</div>
                      <div className="text-xs text-gray-500">Requested on {request.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={
                      request.status === 'pending' ? 'destructive' :
                      request.status === 'approved' ? 'default' : 'secondary'
                    }>
                      {request.status}
                    </Badge>
                    {request.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Gradebook Tab */}
        <TabsContent value="gradebook" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                Grade Management
              </h3>
              <div className="flex gap-2">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Grades
                </Button>
                <Button variant="outline">
                  <Send className="h-4 w-4 mr-2" />
                  Publish Results
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">156</div>
                <div className="text-sm text-green-600">Total Grades</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">23</div>
                <div className="text-sm text-blue-600">Pending Reviews</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">8.2</div>
                <div className="text-sm text-purple-600">Class Average</div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  // Attendance Modal
  const AttendanceModal = () => (
    showAttendanceModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Take Attendance</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowAttendanceModal(false)}>
              ×
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a class" />
                </SelectTrigger>
                <SelectContent>
                  {todayClasses.map((classItem, index) => (
                    <SelectItem key={index} value={classItem.class}>
                      {classItem.subject} - {classItem.class}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Method</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual Entry</SelectItem>
                  <SelectItem value="qr">QR Code Scan</SelectItem>
                  <SelectItem value="bulk">Bulk Upload</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                <UserCheck className="h-4 w-4 mr-2" />
                Start Taking Attendance
              </Button>
              <Button variant="outline" onClick={() => setShowAttendanceModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  );

  return (
    <>
      <CommonLayout
        userRole="Teacher"
        userName={teacherData.name}
        userAvatar="/api/placeholder/40/40"
        sidebarItems={sidebarItems}
        quickActions={<QuickActions />}
        notifications={notifications}
        roleTheme={roleTheme}
      >
        <DashboardContent />
      </CommonLayout>
      <AttendanceModal />
    </>
  );
}