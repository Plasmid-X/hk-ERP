import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Code, 
  Database, 
  Palette, 
  Download, 
  Copy, 
  ExternalLink,
  FileText,
  Settings,
  Layers,
  Zap
} from 'lucide-react';

export function DeveloperHandoff() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const primaryButtonCode = `export function PrimaryButton({children, onClick, disabled = false}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-5 py-2 rounded-lg text-white bg-[#0B61FF] hover:bg-[#0449CC] focus:outline-none focus:ring-2 focus:ring-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
    >
      {children}
    </button>
  );
}`;

  const dataTableCode = `export function DataTable({ columns, data, onSort, filters }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid gap-4 p-4 bg-gray-50 border-b" style={{gridTemplateColumns: \`repeat(\${columns.length}, 1fr)\`}}>
        {columns.map(col => (
          <div key={col.key} className="font-medium cursor-pointer flex items-center gap-1" onClick={() => onSort(col.key)}>
            {col.title}
            <ChevronUpDown className="h-4 w-4" />
          </div>
        ))}
      </div>
      {data.map((row, idx) => (
        <div key={idx} className="grid gap-4 p-4 hover:bg-gray-50 border-b last:border-b-0" style={{gridTemplateColumns: \`repeat(\${columns.length}, 1fr)\`}}>
          {columns.map(col => (
            <div key={col.key}>{row[col.key]}</div>
          ))}
        </div>
      ))}
    </div>
  );
}`;

  const sidebarCode = `export function Sidebar({ navigation, userRole, isOpen, onToggle }) {
  return (
    <div className={\`\${isOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col\`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          {isOpen && <div className="font-bold text-gray-900">EduManage</div>}
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map(item => (
          <a key={item.path} href={item.path} className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
            <item.icon className="h-5 w-5" />
            {isOpen && <span>{item.label}</span>}
          </a>
        ))}
      </nav>
    </div>
  );
}`;

  const topbarCode = `export function Topbar({ onSidebarToggle, user, notifications }) {
  return (
    <header className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onSidebarToggle}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input className="pl-10 w-96" placeholder="Search..." />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                {notifications}
              </Badge>
            )}
          </Button>
          <Avatar>
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}`;

  const cardCode = `export function StatsCard({ icon: Icon, title, value, change, trend }) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          <div className="text-xl font-bold">{value}</div>
          {change && (
            <div className={\`text-sm \${trend === 'up' ? 'text-green-600' : 'text-red-600'}\`}>
              {change}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}`;

  const modalCode = `export function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;
  
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg', 
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={\`bg-white rounded-lg p-6 w-full \${sizeClasses[size]} mx-4 max-h-[90vh] overflow-auto\`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}`;

  const apiContracts = {
    attendance: {
      method: 'POST',
      endpoint: '/api/v1/attendance',
      payload: {
        classId: 'CS-2025-A',
        date: '2025-09-21',
        records: [
          { studentId: 'stu_01', status: 'present' },
          { studentId: 'stu_02', status: 'absent' }
        ]
      },
      response: {
        success: true,
        saved: 2,
        message: 'Attendance marked successfully'
      },
      status: 200
    },
    fees: {
      method: 'GET',
      endpoint: '/api/v1/fees/:studentId',
      params: { studentId: 'CS2025001' },
      response: {
        studentId: 'CS2025001',
        totalAmount: 130000,
        paidAmount: 85000,
        balance: 45000,
        dueDate: '2025-10-15',
        status: 'Partial',
        transactions: []
      },
      status: 200
    },
    leave: {
      method: 'POST', 
      endpoint: '/api/v1/leave-application',
      payload: {
        studentId: 'CS2025001',
        leaveType: 'medical',
        fromDate: '2025-09-25',
        toDate: '2025-09-27',
        reason: 'Medical emergency',
        supportingDocument: 'medical_cert.pdf'
      },
      response: {
        applicationId: 'LEAVE_001',
        status: 'pending',
        submittedAt: '2025-09-21T10:30:00Z',
        message: 'Leave application submitted successfully'
      },
      status: 201
    }
  };

  const prismaSchema = `model Student {
  id        String   @id @default(cuid())
  rollNo    String   @unique
  firstName String
  lastName  String
  email     String   @unique
  phone     String?
  dob       DateTime?
  class     String
  semester  String
  cgpa      Float    @default(0.0)
  attendance Float   @default(0.0)
  feeBalance Int     @default(0)
  hostelRoom String?
  mentorId  String?
  status    String   @default("Active")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  mentor     Faculty? @relation(fields: [mentorId], references: [id])
  fees       Fee[]
  attendance AttendanceRecord[]
  library    LibraryRecord[]
  
  @@map("students")
}

model Faculty {
  id           String   @id @default(cuid())
  name         String
  email        String   @unique
  department   String
  designation  String
  phone        String
  experience   Int
  qualification String
  salary       Int
  status       String   @default("Active")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  courses   Course[]
  mentees   Student[]
  attendance AttendanceRecord[]
  
  @@map("faculty")
}`;

  const storybookExamples = [
    {
      name: 'PrimaryButton',
      story: `export default {
  title: 'Components/PrimaryButton',
  component: PrimaryButton,
  parameters: { layout: 'centered' },
  argTypes: {
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] }
  }
};

export const Default = {
  args: { children: 'Click me' }
};

export const Disabled = {
  args: { children: 'Disabled', disabled: true }
};`
    },
    {
      name: 'DataTable',
      story: `export default {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: { layout: 'padded' }
};

const mockData = [
  { name: 'John Doe', roll: 'CS2025001', cgpa: 8.7 },
  { name: 'Jane Smith', roll: 'CS2025002', cgpa: 9.2 }
];

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Roll No', key: 'roll' },
  { title: 'CGPA', key: 'cgpa' }
];

export const Default = {
  args: { data: mockData, columns }
};`
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Developer Handoff</h1>
          <p className="text-gray-600">
            Complete development documentation and code specifications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Assets
          </Button>
          <Button>
            <ExternalLink className="h-4 w-4 mr-2" />
            View in Storybook
          </Button>
        </div>
      </div>

      <Tabs defaultValue="components" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="tokens">Design Tokens</TabsTrigger>
          <TabsTrigger value="apis">API Contracts</TabsTrigger>
          <TabsTrigger value="database">Database Schema</TabsTrigger>
          <TabsTrigger value="storybook">Storybook</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>

        {/* Components */}
        <TabsContent value="components" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">React Component Library</h3>
            
            <div className="space-y-6">
              {/* Primary Button */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">PrimaryButton Component</h4>
                  <div className="flex gap-2">
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copyToClipboard(primaryButtonCode)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>
                <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                  {primaryButtonCode}
                </pre>
                <div className="mt-2 text-xs text-gray-600">
                  Props: children (ReactNode), onClick (function), disabled (boolean)
                </div>
              </div>

              {/* Data Table */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">DataTable Component</h4>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyToClipboard(dataTableCode)}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                  {dataTableCode}
                </pre>
              </div>

              {/* Sidebar */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Sidebar Component</h4>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyToClipboard(sidebarCode)}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                  {sidebarCode}
                </pre>
              </div>

              {/* Other components */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Topbar Component</h4>
                  <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto max-h-32">
                    {topbarCode}
                  </pre>
                </div>
                <div>
                  <h4 className="font-medium mb-2">StatsCard Component</h4>
                  <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto max-h-32">
                    {cardCode}
                  </pre>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Design Tokens */}
        <TabsContent value="tokens" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tailwind Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">CSS Variables</h4>
                <pre className="bg-gray-50 p-4 rounded-lg text-sm">
{`:root {
  --color-primary: #0B61FF;
  --color-primary-600: #0449CC;
  --color-secondary: #7C5CF3;
  --color-bg: #F7FAFF;
  --color-surface: #FFFFFF;
  --color-success: #10B981;
  --color-danger: #EF4444;
  --color-warning: #F59E0B;
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
}`}
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Tailwind Classes</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Colors:</strong>
                    <ul className="mt-1 space-y-1 text-xs">
                      <li><code>bg-[#0B61FF]</code> - Primary background</li>
                      <li><code>text-[#0B61FF]</code> - Primary text</li>
                      <li><code>border-[#0B61FF]</code> - Primary border</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Spacing:</strong>
                    <ul className="mt-1 space-y-1 text-xs">
                      <li><code>p-1</code> - 4px padding</li>
                      <li><code>p-2</code> - 8px padding</li>
                      <li><code>p-4</code> - 16px padding</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* API Contracts */}
        <TabsContent value="apis" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">API Specifications</h3>
            
            <div className="space-y-6">
              {Object.entries(apiContracts).map(([key, api]) => (
                <div key={key} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={api.method === 'GET' ? 'secondary' : 'default'}>
                      {api.method}
                    </Badge>
                    <code className="text-sm">{api.endpoint}</code>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {api.payload && (
                      <div>
                        <h5 className="font-medium text-sm mb-2">Request Payload</h5>
                        <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
                          {JSON.stringify(api.payload, null, 2)}
                        </pre>
                      </div>
                    )}
                    
                    <div>
                      <h5 className="font-medium text-sm mb-2">Response ({api.status})</h5>
                      <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
                        {JSON.stringify(api.response, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Database Schema */}
        <TabsContent value="database" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Prisma Database Schema</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Prisma</Badge>
                <Badge variant="outline">PostgreSQL</Badge>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(prismaSchema)}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy Schema
                </Button>
              </div>
              
              <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto max-h-96">
                {prismaSchema}
              </pre>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Migration Commands</h4>
                <div className="space-y-2 text-sm">
                  <code className="block bg-gray-800 text-white p-2 rounded">
                    npx prisma migrate dev --name init
                  </code>
                  <code className="block bg-gray-800 text-white p-2 rounded">
                    npx prisma generate
                  </code>
                  <code className="block bg-gray-800 text-white p-2 rounded">
                    npx prisma db seed
                  </code>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Storybook */}
        <TabsContent value="storybook" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Storybook Documentation</h3>
            
            <div className="space-y-6">
              {storybookExamples.map((example, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{example.name} Stories</h4>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copyToClipboard(example.story)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy Story
                    </Button>
                  </div>
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                    {example.story}
                  </pre>
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Storybook Setup</h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <code className="block">npm install @storybook/react</code>
                  <code className="block">npm run storybook</code>
                  <p className="mt-2">Stories location: <code>src/stories/</code></p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Deployment */}
        <TabsContent value="deployment" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Deployment Configuration</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Environment Variables</h4>
                <pre className="bg-gray-800 text-white p-4 rounded-lg text-sm">
{`# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/college_erp"

# Authentication  
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# External APIs
OPENAI_API_KEY="sk-..."
PERPLEXITY_API_KEY="pplx-..."
GOOGLE_SHEETS_API_KEY="..."

# File Storage
CLOUDINARY_URL="cloudinary://..."

# Email Service
SMTP_HOST="smtp.gmail.com"
SMTP_USER="noreply@college.edu"
SMTP_PASS="..."

# Payment Gateway
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="..."`}
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-3">Docker Configuration</h4>
                <pre className="bg-gray-50 p-4 rounded-lg text-sm">
{`FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]`}
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-3">Vercel Deployment</h4>
                <div className="space-y-2 text-sm">
                  <p>1. Connect GitHub repository to Vercel</p>
                  <p>2. Set environment variables in Vercel dashboard</p>
                  <p>3. Configure build settings:</p>
                  <code className="block bg-gray-50 p-2 rounded mt-1">
                    Build Command: npm run build<br/>
                    Output Directory: .next<br/>
                    Install Command: npm ci
                  </code>
                </div>
              </div>
            </div>
          </Card>

          {/* Accessibility Checklist */}
          <Card className="p-6 border-green-200 bg-green-50">
            <h3 className="text-lg font-semibold mb-4 text-green-800">Accessibility Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
              <div>
                <h4 className="font-medium mb-2">WCAG Guidelines</h4>
                <ul className="space-y-1">
                  <li>✓ Color contrast ratio 4.5:1 minimum</li>
                  <li>✓ Keyboard navigation support</li>
                  <li>✓ Screen reader compatibility</li>
                  <li>✓ Focus indicators visible</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Implementation</h4>
                <ul className="space-y-1">
                  <li>✓ ARIA labels on interactive elements</li>
                  <li>✓ Semantic HTML structure</li>
                  <li>✓ Alternative text for images</li>
                  <li>✓ Form validation messages</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}