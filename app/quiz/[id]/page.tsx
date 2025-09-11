"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, CheckCircle, X, Trophy, Zap, Timer, Target, Brain, Sparkles } from "lucide-react"

interface QuizQuestion {
  id: number
  type: "multiple-choice" | "drag-drop" | "true-false" | "fill-blank"
  question: string
  options?: string[]
  correctAnswer: number | string
  explanation: string
  points: number
  timeLimit: number
  hint?: string
  visualAid?: string
}

interface QuizData {
  id: string
  title: string
  subject: string
  animalGuide: {
    name: string
    emoji: string
  }
  totalQuestions: number
  timeLimit: number
  passingScore: number
  xpReward: number
  questions: QuizQuestion[]
}

export default function GamefiedQuizScreen({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null)
  const [userAnswers, setUserAnswers] = useState<(number | string | null)[]>([])
  const [score, setScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [streak, setStreak] = useState(0)
  const [showHint, setShowHint] = useState(false)

  // Mock quiz data - in real app, this would be fetched based on params.id
  const quiz: QuizData = {
    id: "algebra-basics",
    title: "Algebra Safari Challenge",
    subject: "Mathematics",
    animalGuide: {
      name: "Leo the Lion",
      emoji: "🦁",
    },
    totalQuestions: 5,
    timeLimit: 300, // 5 minutes
    passingScore: 70,
    xpReward: 200,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "If Leo has x zebras and 3 more zebras join his pride, and now he has 8 zebras total, what is x?",
        options: ["3", "5", "8", "11"],
        correctAnswer: 1,
        explanation: "Since x + 3 = 8, we subtract 3 from both sides: x = 8 - 3 = 5",
        points: 20,
        timeLimit: 60,
        hint: "Think about what number plus 3 equals 8",
        visualAid: "/zebras-in-savanna-with-mathematical-equation-overl.jpg",
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "Which of these is a variable in the equation: 2y + 5 = 13?",
        options: ["2", "y", "5", "13"],
        correctAnswer: 1,
        explanation: "A variable is a letter that represents an unknown number. In this equation, 'y' is the variable.",
        points: 15,
        timeLimit: 45,
        hint: "Look for the letter in the equation",
      },
      {
        id: 3,
        type: "true-false",
        question: "The equation x - 4 = 6 has the same solution as x = 6 + 4",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True! Both equations give us x = 10. We can add 4 to both sides of the first equation.",
        points: 15,
        timeLimit: 30,
        hint: "Try solving both equations and see if you get the same answer",
      },
      {
        id: 4,
        type: "multiple-choice",
        question:
          "Leo collected golden seeds. If he has 3 times as many seeds as Grace the Giraffe, and Grace has 4 seeds, how many seeds does Leo have?",
        options: ["7", "12", "16", "1"],
        correctAnswer: 1,
        explanation: "If Grace has 4 seeds and Leo has 3 times as many, then Leo has 3 × 4 = 12 seeds.",
        points: 25,
        timeLimit: 75,
        hint: "Multiply Grace's seeds by 3",
        visualAid: "/golden-acacia-seeds-scattered-on-ground-with-lion-.jpg",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What is the first step to solve: 2x + 6 = 14?",
        options: [
          "Divide both sides by 2",
          "Subtract 6 from both sides",
          "Add 6 to both sides",
          "Multiply both sides by 2",
        ],
        correctAnswer: 1,
        explanation:
          "First, we subtract 6 from both sides to isolate the term with x: 2x = 8, then divide by 2 to get x = 4.",
        points: 25,
        timeLimit: 60,
        hint: "Think about undoing the operations. What's being added to 2x?",
      },
    ],
  }

  const currentQuestionData = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.totalQuestions) * 100

  // Timer effect
  useEffect(() => {
    if (quizStarted && !quizCompleted && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0 && quizStarted) {
      handleQuizComplete()
    }
  }, [timeRemaining, quizStarted, quizCompleted])

  const startQuiz = () => {
    setQuizStarted(true)
    setTimeRemaining(quiz.timeLimit)
    setUserAnswers(new Array(quiz.totalQuestions).fill(null))
  }

  const handleAnswerSelect = (answer: number | string) => {
    setSelectedAnswer(answer)
  }

  const submitAnswer = () => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = selectedAnswer
    setUserAnswers(newAnswers)

    const isCorrect = selectedAnswer === currentQuestionData.correctAnswer
    if (isCorrect) {
      setScore(score + currentQuestionData.points)
      setStreak(streak + 1)
    } else {
      setStreak(0)
    }

    setShowFeedback(true)
  }

  const nextQuestion = () => {
    setShowFeedback(false)
    setSelectedAnswer(null)
    setShowHint(false)

    if (currentQuestion < quiz.totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleQuizComplete()
    }
  }

  const handleQuizComplete = () => {
    setQuizCompleted(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getScorePercentage = () => {
    const maxScore = quiz.questions.reduce((sum, q) => sum + q.points, 0)
    return Math.round((score / maxScore) * 100)
  }

  const getPerformanceMessage = () => {
    const percentage = getScorePercentage()
    if (percentage >= 90)
      return { message: "Outstanding! You're an Algebra Champion!", emoji: "🏆", color: "text-yellow-600" }
    if (percentage >= 80)
      return { message: "Excellent work! You've mastered the basics!", emoji: "⭐", color: "text-blue-600" }
    if (percentage >= 70)
      return { message: "Good job! You're on the right track!", emoji: "👍", color: "text-green-600" }
    return { message: "Keep practicing! You'll get there!", emoji: "💪", color: "text-orange-600" }
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-xl">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">{quiz.animalGuide.emoji}</div>
            <CardTitle className="text-3xl mb-2">{quiz.title}</CardTitle>
            <p className="text-lg text-muted-foreground">
              Ready to test your algebra skills with {quiz.animalGuide.name}?
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{quiz.totalQuestions}</div>
                <div className="text-sm text-blue-800">Questions</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{formatTime(quiz.timeLimit)}</div>
                <div className="text-sm text-green-800">Time Limit</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{quiz.passingScore}%</div>
                <div className="text-sm text-orange-800">To Pass</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">+{quiz.xpReward}</div>
                <div className="text-sm text-purple-800">XP Reward</div>
              </div>
            </div>

            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{quiz.animalGuide.emoji}</span>
                  <div>
                    <p className="font-medium text-orange-800">Leo says:</p>
                    <p className="text-sm text-orange-700 italic">
                      "Roar! Are you ready for an exciting algebra adventure? Remember, take your time, read each
                      question carefully, and don't be afraid to use hints if you need them. I believe in you, young
                      mathematician!"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Link href="/lesson/algebra-basics" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Review Lesson
                </Button>
              </Link>
              <Button onClick={startQuiz} className="flex-1 bg-primary hover:bg-primary/90">
                <Zap className="h-4 w-4 mr-2" />
                Start Safari Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (quizCompleted) {
    const performance = getPerformanceMessage()
    const passed = getScorePercentage() >= quiz.passingScore

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-xl">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">{performance.emoji}</div>
            <CardTitle className="text-3xl mb-2">Safari Quiz Complete!</CardTitle>
            <p className={`text-lg font-medium ${performance.color}`}>{performance.message}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{getScorePercentage()}%</div>
              <div className="text-muted-foreground">Final Score</div>
              <Badge className={passed ? "bg-green-100 text-green-800 mt-2" : "bg-orange-100 text-orange-800 mt-2"}>
                {passed ? "Passed!" : "Keep Practicing!"}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-xl font-bold text-blue-600">{score}</div>
                <div className="text-xs text-blue-800">Points Earned</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-xl font-bold text-green-600">
                  {userAnswers.filter((answer, index) => answer === quiz.questions[index].correctAnswer).length}
                </div>
                <div className="text-xs text-green-800">Correct Answers</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-xl font-bold text-purple-600">
                  {passed ? quiz.xpReward : Math.floor(quiz.xpReward * 0.5)}
                </div>
                <div className="text-xs text-purple-800">XP Earned</div>
              </div>
            </div>

            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{quiz.animalGuide.emoji}</span>
                  <div>
                    <p className="font-medium text-orange-800">Leo says:</p>
                    <p className="text-sm text-orange-700 italic">
                      {passed
                        ? "Magnificent work! You've truly mastered these algebra concepts. I'm so proud of you! Ready for your next adventure?"
                        : "Don't worry, every great mathematician needs practice! Review the lesson and try again. I know you can do it!"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              {passed ? (
                <Link href="/achievements" className="flex-1">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Trophy className="h-4 w-4 mr-2" />
                    View Achievements
                  </Button>
                </Link>
              ) : (
                <Link href="/lesson/algebra-basics" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Review Lesson
                  </Button>
                </Link>
              )}
              <Link href="/journey" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Continue Journey
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{quiz.animalGuide.emoji}</span>
              <div>
                <h1 className="text-lg font-bold">{quiz.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {quiz.totalQuestions}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Timer className="h-3 w-3" />
                {formatTime(timeRemaining)}
              </Badge>
              <Badge variant="secondary">{score} pts</Badge>
              {streak > 1 && (
                <Badge className="bg-orange-100 text-orange-800 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  {streak} streak!
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Progress */}
        <div className="mb-6">
          <Progress value={progress} className="h-3" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Question */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                    <Brain className="h-3 w-3" />
                    {currentQuestionData.points} points
                  </Badge>
                  <Badge variant="outline">
                    <Target className="h-3 w-3 mr-1" />
                    {formatTime(currentQuestionData.timeLimit)}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-balance">{currentQuestionData.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Visual Aid */}
                {currentQuestionData.visualAid && (
                  <div className="flex justify-center">
                    <img
                      src={currentQuestionData.visualAid || "/placeholder.svg"}
                      alt="Question illustration"
                      className="rounded-lg max-w-full h-auto max-h-48 object-cover"
                    />
                  </div>
                )}

                {/* Answer Options */}
                <div className="space-y-3">
                  {currentQuestionData.options?.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === index ? "default" : "outline"}
                      className="w-full justify-start text-left h-auto py-4 bg-transparent"
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showFeedback}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span>{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>

                {/* Hint */}
                {currentQuestionData.hint && (
                  <div className="flex justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowHint(!showHint)}
                      className="text-orange-600 hover:text-orange-700"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      {showHint ? "Hide Hint" : "Need a Hint?"}
                    </Button>
                  </div>
                )}

                {showHint && (
                  <Card className="bg-yellow-50 border-yellow-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2">
                        <Sparkles className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <p className="text-sm text-yellow-800">{currentQuestionData.hint}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Feedback */}
                {showFeedback && (
                  <Card
                    className={
                      selectedAnswer === currentQuestionData.correctAnswer
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {selectedAnswer === currentQuestionData.correctAnswer ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-red-600 mt-0.5" />
                        )}
                        <div>
                          <p
                            className={`font-medium ${selectedAnswer === currentQuestionData.correctAnswer ? "text-green-800" : "text-red-800"}`}
                          >
                            {selectedAnswer === currentQuestionData.correctAnswer ? "Correct!" : "Not quite right"}
                          </p>
                          <p
                            className={`text-sm mt-1 ${selectedAnswer === currentQuestionData.correctAnswer ? "text-green-700" : "text-red-700"}`}
                          >
                            {currentQuestionData.explanation}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Action Button */}
                <div className="flex justify-center">
                  {showFeedback ? (
                    <Button onClick={nextQuestion} className="bg-primary hover:bg-primary/90">
                      {currentQuestion === quiz.totalQuestions - 1 ? "Finish Quiz" : "Next Question"}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={submitAnswer}
                      disabled={selectedAnswer === null}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Submit Answer
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Animal Guide */}
            <Card>
              <CardContent className="p-4">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{quiz.animalGuide.emoji}</div>
                  <h3 className="font-bold">{quiz.animalGuide.name}</h3>
                  <p className="text-xs text-muted-foreground">Your Quiz Guide</p>
                </div>
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-3">
                    <p className="text-sm italic text-orange-800">
                      {showFeedback
                        ? selectedAnswer === currentQuestionData.correctAnswer
                          ? "Roar! Excellent work! You're getting the hang of this!"
                          : "Don't worry! Every mistake is a learning opportunity. Keep going!"
                        : "Take your time and think carefully. You've got this!"}
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Quiz Stats */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Quiz Progress</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Questions:</span>
                    <span>
                      {currentQuestion + 1}/{quiz.totalQuestions}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Score:</span>
                    <span className="font-bold text-primary">{score} pts</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time Left:</span>
                    <span className={timeRemaining < 60 ? "text-red-600 font-bold" : ""}>
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                  {streak > 1 && (
                    <div className="flex justify-between text-sm">
                      <span>Streak:</span>
                      <span className="text-orange-600 font-bold flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        {streak}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Question Navigation */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Questions</h4>
                <div className="grid grid-cols-5 gap-2">
                  {quiz.questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                        index === currentQuestion
                          ? "bg-primary text-primary-foreground border-primary"
                          : userAnswers[index] !== null
                            ? userAnswers[index] === quiz.questions[index].correctAnswer
                              ? "bg-green-100 text-green-800 border-green-300"
                              : "bg-red-100 text-red-800 border-red-300"
                            : "bg-gray-100 text-gray-600 border-gray-300"
                      }`}
                    >
                      {index + 1}
                    </div>
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
