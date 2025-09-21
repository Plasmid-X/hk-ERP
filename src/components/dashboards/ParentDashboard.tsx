import React, { useState } from 'react';
import { CommonLayout } from '../CommonLayout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  MessageCircle,
  Star,
  Award,
  Clock,
  Heart,
  Phone,
  Mail,
  CreditCard,
  FileText,
  Eye,
  Download,
  Home,
  BarChart3,
  User,
  CalendarDays,
  GraduationCap,
  Activity
} from 'lucide-react';

interface ParentDashboardProps {
  parentData?: {
    name: string;
    children: Array<{
      id: string;
      name: string;
      class: string;
      rollNo: string;
      attendance: number;
      cgpa: number;
      feeBalance: number;
      lastActive: string;
    }>;
  };
}

export function ParentDashboard({ parentData = {
  name: 'Michael Johnson',
  children: [
    {
      id: '1',
      name: 'Alex Johnson',
      class: 'B.Tech Computer Science - 6th Semester',
      rollNo: 'CS2025001',
      attendance: 87,
      cgpa: 8.7,
      feeBalance: 45000,
      lastActive: '2 hours ago'
    },
    {
      id: '2', 
      name: 'Emma Johnson',
      class: 'B.Com Finance - 4th Semester', 
      rollNo: 'CM2023045',
      attendance: 94,
      cgpa: 9.1,
      feeBalance: 0,
      lastActive: '1 day ago'
    }
  ]
}}: ParentDashboardProps) {
  const [selectedChild, setSelectedChild] = useState(parentData.children[0]);
  const [activeTab, setActiveTab] = useState('overview');

  // Sidebar navigation items for Parent
  const sidebarItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard', active: true },
    { icon: Users, label: 'My Children', path: '/children' },
    { icon: BarChart3, label: 'Performance', path: '/performance' },
    { icon: DollarSign, label: 'Fee Status', path: '/fees' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: FileText, label: 'Reports', path: '/reports' }
  ];

  // Role theme - Indigo/Purple, clean and elegant
  const roleTheme = {
    primary: 'bg-gradient-to-r from-indigo-500 to-purple-500',
    secondary: 'bg-indigo-50',
    accent: 'text-indigo-600',
    gradient: 'from-indigo-500 to-purple-500'
  };

  const notifications = [
    {
      id: '1',
      type: 'info' as const,
      title: 'Parent-Teacher Meeting',
      message: 'Scheduled for Oct 25, 2025 at 10:00 AM',
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'success' as const,
      title: 'Payment Confirmed',
      message: 'Emma\'s semester fee payment processed successfully',
      time: '1 day ago'
    },
    {
      id: '3',
      type: 'warning' as const,
      title: 'Attendance Alert',
      message: 'Alex missed 2 classes this week',
      time: '3 days ago'
    }
  ];

  const progressData = [
    { month: 'Jan', alex: 8.2, emma: 8.8 },
    { month: 'Feb', alex: 8.4, emma: 9.0 },
    { month: 'Mar', alex: 8.6, emma: 9.1 },
    { month: 'Apr', alex: 8.7, emma: 9.1 },
  ];

  // Quick Actions Component
  const QuickActions = () => (
    <div className="space-y-3">
      <Button className="w-full justify-start bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
        <CreditCard className="h-4 w-4 mr-2" />
        Pay Fees
      </Button>
      <Button className="w-full justify-start" variant="outline">
        <MessageCircle className="h-4 w-4 mr-2" />
        Message Teachers
      </Button>
      <Button className="w-full justify-start" variant="outline">
        <Calendar className="h-4 w-4 mr-2" />
        Schedule Meeting
      </Button>
      <Button className="w-full justify-start" variant="outline">
        <Download className="h-4 w-4 mr-2" />
        Download Reports
      </Button>
      <Button className="w-full justify-start" variant="outline">
        <Phone className="h-4 w-4 mr-2" />
        Emergency Contact
      </Button>
    </div>
  );

  // Main Dashboard Content
  const DashboardContent = () => (
    <div className="p-6 space-y-6">
      {/* Welcome Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome, {parentData.name}! 👨‍👩‍👧‍👦
              </h1>
              <p className="text-indigo-100 text-lg">
                Monitoring the academic journey of {parentData.children.length} children
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                  <div className="text-sm text-indigo-100">Active Students</div>
                  <div className="text-2xl font-bold">{parentData.children.length}</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                  <div className="text-sm text-indigo-100">Avg Performance</div>
                  <div className="text-2xl font-bold">
                    {(parentData.children.reduce((sum, child) => sum + child.cgpa, 0) / parentData.children.length).toFixed(1)}
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Users className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Children Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {parentData.children.map((child) => (
          <Card 
            key={child.id} 
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedChild.id === child.id 
                ? 'ring-2 ring-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => setSelectedChild(child)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 ring-2 ring-indigo-200">
                  <AvatarImage src={`/api/placeholder/48/48?name=${child.name}`} />
                  <AvatarFallback className="bg-indigo-500 text-white">
                    {child.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{child.name}</h3>
                  <p className="text-sm text-gray-600">{child.rollNo}</p>
                  <p className="text-xs text-gray-500">{child.class}</p>
                </div>
              </div>
              <Badge variant={child.feeBalance > 0 ? 'destructive' : 'default'} className="text-xs">
                {child.feeBalance > 0 ? 'Fee Due' : 'All Clear'}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-indigo-600">{child.cgpa}</div>
                <div className="text-xs text-gray-500">CGPA</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${child.attendance >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                  {child.attendance}%
                </div>
                <div className="text-xs text-gray-500">Attendance</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${child.feeBalance > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                  ₹{child.feeBalance.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">Due Amount</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Last Active:</span>
                <span className="text-gray-700 font-medium">{child.lastActive}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">Academic Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="communication">Messages</TabsTrigger>
        </TabsList>

        {/* Academic Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Detailed Child Info */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-indigo-600" />
                  {selectedChild.name}'s Academic Progress
                </h3>
                <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                  {selectedChild.class.split(' - ')[1]}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-indigo-50 rounded-xl">
                  <div className="text-2xl font-bold text-indigo-600">{selectedChild.cgpa}/10</div>
                  <div className="text-sm text-indigo-600">Current CGPA</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-xl">
                  <div className={`text-2xl font-bold ${selectedChild.attendance >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedChild.attendance}%
                  </div>
                  <div className="text-sm text-gray-500">Attendance</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">A</div>
                  <div className="text-sm text-purple-600">Last Grade</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <div className="text-sm text-orange-600">Assignments</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Academic Performance</span>
                    <span className="font-medium">{Math.round((selectedChild.cgpa / 10) * 100)}%</span>
                  </div>
                  <Progress value={(selectedChild.cgpa / 10) * 100} className="h-3" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Attendance Rate</span>
                    <span className="font-medium">{selectedChild.attendance}%</span>
                  </div>
                  <Progress 
                    value={selectedChild.attendance} 
                    className={`h-3 ${selectedChild.attendance < 75 ? '[&>div]:bg-red-500' : '[&>div]:bg-green-500'}`}
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Assignment Completion</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-3 [&>div]:bg-blue-500" />
                </div>
              </div>
            </Card>

            {/* Student Performance Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
                Performance Tracker
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {progressData.map((data, index) => (
                    <div key={index}>
                      <div className="text-gray-500 mb-2">{data.month}</div>
                      <div className="space-y-1">
                        <div className={`h-12 bg-indigo-200 rounded flex items-end justify-center relative`}>
                          <div 
                            className="bg-indigo-500 rounded w-full" 
                            style={{ height: `${(selectedChild.cgpa / 10) * 100}%` }}
                          />
                        </div>
                        <div className="text-xs font-medium">{selectedChild.cgpa}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center text-sm text-gray-600 mt-4">
                  Consistent upward trend in academic performance 📈
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {parentData.children.map((child) => (
              <Card key={child.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{child.name}</h3>
                  <Badge variant="outline" className="text-indigo-600">
                    {child.class.split(' ')[0]}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-3 bg-indigo-50 rounded-lg">
                      <div className="text-xl font-bold text-indigo-600">{child.cgpa}</div>
                      <div className="text-indigo-600">CGPA</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">{child.attendance}%</div>
                      <div className="text-green-600">Attendance</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span className="font-medium">{Math.round((child.cgpa / 10) * 100)}%</span>
                    </div>
                    <Progress value={(child.cgpa / 10) * 100} className="h-2" />
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      Rank in Class: <span className="font-medium text-gray-900">5th out of 45</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-indigo-600" />
              Attendance Report - {selectedChild.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-3xl font-bold text-green-600">156</div>
                <div className="text-sm text-green-600">Classes Attended</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <div className="text-3xl font-bold text-red-600">23</div>
                <div className="text-sm text-red-600">Classes Missed</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600">179</div>
                <div className="text-sm text-blue-600">Total Classes</div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Attendance</span>
                <span className="font-medium">{selectedChild.attendance}%</span>
              </div>
              <Progress value={selectedChild.attendance} className="h-4" />
              {selectedChild.attendance < 75 && (
                <Alert className="mt-4 border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-700">
                    Attendance is below the required 75% threshold. Please ensure regular attendance.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </Card>
        </TabsContent>

        {/* Communication Tab */}
        <TabsContent value="communication" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-indigo-600" />
              Recent Communications
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-indigo-500 text-white">SW</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-indigo-900">Dr. Sarah Williams</span>
                    <span className="text-xs text-indigo-600">2 hours ago</span>
                  </div>
                  <p className="text-sm text-indigo-700 mt-1">
                    Alex is showing great improvement in Data Structures. Please encourage him to 
                    continue the good work. Next assignment due on Friday.
                  </p>
                  <Button size="sm" variant="ghost" className="mt-2 p-0 text-indigo-600">
                    Reply
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-green-500 text-white">AD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-green-900">Admin Office</span>
                    <span className="text-xs text-green-600">1 day ago</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    Parent-teacher meeting scheduled for Oct 25, 2025 at 10:00 AM. 
                    Please confirm your attendance.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Confirm
                    </Button>
                    <Button size="sm" variant="outline" className="border-green-300 text-green-700">
                      Reschedule
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <CommonLayout
      userRole="Parent"
      userName={parentData.name}
      userAvatar="/api/placeholder/40/40"
      sidebarItems={sidebarItems}
      quickActions={<QuickActions />}
      notifications={notifications}
      roleTheme={roleTheme}
    >
      <DashboardContent />
    </CommonLayout>
  );
}