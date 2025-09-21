import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  MessageCircle, 
  Brain, 
  Search, 
  FileSpreadsheet, 
  Send, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Copy,
  Download,
  Zap,
  Settings,
  Database,
  RefreshCw,
  Eye,
  Bookmark
} from 'lucide-react';

interface AIStep {
  id: string;
  name: string;
  model: 'ChatGPT' | 'Perplexity' | 'Gemini';
  status: 'pending' | 'running' | 'completed' | 'failed';
  output?: string;
  sources?: string[];
  confidence?: number;
  executionTime?: number;
}

export function MultiAIWorkflow() {
  const [query, setQuery] = useState('Generate a comprehensive attendance report for CS-2025 batch with insights and recommendations');
  const [selectedModel, setSelectedModel] = useState('ChatGPT');
  const [chainMode, setChainMode] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [showSourcesDrawer, setShowSourcesDrawer] = useState(false);
  const [sessionHistory, setSessionHistory] = useState<string[]>([]);

  const [aiSteps, setAiSteps] = useState<AIStep[]>([
    {
      id: 'step1',
      name: 'Data Analysis',
      model: 'ChatGPT',
      status: 'completed',
      output: 'Analyzed attendance data for CS-2025 batch (156 students). Found 12 students below 75% threshold. Average attendance: 87.3%. Peak attendance on Mondays (94%), lowest on Fridays (82%).',
      confidence: 94,
      executionTime: 2.3
    },
    {
      id: 'step2', 
      name: 'Research & Context',
      model: 'Perplexity',
      status: 'completed',
      output: 'Retrieved institutional policies: Minimum 75% attendance required. Late entry affects participation grades. Weather patterns show 15% increase in absences during monsoon season (June-Sept).',
      sources: ['Academic Policy Document 2024', 'Student Handbook', 'Historical Weather Data'],
      confidence: 89,
      executionTime: 3.1
    },
    {
      id: 'step3',
      name: 'Recommendations',
      model: 'Gemini', 
      status: 'completed',
      output: 'Recommendations: 1) Implement flexible attendance for weather emergencies 2) Early warning system at 70% 3) Peer mentorship program for low-attendance students 4) Digital attendance with geofencing',
      confidence: 91,
      executionTime: 1.8
    }
  ]);

  const [sheetConfig, setSheetConfig] = useState({
    sheetId: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'A1:F100',
    headers: 'Name,Roll No,Attendance %,Status,Last Updated,Recommendations'
  });

  const mockSources = [
    {
      title: 'Academic Policy Document 2024',
      url: 'policy.edu/academic-2024.pdf',
      relevance: 95,
      type: 'PDF'
    },
    {
      title: 'Student Attendance Analysis - MIT Study',
      url: 'research.mit.edu/attendance-patterns',
      relevance: 87,
      type: 'Research'
    },
    {
      title: 'Best Practices in Higher Education',
      url: 'education.gov/best-practices',
      relevance: 82,
      type: 'Government'
    }
  ];

  const executeWorkflow = async () => {
    setIsRunning(true);
    setSessionHistory(prev => [...prev, query]);
    
    // Simulate AI workflow execution
    for (let i = 0; i < aiSteps.length; i++) {
      setAiSteps(prev => prev.map((step, idx) => 
        idx === i ? { ...step, status: 'running' } : step
      ));
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAiSteps(prev => prev.map((step, idx) => 
        idx === i ? { ...step, status: 'completed' } : step
      ));
    }
    
    setIsRunning(false);
  };

  const saveToGoogleSheets = () => {
    alert('Data saved to Google Sheets successfully!');
  };

  const retryStep = (stepId: string) => {
    setAiSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status: 'pending' } : step
    ));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Multi-AI Research Assistant</h1>
          <p className="text-gray-600">
            Chain multiple AI models for comprehensive analysis and insights
          </p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          <Zap className="h-3 w-3 mr-1" />
          Chain Mode Active
        </Badge>
      </div>

      {/* Input Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Research Query</label>
            <Textarea 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your research query or data analysis request..."
              className="min-h-[80px]"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Primary Model</label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ChatGPT">ChatGPT-4</SelectItem>
                  <SelectItem value="Perplexity">Perplexity Pro</SelectItem>
                  <SelectItem value="Gemini">Gemini Ultra</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end gap-2">
              <Button 
                onClick={executeWorkflow}
                disabled={isRunning}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {isRunning ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Brain className="h-4 w-4 mr-2" />
                )}
                Execute Chain
              </Button>
              
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* AI Chain Workflow */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">AI Processing Chain</h3>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowSourcesDrawer(true)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Sources
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry All
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {aiSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {index < aiSteps.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200" />
              )}
              
              <div className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    step.status === 'completed' ? 'bg-green-100' :
                    step.status === 'running' ? 'bg-blue-100' :
                    step.status === 'failed' ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    {step.status === 'completed' ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : step.status === 'running' ? (
                      <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
                    ) : step.status === 'failed' ? (
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    ) : (
                      <Brain className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{step.name}</h4>
                      <Badge variant="outline">{step.model}</Badge>
                      {step.confidence && (
                        <Badge variant="secondary">{step.confidence}% confidence</Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {step.executionTime && (
                        <span className="text-xs text-gray-500">{step.executionTime}s</span>
                      )}
                      {step.status === 'failed' && (
                        <Button size="sm" variant="outline" onClick={() => retryStep(step.id)}>
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Retry
                        </Button>
                      )}
                    </div>
                  </div>

                  {step.output && (
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      {step.output}
                    </div>
                  )}

                  {step.sources && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-gray-500">Sources:</span>
                      {step.sources.map((source, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {source}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Google Sheets Integration */}
      <Card className="p-6 bg-green-50 border-green-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-green-800">Export to Google Sheets</h3>
          </div>
          <Button onClick={saveToGoogleSheets} className="bg-green-600 hover:bg-green-700">
            <Database className="h-4 w-4 mr-2" />
            Save to Sheets
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">Sheet URL</label>
            <Input 
              value={sheetConfig.sheetId}
              onChange={(e) => setSheetConfig(prev => ({...prev, sheetId: e.target.value}))}
              className="bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">Range</label>
            <Input 
              value={sheetConfig.range}
              onChange={(e) => setSheetConfig(prev => ({...prev, range: e.target.value}))}
              className="bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">Headers</label>
            <Input 
              value={sheetConfig.headers}
              onChange={(e) => setSheetConfig(prev => ({...prev, headers: e.target.value}))}
              className="bg-white"
            />
          </div>
        </div>
      </Card>

      {/* Session History */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Session History</h3>
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-2" />
            Save Session
          </Button>
        </div>
        
        <div className="space-y-2">
          {sessionHistory.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">#{index + 1}</span>
              <span className="flex-1 text-sm">{item}</span>
              <Button variant="ghost" size="sm">
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Sources Drawer */}
      {showSourcesDrawer && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl border-l z-50 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Research Sources</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowSourcesDrawer(false)}
            >
              ✕
            </Button>
          </div>

          <div className="space-y-4">
            {mockSources.map((source, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{source.title}</h4>
                  <Badge variant="outline" className="text-xs">{source.type}</Badge>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <Progress value={source.relevance} className="flex-1 h-1" />
                  <span className="text-xs text-gray-500">{source.relevance}%</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-xs flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    View Source
                  </a>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Citation Format</h4>
            <div className="text-xs text-blue-700 space-y-1">
              <p>APA: Academic Policy Document. (2024). Institution Name.</p>
              <p>MLA: "Student Attendance Analysis." MIT Study, 2024.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}