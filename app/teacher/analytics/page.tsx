"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, BarChart3, TrendingUp, Target } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Bar, BarChart, Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { useState } from "react"

export default function TeacherAnalyticsPage() {
  const [timeframe, setTimeframe] = useState("30d")
  const [grade, setGrade] = useState("All")

  const kpi = {
    avgDailyActive: 124,
    avgCompletionRate: 72,
    avgTimeOnTask: 18,
  }

  const trend = [
    { day: "Mon", active: 110, completion: 65 },
    { day: "Tue", active: 128, completion: 70 },
    { day: "Wed", active: 140, completion: 75 },
    { day: "Thu", active: 120, completion: 68 },
    { day: "Fri", active: 160, completion: 78 },
    { day: "Sat", active: 80, completion: 50 },
    { day: "Sun", active: 60, completion: 45 },
  ]

  const subjectBars = [
    { subject: "Math", completed: 78, inProgress: 15, notStarted: 7 },
    { subject: "Physics", completed: 64, inProgress: 22, notStarted: 14 },
    { subject: "Chemistry", completed: 70, inProgress: 18, notStarted: 12 },
    { subject: "Biology", completed: 75, inProgress: 16, notStarted: 9 },
  ]

  const difficulty = [
    { name: "Explorer", value: 46, color: "#22c55e" },
    { name: "Adventurer", value: 34, color: "#eab308" },
    { name: "Safari Master", value: 20, color: "#ef4444" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-full p-2">
              <BarChart3 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Teacher Analytics</h1>
              <p className="text-sm text-muted-foreground">Engagement, performance and difficulty insights</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={grade} onValueChange={setGrade}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Grades</SelectItem>
                <SelectItem value="6">Grade 6</SelectItem>
                <SelectItem value="7">Grade 7</SelectItem>
                <SelectItem value="8">Grade 8</SelectItem>
                <SelectItem value="9">Grade 9</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
                <SelectItem value="11">Grade 11</SelectItem>
                <SelectItem value="12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Avg Daily Active</CardDescription>
              <CardTitle className="text-2xl">{kpi.avgDailyActive}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" /> +8% vs prev
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Avg Completion Rate</CardDescription>
              <CardTitle className="text-2xl">{kpi.avgCompletionRate}%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Target className="h-3 w-3 text-green-600" /> +5 pts vs prev
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Avg Time on Task</CardDescription>
              <CardTitle className="text-2xl">{kpi.avgTimeOnTask} min</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" /> +2 min vs prev
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="difficulty">Difficulty</TabsTrigger>
          </TabsList>

          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Trends</CardTitle>
                <CardDescription>Daily active students and completion</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={2} name="Active" />
                    <Line type="monotone" dataKey="completion" stroke="#22c55e" strokeWidth={2} name="Completion %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects">
            <Card>
              <CardHeader>
                <CardTitle>Subject Progress</CardTitle>
                <CardDescription>Completed vs in-progress vs not started</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={subjectBars}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#22c55e" name="Completed" />
                    <Bar dataKey="inProgress" fill="#eab308" name="In Progress" />
                    <Bar dataKey="notStarted" fill="#ef4444" name="Not Started" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="difficulty">
            <Card>
              <CardHeader>
                <CardTitle>Level Distribution</CardTitle>
                <CardDescription>Explorer / Adventurer / Safari Master</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie data={difficulty} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
                      {difficulty.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 