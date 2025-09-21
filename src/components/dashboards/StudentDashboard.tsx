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
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Award,
  Users,
  Download,
  Bell,
  MessageCircle,
  Star,
  Target,
  BarChart3,
  FileText,
  CreditCard,
  GraduationCap,
  Zap,
  Heart,
  Home,
  Library,
  Send,
  Plus,
  Eye,
  CalendarDays,
  User,
  TrendingDown,
  Trophy,
  Flame,
  Timer,
  Activity
} from 'lucide-react';

interface StudentDashboardProps {
  studentData?: {
    name: string;
    rollNo: string;
    class: string;
    semester: string;
    cgpa: number;
    attendance: number;
    feeBalance: number;
  };
}

export function StudentDashboard({ studentData = {
  name: 'Alex Johnson',
  rollNo: 'CS2025001',
  class: 'B.Tech Computer Science',
  semester: '6th Semester',
  cgpa: 8.7,
  attendance: 87,
  feeBalance: 45000
}}: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showODForm, setShowODForm] = useState(false);

  // Sidebar navigation items for Student
  const sidebarItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard', active: true },
    { icon: BookOpen, label: 'My Courses', path: '/courses' },
    { icon: CalendarDays, label: 'Timetable', path: '/timetable' },
    { icon: DollarSign, label: 'Fee Status', path: '/fees' },
    { icon: FileText, label: 'Results', path: '/results' },
    { icon: Library, label: 'Library', path: '/library' },
    { icon: Award, label: 'Achievements', path: '/achievements' }
  ];

  // Role theme - Vibrant Blue/Teal
  const roleTheme = {
    primary: 'bg-gradient-to-r from-blue-500 to-teal-500',
    secondary: 'bg-blue-50',
    accent: 'text-blue-600',
    gradient: 'from-blue-500 to-teal-500'
  };

  // Sample data
  const upcomingExams = [
    { subject: 'Data Structures', date: '2025-09-28', time: '09:00 AM', type: 'Midterm' },
    { subject: 'Database Management', date: '2025-10-02', time: '02:00 PM', type: 'Lab Exam' },
    { subject: 'Software Engineering', date: '2025-10-05', time: '11:00 AM', type: 'Project Viva' }
  ];

  const feeStructure = [
    { item: 'Tuition Fee', amount: 75000, paid: true },
    { item: 'Lab Fee', amount: 15000, paid: true },
    { item: 'Library Fee', amount: 5000, paid: false },
    { item: 'Exam Fee', amount: 8000, paid: false }
  ];

  const notifications = [
    {
      id: '1',
      type: 'info' as const,
      title: 'Assignment Due Tomorrow',
      message: 'Database project submission due tomorrow at 11:59 PM',
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'success' as const,
      title: 'Grade Updated',
      message: 'Your Data Structures midterm result is now available',
      time: '1 day ago'
    },
    {
      id: '3',
      type: 'warning' as const,
      title: 'Attendance Alert',
      message: 'Your attendance in Software Engineering is below 75%',
      time: '3 days ago'
    }
  ];

  // Quick Actions Component
  const QuickActions = () => (
    <div className="space-y-3">
      <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white">
        <CreditCard className="h-4 w-4 mr-2" />
        Pay Fees Online
      </Button>
      <Button className="w-full justify-start" variant="outline" onClick={() => setShowODForm(true)}>
        <Calendar className="h-4 w-4 mr-2" />
        Apply for OD/Leave
      </Button>
      <Button className="w-full justify-start" variant="outline">
        <Download className="h-4 w-4 mr-2" />
        Download Results
      </Button>
      <Button className="w-full justify-start" variant="outline">
        <Eye className="h-4 w-4 mr-2" />
        View Timetable
      </Button>
      <Button className="w-full justify-start" variant="outline">
        <MessageCircle className="h-4 w-4 mr-2" />
        Contact Faculty
      </Button>
    </div>
  );

  // Main Dashboard Content
  const DashboardContent = () => (
    <div className="p-6 space-y-6">
      {/* Welcome Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-cyan-500 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {studentData.name}! 🎓
              </h1>
              <p className="text-blue-100 text-lg">
                {studentData.class} • {studentData.rollNo} • {studentData.semester}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                  <div className="text-sm text-blue-100">Current CGPA</div>
                  <div className="text-2xl font-bold">{studentData.cgpa}/10</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                  <div className="text-sm text-blue-100">Attendance</div>
                  <div className="text-2xl font-bold">{studentData.attendance}%</div>
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

      {/* Alert for Fee Balance */}
      {studentData.feeBalance > 0 && (
        <Alert className="border-orange-200 bg-orange-50">
          <DollarSign className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-700 flex items-center justify-between">
            <span>Fee balance pending: ₹{studentData.feeBalance.toLocaleString()}</span>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
              Pay Now
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500 rounded-xl">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-700">8</div>
              <div className="text-sm text-blue-600">Active Courses</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500 rounded-xl">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-700">{studentData.attendance}%</div>
              <div className="text-sm text-green-600">Attendance Rate</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-700">12</div>
              <div className="text-sm text-purple-600">Achievements</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500 rounded-xl">
              <Timer className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-700">3</div>
              <div className="text-sm text-orange-600">Pending Tasks</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="exams">Exams</TabsTrigger>
          <TabsTrigger value="fees">Fee Status</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Attendance Graph */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Attendance Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Overall Attendance</span>
                  <span className="font-semibold">{studentData.attendance}%</span>
                </div>
                <Progress value={studentData.attendance} className="h-3" />
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">156</div>
                    <div className="text-xs text-green-600">Classes Attended</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">23</div>
                    <div className="text-xs text-red-600">Classes Missed</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Upcoming Notifications */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                Recent Notifications
              </h3>
              <div className="space-y-3">
                {notifications.slice(0, 4).map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg border ${
                    notification.type === 'success' ? 'bg-green-50 border-green-200' :
                    notification.type === 'warning' ? 'bg-orange-50 border-orange-200' :
                    'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="font-medium text-sm">{notification.title}</div>
                    <div className="text-xs text-gray-600 mt-1">{notification.message}</div>
                    <div className="text-xs text-gray-400 mt-2">{notification.time}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Exams Tab */}
        <TabsContent value="exams" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Upcoming Examinations
            </h3>
            <div className="space-y-4">
              {upcomingExams.map((exam, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500 rounded-lg">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">{exam.subject}</div>
                      <div className="text-sm text-gray-600">{exam.type}</div>
                      <div className="text-xs text-gray-500">{exam.date} at {exam.time}</div>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">
                    {new Date(exam.date).getDate() - new Date().getDate()} days
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Fees Tab */}
        <TabsContent value="fees" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              Fee Payment Status
            </h3>
            <div className="space-y-4">
              {feeStructure.map((fee, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${fee.paid ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <div className="font-medium">{fee.item}</div>
                      <div className="text-sm text-gray-600">₹{fee.amount.toLocaleString()}</div>
                    </div>
                  </div>
                  <Badge variant={fee.paid ? 'default' : 'destructive'}>
                    {fee.paid ? 'Paid' : 'Pending'}
                  </Badge>
                </div>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Pending:</span>
                  <span className="text-xl font-bold text-red-600">
                    ₹{feeStructure.filter(f => !f.paid).reduce((sum, f) => sum + f.amount, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Academic Performance
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">8.7</div>
                  <div className="text-sm text-blue-600">Current CGPA</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">9.1</div>
                  <div className="text-sm text-green-600">Best Semester</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">A+</div>
                  <div className="text-sm text-purple-600">Latest Grade</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">5th</div>
                  <div className="text-sm text-orange-600">Class Rank</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>CGPA Progress</span>
                    <span className="font-medium">{studentData.cgpa}/10</span>
                  </div>
                  <Progress value={(studentData.cgpa / 10) * 100} className="h-3" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  // OD/Leave Application Form Modal
  const ODLeaveForm = () => (
    showODForm && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Apply for OD/Leave</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowODForm(false)}>
              ×
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="od">On Duty (OD)</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="emergency">Emergency Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">From Date</label>
              <Input type="date" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">To Date</label>
              <Input type="date" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Reason</label>
              <Textarea placeholder="Please provide reason for leave..." />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                <Send className="h-4 w-4 mr-2" />
                Submit
              </Button>
              <Button variant="outline" onClick={() => setShowODForm(false)}>
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
        userRole="Student"
        userName={studentData.name}
        userAvatar="/api/placeholder/40/40"
        sidebarItems={sidebarItems}
        quickActions={<QuickActions />}
        notifications={notifications}
        roleTheme={roleTheme}
      >
        <DashboardContent />
      </CommonLayout>
      <ODLeaveForm />
    </>
  );
}