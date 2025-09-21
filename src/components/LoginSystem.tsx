import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Shield, 
  Eye, 
  EyeOff,
  Smartphone,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface LoginSystemProps {
  onLogin: (role: string, userData: any) => void;
}

const roleOptions = [
  { 
    value: 'Student', 
    label: 'Student', 
    icon: GraduationCap,
    description: 'Access courses, assignments, and academic progress',
    color: 'bg-blue-500',
    sample: { username: 'alex.johnson', password: 'student123' }
  },
  { 
    value: 'Parent', 
    label: 'Parent/Guardian', 
    icon: Users,
    description: 'Monitor your child\'s academic progress and activities',
    color: 'bg-green-500',
    sample: { username: 'parent.johnson', password: 'parent123' }
  },
  { 
    value: 'Faculty', 
    label: 'Teacher/Faculty', 
    icon: BookOpen,
    description: 'Manage classes, grades, and student interactions',
    color: 'bg-purple-500',
    sample: { username: 'dr.williams', password: 'faculty123' }
  },
  { 
    value: 'Admin', 
    label: 'Admin/Developer', 
    icon: Shield,
    description: 'System administration and analytics dashboard',
    color: 'bg-orange-500',
    sample: { username: 'admin.system', password: 'admin123' }
  }
];

export function LoginSystem({ onLogin }: LoginSystemProps) {
  const [selectedRole, setSelectedRole] = useState('Student');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginTab, setLoginTab] = useState('login');

  const currentRole = roleOptions.find(r => r.value === selectedRole);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        role: selectedRole,
        username: credentials.username || currentRole?.sample.username,
        name: selectedRole === 'Student' ? 'Alex Johnson' :
              selectedRole === 'Parent' ? 'Michael Johnson' :
              selectedRole === 'Faculty' ? 'Dr. Sarah Williams' :
              'System Administrator',
        avatar: `/api/placeholder/40/40`,
        lastLogin: new Date().toISOString()
      };
      
      onLogin(selectedRole, userData);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickLogin = (role: string) => {
    const roleData = roleOptions.find(r => r.value === role);
    if (roleData) {
      setCredentials(roleData.sample);
      setSelectedRole(role);
      setTimeout(() => handleLogin({ preventDefault: () => {} } as React.FormEvent), 100);
    }
  };

  if (twoFactorEnabled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 shadow-xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold">Two-Factor Authentication</h2>
            <p className="text-gray-600 mt-2">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="000000"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                className="text-center text-2xl tracking-wider"
                maxLength={6}
              />
            </div>
            
            <Button 
              className="w-full"
              onClick={() => onLogin(selectedRole, { role: selectedRole })}
              disabled={twoFactorCode.length !== 6}
            >
              Verify & Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => setTwoFactorEnabled(false)}
            >
              Back to Login
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Welcome Section */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">EduManage</h1>
            </div>
            <p className="text-xl text-gray-600 mb-6">
              Next-Generation College ERP System
            </p>
            <p className="text-gray-500">
              Streamlined education management for students, parents, faculty, and administrators
            </p>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-2 gap-3">
            {roleOptions.map((role) => {
              const Icon = role.icon;
              return (
                <Card 
                  key={role.value}
                  className="p-4 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                  onClick={() => handleQuickLogin(role.value)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${role.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{role.label}</div>
                      <div className="text-xs text-gray-500">Quick Login</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Demo Credentials */}
          <Card className="p-4 bg-amber-50 border-amber-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800">Demo Access</h4>
                <p className="text-sm text-amber-700 mt-1">
                  Click any role card above for quick demo login, or use the form with sample credentials
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Login Form */}
        <Card className="p-8 shadow-2xl">
          <Tabs value={loginTab} onValueChange={setLoginTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Welcome Back</h2>
                <p className="text-gray-600 mt-1">Sign in to your account</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Role</label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map(role => (
                        <SelectItem key={role.value} value={role.value}>
                          <div className="flex items-center gap-2">
                            <role.icon className="h-4 w-4" />
                            {role.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {currentRole && (
                    <p className="text-xs text-gray-500 mt-1">{currentRole.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Username / Email</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder={currentRole?.sample.username || "Enter username or email"}
                      value={credentials.username}
                      onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={rememberMe}
                      onCheckedChange={setRememberMe}
                    />
                    <label htmlFor="remember" className="text-sm">Remember me</label>
                  </div>
                  <Button variant="link" className="text-sm p-0">
                    Forgot password?
                  </Button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setTwoFactorEnabled(true)}
                    type="button"
                  >
                    <Smartphone className="mr-2 h-4 w-4" />
                    Enable 2FA Login
                  </Button>
                </div>
              </form>

              {/* Sample Credentials Display */}
              {currentRole && (
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Sample Credentials</span>
                  </div>
                  <div className="text-xs text-blue-700 space-y-1">
                    <div>Username: <code className="bg-white px-1 rounded">{currentRole.sample.username}</code></div>
                    <div>Password: <code className="bg-white px-1 rounded">{currentRole.sample.password}</code></div>
                  </div>
                </Card>
              )}
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup" className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Create Account</h2>
                <p className="text-gray-600 mt-1">Join our educational platform</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input type="email" placeholder="john.doe@college.edu" className="pl-10" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map(role => (
                        <SelectItem key={role.value} value={role.value}>
                          <div className="flex items-center gap-2">
                            <role.icon className="h-4 w-4" />
                            {role.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <Input type="password" placeholder="Create a strong password" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <Input type="password" placeholder="Confirm your password" />
                </div>

                <Button className="w-full">
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}