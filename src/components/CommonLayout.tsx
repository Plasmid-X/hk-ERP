import React, { useState, ReactNode } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { 
  Search, 
  Bell, 
  Settings, 
  Menu, 
  X, 
  MessageCircle,
  Home,
  Users,
  BookOpen,
  Calendar,
  DollarSign,
  Building,
  UserCheck,
  Briefcase,
  Library,
  PartyPopper,
  HelpCircle,
  Shield,
  LogOut,
  User,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Info,
  Plus
} from 'lucide-react';

interface CommonLayoutProps {
  children: ReactNode;
  userRole: string;
  userName: string;
  userAvatar?: string;
  sidebarItems: Array<{
    icon: any;
    label: string;
    path: string;
    active?: boolean;
  }>;
  quickActions?: ReactNode;
  notifications?: Array<{
    id: string;
    type: 'info' | 'warning' | 'success' | 'error';
    title: string;
    message: string;
    time: string;
  }>;
  roleTheme?: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
}

const defaultNotifications = [
  {
    id: '1',
    type: 'info' as const,
    title: 'System Update',
    message: 'System maintenance scheduled for tonight',
    time: '2 hours ago'
  },
  {
    id: '2',
    type: 'success' as const,
    title: 'Payment Confirmed',
    message: 'Fee payment has been processed successfully',
    time: '1 day ago'
  },
  {
    id: '3',
    type: 'warning' as const,
    title: 'Assignment Due',
    message: 'Database project submission due tomorrow',
    time: '2 days ago'
  }
];

export function CommonLayout({ 
  children, 
  userRole, 
  userName, 
  userAvatar,
  sidebarItems,
  quickActions,
  notifications = defaultNotifications,
  roleTheme = {
    primary: 'bg-blue-600',
    secondary: 'bg-blue-50',
    accent: 'text-blue-600',
    gradient: 'from-blue-500 to-purple-600'
  }
}: CommonLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'error': return AlertCircle;
      default: return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Left Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white shadow-lg border-r border-gray-200 flex flex-col`}>
        {/* Logo & Brand */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${roleTheme.primary} rounded-xl flex items-center justify-center shadow-md`}>
              <span className="text-white font-bold">E</span>
            </div>
            {sidebarOpen && (
              <div>
                <div className="font-bold text-gray-900">EduManage</div>
                <div className="text-xs text-gray-500 capitalize">
                  {userRole.replace('_', ' ')} Portal
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                  item.active 
                    ? `${roleTheme.primary} text-white shadow-md` 
                    : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm'
                }`}
              >
                <Icon className="h-5 w-5" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-gray-200">
              <AvatarImage src={userAvatar} />
              <AvatarFallback className={roleTheme.primary}>
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-sm">{userName}</div>
                <Badge variant="secondary" className="text-xs mt-1">
                  {userRole.replace('_', ' ')}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Toggle & Search */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hover:bg-gray-100 rounded-xl"
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  className="pl-10 w-80 bg-gray-50 border-gray-200 rounded-xl focus:bg-white transition-colors" 
                  placeholder="Search anything..."
                />
              </div>
            </div>

            {/* Right Side - Actions & Profile */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative hover:bg-gray-100 rounded-xl">
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                        {notifications.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 p-0">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => {
                      const Icon = getNotificationIcon(notification.type);
                      return (
                        <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                          <div className="flex items-start gap-3">
                            <Icon className={`h-5 w-5 mt-0.5 ${getNotificationColor(notification.type).split(' ')[0]}`} />
                            <div className="flex-1">
                              <div className="font-medium text-sm">{notification.title}</div>
                              <div className="text-sm text-gray-600 mt-1">{notification.message}</div>
                              <div className="text-xs text-gray-400 mt-2">{notification.time}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Settings */}
              <Button variant="ghost" size="sm" className="hover:bg-gray-100 rounded-xl">
                <Settings className="h-5 w-5" />
              </Button>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100 rounded-xl p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userAvatar} />
                      <AvatarFallback className={roleTheme.primary}>
                        {userName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <div className="font-medium">{userName}</div>
                    <div className="text-sm text-gray-500">{userRole.replace('_', ' ')}</div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content with Right Sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Center Content Area */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>

          {/* Right Sidebar - Quick Actions & Alerts */}
          {quickActions && (
            <aside className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Quick Actions */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  {quickActions}
                </div>

                {/* Recent Alerts */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Recent Alerts</h3>
                  <div className="space-y-3">
                    {notifications.slice(0, 3).map((notification) => {
                      const Icon = getNotificationIcon(notification.type);
                      return (
                        <Card key={notification.id} className={`p-3 border ${getNotificationColor(notification.type)}`}>
                          <div className="flex items-start gap-2">
                            <Icon className="h-4 w-4 mt-0.5" />
                            <div className="flex-1">
                              <div className="font-medium text-sm">{notification.title}</div>
                              <div className="text-xs mt-1 opacity-80">{notification.message}</div>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* AI Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen ? (
          <Card className="w-80 h-96 shadow-2xl flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <span className="font-medium">AI Assistant</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setChatOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 p-4 overflow-auto space-y-3 bg-gray-50">
              <div className="bg-white p-3 rounded-xl shadow-sm border">
                <div className="text-sm text-gray-700">
                  Hello! I'm your AI assistant. How can I help you today?
                </div>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-xl ml-8">
                <div className="text-sm">
                  Show me today's schedule
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl shadow-sm border">
                <div className="text-sm text-gray-700">
                  Here's your schedule for today. You have 3 classes and 2 meetings.
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Type your message..." 
                  className="flex-1 rounded-xl"
                />
                <Button size="sm" className="rounded-xl">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Button 
            onClick={() => setChatOpen(true)}
            className={`rounded-full w-14 h-14 shadow-xl bg-gradient-to-r ${roleTheme.gradient} hover:shadow-2xl transition-all duration-300`}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
}