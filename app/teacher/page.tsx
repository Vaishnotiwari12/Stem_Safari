"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Users,
  TrendingUp,
  Award,
  AlertTriangle,
  CheckCircle,
  Target,
  Download,
  Filter,
  Search,
  Bell,
  Calendar,
  BarChart3,
  Binary as Binoculars,
  Map,
  Zap,
  MessageSquare,
  Phone,
  Mail,
  FileText,
  Settings,
  HelpCircle,
} from "lucide-react"

interface Student {
  id: string
  name: string
  grade: string
  avatar: string
  totalXP: number
  level: number
  completedQuests: number
  activeQuests: number
  lastActive: string
  weeklyProgress: number
  needsAttention: boolean
  favoriteAnimalGuide: string
  currentSafariArea: string
  streakDays: number
  parentContact: string
}

interface ClassMetrics {
  totalStudents: number
  activeToday: number
  averageProgress: number
  totalQuestsCompleted: number
  engagementRate: number
  totalBadgesEarned: number
  averageStreakDays: number
}

export default function TeacherDashboard() {
  const [selectedClass, setSelectedClass] = useState("Grade 9A")
  const [selectedTimeframe, setSelectedTimeframe] = useState("week")

  const classMetrics: ClassMetrics = {
    totalStudents: 32,
    activeToday: 28,
    averageProgress: 73,
    totalQuestsCompleted: 156,
    engagementRate: 87,
    totalBadgesEarned: 89,
    averageStreakDays: 5.2,
  }

  const students: Student[] = [
    {
      id: "1",
      name: "Raj Kumar",
      grade: "9A",
      avatar: "/student-avatar.png",
      totalXP: 1250,
      level: 8,
      completedQuests: 12,
      activeQuests: 3,
      lastActive: "2 hours ago",
      weeklyProgress: 85,
      needsAttention: false,
      favoriteAnimalGuide: "🦁 Leo the Lion",
      currentSafariArea: "Algebra Savanna",
      streakDays: 7,
      parentContact: "+91 98765 43210",
    },
    {
      id: "2",
      name: "Priya Sharma",
      grade: "9A",
      avatar: "/student-avatar.png",
      totalXP: 1450,
      level: 9,
      completedQuests: 15,
      activeQuests: 2,
      lastActive: "1 hour ago",
      weeklyProgress: 92,
      needsAttention: false,
      favoriteAnimalGuide: "🐘 Ellie the Elephant",
      currentSafariArea: "Chemistry Watering Hole",
      streakDays: 12,
      parentContact: "+91 98765 43211",
    },
    {
      id: "3",
      name: "Arjun Patel",
      grade: "9A",
      avatar: "/student-avatar.png",
      totalXP: 890,
      level: 6,
      completedQuests: 8,
      activeQuests: 1,
      lastActive: "3 days ago",
      weeklyProgress: 45,
      needsAttention: true,
      favoriteAnimalGuide: "🐆 Charlie the Cheetah",
      currentSafariArea: "Number Jungle",
      streakDays: 0,
      parentContact: "+91 98765 43212",
    },
    {
      id: "4",
      name: "Meera Singh",
      grade: "9A",
      avatar: "/student-avatar.png",
      totalXP: 1180,
      level: 7,
      completedQuests: 11,
      activeQuests: 4,
      lastActive: "30 minutes ago",
      weeklyProgress: 78,
      needsAttention: false,
      favoriteAnimalGuide: "🦒 Grace the Giraffe",
      currentSafariArea: "Physics Plains",
      streakDays: 5,
      parentContact: "+91 98765 43213",
    },
  ]

  const weeklyEngagementData = [
    { day: "Mon", students: 25, quests: 45, badges: 12 },
    { day: "Tue", students: 28, quests: 52, badges: 15 },
    { day: "Wed", students: 30, quests: 48, badges: 18 },
    { day: "Thu", students: 26, quests: 41, badges: 10 },
    { day: "Fri", students: 32, quests: 58, badges: 22 },
    { day: "Sat", students: 18, quests: 22, badges: 8 },
    { day: "Sun", students: 15, quests: 18, badges: 5 },
  ]

  const subjectProgressData = [
    { subject: "Lion's Math Kingdom", completed: 85, inProgress: 12, notStarted: 3, guide: "🦁" },
    { subject: "Cheetah's Physics Plains", completed: 72, inProgress: 18, notStarted: 10, guide: "🐆" },
    { subject: "Elephant's Chemistry Lab", completed: 68, inProgress: 22, notStarted: 10, guide: "🐘" },
    { subject: "Monkey's Biology Forest", completed: 79, inProgress: 15, notStarted: 6, guide: "🐵" },
  ]

  const difficultyDistribution = [
    { name: "Explorer", value: 45, color: "#22c55e" },
    { name: "Adventurer", value: 35, color: "#eab308" },
    { name: "Safari Master", value: 20, color: "#ef4444" },
  ]

  const recentAchievements = [
    { student: "Priya Sharma", achievement: "Elephant Memory Master", time: "2 hours ago" },
    { student: "Raj Kumar", achievement: "Lion's Pride Badge", time: "4 hours ago" },
    { student: "Meera Singh", achievement: "Giraffe's Height Champion", time: "1 day ago" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-full p-2">
                <Binoculars className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Safari Guide Dashboard</h1>
                <p className="text-sm text-muted-foreground">STEM Safari Analytics & Management</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grade 9A">Grade 9A</SelectItem>
                  <SelectItem value="Grade 9B">Grade 9B</SelectItem>
                  <SelectItem value="Grade 10A">Grade 10A</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Alerts (3)
              </Button>

              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Explorers</p>
                  <p className="text-2xl font-bold">{classMetrics.totalStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Today</p>
                  <p className="text-2xl font-bold">{classMetrics.activeToday}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Progress</p>
                  <p className="text-2xl font-bold">{classMetrics.averageProgress}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Map className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quests Done</p>
                  <p className="text-2xl font-bold">{classMetrics.totalQuestsCompleted}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-pink-100 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Engagement</p>
                  <p className="text-2xl font-bold">{classMetrics.engagementRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Award className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Badges</p>
                  <p className="text-2xl font-bold">{classMetrics.totalBadgesEarned}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <Zap className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Streak</p>
                  <p className="text-2xl font-bold">{classMetrics.averageStreakDays.toFixed(1)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Explorers</TabsTrigger>
            <TabsTrigger value="subjects">Safari Areas</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Weekly Safari Activity</CardTitle>
                  <CardDescription>Explorer engagement and quest completion trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyEngagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="students"
                        stroke="#22c55e"
                        strokeWidth={2}
                        name="Active Explorers"
                      />
                      <Line type="monotone" dataKey="quests" stroke="#3b82f6" strokeWidth={2} name="Quests Completed" />
                      <Line type="monotone" dataKey="badges" stroke="#f59e0b" strokeWidth={2} name="Badges Earned" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                  <CardDescription>Latest safari accomplishments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAchievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                        <div className="bg-primary rounded-full p-2">
                          <Award className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{achievement.student}</p>
                          <p className="text-xs text-muted-foreground">{achievement.achievement}</p>
                          <p className="text-xs text-orange-600">{achievement.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Safari Area Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Safari Area Progress</CardTitle>
                  <CardDescription>Class performance across different STEM safari areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={subjectProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="completed" stackId="a" fill="#22c55e" name="Completed" />
                      <Bar dataKey="inProgress" stackId="a" fill="#eab308" name="In Progress" />
                      <Bar dataKey="notStarted" stackId="a" fill="#ef4444" name="Not Started" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Difficulty Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Explorer Level Distribution</CardTitle>
                  <CardDescription>Breakdown of quest difficulty levels completed</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={difficultyDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {difficultyDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Safari Explorer Performance</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {students.map((student) => (
                <Card key={student.id} className={student.needsAttention ? "border-orange-200 bg-orange-50/50" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">Safari Explorer • Grade {student.grade}</p>
                          <p className="text-xs text-orange-600">{student.favoriteAnimalGuide}</p>
                        </div>
                      </div>
                      {student.needsAttention && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Needs Attention
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Level & XP</p>
                        <p className="font-semibold">
                          Level {student.level} • {student.totalXP} XP
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Area</p>
                        <p className="font-semibold text-xs">{student.currentSafariArea}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Weekly Progress</span>
                        <span>{student.weeklyProgress}%</span>
                      </div>
                      <Progress value={student.weeklyProgress} />
                    </div>

                    <div className="flex justify-between text-sm mb-3">
                      <span>Completed: {student.completedQuests}</span>
                      <span>Active: {student.activeQuests}</span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-orange-500" />
                        {student.streakDays} days
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Message Parent
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <FileText className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {subjectProgressData.map((subject) => (
                <Card key={subject.subject}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{subject.guide}</span>
                      <CardTitle className="text-lg">{subject.subject}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-green-600">Completed</span>
                        <span className="font-semibold">{subject.completed}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-yellow-600">In Progress</span>
                        <span className="font-semibold">{subject.inProgress}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-red-600">Not Started</span>
                        <span className="font-semibold">{subject.notStarted}%</span>
                      </div>
                      <Progress value={subject.completed} className="mt-3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="communication" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Parent Communication</CardTitle>
                  <CardDescription>Send updates to parents via SMS and voice messages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Weekly Safari Updates
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Alert for Low Engagement
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Award className="h-4 w-4 mr-2" />
                    Celebrate Safari Achievements
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Parent Meeting
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common communication tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Voice Call Parents
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Progress Report
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    Send Reminder Notifications
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Request Parent Feedback
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Safari Reports</CardTitle>
                  <CardDescription>Create detailed reports for parents and administrators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Weekly Safari Progress Report
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Individual Explorer Report
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Map className="h-4 w-4 mr-2" />
                    Safari Area Performance Report
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Award className="h-4 w-4 mr-2" />
                    Achievement & Badge Summary
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analytics & Insights</CardTitle>
                  <CardDescription>Advanced reporting and data analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Engagement Analytics
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Learning Trend Analysis
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Target className="h-4 w-4 mr-2" />
                    Performance Benchmarks
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Custom Report Builder
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
