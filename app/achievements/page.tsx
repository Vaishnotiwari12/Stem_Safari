"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Crown,
  Zap,
  Star,
  Target,
  Brain,
  Rocket,
  Gem,
  Award,
  ArrowLeft,
  Share2,
  Gift,
  Calendar,
  TrendingUp,
  BookOpen,
  Users,
  Flame,
  Medal,
} from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  earned: boolean
  earnedDate?: string
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
  points: number
  category: "learning" | "streak" | "social" | "special"
  progress?: number
  maxProgress?: number
  animalGuide?: string
}

interface Reward {
  id: string
  title: string
  description: string
  type: "badge" | "avatar" | "theme" | "title"
  unlocked: boolean
  requiredAchievements: string[]
  icon: React.ReactNode
}

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const playerStats = {
    totalXP: 2450,
    level: 12,
    currentLevelXP: 450,
    nextLevelXP: 1000,
    totalAchievements: 15,
    earnedAchievements: 8,
    currentStreak: 7,
    longestStreak: 12,
  }

  const achievements: Achievement[] = [
    {
      id: "first-quest",
      title: "Safari Beginner",
      description: "Complete your first learning quest with Leo the Lion",
      icon: <BookOpen className="h-8 w-8" />,
      earned: true,
      earnedDate: "2024-01-15",
      rarity: "Common",
      points: 50,
      category: "learning",
      animalGuide: "🦁 Leo the Lion",
    },
    {
      id: "speed-learner",
      title: "Cheetah Speed",
      description: "Complete 3 quests in one day",
      icon: <Zap className="h-8 w-8" />,
      earned: true,
      earnedDate: "2024-01-18",
      rarity: "Rare",
      points: 150,
      category: "learning",
      animalGuide: "🐆 Charlie the Cheetah",
    },
    {
      id: "math-master",
      title: "Lion's Pride",
      description: "Complete all mathematics quests in Leo's Kingdom",
      icon: <Crown className="h-8 w-8" />,
      earned: false,
      rarity: "Legendary",
      points: 500,
      category: "learning",
      progress: 3,
      maxProgress: 5,
      animalGuide: "🦁 Leo the Lion",
    },
    {
      id: "streak-warrior",
      title: "Elephant Memory",
      description: "Maintain a 7-day learning streak",
      icon: <Flame className="h-8 w-8" />,
      earned: true,
      earnedDate: "2024-01-20",
      rarity: "Epic",
      points: 300,
      category: "streak",
      animalGuide: "🐘 Ellie the Elephant",
    },
    {
      id: "perfect-score",
      title: "Eagle Eye",
      description: "Score 100% on any quiz",
      icon: <Target className="h-8 w-8" />,
      earned: true,
      earnedDate: "2024-01-16",
      rarity: "Rare",
      points: 200,
      category: "learning",
      animalGuide: "🦅 Wise Eagle",
    },
    {
      id: "helper",
      title: "Monkey Business",
      description: "Help 5 fellow students in the community",
      icon: <Users className="h-8 w-8" />,
      earned: false,
      rarity: "Epic",
      points: 250,
      category: "social",
      progress: 2,
      maxProgress: 5,
      animalGuide: "🐵 Max the Monkey",
    },
    {
      id: "early-bird",
      title: "Rooster's Call",
      description: "Complete lessons before 8 AM for 5 days",
      icon: <Calendar className="h-8 w-8" />,
      earned: false,
      rarity: "Rare",
      points: 180,
      category: "special",
      progress: 2,
      maxProgress: 5,
    },
    {
      id: "science-explorer",
      title: "Rhino Strength",
      description: "Master all science subjects",
      icon: <Rocket className="h-8 w-8" />,
      earned: false,
      rarity: "Legendary",
      points: 600,
      category: "learning",
      progress: 1,
      maxProgress: 4,
      animalGuide: "🦏 Rocky the Rhino",
    },
  ]

  const rewards: Reward[] = [
    {
      id: "golden-crown",
      title: "Golden Safari Crown",
      description: "Exclusive crown avatar accessory",
      type: "avatar",
      unlocked: true,
      requiredAchievements: ["first-quest", "speed-learner"],
      icon: <Crown className="h-6 w-6 text-yellow-600" />,
    },
    {
      id: "champion-badge",
      title: "Safari Champion Badge",
      description: "Display your mastery with this special badge",
      type: "badge",
      unlocked: false,
      requiredAchievements: ["math-master", "science-explorer"],
      icon: <Medal className="h-6 w-6 text-purple-600" />,
    },
    {
      id: "sunset-theme",
      title: "Sunset Safari Theme",
      description: "Beautiful orange and gold interface theme",
      type: "theme",
      unlocked: true,
      requiredAchievements: ["streak-warrior"],
      icon: <Gem className="h-6 w-6 text-orange-600" />,
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "Rare":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "Epic":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "Legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "learning":
        return <Brain className="h-4 w-4" />
      case "streak":
        return <Flame className="h-4 w-4" />
      case "social":
        return <Users className="h-4 w-4" />
      case "special":
        return <Star className="h-4 w-4" />
      default:
        return <Trophy className="h-4 w-4" />
    }
  }

  const filteredAchievements =
    selectedCategory === "all" ? achievements : achievements.filter((a) => a.category === selectedCategory)

  const earnedAchievements = achievements.filter((a) => a.earned)
  const totalPoints = earnedAchievements.reduce((sum, a) => sum + a.points, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Safari
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Safari Achievements</h1>
              </div>
            </div>
            <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
              <Share2 className="h-4 w-4 mr-2" />
              Share Progress
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 pb-24">
        {/* Player Stats Overview */}
        <Card className="mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{playerStats.level}</div>
                <div className="text-sm text-muted-foreground">Explorer Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{earnedAchievements.length}</div>
                <div className="text-sm text-muted-foreground">Achievements</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{totalPoints}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{playerStats.currentStreak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Level Progress</span>
                <span className="text-sm text-muted-foreground">
                  {playerStats.currentLevelXP}/{playerStats.nextLevelXP} XP
                </span>
              </div>
              <Progress value={(playerStats.currentLevelXP / playerStats.nextLevelXP) * 100} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Rewards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                All Categories
              </Button>
              <Button
                variant={selectedCategory === "learning" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("learning")}
                className="flex items-center gap-1"
              >
                <Brain className="h-3 w-3" />
                Learning
              </Button>
              <Button
                variant={selectedCategory === "streak" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("streak")}
                className="flex items-center gap-1"
              >
                <Flame className="h-3 w-3" />
                Streaks
              </Button>
              <Button
                variant={selectedCategory === "social" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("social")}
                className="flex items-center gap-1"
              >
                <Users className="h-3 w-3" />
                Social
              </Button>
              <Button
                variant={selectedCategory === "special" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("special")}
                className="flex items-center gap-1"
              >
                <Star className="h-3 w-3" />
                Special
              </Button>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAchievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`transition-all duration-300 hover:shadow-lg ${
                    achievement.earned
                      ? "border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5"
                      : "opacity-70 hover:opacity-90"
                  }`}
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`mx-auto p-4 rounded-full mb-3 ${
                        achievement.earned ? "bg-primary/20 text-primary" : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {achievement.icon}
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Badge className={`${getRarityColor(achievement.rarity)} text-xs`} variant="outline">
                        {achievement.rarity}
                      </Badge>
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        {getCategoryIcon(achievement.category)}
                        {achievement.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-balance">{achievement.title}</CardTitle>
                    <CardDescription className="text-sm">{achievement.description}</CardDescription>
                    {achievement.animalGuide && (
                      <p className="text-xs text-muted-foreground mt-1">Guide: {achievement.animalGuide}</p>
                    )}
                  </CardHeader>
                  <CardContent className="text-center space-y-3">
                    {achievement.earned ? (
                      <div className="space-y-2">
                        <Badge className="bg-green-100 text-green-800">
                          <Award className="h-3 w-3 mr-1" />
                          Earned • +{achievement.points} pts
                        </Badge>
                        {achievement.earnedDate && (
                          <p className="text-xs text-muted-foreground">
                            Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Badge variant="secondary">+{achievement.points} pts when earned</Badge>
                        {achievement.progress !== undefined && achievement.maxProgress && (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>Progress:</span>
                              <span>
                                {achievement.progress}/{achievement.maxProgress}
                              </span>
                            </div>
                            <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Safari Rewards Collection</h2>
              <p className="text-muted-foreground">
                Unlock exclusive rewards by earning achievements and completing challenges
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward) => (
                <Card
                  key={reward.id}
                  className={`transition-all duration-300 hover:shadow-lg ${
                    reward.unlocked ? "border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5" : "opacity-70"
                  }`}
                >
                  <CardHeader className="text-center">
                    <div
                      className={`mx-auto p-4 rounded-full mb-3 ${reward.unlocked ? "bg-primary/20" : "bg-gray-100"}`}
                    >
                      {reward.icon}
                    </div>
                    <CardTitle className="text-lg">{reward.title}</CardTitle>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center space-y-3">
                    {reward.unlocked ? (
                      <div className="space-y-2">
                        <Badge className="bg-green-100 text-green-800">
                          <Gift className="h-3 w-3 mr-1" />
                          Unlocked
                        </Badge>
                        <Button size="sm" className="w-full">
                          Equip Reward
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Badge variant="secondary">Locked</Badge>
                        <div className="text-xs text-muted-foreground">
                          <p className="mb-1">Required achievements:</p>
                          <div className="space-y-1">
                            {reward.requiredAchievements.map((achId) => {
                              const ach = achievements.find((a) => a.id === achId)
                              return (
                                <div key={achId} className="flex items-center justify-center gap-1">
                                  {ach?.earned ? (
                                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                                      ✓ {ach.title}
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="text-xs">
                                      {ach?.title || achId}
                                    </Badge>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Motivational Section */}
        <Card className="mt-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary rounded-full p-3">
                <TrendingUp className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Keep Exploring, Safari Champion!</h3>
            <p className="text-muted-foreground mb-4">
              You're doing amazing! Complete more quests and challenges to unlock new achievements and rewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/journey">
                <Button className="bg-primary hover:bg-primary/90">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Continue Learning Journey
                </Button>
              </Link>
              <Link href="/community">
                <Button variant="outline" className="bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Join Safari Community
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
