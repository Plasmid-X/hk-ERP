import React, { useState, ReactNode } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
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
  Shield
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  userRole: string;
  userName: string;
  userAvatar?: string;
}

const roleNavigation = {
  'Dean_Developer': [
    { icon: Shield, label: 'System Admin', path: '/admin' },
    { icon: Users, label: 'User Management', path: '/users' },
    { icon: Settings, label: 'System Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Audit Logs', path: '/audit' }
  ],
  'Admin': [
    { icon: Shield, label: 'System Admin', path: '/admin' },
    { icon: Users, label: 'User Management', path: '/users' },
    { icon: Settings, label: 'System Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Audit Logs', path: '/audit' }
  ],
  'Principal': [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Faculty', path: '/faculty' },
    { icon: BookOpen, label: 'Academics', path: '/academics' },
    { icon: Calendar, label: 'Events', path: '/events' }
  ],
  'Faculty': [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'My Students', path: '/students' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: UserCheck, label: 'Attendance', path: '/attendance' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' }
  ],
  'Student': [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: Calendar, label: 'Timetable', path: '/timetable' },
    { icon: DollarSign, label: 'Fees', path: '/fees' },
    { icon: Library, label: 'Library', path: '/library' }
  ],
  'Parent': [
    { icon: Home, label: 'Child Overview', path: '/child' },
    { icon: UserCheck, label: 'Attendance', path: '/attendance' },
    { icon: DollarSign, label: 'Fee Status', path: '/fees' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' }
  ],
  'Asset_Manager': [
    { icon: Building, label: 'Assets', path: '/assets' },
    { icon: Settings, label: 'Maintenance', path: '/maintenance' },
    { icon: DollarSign, label: 'Purchases', path: '/purchases' }
  ],
  'Hostel_Warden': [
    { icon: Building, label: 'Hostel Management', path: '/hostel' },
    { icon: Users, label: 'Residents', path: '/residents' },
    { icon: Settings, label: 'Facilities', path: '/facilities' }
  ],
  'Placement_Officer': [
    { icon: Briefcase, label: 'Job Drives', path: '/drives' },
    { icon: Users, label: 'Students', path: '/students' },
    { icon: Building, label: 'Companies', path: '/companies' }
  ],
  'Finance_Officer': [
    { icon: DollarSign, label: 'Finance Dashboard', path: '/finance' },
    { icon: Users, label: 'Fee Management', path: '/fees' },
    { icon: Settings, label: 'Accounts', path: '/accounts' }
  ],
  'Librarian': [
    { icon: Library, label: 'Library System', path: '/library' },
    { icon: BookOpen, label: 'Books', path: '/books' },
    { icon: Users, label: 'Members', path: '/members' }
  ],
  'Club_Event_Manager': [
    { icon: PartyPopper, label: 'Events', path: '/events' },
    { icon: Users, label: 'Clubs', path: '/clubs' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' }
  ],
  'Helpdesk_Officer': [
    { icon: HelpCircle, label: 'Support Tickets', path: '/tickets' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Settings, label: 'Knowledge Base', path: '/kb' }
  ]
};

export function Layout({ children, userRole, userName, userAvatar }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  
  const navigation = roleNavigation[userRole as keyof typeof roleNavigation] || [];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            {sidebarOpen && (
              <div>
                <div className="font-bold text-gray-900">EduManage</div>
                <div className="text-xs text-gray-500">College ERP</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.path}
                href={item.path}
                className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
              >
                <Icon className="h-5 w-5" />
                {sidebarOpen && <span>{item.label}</span>}
              </a>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userAvatar} />
              <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1">
                <div className="font-medium text-gray-900">{userName}</div>
                <Badge variant="secondary" className="text-xs">
                  {userRole.replace('_', ' ')}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  className="pl-10 w-96" 
                  placeholder="Search students, courses, faculty..."
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                  3
                </Badge>
              </Button>
              
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>

              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src={userAvatar} />
                <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* AI Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen ? (
          <div className="w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                <span className="font-medium">AI Assistant</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setChatOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 p-4 overflow-auto space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-blue-800">
                  Hello! I'm your AI assistant. How can I help you today?
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-700">
                  Show me attendance report for CS-2025 batch
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-blue-800">
                  I'll generate the attendance report for CS-2025 batch. Please wait...
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <Input placeholder="Type your message..." />
            </div>
          </div>
        ) : (
          <Button 
            onClick={() => setChatOpen(true)}
            className="rounded-full w-14 h-14 shadow-lg"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
}