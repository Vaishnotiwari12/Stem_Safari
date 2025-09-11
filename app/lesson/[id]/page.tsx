"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Volume2,
  VolumeX,
  BookOpen,
  Lightbulb,
  Target,
  CheckCircle,
  Eye,
  Brain,
  Zap,
} from "lucide-react"

interface LessonContent {
  id: string
  title: string
  subject: string
  animalGuide: {
    name: string
    emoji: string
    personality: string
  }
  totalSlides: number
  estimatedTime: string
  xpReward: number
  slides: LessonSlide[]
}

interface LessonSlide {
  id: number
  type: "introduction" | "concept" | "example" | "practice" | "summary"
  title: string
  content: string
  visualAid?: string
  animalDialogue: string
  keyPoints: string[]
  interactiveElement?: {
    type: "click-to-reveal" | "drag-drop" | "multiple-choice"
    data: any
  }
}

export default function LessonContentScreen({ params }: { params: { id: string } }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [completedSlides, setCompletedSlides] = useState<number[]>([])
  const [showKeyPoints, setShowKeyPoints] = useState(false)

  // Mock lesson data - in real app, this would be fetched based on params.id
  const lesson: LessonContent = {
    id: "algebra-basics",
    title: "Lion's Math Kingdom: Algebra Basics",
    subject: "Mathematics",
    animalGuide: {
      name: "Leo the Lion",
      emoji: "🦁",
      personality: "Confident and encouraging, loves to roar with excitement when students understand concepts!",
    },
    totalSlides: 5,
    estimatedTime: "25 min",
    xpReward: 150,
    slides: [
      {
        id: 0,
        type: "introduction",
        title: "Welcome to the Math Kingdom!",
        content:
          "In the vast savanna of mathematics, algebra is like learning the language of the lions! Today, we'll discover how to solve for unknown values using the power of algebraic thinking.",
        visualAid: "/cartoon-lion-wearing-a-crown-in-a-mathematical-kin.jpg",
        animalDialogue:
          "Roar! Welcome to my kingdom, young explorer! I'm Leo, and I'll be your guide through the exciting world of algebra. Are you ready to become an algebra champion?",
        keyPoints: [
          "Algebra helps us find unknown numbers",
          "We use letters like 'x' to represent unknown values",
          "Solving equations is like solving puzzles",
        ],
      },
      {
        id: 1,
        type: "concept",
        title: "What is a Variable?",
        content:
          "A variable is like a mystery box in our mathematical kingdom. We use letters (usually x, y, or z) to represent numbers we don't know yet. Think of it as a treasure chest that Leo is guarding - we need to find out what's inside!",
        visualAid: "/treasure-chest-with-question-mark-and-mathematical.jpg",
        animalDialogue:
          "Imagine I'm hiding the number of zebras in my territory behind this rock. If I call this unknown number 'x', then x could be 5 zebras, 10 zebras, or any number! That's what we call a variable.",
        keyPoints: [
          "Variables are letters that represent unknown numbers",
          "Common variables are x, y, and z",
          "Variables help us write mathematical relationships",
        ],
      },
      {
        id: 2,
        type: "example",
        title: "Simple Equations in Action",
        content:
          "Let's say Leo has some zebras in his territory, and 3 more zebras join them. Now he has 8 zebras total. How many zebras did he start with? We can write this as: x + 3 = 8",
        visualAid: "/zebras-in-savanna-with-mathematical-equation-overl.jpg",
        animalDialogue:
          "This is exciting! To find x, I need to think: what number plus 3 equals 8? Let me count backwards... 8 - 3 = 5! So x = 5. I started with 5 zebras!",
        keyPoints: [
          "Equations show relationships between numbers",
          "To solve x + 3 = 8, subtract 3 from both sides",
          "Always check your answer by substituting back",
        ],
      },
      {
        id: 3,
        type: "practice",
        title: "Try It Yourself!",
        content:
          "Now it's your turn to help Leo solve a problem! Leo collected some golden acacia seeds. Then he found 4 more seeds. Now he has 12 seeds total. How many seeds did he start with?",
        visualAid: "/golden-acacia-seeds-scattered-on-ground-with-lion-.jpg",
        animalDialogue:
          "I believe in you, young mathematician! Remember, if I started with x seeds and found 4 more to get 12 total, what equation can you write? Take your time and roar when you figure it out!",
        keyPoints: ["Write the equation: x + 4 = 12", "Solve by subtracting 4 from both sides", "Check: 8 + 4 = 12 ✓"],
        interactiveElement: {
          type: "multiple-choice",
          data: {
            question: "What equation represents this problem?",
            options: ["x + 4 = 12", "x - 4 = 12", "4x = 12", "x ÷ 4 = 12"],
            correct: 0,
          },
        },
      },
      {
        id: 4,
        type: "summary",
        title: "Congratulations, Algebra Champion!",
        content:
          "You've successfully learned the basics of algebra in Leo's Math Kingdom! You now know how to identify variables, write simple equations, and solve for unknown values. You're ready for your next mathematical adventure!",
        visualAid: "/lion-wearing-graduation-cap-with-mathematical-symb.jpg",
        animalDialogue:
          "ROAR! Outstanding work, my friend! You've mastered the fundamentals of algebra. I'm so proud of you! Now you're ready to take on the Algebra Safari Quiz. Remember, every great mathematician started just like you!",
        keyPoints: [
          "Variables represent unknown numbers",
          "Equations show mathematical relationships",
          "Solve by performing the same operation on both sides",
          "Always check your answers",
        ],
      },
    ],
  }

  const currentSlideData = lesson.slides[currentSlide]
  const progress = ((currentSlide + 1) / lesson.totalSlides) * 100

  const nextSlide = () => {
    if (currentSlide < lesson.totalSlides - 1) {
      if (!completedSlides.includes(currentSlide)) {
        setCompletedSlides([...completedSlides, currentSlide])
      }
      setCurrentSlide(currentSlide + 1)
      setShowKeyPoints(false)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      setShowKeyPoints(false)
    }
  }

  const getSlideTypeIcon = (type: string) => {
    switch (type) {
      case "introduction":
        return <Play className="h-4 w-4" />
      case "concept":
        return <Brain className="h-4 w-4" />
      case "example":
        return <Eye className="h-4 w-4" />
      case "practice":
        return <Target className="h-4 w-4" />
      case "summary":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getSlideTypeColor = (type: string) => {
    switch (type) {
      case "introduction":
        return "bg-blue-100 text-blue-800"
      case "concept":
        return "bg-purple-100 text-purple-800"
      case "example":
        return "bg-green-100 text-green-800"
      case "practice":
        return "bg-orange-100 text-orange-800"
      case "summary":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/journey">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Journey Map
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{lesson.animalGuide.emoji}</span>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold">{lesson.title}</h1>
                  <p className="text-sm text-muted-foreground">{lesson.animalGuide.name}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className="hidden sm:flex"
              >
                {isAudioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <Badge variant="outline" className="hidden sm:flex">
                {currentSlide + 1}/{lesson.totalSlides}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Lesson Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Slide Type Badge */}
            <div className="flex items-center gap-2">
              <Badge className={getSlideTypeColor(currentSlideData.type)} variant="secondary">
                {getSlideTypeIcon(currentSlideData.type)}
                <span className="ml-1 capitalize">{currentSlideData.type}</span>
              </Badge>
              <Badge variant="outline">Slide {currentSlide + 1}</Badge>
            </div>

            {/* Main Lesson Card */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-balance">{currentSlideData.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Visual Aid */}
                {currentSlideData.visualAid && (
                  <div className="flex justify-center">
                    <img
                      src={currentSlideData.visualAid || "/placeholder.svg"}
                      alt="Lesson illustration"
                      className="rounded-lg max-w-full h-auto max-h-64 object-cover"
                    />
                  </div>
                )}

                {/* Lesson Content */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">{currentSlideData.content}</p>
                </div>

                {/* Interactive Element */}
                {currentSlideData.interactiveElement?.type === "multiple-choice" && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">{currentSlideData.interactiveElement.data.question}</h4>
                      <div className="space-y-2">
                        {currentSlideData.interactiveElement.data.options.map((option: string, index: number) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-start text-left h-auto py-3 bg-transparent"
                            onClick={() => {
                              if (index === currentSlideData.interactiveElement?.data.correct) {
                                alert("Correct! Well done!")
                              } else {
                                alert("Try again! Think about what the problem is asking.")
                              }
                            }}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Key Points */}
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <Button
                      variant="ghost"
                      onClick={() => setShowKeyPoints(!showKeyPoints)}
                      className="w-full justify-between p-0 h-auto"
                    >
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-green-600" />
                        <span className="font-medium">Key Learning Points</span>
                      </div>
                      <span className="text-xs">{showKeyPoints ? "Hide" : "Show"}</span>
                    </Button>
                    {showKeyPoints && (
                      <ul className="mt-3 space-y-1">
                        {currentSlideData.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={prevSlide} disabled={currentSlide === 0}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentSlide === lesson.totalSlides - 1 ? (
                <Link href="/quiz/algebra-basics">
                  <Button className="bg-primary hover:bg-primary/90">
                    <Zap className="h-4 w-4 mr-2" />
                    Start Safari Quiz
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Button onClick={nextSlide}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Animal Guide */}
            <Card>
              <CardContent className="p-4">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{lesson.animalGuide.emoji}</div>
                  <h3 className="font-bold">{lesson.animalGuide.name}</h3>
                  <p className="text-xs text-muted-foreground">Your Safari Guide</p>
                </div>
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-3">
                    <p className="text-sm italic text-orange-800">"{currentSlideData.animalDialogue}"</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Lesson Info */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Lesson Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subject:</span>
                    <Badge variant="outline">{lesson.subject}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{lesson.estimatedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>XP Reward:</span>
                    <span className="font-bold text-primary">+{lesson.xpReward} XP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed:</span>
                    <span>
                      {completedSlides.length}/{lesson.totalSlides}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Slide Navigation */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Lesson Outline</h4>
                <div className="space-y-2">
                  {lesson.slides.map((slide, index) => (
                    <Button
                      key={slide.id}
                      variant={currentSlide === index ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => setCurrentSlide(index)}
                    >
                      <div className="flex items-center gap-2">
                        {getSlideTypeIcon(slide.type)}
                        <div>
                          <div className="text-xs font-medium">{slide.title}</div>
                          <div className="text-xs text-muted-foreground capitalize">{slide.type}</div>
                        </div>
                      </div>
                      {completedSlides.includes(index) && <CheckCircle className="h-3 w-3 text-green-600 ml-auto" />}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
