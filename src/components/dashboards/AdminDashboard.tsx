import React, { useState } from 'react';
import { CommonLayout } from '../CommonLayout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Users, 
  DollarSign, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle,
  Shield,
  Database,
  Activity,
  BarChart3,
  Settings,
  UserPlus,
  Building,
  Calendar,
  FileText,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Server,
  Wifi,
  HardDrive,
  Home,
  Monitor,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  PieChart,
  LineChart,
  Globe,
  Cpu,
  MemoryStick,
  AlertCircle
} from 'lucide-react';

interface AdminDashboardProps {
  adminData?: {
    name: string;
    role: string;
    lastLogin: string;
  };
}

export function AdminDashboard({ adminData = {
  name: 'System Administrator',
  role: 'Super Admin',
  lastLogin: '2 hours ago'
}}: AdminDashboardProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');

  // Sidebar navigation items for Admin
  const sidebarItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard', active: true },
    { icon: Users, label: 'User Management', path: '/users' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Database, label: 'System Health', path: '/system' },
    { icon: DollarSign, label: 'Finance', path: '/finance' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: FileText, label: 'Reports', path: '/reports' }
  ];

  // Role theme - Grey/Black with Orange highlights, analytical
  const roleTheme = {
    primary: 'bg-gradient-to-r from-gray-800 to-black',
    secondary: 'bg-gray-50',
    accent: 'text-orange-600',
    gradient: 'from-gray-800 to-black'
  };

  const systemMetrics = {
    totalUsers: 2847,
    activeUsers: 2156,
    totalRevenue: 45600000,
    pendingFees: 2300000,
    systemUptime: 99.9,
    storageUsed: 78,
    apiCalls: 125000,
    errorRate: 0.2
  };

  const userStats = [
    { role: 'Students', count: 2156, active: 1834, percentage: 85, growth: '+12%' },
    { role: 'Faculty', count: 287, active: 245, percentage: 85, growth: '+3%' },
    { role: 'Parents', count: 1890, active: 1234, percentage: 65, growth: '+8%' },
    { role: 'Staff', count: 145, active: 132, percentage: 91, growth: '+1%' }
  ];

  const systemAlerts = [
    { type: 'critical', message: 'Server disk usage above 80%', time: '10 mins ago', severity: 'high' },
    { type: 'warning', message: '15 students with attendance below 75%', time: '1 hour ago', severity: 'medium' },
    { type: 'info', message: 'Monthly report generation scheduled', time: '2 hours ago', severity: 'low' }
  ];

  const notifications = [
    {
      id: '1',
      type: 'error' as const,
      title: 'Critical System Alert',
      message: 'Database connection pool reaching capacity',
      time: '5 mins ago'
    },
    {
      id: '2',
      type: 'warning' as const,
      title: 'Performance Degradation',
      message: 'API response time increased by 15%',
      time: '30 mins ago'
    },
    {
      id: '3',
      type: 'info' as const,
      title: 'Scheduled Maintenance',
      message: 'System backup completed successfully',
      time: '2 hours ago'
    }
  ];

  const recentActivities = [
    { user: 'Dr. Sarah Williams', action: 'Updated course syllabus', time: '5 mins ago', type: 'academic' },
    { user: 'Finance Dept', action: 'Generated fee reports', time: '15 mins ago', type: 'financial' },
    { user: 'System', action: 'Automated backup completed', time: '30 mins ago', type: 'system' },
    { user: 'Alex Johnson', action: 'Fee payment processed', time: '1 hour ago', type: 'student' },
    { user: 'Admin Portal', action: 'New user accounts created', time: '2 hours ago', type: 'administrative' }
  ];

  const departmentKPIs = [
    { name: 'Computer Science', students: 450, revenue: 5400000, efficiency: 94 },
    { name: 'Electronics', students: 380, revenue: 4560000, efficiency: 89 },
    { name: 'Mechanical', students: 420, revenue: 5040000, efficiency: 92 },
    { name: 'Civil', students: 350, revenue: 4200000, efficiency: 87 }
  ];

  // Quick Actions Component
  const QuickActions = () => (
    <div className="space-y-3">
      <Button className="w-full justify-start bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 text-white">
        <UserPlus className="h-4 w-4 mr-2" />
        Add New User
      </Button>
      <Button className="w-full justify-start text-orange-600 border-orange-200 hover:bg-orange-50" variant="outline">
        <Download className="h-4 w-4 mr-2" />
        Export Reports
      </Button>
      <Button className="w-full justify-start" variant="outline">
        <RefreshCw className="h-4 w-4 mr-2" />
        System Backup
      </Button>
      <Button className="w-full justify-start" variant="outline">
        <Settings className="h-4 w-4 mr-2" />
        Manage Settings
      </Button>
      <Button className="w-full justify-start" variant="outline">
        <Monitor className="h-4 w-4 mr-2" />
        System Logs
      </Button>
    </div>
  );

  // Main Dashboard Content
  const DashboardContent = () => (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Welcome Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                System Control Center 🛡️
              </h1>
              <p className="text-gray-300 text-lg">
                {adminData.name} • {adminData.role} • Last login: {adminData.lastLogin}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-orange-500/20">
                  <div className="text-sm text-gray-300">System Uptime</div>
                  <div className="text-2xl font-bold text-orange-400">{systemMetrics.systemUptime}%</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-orange-500/20">
                  <div className="text-sm text-gray-300">Active Users</div>
                  <div className="text-2xl font-bold text-orange-400">{systemMetrics.activeUsers.toLocaleString()}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-orange-500/20">
                  <div className="text-sm text-gray-300">API Calls</div>
                  <div className="text-2xl font-bold text-orange-400">{(systemMetrics.apiCalls / 1000).toFixed(0)}K</div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-orange-500/20">
                <Shield className="h-16 w-16 text-orange-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Critical System Alerts */}
      {systemAlerts.filter(alert => alert.severity === 'high').map((alert, index) => (
        <Alert key={index} className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700 flex items-center justify-between">
            <span><strong>CRITICAL:</strong> {alert.message}</span>
            <Button size="sm" className="bg-red-600 hover:bg-red-700">
              Resolve Now
            </Button>
          </AlertDescription>
        </Alert>
      ))}

      {/* System KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-700">{systemMetrics.totalUsers.toLocaleString()}</div>
              <div className="text-sm text-blue-600">Total Users</div>
              <div className="text-xs text-blue-500">↑ 12% this month</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-600 rounded-xl">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-700">₹{(systemMetrics.totalRevenue / 10000000).toFixed(1)}Cr</div>
              <div className="text-sm text-green-600">Total Revenue</div>
              <div className="text-xs text-green-500">↑ 8% this month</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-600 rounded-xl">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-700">{systemMetrics.systemUptime}%</div>
              <div className="text-sm text-orange-600">System Uptime</div>
              <div className="text-xs text-orange-500">Last 30 days</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-600 rounded-xl">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-700">₹{(systemMetrics.pendingFees / 1000000).toFixed(1)}L</div>
              <div className="text-sm text-red-600">Pending Fees</div>
              <div className="text-xs text-red-500">↓ 5% this week</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Statistics */}
            <Card className="p-6 bg-white border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-700" />
                User Activity Overview
              </h3>
              <div className="space-y-4">
                {userStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{stat.role}</div>
                        <div className="text-sm text-gray-600">{stat.active} active of {stat.count} total</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{stat.percentage}%</div>
                      <div className="text-sm text-green-600 font-medium">{stat.growth}</div>
                      <Progress value={stat.percentage} className="w-20 h-2 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent System Activities */}
            <Card className="p-6 bg-white border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-gray-700" />
                System Activity Log
              </h3>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'system' ? 'bg-orange-500' :
                      activity.type === 'financial' ? 'bg-green-500' :
                      activity.type === 'academic' ? 'bg-blue-500' : 'bg-purple-500'
                    }`} />
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </div>
                      <div className="text-xs text-gray-500">{activity.time}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Department KPIs */}
          <Card className="p-6 bg-white border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Building className="h-5 w-5 text-gray-700" />
              Department Performance Metrics
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-semibold text-gray-700">Department</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Students</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Revenue</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Efficiency</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentKPIs.map((dept, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-900">{dept.name}</td>
                      <td className="p-3 text-gray-700">{dept.students}</td>
                      <td className="p-3 text-gray-700">₹{(dept.revenue / 1000000).toFixed(1)}L</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Progress value={dept.efficiency} className="w-16 h-2" />
                          <span className="text-sm font-medium text-gray-700">{dept.efficiency}%</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-3 w-3" />
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

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card className="p-6 bg-white border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-700" />
                User Management Console
              </h3>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input className="pl-10 w-64" placeholder="Search users..." />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">2,847</div>
                <div className="text-sm text-blue-600">Total Users</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="text-2xl font-bold text-green-600">2,156</div>
                <div className="text-sm text-green-600">Active Today</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                <div className="text-2xl font-bold text-orange-600">23</div>
                <div className="text-sm text-orange-600">New This Week</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
                <div className="text-2xl font-bold text-red-600">5</div>
                <div className="text-sm text-red-600">Pending Approval</div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-semibold text-gray-700">User</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Role</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Department</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Last Login</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gray-500 text-white">SW</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">Dr. Sarah Williams</div>
                          <div className="text-sm text-gray-500">sarah.williams@college.edu</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-blue-600 border-blue-200">Faculty</Badge>
                    </td>
                    <td className="p-3 text-gray-700">Computer Science</td>
                    <td className="p-3">
                      <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                    </td>
                    <td className="p-3 text-gray-700">2 hours ago</td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* System Health Tab */}
        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Server className="h-5 w-5 text-gray-700" />
                  Server Status
                </h3>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">CPU Usage</span>
                  <span className="text-sm font-medium text-gray-900">45%</span>
                </div>
                <Progress value={45} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Memory Usage</span>
                  <span className="text-sm font-medium text-gray-900">62%</span>
                </div>
                <Progress value={62} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Disk Usage</span>
                  <span className="text-sm font-medium text-orange-600">78%</span>
                </div>
                <Progress value={78} className="h-2 [&>div]:bg-orange-500" />
              </div>
            </Card>

            <Card className="p-6 bg-white border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Database className="h-5 w-5 text-gray-700" />
                  Database Health
                </h3>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2.8M</div>
                  <div className="text-sm text-gray-500">Total Records</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">15ms</div>
                    <div className="text-xs text-blue-600">Avg Query Time</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">98%</div>
                    <div className="text-xs text-green-600">Index Hit Ratio</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Globe className="h-5 w-5 text-gray-700" />
                  Network Status
                </h3>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{systemMetrics.systemUptime}%</div>
                  <div className="text-sm text-gray-500">Uptime</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">125K</div>
                    <div className="text-xs text-orange-600">API Calls/day</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{systemMetrics.errorRate}%</div>
                    <div className="text-xs text-green-600">Error Rate</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <CommonLayout
      userRole="Admin"
      userName={adminData.name}
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