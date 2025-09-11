"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Lock, Play, ArrowLeft, Map, Compass, TreePine, Mountain, Waves } from "lucide-react"

interface JourneyNode {
  id: string
  title: string
  subject: string
  isUnlocked: boolean
  isCompleted: boolean
  progress: number
  xpReward: number
  animalGuide: string
  animalEmoji: string
  position: { x: number; y: number }
  connections: string[]
  difficulty: "Explorer" | "Adventurer" | "Safari Master"
  estimatedTime: string
}

export default function StudentJourneyMap() {
  const [selectedNode, setSelectedNode] = useState<JourneyNode | null>(null)

  const journeyNodes: JourneyNode[] = [
    {
      id: "start",
      title: "Safari Base Camp",
      subject: "Introduction",
      isUnlocked: true,
      isCompleted: true,
      progress: 100,
      xpReward: 50,
      animalGuide: "Safari Ranger",
      animalEmoji: "🏕️",
      position: { x: 50, y: 90 },
      connections: ["math1", "science1"],
      difficulty: "Explorer",
      estimatedTime: "5 min",
    },
    {
      id: "math1",
      title: "Number Jungle",
      subject: "Mathematics",
      isUnlocked: true,
      isCompleted: true,
      progress: 100,
      xpReward: 120,
      animalGuide: "Leo the Lion",
      animalEmoji: "🦁",
      position: { x: 25, y: 70 },
      connections: ["math2"],
      difficulty: "Explorer",
      estimatedTime: "15 min",
    },
    {
      id: "science1",
      title: "Chemistry Watering Hole",
      subject: "Chemistry",
      isUnlocked: true,
      isCompleted: true,
      progress: 100,
      xpReward: 150,
      animalGuide: "Ellie the Elephant",
      animalEmoji: "🐘",
      position: { x: 75, y: 70 },
      connections: ["science2"],
      difficulty: "Explorer",
      estimatedTime: "20 min",
    },
    {
      id: "math2",
      title: "Algebra Savanna",
      subject: "Mathematics",
      isUnlocked: true,
      isCompleted: false,
      progress: 75,
      xpReward: 180,
      animalGuide: "Grace the Giraffe",
      animalEmoji: "🦒",
      position: { x: 20, y: 50 },
      connections: ["math3"],
      difficulty: "Adventurer",
      estimatedTime: "25 min",
    },
    {
      id: "science2",
      title: "Physics Plains",
      subject: "Physics",
      isUnlocked: true,
      isCompleted: false,
      progress: 30,
      xpReward: 200,
      animalGuide: "Charlie the Cheetah",
      animalEmoji: "🐆",
      position: { x: 80, y: 50 },
      connections: ["science3"],
      difficulty: "Adventurer",
      estimatedTime: "30 min",
    },
    {
      id: "math3",
      title: "Geometry Mountain",
      subject: "Mathematics",
      isUnlocked: false,
      isCompleted: false,
      progress: 0,
      xpReward: 250,
      animalGuide: "Rocky the Rhino",
      animalEmoji: "🦏",
      position: { x: 15, y: 30 },
      connections: ["advanced1"],
      difficulty: "Safari Master",
      estimatedTime: "35 min",
    },
    {
      id: "science3",
      title: "Biology Rainforest",
      subject: "Biology",
      isUnlocked: false,
      isCompleted: false,
      progress: 0,
      xpReward: 220,
      animalGuide: "Max the Monkey",
      animalEmoji: "🐵",
      position: { x: 85, y: 30 },
      connections: ["advanced1"],
      difficulty: "Safari Master",
      estimatedTime: "40 min",
    },
    {
      id: "advanced1",
      title: "Summit of Knowledge",
      subject: "Advanced Topics",
      isUnlocked: false,
      isCompleted: false,
      progress: 0,
      xpReward: 500,
      animalGuide: "Wise Eagle",
      animalEmoji: "🦅",
      position: { x: 50, y: 10 },
      connections: [],
      difficulty: "Safari Master",
      estimatedTime: "60 min",
    },
  ]

  const getNodeStatusColor = (node: JourneyNode) => {
    if (node.isCompleted) return "bg-green-500 border-green-600"
    if (node.isUnlocked) return "bg-primary border-primary"
    return "bg-gray-400 border-gray-500"
  }

  const getNodeStatusIcon = (node: JourneyNode) => {
    if (node.isCompleted) return <CheckCircle className="h-6 w-6 text-white" />
    if (node.isUnlocked) return <Play className="h-6 w-6 text-white" />
    return <Lock className="h-6 w-6 text-white" />
  }

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

  const totalXP = journeyNodes.reduce((sum, node) => (node.isCompleted ? sum + node.xpReward : sum), 0)
  const completedNodes = journeyNodes.filter((node) => node.isCompleted).length
  const totalNodes = journeyNodes.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
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
                <Map className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Learning Journey Map</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="hidden sm:flex">
                {completedNodes}/{totalNodes} Completed
              </Badge>
              <Badge variant="outline">{totalXP} XP Earned</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Progress Overview */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Safari Progress</h2>
                <p className="text-muted-foreground">
                  Complete learning nodes to unlock new areas and advance your journey
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{completedNodes}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{totalXP}</div>
                  <div className="text-xs text-muted-foreground">Total XP</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">Level 8</div>
                  <div className="text-xs text-muted-foreground">Explorer</div>
                </div>
              </div>
            </div>
            <Progress value={(completedNodes / totalNodes) * 100} className="mt-4" />
          </CardContent>
        </Card>

        {/* Journey Map */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Visualization */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] relative overflow-hidden">
              <CardContent className="p-0 h-full">
                {/* Background Safari Scene */}
                <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-green-200 to-yellow-200">
                  {/* Decorative Elements */}
                  <TreePine className="absolute top-4 left-4 h-8 w-8 text-green-600 opacity-30" />
                  <Mountain className="absolute top-6 right-8 h-12 w-12 text-gray-600 opacity-20" />
                  <Waves className="absolute bottom-4 left-8 h-6 w-6 text-blue-600 opacity-30" />
                  <TreePine className="absolute bottom-8 right-4 h-10 w-10 text-green-700 opacity-25" />
                </div>

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {journeyNodes.map((node) =>
                    node.connections.map((connectionId) => {
                      const connectedNode = journeyNodes.find((n) => n.id === connectionId)
                      if (!connectedNode) return null

                      const isPathUnlocked = node.isCompleted && connectedNode.isUnlocked

                      return (
                        <line
                          key={`${node.id}-${connectionId}`}
                          x1={`${node.position.x}%`}
                          y1={`${node.position.y}%`}
                          x2={`${connectedNode.position.x}%`}
                          y2={`${connectedNode.position.y}%`}
                          stroke={isPathUnlocked ? "#ea580c" : "#d1d5db"}
                          strokeWidth="3"
                          strokeDasharray={isPathUnlocked ? "0" : "8,4"}
                          className="transition-all duration-500"
                        />
                      )
                    }),
                  )}
                </svg>

                {/* Journey Nodes */}
                {journeyNodes.map((node) => (
                  <div
                    key={node.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
                    onClick={() => setSelectedNode(node)}
                  >
                    <div
                      className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 hover:scale-110 ${getNodeStatusColor(
                        node,
                      )} ${selectedNode?.id === node.id ? "ring-4 ring-primary/30" : ""}`}
                    >
                      {getNodeStatusIcon(node)}
                    </div>
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="text-xs font-medium text-gray-800 whitespace-nowrap bg-white/80 px-2 py-1 rounded">
                        {node.animalEmoji}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Node Details Panel */}
          <div className="space-y-4">
            {selectedNode ? (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{selectedNode.animalEmoji}</div>
                    <h3 className="text-xl font-bold">{selectedNode.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedNode.animalGuide}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Subject:</span>
                      <Badge variant="outline">{selectedNode.subject}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Difficulty:</span>
                      <Badge className={getDifficultyColor(selectedNode.difficulty)} variant="secondary">
                        {selectedNode.difficulty}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">XP Reward:</span>
                      <span className="font-bold text-primary">+{selectedNode.xpReward} XP</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Duration:</span>
                      <span className="text-sm">{selectedNode.estimatedTime}</span>
                    </div>

                    {selectedNode.isUnlocked && !selectedNode.isCompleted && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress:</span>
                          <span>{selectedNode.progress}%</span>
                        </div>
                        <Progress value={selectedNode.progress} />
                      </div>
                    )}

                    <Button
                      className="w-full"
                      disabled={!selectedNode.isUnlocked}
                      variant={selectedNode.isCompleted ? "outline" : "default"}
                    >
                      {selectedNode.isCompleted ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completed
                        </>
                      ) : selectedNode.isUnlocked ? (
                        selectedNode.progress > 0 ? (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Continue
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start Quest
                          </>
                        )
                      ) : (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          Locked
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <Compass className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Explore Your Journey</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on any node in the map to see details and start your learning adventure
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Legend */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Map Legend</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span>Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                    <span>Locked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-primary"></div>
                    <span>Unlocked Path</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-gray-300 border-dashed border-t-2 border-gray-400"></div>
                    <span>Locked Path</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
