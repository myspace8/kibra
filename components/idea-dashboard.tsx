'use client'

import Link from 'next/link'

import { useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js'

// Register scales and elements
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  Title, 
  Tooltip, 
  Legend
)

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, BrainCircuit, ArrowRight, BarChart2 } from 'lucide-react'

export default function Dashboard({ studentName = "Alex" }) {
  const [activeTab, setActiveTab] = useState("practice")

  // Mock data for charts
  const accuracyData = {
    labels: ['Overall', 'Algebra', 'Geometry', 'Statistics'],
    datasets: [{
      data: [75, 80, 65, 85],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#6366f1'],
    }]
  }

  const timeData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Average Time per Question (seconds)',
      data: [120, 105, 90, 75],
      borderColor: '#3b82f6',
      tension: 0.1
    }]
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome back, {studentName}!</h1>
          <p className="text-gray-600 dark:text-gray-300">Ready to continue your SAT math journey? Let's see how you're doing.</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Overall Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <Bar data={accuracyData} options={{ indexAxis: 'y', plugins: { legend: { display: false } } }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <Line data={timeData} options={{ plugins: { legend: { display: false } } }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Retention Strength</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Strong</span>
                    <Progress value={80} className="w-2/3" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Moderate</span>
                    <Progress value={60} className="w-2/3" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Weak</span>
                    <Progress value={30} className="w-2/3" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Focus Area</CardTitle>
                <CardDescription>Based on your recent performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-yellow-500">
                  <BrainCircuit />
                  <span className="font-semibold">Improve First Attempt Accuracy in Algebra</span>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Your accuracy on first attempts in Algebra questions has room for improvement. 
                  Focus on understanding the problem before rushing to a solution.
                </p>
              </CardContent>
              <CardFooter>
                <Button>Start Algebra Practice <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="practice">
            <Card>
              <CardHeader>
                <CardTitle>Practice Options</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <Link href={"/practice"} className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-auto py-4 justify-start bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4">
                  <BookOpen className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Practice by Topic</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Focus on specific areas</div>
                  </div>
                </Link>
                <Button className="h-auto py-4 justify-start" variant="outline">
                  <Clock className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Take a Timed Test</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Simulate exam conditions</div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Button>
                  <BarChart2 className="mr-2 h-4 w-4" />
                  View Detailed Metrics
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
