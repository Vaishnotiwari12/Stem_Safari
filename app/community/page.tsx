"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Trophy,
  Star,
  Gift,
  Users,
  Target,
  Zap,
  Crown,
  Flame,
  Heart,
  ThumbsUp,
  MapPin,
  Calendar,
  Coins,
  ShoppingBag,
} from "lucide-react"

interface Student {
  id: string
  name: string
  school: string
  village: string
  totalXP: number
  level: number
  badges: string[]
  weeklyXP: number
  monthlyXP: number
  avatar: string
  rank: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
  realWorldReward: string
  xpRequired: number
  unlockedBy: number
  category: string
}

interface CommunityChallenge {
  id: string
  title: string
  description: string
  participants: number
  maxParticipants: number
  reward: string
  endDate: string
  progress: number
  type: "Individual" | "Team" | "Village"
}

interface LocalBusiness {
  id: string
  name: string
  type: string
  rewards: string[]
  location: string
  contact: string
}

export default function CommunityPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("weekly")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const topStudents: Student[] = [
    {
      id: "1",
      name: "Priya Sharma",
      school: "Village Primary School",
      village: "Rampur",
      totalXP: 2450,
      level: 12,
      badges: ["math-master", "chemistry-explorer", "weekly-champion"],
      weeklyXP: 450,
      monthlyXP: 1200,
      avatar: "/student-avatar.png",
      rank: 1,
    },
    {
      id: "2",
      name: "Raj Kumar",
      school: "Village Primary School",
      village: "Rampur",
      totalXP: 2250,
      level: 11,
      badges: ["physics-genius", "algebra-ace"],
      weeklyXP: 380,
      monthlyXP: 1050,
      avatar: "/student-avatar.png",
      rank: 2,
    },
    {
      id: "3",
      name: "Meera Singh",
      school: "Sunrise School",
      village: "Rampur",
      totalXP: 2100,
      level: 10,
      badges: ["biology-expert", "consistent-learner"],
      weeklyXP: 320,
      monthlyXP: 980,
      avatar: "/student-avatar.png",
      rank: 3,
    },
    {
      id: "4",
      name: "Arjun Patel",
      school: "Village Primary School",
      village: "Rampur",
      totalXP: 1950,
      level: 9,
      badges: ["geometry-master"],
      weeklyXP: 280,
      monthlyXP: 850,
      avatar: "/student-avatar.png",
      rank: 4,
    },
  ]

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "Math Master",
      description: "Complete 50 mathematics quests",
      icon: <Target className="h-6 w-6" />,
      rarity: "Epic",
      realWorldReward: "Scientific Calculator + Math Book Set",
      xpRequired: 1000,
      unlockedBy: 23,
      category: "Mathematics",
    },
    {
      id: "2",
      title: "Chemistry Explorer",
      description: "Discover all elements in the periodic table game",
      icon: <Zap className="h-6 w-6" />,
      rarity: "Rare",
      realWorldReward: "Chemistry Lab Kit + Experiment Guide",
      xpRequired: 800,
      unlockedBy: 18,
      category: "Chemistry",
    },
    {
      id: "3",
      title: "Weekly Champion",
      description: "Top performer for 3 consecutive weeks",
      icon: <Crown className="h-6 w-6" />,
      rarity: "Legendary",
      realWorldReward: "Tablet + Educational Apps + Certificate",
      xpRequired: 1500,
      unlockedBy: 5,
      category: "Achievement",
    },
    {
      id: "4",
      title: "Physics Genius",
      description: "Master all physics concepts with 90%+ accuracy",
      icon: <Flame className="h-6 w-6" />,
      rarity: "Epic",
      realWorldReward: "Physics Experiment Kit + Books",
      xpRequired: 1200,
      unlockedBy: 12,
      category: "Physics",
    },
    {
      id: "5",
      title: "Community Helper",
      description: "Help 20 fellow students with their quests",
      icon: <Heart className="h-6 w-6" />,
      rarity: "Rare",
      realWorldReward: "Leadership Certificate + Stationery Set",
      xpRequired: 600,
      unlockedBy: 31,
      category: "Community",
    },
  ]

  const communityChallenge: CommunityChallenge[] = [
    {
      id: "1",
      title: "Village Science Fair",
      description: "Complete science quests and submit your best project for the village science fair",
      participants: 45,
      maxParticipants: 100,
      reward: "Winner gets Microscope + Science Books, All participants get certificates",
      endDate: "2024-02-15",
      progress: 65,
      type: "Village",
    },
    {
      id: "2",
      title: "Math Olympics Prep",
      description: "Team up with classmates to solve advanced math problems",
      participants: 28,
      maxParticipants: 50,
      reward: "Team gets Math Competition Entry + Training Materials",
      endDate: "2024-02-10",
      progress: 80,
      type: "Team",
    },
    {
      id: "3",
      title: "Green Energy Quest",
      description: "Learn about renewable energy and create awareness in your community",
      participants: 67,
      maxParticipants: 200,
      reward: "Solar Calculator + Environmental Science Kit",
      endDate: "2024-02-20",
      progress: 35,
      type: "Individual",
    },
  ]

  const localBusinesses: LocalBusiness[] = [
    {
      id: "1",
      name: "Rampur Stationery Store",
      type: "Educational Supplies",
      rewards: ["Notebooks", "Pens", "Geometry Sets", "Art Supplies"],
      location: "Main Market, Rampur",
      contact: "+91 98765 43210",
    },
    {
      id: "2",
      name: "Village Electronics",
      type: "Technology",
      rewards: ["Calculators", "Digital Watches", "USB Drives", "Headphones"],
      location: "Electronics Street, Rampur",
      contact: "+91 98765 43211",
    },
    {
      id: "3",
      name: "Sharma Book House",
      type: "Books & Learning",
      rewards: ["Reference Books", "Story Books", "Educational Magazines", "Dictionaries"],
      location: "School Road, Rampur",
      contact: "+91 98765 43212",
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Individual":
        return "bg-green-100 text-green-800"
      case "Team":
        return "bg-blue-100 text-blue-800"
      case "Village":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-full p-2">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">Community Hub</h1>
                <p className="text-sm sm:text-base text-muted-foreground">Connect, Compete, and Earn Real Rewards</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <Badge variant="outline" className="text-xs sm:text-sm">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                Rampur Village
              </Badge>
              <Badge variant="secondary" className="text-xs sm:text-sm">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                156 Active Students
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 sm:py-6">
        <Tabs defaultValue="leaderboard" className="space-y-4 sm:space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid grid-cols-5 min-w-[500px] sm:min-w-full">
              <TabsTrigger value="leaderboard" className="text-xs sm:text-sm">
                Leaderboard
              </TabsTrigger>
              <TabsTrigger value="achievements" className="text-xs sm:text-sm">
                Achievements
              </TabsTrigger>
              <TabsTrigger value="challenges" className="text-xs sm:text-sm">
                Challenges
              </TabsTrigger>
              <TabsTrigger value="rewards" className="text-xs sm:text-sm">
                Rewards
              </TabsTrigger>
              <TabsTrigger value="businesses" className="text-xs sm:text-sm">
                Partners
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="leaderboard" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-semibold">Village Leaderboard</h2>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="alltime">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {topStudents.slice(0, 3).map((student, index) => (
                <Card
                  key={student.id}
                  className={`relative ${
                    index === 0
                      ? "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300"
                      : index === 1
                        ? "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300"
                        : "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-300"
                  }`}
                >
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="relative mb-3 sm:mb-4">
                      <Avatar className="h-16 w-16 sm:h-20 sm:w-20 mx-auto border-4 border-white">
                        <AvatarImage src={student.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm ${
                          index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-500" : "bg-orange-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg">{student.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{student.school}</p>
                    <div className="mt-2 sm:mt-3 space-y-1">
                      <div className="flex items-center justify-center gap-2">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                        <span className="font-medium text-sm sm:text-base">Level {student.level}</span>
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        {selectedTimeframe === "weekly"
                          ? `${student.weeklyXP} XP this week`
                          : selectedTimeframe === "monthly"
                            ? `${student.monthlyXP} XP this month`
                            : `${student.totalXP} XP total`}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Full Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle>Full Rankings</CardTitle>
                <CardDescription>See how you stack up against other students in your village</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium">
                          {student.rank}
                        </div>
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
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.school}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {selectedTimeframe === "weekly"
                            ? `${student.weeklyXP} XP`
                            : selectedTimeframe === "monthly"
                              ? `${student.monthlyXP} XP`
                              : `${student.totalXP} XP`}
                        </div>
                        <div className="text-sm text-muted-foreground">Level {student.level}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-semibold">Achievement Gallery</h2>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Community">Community</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {achievements
                .filter((achievement) => selectedCategory === "all" || achievement.category === selectedCategory)
                .map((achievement) => (
                  <Card key={achievement.id} className="relative overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                            {achievement.icon}
                          </div>
                          <Badge className={`${getRarityColor(achievement.rarity)} border text-xs`} variant="outline">
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <div className="text-right text-xs sm:text-sm text-muted-foreground flex-shrink-0">
                          <div>{achievement.unlockedBy} students</div>
                          <div>unlocked</div>
                        </div>
                      </div>
                      <CardTitle className="text-base sm:text-lg">{achievement.title}</CardTitle>
                      <CardDescription className="text-sm">{achievement.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-2 sm:p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Gift className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                          <span className="font-medium text-xs sm:text-sm">Real World Reward</span>
                        </div>
                        <p className="text-xs sm:text-sm">{achievement.realWorldReward}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-muted-foreground">Required XP</span>
                        <span className="font-medium">{achievement.xpRequired} XP</span>
                      </div>
                      <Button className="w-full text-xs sm:text-sm bg-transparent" variant="outline" size="sm">
                        <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Track Progress
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-semibold">Community Challenges</h2>
              <Button size="sm" className="text-xs sm:text-sm">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                View Calendar
              </Button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              {communityChallenge.map((challenge) => (
                <Card key={challenge.id}>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-base sm:text-lg">{challenge.title}</CardTitle>
                        <CardDescription className="mt-2 text-sm">{challenge.description}</CardDescription>
                      </div>
                      <Badge className={`${getTypeColor(challenge.type)} text-xs flex-shrink-0`} variant="secondary">
                        {challenge.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                        <span>
                          {challenge.participants}/{challenge.maxParticipants} participants
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                        <span>Ends {challenge.endDate}</span>
                      </div>
                    </div>

                    <div className="p-2 sm:p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                        <span className="font-medium text-xs sm:text-sm">Rewards</span>
                      </div>
                      <p className="text-xs sm:text-sm">{challenge.reward}</p>
                    </div>

                    <Button className="w-full text-xs sm:text-sm" size="sm">
                      <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      Join Challenge
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-semibold">Reward Store</h2>
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                <span className="font-medium text-sm sm:text-base">Your XP: 1,250</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge className={`${getRarityColor(achievement.rarity)} text-xs`} variant="outline">
                        {achievement.rarity}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs sm:text-sm">
                        <Coins className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                        <span>{achievement.xpRequired} XP</span>
                      </div>
                    </div>
                    <CardTitle className="text-base sm:text-lg">{achievement.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <div className="p-2 sm:p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                        <span className="font-medium text-xs sm:text-sm">Physical Reward</span>
                      </div>
                      <p className="text-xs sm:text-sm">{achievement.realWorldReward}</p>
                    </div>

                    <Button
                      className="w-full text-xs sm:text-sm"
                      disabled={1250 < achievement.xpRequired}
                      variant={1250 >= achievement.xpRequired ? "default" : "outline"}
                      size="sm"
                    >
                      {1250 >= achievement.xpRequired ? (
                        <>
                          <Gift className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                          Redeem Now
                        </>
                      ) : (
                        <>
                          <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                          Need {achievement.xpRequired - 1250} more XP
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="businesses" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-semibold">Local Business Partners</h2>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm bg-transparent">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                View on Map
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {localBusinesses.map((business) => (
                <Card key={business.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base sm:text-lg">{business.name}</CardTitle>
                    <CardDescription className="text-sm">{business.type}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="font-medium text-xs sm:text-sm mb-2">Available Rewards:</h4>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {business.rewards.map((reward, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {reward}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="break-words">{business.location}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-muted-foreground flex-shrink-0">Contact:</span>
                        <span className="break-all">{business.contact}</span>
                      </div>
                    </div>

                    <Button className="w-full text-xs sm:text-sm bg-transparent" variant="outline" size="sm">
                      <Gift className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      Visit Store
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
