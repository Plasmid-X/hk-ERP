import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Skeleton } from './ui/skeleton';
import { Checkbox } from './ui/checkbox';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, Bell, Upload, Calendar, Users, BookOpen, MoreHorizontal } from 'lucide-react';

export function ComponentLibrary() {
  const [progress, setProgress] = useState(65);

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1>Component Library</h1>
        <p className="text-muted-foreground">
          Comprehensive component library for College ERP System
        </p>
      </div>

      <Tabs defaultValue="atoms" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="atoms">Atoms</TabsTrigger>
          <TabsTrigger value="molecules">Molecules</TabsTrigger>
          <TabsTrigger value="organisms">Organisms</TabsTrigger>
        </TabsList>

        {/* ATOMS */}
        <TabsContent value="atoms" className="space-y-6">
          {/* Buttons */}
          <Card className="p-6">
            <h3 className="mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Primary Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Danger</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              States: default, hover, pressed, disabled, loading
            </div>
          </Card>

          {/* Form Elements */}
          <Card className="p-6">
            <h3 className="mb-4">Form Elements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Input Field</label>
                <Input placeholder="Enter text..." />
              </div>
              <div>
                <label className="block text-sm mb-2">Select Dropdown</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm mb-2">Textarea</label>
                <Textarea placeholder="Enter description..." />
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="checkbox1" />
                  <label htmlFor="checkbox1">Checkbox option</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="switch1" />
                  <label htmlFor="switch1">Toggle switch</label>
                </div>
              </div>
            </div>
          </Card>

          {/* Visual Elements */}
          <Card className="p-6">
            <h3 className="mb-4">Visual Elements</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm mb-2">Avatar</label>
                <Avatar>
                  <AvatarImage src="/api/placeholder/40/40" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <label className="block text-sm mb-2">Badges</label>
                <div className="space-y-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Error</Badge>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2">Progress</label>
                <Progress value={progress} className="w-full" />
                <div className="text-xs text-muted-foreground mt-1">{progress}%</div>
              </div>
              <div>
                <label className="block text-sm mb-2">Skeleton</label>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* MOLECULES */}
        <TabsContent value="molecules" className="space-y-6">
          {/* Search Bar */}
          <Card className="p-6">
            <h3 className="mb-4">Search Bar with Suggestions</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-10 pr-4" 
                placeholder="Search students, faculty, courses..."
              />
              <div className="absolute top-full left-0 right-0 bg-white border rounded-md mt-1 shadow-lg z-10 hidden group-focus-within:block">
                <div className="p-2 hover:bg-gray-50 cursor-pointer">John Doe - Student</div>
                <div className="p-2 hover:bg-gray-50 cursor-pointer">Dr. Smith - Faculty</div>
                <div className="p-2 hover:bg-gray-50 cursor-pointer">Computer Science - Course</div>
              </div>
            </div>
          </Card>

          {/* Table Row */}
          <Card className="p-6">
            <h3 className="mb-4">Data Table Row</h3>
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b">
                <div className="font-medium">Name</div>
                <div className="font-medium">Roll No</div>
                <div className="font-medium">Class</div>
                <div className="font-medium">Status</div>
                <div className="font-medium">Actions</div>
              </div>
              <div className="grid grid-cols-5 gap-4 p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>John Doe</span>
                </div>
                <div>CS2025001</div>
                <div>B.Tech CSE</div>
                <div>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Card Variants */}
          <Card className="p-6">
            <h3 className="mb-4">Card Variants</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Total Students</span>
                </div>
                <div className="text-2xl font-bold">2,847</div>
                <div className="text-sm text-green-600">+12% from last month</div>
              </Card>
              
              <Card className="p-4 border-blue-200 bg-blue-50">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Active Courses</span>
                </div>
                <div className="text-2xl font-bold text-blue-700">156</div>
                <div className="text-sm text-blue-600">Across 8 departments</div>
              </Card>

              <Card className="p-4 border-yellow-200 bg-yellow-50">
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium">Pending Tasks</span>
                </div>
                <div className="text-2xl font-bold text-yellow-700">23</div>
                <div className="text-sm text-yellow-600">Requires attention</div>
              </Card>
            </div>
          </Card>

          {/* Notification Toast */}
          <Card className="p-6">
            <h3 className="mb-4">Notification Components</h3>
            <div className="space-y-4">
              <Alert>
                <Bell className="h-4 w-4" />
                <AlertDescription>
                  New fee structure has been updated for the current semester.
                </AlertDescription>
              </Alert>
              
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-700">
                  ✓ Attendance marked successfully for CS101 - Morning batch
                </AlertDescription>
              </Alert>

              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">
                  ⚠️ Low attendance alert: 3 students below 75% threshold
                </AlertDescription>
              </Alert>
            </div>
          </Card>

          {/* File Uploader */}
          <Card className="p-6">
            <h3 className="mb-4">File Uploader</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <div className="text-sm text-gray-600 mb-1">
                Drop files here or <span className="text-blue-600">browse</span>
              </div>
              <div className="text-xs text-gray-400">
                Supports: PDF, DOC, XLS, JPG (Max 10MB)
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* ORGANISMS */}
        <TabsContent value="organisms" className="space-y-6">
          {/* Navigation Bar */}
          <Card className="p-6">
            <h3 className="mb-4">Top Navigation Bar</h3>
            <div className="bg-white border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="font-bold text-blue-600">EduManage</div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-10 w-80" placeholder="Search..." />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <Avatar>
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </Card>

          {/* Data Table with Filters */}
          <Card className="p-6">
            <h3 className="mb-4">Advanced Data Table</h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cse">CSE</SelectItem>
                    <SelectItem value="ece">ECE</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">Reset Filters</Button>
              </div>
              
              <div className="border rounded-lg">
                <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b">
                  <div className="font-medium">Student</div>
                  <div className="font-medium">Roll No</div>
                  <div className="font-medium">Attendance %</div>
                  <div className="font-medium">CGPA</div>
                  <div className="font-medium">Status</div>
                  <div className="font-medium">Actions</div>
                </div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>S{i}</AvatarFallback>
                      </Avatar>
                      <span>Student {i}</span>
                    </div>
                    <div>CS202500{i}</div>
                    <div className="flex items-center gap-2">
                      <Progress value={85 + i} className="w-16" />
                      <span className="text-sm">{85 + i}%</span>
                    </div>
                    <div>8.{5 + i}</div>
                    <Badge variant="secondary">Active</Badge>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Analytics Card */}
          <Card className="p-6">
            <h3 className="mb-4">Analytics Dashboard Card</h3>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium">Student Performance</h4>
                <Button variant="secondary" size="sm">View Details</Button>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-2xl font-bold">94.2%</div>
                  <div className="text-blue-100">Avg Attendance</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">8.7</div>
                  <div className="text-blue-100">Avg CGPA</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-blue-100">Active Students</div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Developer Notes */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="mb-4 text-blue-800">Developer Implementation Notes</h3>
        <div className="text-sm text-blue-700 space-y-2">
          <p>• All components support light/dark theme variants</p>
          <p>• State management: useState for local, Context for global</p>
          <p>• Accessibility: ARIA labels, keyboard navigation, focus management</p>
          <p>• Responsive: Mobile-first design with Tailwind breakpoints</p>
          <p>• Animation: Framer Motion for complex transitions</p>
        </div>
      </Card>
    </div>
  );
}