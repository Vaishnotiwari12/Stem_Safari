"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Gamepad2, Play, Gauge, Award } from "lucide-react"

interface Game {
  id: string
  title: string
  subject: string
  minGrade: number
  maxGrade: number
  difficulty: "Explorer" | "Adventurer" | "Safari Master"
  progress: number
  estTime: string
  xpReward: number
  cover?: string
  lowData?: boolean
}

const ALL_GAMES: Game[] = [
  { id: "num-jungle", title: "Number Jungle Runner 🦓", subject: "Mathematics", minGrade: 6, maxGrade: 7, difficulty: "Explorer", progress: 60, estTime: "10 min", xpReward: 120, cover: "/zebras-in-savanna-with-mathematical-equation-overl.jpg", lowData: true },
  { id: "fractions-safari", title: "Fraction Safari 🍉", subject: "Mathematics", minGrade: 6, maxGrade: 7, difficulty: "Explorer", progress: 20, estTime: "8 min", xpReward: 110, cover: "/placeholder.jpg", lowData: true },
  { id: "word-trek", title: "Word Problems Trek 🐒", subject: "Mathematics", minGrade: 6, maxGrade: 8, difficulty: "Explorer", progress: 0, estTime: "12 min", xpReward: 130, cover: "/placeholder.jpg", lowData: true },
  { id: "algebra-savanna", title: "Algebra Savanna Puzzles 🦁", subject: "Mathematics", minGrade: 8, maxGrade: 10, difficulty: "Adventurer", progress: 35, estTime: "15 min", xpReward: 180, cover: "/cartoon-lion-wearing-a-crown-in-a-mathematical-kin.jpg", lowData: true },
  { id: "physics-plains", title: "Physics Plains Dash ⚡", subject: "Physics", minGrade: 8, maxGrade: 12, difficulty: "Adventurer", progress: 10, estTime: "15 min", xpReward: 200, cover: "/golden-acacia-seeds-scattered-on-ground-with-lion-.jpg", lowData: true },
  { id: "circuits-builder", title: "Circuit Builder 🔌", subject: "Physics", minGrade: 8, maxGrade: 10, difficulty: "Adventurer", progress: 5, estTime: "12 min", xpReward: 170, cover: "/placeholder.jpg", lowData: true },
  { id: "chem-bonds", title: "Chemical Bonds Match 🔬", subject: "Chemistry", minGrade: 9, maxGrade: 12, difficulty: "Adventurer", progress: 0, estTime: "10 min", xpReward: 190, cover: "/placeholder.jpg", lowData: true },
  { id: "geometry-mountain", title: "Geometry Mountain Climb ⛰️", subject: "Mathematics", minGrade: 9, maxGrade: 12, difficulty: "Safari Master", progress: 0, estTime: "20 min", xpReward: 250, cover: "/lion-wearing-graduation-cap-with-mathematical-symb.jpg", lowData: true },
  { id: "genetics-puzzle", title: "Genetics Puzzle 🧬", subject: "Biology", minGrade: 10, maxGrade: 12, difficulty: "Adventurer", progress: 0, estTime: "10 min", xpReward: 180, cover: "/placeholder.jpg", lowData: true },
  { id: "calc-cliff", title: "Calculus Cliff 🧗", subject: "Mathematics", minGrade: 11, maxGrade: 12, difficulty: "Safari Master", progress: 0, estTime: "20 min", xpReward: 300, cover: "/placeholder.jpg", lowData: true },
  { id: "bio-rainforest", title: "Biology Rainforest Quest 🌿", subject: "Biology", minGrade: 6, maxGrade: 9, difficulty: "Explorer", progress: 80, estTime: "12 min", xpReward: 150, cover: "/treasure-chest-with-question-mark-and-mathematical.jpg", lowData: true },
]

function difficultyBadgeColor(d: Game["difficulty"]) {
  if (d === "Explorer") return "bg-green-100 text-green-800"
  if (d === "Adventurer") return "bg-orange-100 text-orange-800"
  return "bg-red-100 text-red-800"
}

export default function GamesHubPage() {
  const [grade, setGrade] = useState<string>("6")

  const filtered = useMemo(() => {
    const g = Number(grade)
    return ALL_GAMES.filter((game) => g >= game.minGrade && g <= game.maxGrade)
  }, [grade])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-full p-2">
              <Gamepad2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Games Hub</h1>
              <p className="text-sm text-muted-foreground">Curated STEM games for Grades 6–12</p>
            </div>
          </div>

          <Select value={grade} onValueChange={setGrade}>
            <SelectTrigger className="w-28">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((game) => (
            <Card key={game.id} className="overflow-hidden">
              <div className="h-32 w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${game.cover || "/placeholder.jpg"})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{game.title}</CardTitle>
                  <Badge className={difficultyBadgeColor(game.difficulty)} variant="secondary">
                    {game.difficulty}
                  </Badge>
                </div>
                <CardDescription>{game.subject} • Grades {game.minGrade}–{game.maxGrade}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1"><Gauge className="h-4 w-4 text-primary" /> Progress</span>
                  <span>{game.progress}%</span>
                </div>
                <Progress value={game.progress} />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>⏱️ {game.estTime}</span>
                  {game.lowData && <span>Low-data</span>}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground"><Award className="h-4 w-4" /> XP</span>
                  <span className="font-semibold text-primary">+{game.xpReward}</span>
                </div>
                <div className="flex gap-2 pt-1">
                  <Link href="/journey" className="flex-1">
                    <Button className="w-full">
                      <Play className="h-4 w-4 mr-2" /> {game.progress > 0 ? "Continue" : "Start"}
                    </Button>
                  </Link>
                  <Button variant="outline" className="bg-transparent">Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 