import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { LoginSystem } from './components/LoginSystem';
import { DesignTokens } from './components/DesignTokens';
import { ComponentLibrary } from './components/ComponentLibrary';
import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { FacultyDashboard } from './components/dashboards/FacultyDashboard';
import { TeacherDashboard } from './components/dashboards/TeacherDashboard';
import { ParentDashboard } from './components/dashboards/ParentDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { MultiAIWorkflow } from './components/MultiAIWorkflow';
import { DeveloperHandoff } from './components/DeveloperHandoff';
import { Button } from './components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Card } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { 
  Palette, 
  Layout as LayoutIcon, 
  Users, 
  Brain, 
  Code, 
  Monitor, 
  Tablet, 
  Smartphone,
  Eye,
  Settings,
  LogOut
} from 'lucide-react';

// Define all available roles
const roleOptions = [
  { value: 'Dean_Developer', label: 'Dean Developer', description: 'System administrator with full access' },
  { value: 'Principal', label: 'Principal', description: 'Academic oversight and administration' },
  { value: 'Asset_Manager', label: 'Asset Manager', description: 'Inventory and resource management' },
  { value: 'Faculty', label: 'Faculty', description: 'Teaching and student mentorship' },
  { value: 'Student', label: 'Student', description: 'Learning and academic activities' },
  { value: 'Parent', label: 'Parent', description: 'Child progress monitoring' },
  { value: 'Hostel_Warden', label: 'Hostel Warden', description: 'Hostel facility management' },
  { value: 'Placement_Officer', label: 'Placement Officer', description: 'Career services and placements' },
  { value: 'Finance_Officer', label: 'Finance Officer', description: 'Financial operations and fees' },
  { value: 'Librarian', label: 'Librarian', description: 'Library resources and services' },
  { value: 'Club_Event_Manager', label: 'Club Event Manager', description: 'Student activities and events' },
  { value: 'Helpdesk_Officer', label: 'Helpdesk Officer', description: 'Technical support and assistance' }
];

