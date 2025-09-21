import React, { useState } from 'react';
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
  CheckCircle, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  FileText,
  MessageSquare,
  Star,
  UserCheck,
  GraduationCap,
  ClipboardCheck
} from 'lucide-react';

interface FacultyDashboardProps {
  facultyData?: {
    name: string;
    department: string;
    courses: number;
    students: number;
    classesToday: number;
  };
}

export function FacultyDashboard({ facultyData = {
  name: 'Dr. Sarah Williams',
  department: 'Computer Science',
  courses: 3,
  students: 156,
  classesToday: 4
}}: FacultyDashboardProps) {
  const [selectedStudent, setSelectedStudent] = useState('');

  const todayClasses = [
    { course: 'Data Structures & Algorithms', time: '09:00 AM', room: 'CS-101', students: 45, type: 'Lecture' },
    { course: 'Advanced Database Systems', time: '11:00 AM', room: 'CS-Lab-2', students: 30, type: 'Lab' },
    { course: 'Software Engineering', time: '02:00 PM', room: 'CS-105', students: 38, type: 'Tutorial' },
    { course: 'Capstone Project Review', time: '04:00 PM', room: 'CS-201', students: 12, type: 'Seminar' },
  ];

  const menteeList = [
    { name: 'Alex Johnson', rollNo: 'CS2025001', cgpa: 8.7, attendance: 87, lastContact: '2 days ago', status: 'good' },
    { name: 'Sarah Chen', rollNo: 'CS2025002', cgpa: 9.2, attendance: 95, lastContact: '1 week ago', status: 'excellent' },
    { name: 'Mike Rodriguez', rollNo: 'CS2025003', cgpa: 6.8, attendance: 72, lastContact: '3 days ago', status: 'warning' },
    { name: 'Emily Davis', rollNo: 'CS2025004', cgpa: 8.1, attendance: 89, lastContact: '1 day ago', status: 'good' },
  ];

  const pendingTasks = [
    { task: 'Grade Midterm Exams - DS&A', due: 'Today', priority: 'high' },
    { task: 'Upload Assignment 3 - Database', due: 'Tomorrow', priority: 'medium' },
    { task: 'Mentor Meeting - Alex Johnson', due: 'Sep 25', priority: 'medium' },
    { task: 'Submit Course Feedback Report', due: 'Sep 28', priority: 'low' },
  ];

  const recentSubmissions = [
    { student: 'Alex Johnson', assignment: 'Binary Tree Implementation', course: 'DS&A', submittedAt: '2 hours ago', status: 'pending' },
    { student: 'Sarah Chen', assignment: 'Database Normalization', course: 'DBMS', submittedAt: '4 hours ago', status: 'reviewed' },
    { student: 'Mike Rodriguez', assignment: 'UML Diagrams', course: 'Software Engg', submittedAt: '1 day ago', status: 'pending' },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {facultyData.name}! 📚
          </h1>
          <p className="text-gray-600">
            {facultyData.department} Department • {facultyData.courses} Active Courses
          </p>
        </div>
        <div className="flex gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserCheck className="h-4 w-4 mr-2" />
            Mark Attendance
          </Button>
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Announcement
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Classes Today</div>
              <div className="text-xl font-bold">{facultyData.classesToday}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Students</div>
              <div className="text-xl font-bold">{facultyData.students}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Pending Reviews</div>
              <div className="text-xl font-bold">12</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <GraduationCap className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Mentees</div>
              <div className="text-xl font-bold">25</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Alerts */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-700">
          3 students in your mentee group have attendance below 75%. Consider scheduling meetings.
        </AlertDescription>
      </Alert>

      {/* Main Content */}
      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
          <TabsTrigger value="mentees">My Mentees</TabsTrigger>
          <TabsTrigger value="grading">Grading Queue</TabsTrigger>
          <TabsTrigger value="analytics">Class Analytics</TabsTrigger>
        </TabsList>

        {/* Today's Schedule */}
        <TabsContent value="schedule" className="space-y-4">
          <div className="grid gap-4">
            {todayClasses.map((class_, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-[80px]">
                      <div className="text-lg font-semibold text-blue-600">{class_.time}</div>
                      <div className="text-xs text-gray-500">{class_.room}</div>
                    </div>
                    <div>
                      <h4 className="font-semibold">{class_.course}</h4>
                      <p className="text-sm text-gray-600">{class_.students} students • {class_.type}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Materials
                    </Button>
                    <Button size="sm">
                      <UserCheck className="h-4 w-4 mr-2" />
                      Attendance
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Mentees Tab */}
        <TabsContent value="mentees" className="space-y-4">
          <div className="grid gap-4">
            {menteeList.map((mentee, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {mentee.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{mentee.name}</h4>
                        <Badge variant={
                          mentee.status === 'excellent' ? 'default' : 
                          mentee.status === 'warning' ? 'destructive' : 'secondary'
                        }>
                          {mentee.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{mentee.rollNo}</p>
                      <p className="text-xs text-gray-500">Last contact: {mentee.lastContact}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      <span className="text-gray-500">CGPA:</span> 
                      <span className="font-semibold ml-1">{mentee.cgpa}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Attendance:</span> 
                      <span className={`font-semibold ml-1 ${mentee.attendance < 75 ? 'text-red-600' : 'text-green-600'}`}>
                        {mentee.attendance}%
                      </span>
                    </div>
                    <Button size="sm" variant="outline" className="mt-2">
                      Schedule Meeting
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Grading Queue */}
        <TabsContent value="grading" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Recent Submissions</h3>
            <Badge variant="secondary">{recentSubmissions.length} pending</Badge>
          </div>
          
          <div className="grid gap-3">
            {recentSubmissions.map((submission, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{submission.assignment}</h4>
                    <p className="text-sm text-gray-600">
                      {submission.student} • {submission.course}
                    </p>
                    <p className="text-xs text-gray-500">Submitted {submission.submittedAt}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={submission.status === 'reviewed' ? 'default' : 'destructive'}>
                      {submission.status}
                    </Badge>
                    <Button size="sm">
                      {submission.status === 'reviewed' ? 'View Grade' : 'Grade Now'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Class Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance Overview */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Class Attendance Overview</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Data Structures & Algorithms</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Advanced Database Systems</span>
                    <span className="font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Software Engineering</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </Card>

            {/* Performance Metrics */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">8.4</div>
                  <div className="text-sm text-gray-500">Avg Class CGPA</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">94%</div>
                  <div className="text-sm text-gray-500">Assignment Completion</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">4.6</div>
                  <div className="text-sm text-gray-500">Teaching Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">23</div>
                  <div className="text-sm text-gray-500">Hours/Week</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Student Performance Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Student Performance Distribution</h3>
            <div className="grid grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-green-600">15</div>
                <div className="text-sm text-gray-500">Excellent (9-10)</div>
              </div>
              <div>
                <div className="text-xl font-bold text-blue-600">45</div>
                <div className="text-sm text-gray-500">Good (8-8.9)</div>
              </div>
              <div>
                <div className="text-xl font-bold text-yellow-600">72</div>
                <div className="text-sm text-gray-500">Average (7-7.9)</div>
              </div>
              <div>
                <div className="text-xl font-bold text-orange-600">18</div>
                <div className="text-sm text-gray-500">Below Avg (6-6.9)</div>
              </div>
              <div>
                <div className="text-xl font-bold text-red-600">6</div>
                <div className="text-sm text-gray-500">Poor (&lt;6)</div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions Sidebar */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 space-y-2 z-40">
        <Button 
          size="sm" 
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={() => alert('Quick attendance marking for current class')}
        >
          <ClipboardCheck className="h-4 w-4 mr-2" />
          Quick Attendance
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => alert('Create new assignment')}
        >
          <FileText className="h-4 w-4 mr-2" />
          New Assignment
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => alert('Send emergency notification')}
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          SOS Alert
        </Button>
      </div>
    </div>
  );
}