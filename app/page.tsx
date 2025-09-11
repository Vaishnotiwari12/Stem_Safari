"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Zap,
  Trophy,
  Star,
  Globe,
  Wifi,
  WifiOff,
  Volume2,
  Play,
  Lock,
  CheckCircle,
  Atom,
  Calculator,
  Beaker,
  UserPlus,
  GraduationCap,
  ArrowRight,
  TreePine,
  Binary as Binoculars,
  Compass,
  Map,
  Gamepad2,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AITutor } from "@/components/ai-tutor"

interface SafariQuest {
  id: string
  title: string
  subject: string
  difficulty: "Explorer" | "Adventurer" | "Safari Master"
  progress: number
  xp: number
  isLocked: boolean
  isCompleted: boolean
  icon: React.ReactNode
  description: string
  estimatedTime: string
  animalGuide: string
}

export default function STEMSafariInterface() {
  const [isOnline, setIsOnline] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [explorerXP, setExplorerXP] = useState(1250)
  const [explorerLevel, setExplorerLevel] = useState(8)
  const [currentQuest, setCurrentQuest] = useState<SafariQuest | null>(null)
  const [gamesGrade, setGamesGrade] = useState<string>("6")
  const [quizSubject, setQuizSubject] = useState<string>("All")
  const [quizGrade, setQuizGrade] = useState<string>("6")
  const [quizLang, setQuizLang] = useState<string>("en")

  // Simulate offline/online status
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1) // 90% online simulation
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const safariQuests: SafariQuest[] = [
    {
      id: "1",
      title: "Lion's Math Kingdom: Algebra Safari",
      subject: "Mathematics",
      difficulty: "Adventurer",
      progress: 75,
      xp: 150,
      isLocked: false,
      isCompleted: false,
      icon: <Calculator className="h-6 w-6" />,
      description: "Join Leo the Lion to solve algebraic equations and rule the mathematical savanna!",
      estimatedTime: "25 min",
      animalGuide: "🦁 Leo the Lion",
    },
    {
      id: "2",
      title: "Elephant's Memory Lab: Chemistry Quest",
      subject: "Chemistry",
      difficulty: "Explorer",
      progress: 100,
      xp: 200,
      isLocked: false,
      isCompleted: true,
      icon: <Atom className="h-6 w-6" />,
      description: "Discover elements and compounds with Ellie the Elephant's amazing memory!",
      estimatedTime: "20 min",
      animalGuide: "🐘 Ellie the Elephant",
    },
    {
      id: "3",
      title: "Cheetah's Speed Physics: Force & Motion",
      subject: "Physics",
      difficulty: "Safari Master",
      progress: 0,
      xp: 300,
      isLocked: false,
      isCompleted: false,
      icon: <Zap className="h-6 w-6" />,
      description: "Race with Charlie the Cheetah to understand forces and motion at lightning speed!",
      estimatedTime: "35 min",
      animalGuide: "🐆 Charlie the Cheetah",
    },
    {
      id: "4",
      title: "Giraffe's Geometry Tower: Shape Adventures",
      subject: "Mathematics",
      difficulty: "Explorer",
      progress: 40,
      xp: 120,
      isLocked: false,
      isCompleted: false,
      icon: <Compass className="h-6 w-6" />,
      description: "Reach new heights with Grace the Giraffe to explore shapes and angles!",
      estimatedTime: "18 min",
      animalGuide: "🦒 Grace the Giraffe",
    },
    {
      id: "5",
      title: "Monkey's Bio Lab: Life Science Mystery",
      subject: "Biology",
      difficulty: "Adventurer",
      progress: 0,
      xp: 180,
      isLocked: true,
      isCompleted: false,
      icon: <Beaker className="h-6 w-6" />,
      description: "Unlock at Level 10: Swing through biological mysteries with Max the Monkey!",
      estimatedTime: "30 min",
      animalGuide: "🐵 Max the Monkey",
    },
  ]

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  ]

  const miniGames = [
    { id: "num-jungle", title: "Number Jungle Runner 🦓", subject: "Math", min: 6, max: 7, progress: 60, xp: 120, low: true },
    { id: "fractions-safari", title: "Fraction Safari 🍉", subject: "Math", min: 6, max: 7, progress: 20, xp: 110, low: true },
    { id: "algebra-savanna", title: "Algebra Savanna 🦁", subject: "Math", min: 8, max: 10, progress: 35, xp: 180, low: true },
    { id: "physics-dash", title: "Physics Plains Dash ⚡", subject: "Physics", min: 8, max: 12, progress: 10, xp: 200, low: true },
  ]

  const filteredMiniGames = miniGames.filter((g) => {
    const grade = Number(gamesGrade)
    return grade >= g.min && grade <= g.max
  })

  const QUIZZES = [
    { id: "math-6-algebra-en", title: "Algebra Basics", subject: "Math", grade: 6, lang: "en", xp: 100, est: "10 min" },
    { id: "math-6-algebra-hi", title: "बीजगणित की शुरुआत", subject: "Math", grade: 6, lang: "hi", xp: 100, est: "10 min" },
    { id: "math-7-geometry-en", title: "Shapes & Angles", subject: "Math", grade: 7, lang: "en", xp: 110, est: "12 min" },
    { id: "phy-8-motion-en", title: "Motion & Speed", subject: "Physics", grade: 8, lang: "en", xp: 120, est: "12 min" },
    { id: "phy-8-motion-te", title: "చలనము & వేగము", subject: "Physics", grade: 8, lang: "te", xp: 120, est: "12 min" },
    { id: "chem-9-elements-en", title: "Elements & Symbols", subject: "Chemistry", grade: 9, lang: "en", xp: 130, est: "12 min" },
    { id: "chem-9-elements-bn", title: "তত্ব ও চিহ্ন", subject: "Chemistry", grade: 9, lang: "bn", xp: 130, est: "12 min" },
    { id: "bio-10-cells-en", title: "Cells & Functions", subject: "Biology", grade: 10, lang: "en", xp: 140, est: "14 min" },
    { id: "bio-10-cells-ta", title: "உயிரணு & செயல்கள்", subject: "Biology", grade: 10, lang: "ta", xp: 140, est: "14 min" },
    { id: "math-11-calculus-en", title: "Intro to Derivatives", subject: "Math", grade: 11, lang: "en", xp: 160, est: "15 min" },
    { id: "phy-12-electricity-en", title: "Ohm's Law", subject: "Physics", grade: 12, lang: "en", xp: 170, est: "15 min" },
    { id: "chem-12-organic-hi", title: "जैविक रसायनशास्त्र परिचय", subject: "Chemistry", grade: 12, lang: "hi", xp: 170, est: "15 min" },
  ]

  const filteredQuizzes = QUIZZES.filter((q) => {
    const matchSubject = quizSubject === "All" || q.subject === quizSubject
    const matchGrade = Number(quizGrade) === q.grade
    const matchLang = q.lang === quizLang
    return matchSubject && matchGrade && matchLang
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Explorer":
        return "bg-green-100 text-green-800"
      case "Adventurer":
        return "bg-orange-100 text-orange-800"
      case "Safari Master":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleQuestClick = (quest: SafariQuest) => {
    if (!quest.isLocked) {
      setCurrentQuest(quest)
      console.log("Starting safari quest:", quest.title)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-full p-2">
                <Binoculars className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground">STEM Safari</h1>
                <p className="text-sm text-muted-foreground">Adventure Learning Platform</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-foreground">STEM Safari</h1>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <Link href="/login" className="hidden sm:block">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>

              <div className="hidden sm:flex items-center gap-2">
                {isOnline ? (
                  <Wifi className="h-4 w-4 text-green-600" />
                ) : (
                  <WifiOff className="h-4 w-4 text-orange-600" />
                )}
                <span className="text-sm text-muted-foreground hidden md:inline">
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>

              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-card border border-border rounded-md px-2 py-1 text-xs sm:text-sm max-w-20 sm:max-w-none"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.name}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>

              <Button variant="outline" size="sm" className="hidden sm:block bg-transparent">
                <Volume2 className="h-4 w-4 mr-2" />
                Safari Guide
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-6">
        <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary rounded-full p-4">
                  <TreePine className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to STEM Safari!</h2>
              <p className="text-gray-600 mb-6">
                Embark on an educational adventure with animal guides through the world of science and mathematics
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/signup/student">
                  <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 h-auto">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Start Your Safari
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>

                <Link href="/signup/teacher">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 px-6 py-3 h-auto bg-transparent"
                  >
                    <UserPlus className="h-5 w-5 mr-2" />
                    Guide Explorers
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>

                <Link href="/teacher">
                  <Button variant="secondary" className="w-full sm:w-auto px-6 py-3 h-auto">
                    Go to Teacher Dashboard
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>

                <Link href="#ai-tutor">
                  <Button variant="outline" className="w-full sm:w-auto px-6 py-3 h-auto bg-transparent">
                    AI Tutor
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>

                <Link href="#quizzes">
                  <Button variant="outline" className="w-full sm:w-auto px-6 py-3 h-auto bg-transparent">
                    Quizzes
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Offline Safari</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Animal Guides</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>5+ Languages</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="container mx-auto px-4 py-6">
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarImage src="/student-avatar.png" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">RK</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">Raj Kumar</h2>
                  <p className="text-muted-foreground">Safari Explorer • Village School</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">Level {explorerLevel} Explorer</span>
                    <Badge variant="secondary" className="ml-2">
                      {explorerXP} XP
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-auto sm:text-right">
                <div className="flex items-center gap-2 mb-2 justify-start sm:justify-end">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium">Safari Champion</span>
                </div>
                <Progress value={75} className="w-full sm:w-32 mb-1" />
                <p className="text-xs text-muted-foreground">750/1000 XP to Level 9</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* AI Tutor Section */}
      <section id="ai-tutor" className="container mx-auto px-4 py-4">
        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle>AI Study Buddy</CardTitle>
            <CardDescription>Ask questions in 5 languages and get instant help</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between flex-col sm:flex-row gap-3">
            <p className="text-sm text-muted-foreground sm:flex-1">
              Stuck on a step? Use the AI tutor to get hints, step-by-step guidance, and voice support.
            </p>
            <div>
              <AITutor currentQuest={currentQuest || undefined} />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Lightweight Grade-based Games Section */}
      <section className="container mx-auto px-4 pb-6">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Gamepad2 className="h-6 w-6" /> Mini Games (Grades 6–12)
          </h2>
          <div className="w-full sm:w-auto overflow-x-auto no-scrollbar">
            <div className="inline-flex gap-2">
              <Select value={gamesGrade} onValueChange={setGamesGrade}>
                <SelectTrigger className="min-w-[7rem]">
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">Grade 6</SelectItem>
                  <SelectItem value="7">Grade 7</SelectItem>
                  <SelectItem value="8">Grade 8</SelectItem>
                  <SelectItem value="9">Grade 9</SelectItem>
                  <SelectItem value="10">Grade 10</SelectItem>
                  <SelectItem value="11">Grade 11</SelectItem>
                  <SelectItem value="12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredMiniGames.map((g) => (
            <Card key={g.id} className="border-primary/20">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{g.title}</CardTitle>
                  <Badge variant="outline">+{g.xp} XP</Badge>
                </div>
                <CardDescription>
                  <Badge variant="secondary" className="mr-2">{g.subject}</Badge>
                  Grades {g.min}–{g.max} {g.low ? "• Low-data" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span>{g.progress}%</span>
                </div>
                <Progress value={g.progress} />
                <div className="flex gap-2">
                  <Link href="/journey" className="flex-1">
                    <Button className="w-full text-sm">
                      <Play className="h-4 w-4 mr-2" /> {g.progress > 0 ? "Continue" : "Start"}
                    </Button>
                  </Link>
                  <Link href="/games">
                    <Button variant="outline" className="bg-transparent text-sm">More</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quizzes Section */}
      <section id="quizzes" className="container mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h2 className="text-2xl font-bold text-foreground">Quick Quizzes</h2>
          <div className="w-full sm:w-auto overflow-x-auto no-scrollbar">
            <div className="inline-flex gap-2">
              <Select value={quizSubject} onValueChange={setQuizSubject}>
                <SelectTrigger className="min-w-[7rem]">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Math">Math</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                </SelectContent>
              </Select>
              <Select value={quizGrade} onValueChange={setQuizGrade}>
                <SelectTrigger className="min-w-[7rem]">
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">Grade 6</SelectItem>
                  <SelectItem value="7">Grade 7</SelectItem>
                  <SelectItem value="8">Grade 8</SelectItem>
                  <SelectItem value="9">Grade 9</SelectItem>
                  <SelectItem value="10">Grade 10</SelectItem>
                  <SelectItem value="11">Grade 11</SelectItem>
                  <SelectItem value="12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
              <Select value={quizLang} onValueChange={setQuizLang}>
                <SelectTrigger className="min-w-[7rem]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                  <SelectItem value="bn">বাংলা</SelectItem>
                  <SelectItem value="te">తెలుగు</SelectItem>
                  <SelectItem value="ta">தமிழ்</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.slice(0, 6).map((q) => (
            <Card key={q.id} className="border-muted/50">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg">{q.title}</CardTitle>
                  <Badge variant="outline">+{q.xp} XP</Badge>
                </div>
                <CardDescription>
                  <Badge variant="secondary" className="mr-2">{q.subject}</Badge>
                  Grade {q.grade} • {q.lang.toUpperCase()} • ⏱️ {q.est}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/quiz/${q.id}`}>
                  <Button className="w-full text-sm sm:text-base">Start Quiz</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Offline Status Banner */}
      {!isOnline && (
        <div className="container mx-auto px-4 mb-4">
          <div className="bg-orange-100 border border-orange-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <WifiOff className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-orange-800">
                You're offline, but your safari continues! All quests are available and progress will sync when you're
                back online.
              </span>
            </div>
          </div>
        </div>
      )}

      <section className="container mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Your Safari Quests</h2>
          <Button variant="outline">
            <Map className="h-4 w-4 mr-2" />
            Explore Map
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safariQuests.map((quest) => (
            <Card
              key={quest.id}
              className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer ${
                quest.isLocked ? "opacity-60" : "hover:scale-105"
              }`}
              onClick={() => handleQuestClick(quest)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${quest.isCompleted ? "bg-green-100" : "bg-primary/10"}`}>
                      {quest.isCompleted ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : quest.isLocked ? (
                        <Lock className="h-6 w-6 text-muted-foreground" />
                      ) : (
                        <div className="text-primary">{quest.icon}</div>
                      )}
                    </div>
                    <div>
                      <Badge className={getDifficultyColor(quest.difficulty)} variant="secondary">
                        {quest.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    +{quest.xp} XP
                  </Badge>
                </div>

                <CardTitle className="text-lg leading-tight text-balance">{quest.title}</CardTitle>
                <CardDescription className="text-sm text-pretty">{quest.description}</CardDescription>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-foreground">Guide:</span>
                  <span className="text-xs font-medium">{quest.animalGuide}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subject: {quest.subject}</span>
                    <span className="text-muted-foreground">⏱️ {quest.estimatedTime}</span>
                  </div>

                  {!quest.isLocked && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{quest.progress}%</span>
                      </div>
                      <Progress value={quest.progress} className="h-2" />
                    </div>
                  )}

                  <Button
                    className="w-full"
                    disabled={quest.isLocked}
                    variant={quest.isCompleted ? "outline" : "default"}
                  >
                    {quest.isLocked ? (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Locked
                      </>
                    ) : quest.isCompleted ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : quest.progress > 0 ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Continue Safari
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Safari
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-40 shadow-lg">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-5 gap-1 py-2">
            <Button
              asChild
              variant="ghost"
              className="flex-col gap-1 h-auto py-2 px-1 min-w-0 text-gray-700 hover:text-primary hover:bg-primary/10"
            >
              <Link href="/">
                <Map className="h-5 w-5 flex-shrink-0" />
                <span className="text-xs truncate w-full text-center">Safari</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="flex-col gap-1 h-auto py-2 px-1 min-w-0 text-gray-700 hover:text-primary hover:bg-primary/10"
            >
              <Link href="/achievements">
                <Trophy className="h-5 w-5 flex-shrink-0" />
                <span className="text-xs truncate w-full text-center">Badges</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="flex-col gap-1 h-auto py-2 px-1 min-w-0 text-gray-700 hover:text-primary hover:bg-primary/10"
            >
              <Link href="/profile">
                <Star className="h-5 w-5 flex-shrink-0" />
                <span className="text-xs truncate w-full text-center">Explorer</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="flex-col gap-1 h-auto py-2 px-1 min-w-0 text-gray-700 hover:text-primary hover:bg-primary/10"
            >
              <Link href="/games">
                <Gamepad2 className="h-5 w-5 flex-shrink-0" />
                <span className="text-xs truncate w-full text-center">Games</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="flex-col gap-1 h-auto py-2 px-1 min-w-0 text-gray-700 hover:text-primary hover:bg-primary/10"
            >
              <Link href="/community">
                <Globe className="h-5 w-5 flex-shrink-0" />
                <span className="text-xs truncate w-full text-center">Camp</span>
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="h-20"></div>
    </div>
  )
}