export default function App() {
  const [currentView, setCurrentView] = useState('overview');
  const [selectedRole, setSelectedRole] = useState('Student');
  const [devicePreview, setDevicePreview] = useState('desktop');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (role: string, user: any) => {
    setSelectedRole(role);
    setUserData(user);
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setCurrentView('overview');
  };

  const renderDashboard = () => {
    switch (selectedRole) {
      case 'Student':
        return <StudentDashboard />;
      case 'Faculty':
        return <FacultyDashboard />;
      case 'Teacher':
        return <TeacherDashboard />;
      case 'Parent':
        return <ParentDashboard />;
      case 'Admin':
      case 'Dean_Developer':
        return <AdminDashboard />;
      default:
        return (
          <div className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">
              {roleOptions.find(r => r.value === selectedRole)?.label} Dashboard
            </h2>
            <p className="text-gray-600 mb-4">
              {roleOptions.find(r => r.value === selectedRole)?.description}
            </p>
            <Badge variant="outline">Coming Soon</Badge>
          </div>
        );
    }
  };

  const getDeviceClasses = () => {
    switch (devicePreview) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-4xl mx-auto';
      default:
        return 'w-full';
    }
  };

  // Login Screen
  if (!isLoggedIn) {
    return <LoginSystem onLogin={handleLogin} />;
  }

  // Dashboard View
  if (currentView === 'dashboard') {
    return (
      <div className={`min-h-screen ${getDeviceClasses()}`}>
        {renderDashboard()}
        
        {/* Preview Controls */}
        <div className="fixed top-4 right-4 z-50 bg-white border rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2">
            <Select value={selectedRole} onValueChange={(value) => {
              setSelectedRole(value);
              // Mock login for role switching
              handleLogin(value, {
                role: value,
                name: value === 'Student' ? 'Alex Johnson' :
                      value === 'Parent' ? 'Michael Johnson' :
                      value === 'Faculty' || value === 'Teacher' ? 'Dr. Sarah Williams' :
                      value === 'Admin' || value === 'Dean_Developer' ? 'System Administrator' :
                      'Demo User'
              });
            }}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map(role => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex border rounded">
              <Button
                variant={devicePreview === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDevicePreview('desktop')}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={devicePreview === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDevicePreview('tablet')}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={devicePreview === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDevicePreview('mobile')}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
            
            <Button variant="outline" size="sm" onClick={() => setCurrentView('overview')}>
              <Eye className="h-4 w-4 mr-2" />
              Design System
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                College ERP — Role-Based Prototype & Design System
              </h1>
              <p className="text-gray-600 mt-1">
                Production-ready Figma prototype with complete component library and developer handoff
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="px-3 py-1">
                Next.js + TypeScript + Tailwind
              </Badge>
              <Button onClick={() => setIsLoggedIn(false)}>
                <Eye className="h-4 w-4 mr-2" />
                Login Demo
              </Button>
              <Button onClick={() => setCurrentView('dashboard')} variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Live Preview
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <Tabs value={currentView} onValueChange={setCurrentView}>
            <TabsList className="h-12 w-full justify-start rounded-none bg-transparent border-b-0">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <LayoutIcon className="h-4 w-4" />
                System Overview
              </TabsTrigger>
              <TabsTrigger value="tokens" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Design Tokens
              </TabsTrigger>
              <TabsTrigger value="components" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Component Library
              </TabsTrigger>
              <TabsTrigger value="ai-workflow" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                AI Agents
              </TabsTrigger>
              <TabsTrigger value="handoff" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Developer Handoff
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <Tabs value={currentView} onValueChange={setCurrentView}>
          {/* System Overview */}
          <TabsContent value="overview" className="space-y-6 p-6">
            {/* Role Dashboards Preview */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Role-Based Dashboards</h2>
              <p className="text-gray-600 mb-6">
                12 specialized dashboards tailored for different user roles in the college ecosystem
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {roleOptions.map((role) => (
                  <Card key={role.value} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{role.label}</h3>
                        <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                      </div>
                      <Users className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {['Student', 'Faculty', 'Teacher', 'Parent', 'Admin', 'Dean_Developer'].includes(role.value) ? 'Ready' : 'Preview'}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => {
                          setSelectedRole(role.value);
                          // Mock login for demo
                          handleLogin(role.value, {
                            role: role.value,
                            name: role.value === 'Student' ? 'Alex Johnson' :
                                  role.value === 'Parent' ? 'Michael Johnson' :
                                  role.value === 'Faculty' || role.value === 'Teacher' ? 'Dr. Sarah Williams' :
                                  role.value === 'Admin' || role.value === 'Dean_Developer' ? 'System Administrator' :
                                  'Demo User'
                          });
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Complete Design System</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Comprehensive design tokens, component library, and style guide with accessibility compliance
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Color palette & semantic tokens</li>
                  <li>• Typography & spacing scales</li>
                  <li>• 50+ reusable components</li>
                  <li>• WCAG AA compliance</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Multi-AI Integration</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Advanced AI workflow chain with ChatGPT, Perplexity, and Gemini for comprehensive analysis
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Multi-model AI chaining</li>
                  <li>• Source citation & confidence</li>
                  <li>• Google Sheets integration</li>
                  <li>• Research workflow automation</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Developer Ready</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Complete development handoff with code, APIs, database schema, and deployment guides
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• React + TypeScript components</li>
                  <li>• Prisma database schema</li>
                  <li>• API contract documentation</li>
                  <li>• Storybook integration</li>
                </ul>
              </Card>
            </div>

            {/* Technical Specifications */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Technical Architecture</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Frontend Stack</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">React 18</Badge>
                      <span>Component-based architecture</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">TypeScript</Badge>
                      <span>Type-safe development</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Tailwind CSS</Badge>
                      <span>Utility-first styling</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Shadcn/ui</Badge>
                      <span>Accessible component library</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Backend & Database</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Next.js API</Badge>
                      <span>Server-side API endpoints</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Prisma ORM</Badge>
                      <span>Type-safe database access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">PostgreSQL</Badge>
                      <span>Robust relational database</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Supabase</Badge>
                      <span>Backend-as-a-Service</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Sample Data Overview */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Sample Dataset</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">156</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">45</div>
                  <div className="text-sm text-gray-600">Faculty Members</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">23</div>
                  <div className="text-sm text-gray-600">Courses</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">8</div>
                  <div className="text-sm text-gray-600">Departments</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="tokens">
            <DesignTokens />
          </TabsContent>

          <TabsContent value="components">
            <ComponentLibrary />
          </TabsContent>

          <TabsContent value="ai-workflow">
            <MultiAIWorkflow />
          </TabsContent>

          <TabsContent value="handoff">
            <DeveloperHandoff />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}