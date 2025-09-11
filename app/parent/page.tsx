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
  Phone,
  MessageSquare,
  Calendar,
  Award,
  Bell,
  Volume2,
  User,
  BookOpen,
  Trophy,
  Star,
  Clock,
  Heart,
  Send,
  Mic,
} from "lucide-react"

interface ChildProgress {
  name: string
  grade: string
  totalXP: number
  level: number
  weeklyProgress: number
  completedQuests: number
  currentStreak: number
  lastActive: string
  subjects: {
    name: string
    progress: number
    grade: string
  }[]
  recentAchievements: {
    title: string
    date: string
    reward: string
  }[]
}

interface Message {
  id: string
  type: "sms" | "voice" | "notification"
  title: string
  content: string
  timestamp: string
  isRead: boolean
  priority: "low" | "medium" | "high"
  sender: string
}

interface Meeting {
  id: string
  title: string
  teacher: string
  date: string
  time: string
  type: "parent-teacher" | "progress-review" | "concern"
  status: "scheduled" | "completed" | "cancelled"
}

export default function ParentHub() {
  const [selectedLanguage, setSelectedLanguage] = useState("hi")
  const [isListening, setIsListening] = useState(false)
  const [selectedChild, setSelectedChild] = useState("raj")

  const languages = [
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  ]

  const childProgress: ChildProgress = {
    name: "राज कुमार",
    grade: "कक्षा 9",
    totalXP: 1250,
    level: 8,
    weeklyProgress: 85,
    completedQuests: 12,
    currentStreak: 5,
    lastActive: "2 घंटे पहले",
    subjects: [
      { name: "गणित", progress: 78, grade: "अच्छा" },
      { name: "विज्ञान", progress: 85, grade: "बहुत अच्छा" },
      { name: "रसायन", progress: 72, grade: "अच्छा" },
      { name: "भौतिकी", progress: 68, grade: "सुधार की जरूरत" },
    ],
    recentAchievements: [
      { title: "गणित मास्टर", date: "3 दिन पहले", reward: "वैज्ञानिक कैलकुलेटर" },
      { title: "साप्ताहिक चैंपियन", date: "1 सप्ताह पहले", reward: "प्रमाण पत्र" },
    ],
  }

  const messages: Message[] = [
    {
      id: "1",
      type: "notification",
      title: "बधाई हो! राज ने नया बैज जीता",
      content: "आपके बेटे राज ने 'गणित मास्टर' बैज जीता है। उन्होंने 50 गणित के सवाल सही हल किए हैं।",
      timestamp: "2 घंटे पहले",
      isRead: false,
      priority: "high",
      sender: "Quest Academy",
    },
    {
      id: "2",
      type: "sms",
      title: "साप्ताहिक प्रगति रिपोर्ट",
      content: "राज ने इस सप्ताह 85% प्रगति की है। वे गणित और विज्ञान में बहुत अच्छा कर रहे हैं।",
      timestamp: "1 दिन पहले",
      isRead: true,
      priority: "medium",
      sender: "शिक्षक प्रिया शर्मा",
    },
    {
      id: "3",
      type: "voice",
      title: "शिक्षक से संदेश",
      content: "नमस्ते, मैं प्रिया शर्मा हूं। राज की पढ़ाई में बहुत सुधार हो रहा है। कृपया उनसे भौतिकी पर और ध्यान देने को कहें।",
      timestamp: "2 दिन पहले",
      isRead: true,
      priority: "medium",
      sender: "शिक्षक प्रिया शर्मा",
    },
  ]

  const upcomingMeetings: Meeting[] = [
    {
      id: "1",
      title: "मासिक प्रगति समीक्षा",
      teacher: "प्रिया शर्मा",
      date: "15 फरवरी 2024",
      time: "शाम 4:00 बजे",
      type: "progress-review",
      status: "scheduled",
    },
    {
      id: "2",
      title: "भौतिकी में सुधार पर चर्चा",
      teacher: "राम प्रसाद",
      date: "20 फरवरी 2024",
      time: "शाम 5:00 बजे",
      type: "concern",
      status: "scheduled",
    },
  ]

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "hi-IN"
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSubjectGradeColor = (grade: string) => {
    switch (grade) {
      case "बहुत अच्छा":
        return "text-green-600"
      case "अच्छा":
        return "text-blue-600"
      case "सुधार की जरूरत":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-full p-2">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">अभिभावक केंद्र</h1>
                <p className="text-sm text-muted-foreground">अपने बच्चे की प्रगति देखें</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Voice Help */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => speakText("नमस्ते, यह आपके बच्चे की प्रगति का पेज है। यहाँ आप उनकी पढ़ाई की जानकारी देख सकते हैं।")}
              >
                <Volume2 className="h-4 w-4 mr-2" />
                सहायता सुनें
              </Button>

              {/* Notifications */}
              <Button variant="outline" size="sm" className="relative bg-transparent">
                <Bell className="h-4 w-4 mr-2" />
                सूचनाएं
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  3
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Child Overview Card */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarImage src="/student-avatar.png" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">रा</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{childProgress.name}</h2>
                  <p className="text-muted-foreground">{childProgress.grade} • गांव स्कूल</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">स्तर {childProgress.level}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium">{childProgress.completedQuests} पूर्ण</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">{childProgress.lastActive}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl font-bold text-primary">{childProgress.weeklyProgress}%</div>
                <p className="text-sm text-muted-foreground">इस सप्ताह की प्रगति</p>
                <Button
                  className="mt-2"
                  onClick={() =>
                    speakText(
                      `आपके बेटे ${childProgress.name} ने इस सप्ताह ${childProgress.weeklyProgress} प्रतिशत प्रगति की है।`,
                    )
                  }
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  सुनें
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="progress">प्रगति</TabsTrigger>
            <TabsTrigger value="messages">संदेश</TabsTrigger>
            <TabsTrigger value="meetings">मीटिंग</TabsTrigger>
            <TabsTrigger value="communication">संपर्क</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-6">
            {/* Subject Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  विषयवार प्रगति
                </CardTitle>
                <CardDescription>आपके बच्चे की हर विषय में प्रगति देखें</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {childProgress.subjects.map((subject, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{subject.name}</h4>
                        <span className={`text-sm font-medium ${getSubjectGradeColor(subject.grade)}`}>
                          {subject.grade}
                        </span>
                      </div>
                      <Progress value={subject.progress} className="mb-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{subject.progress}% पूर्ण</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            speakText(`${subject.name} में ${subject.progress} प्रतिशत प्रगति है। यह ${subject.grade} है।`)
                          }
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  हाल की उपलब्धियां
                </CardTitle>
                <CardDescription>आपके बच्चे के नए बैज और पुरस्कार</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {childProgress.recentAchievements.map((achievement, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-yellow-100 p-2 rounded-full">
                          <Trophy className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">{achievement.reward}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakText(`${achievement.title} बैज जीता। इनाम: ${achievement.reward}`)}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">संदेश और अपडेट</h2>
              <Button>
                <Send className="h-4 w-4 mr-2" />
                नया संदेश भेजें
              </Button>
            </div>

            <div className="space-y-4">
              {messages.map((message) => (
                <Card key={message.id} className={`${!message.isRead ? "border-primary" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="bg-primary/10 p-2 rounded-full">
                          {message.type === "sms" && <MessageSquare className="h-4 w-4 text-primary" />}
                          {message.type === "voice" && <Volume2 className="h-4 w-4 text-primary" />}
                          {message.type === "notification" && <Bell className="h-4 w-4 text-primary" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{message.title}</h4>
                            <Badge className={getPriorityColor(message.priority)} variant="outline">
                              {message.priority === "high" ? "जरूरी" : message.priority === "medium" ? "सामान्य" : "कम"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{message.content}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {message.sender} • {message.timestamp}
                            </span>
                            <Button variant="ghost" size="sm" onClick={() => speakText(message.content)}>
                              <Volume2 className="h-3 w-3 mr-1" />
                              सुनें
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="meetings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">शिक्षक मीटिंग</h2>
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                नई मीटिंग बुक करें
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingMeetings.map((meeting) => (
                <Card key={meeting.id}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{meeting.title}</h4>
                        <Badge variant={meeting.type === "concern" ? "destructive" : "secondary"}>
                          {meeting.type === "progress-review" ? "प्रगति समीक्षा" : "चिंता"}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>शिक्षक: {meeting.teacher}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{meeting.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{meeting.time}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Phone className="h-3 w-3 mr-1" />
                          कॉल करें
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Calendar className="h-3 w-3 mr-1" />
                          रिशेड्यूल
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="communication" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>त्वरित संपर्क</CardTitle>
                  <CardDescription>शिक्षकों और स्कूल से तुरंत संपर्क करें</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start text-left h-auto py-4">
                    <Phone className="h-5 w-5 mr-3" />
                    <div>
                      <div className="font-medium">मुख्य शिक्षक को कॉल करें</div>
                      <div className="text-sm text-muted-foreground">प्रिया शर्मा - +91 98765 43210</div>
                    </div>
                  </Button>

                  <Button variant="outline" className="w-full justify-start text-left h-auto py-4 bg-transparent">
                    <MessageSquare className="h-5 w-5 mr-3" />
                    <div>
                      <div className="font-medium">SMS भेजें</div>
                      <div className="text-sm text-muted-foreground">त्वरित संदेश भेजें</div>
                    </div>
                  </Button>

                  <Button variant="outline" className="w-full justify-start text-left h-auto py-4 bg-transparent">
                    <Volume2 className="h-5 w-5 mr-3" />
                    <div>
                      <div className="font-medium">वॉयस मैसेज भेजें</div>
                      <div className="text-sm text-muted-foreground">आवाज़ में संदेश रिकॉर्ड करें</div>
                    </div>
                  </Button>
                </CardContent>
              </Card>

              {/* Emergency Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle>आपातकालीन संपर्क</CardTitle>
                  <CardDescription>जरूरी स्थिति में संपर्क करें</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">स्कूल कार्यालय</div>
                    <div className="text-sm text-muted-foreground">+91 98765 43200</div>
                    <div className="text-sm text-muted-foreground">सुबह 9:00 - शाम 5:00</div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">प्रधानाचार्य</div>
                    <div className="text-sm text-muted-foreground">राम प्रसाद जी</div>
                    <div className="text-sm text-muted-foreground">+91 98765 43201</div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">स्वास्थ्य सहायक</div>
                    <div className="text-sm text-muted-foreground">डॉ. सुनीता देवी</div>
                    <div className="text-sm text-muted-foreground">+91 98765 43202</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Voice Message Recorder */}
            <Card>
              <CardHeader>
                <CardTitle>वॉयस मैसेज भेजें</CardTitle>
                <CardDescription>अपनी आवाज़ में शिक्षक को संदेश भेजें</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Button
                    size="lg"
                    variant={isListening ? "destructive" : "default"}
                    onClick={() => setIsListening(!isListening)}
                  >
                    <Mic className="h-5 w-5 mr-2" />
                    {isListening ? "रिकॉर्डिंग बंद करें" : "रिकॉर्डिंग शुरू करें"}
                  </Button>

                  {isListening && (
                    <div className="flex items-center gap-2 text-red-600">
                      <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                      <span className="text-sm">रिकॉर्ड हो रहा है...</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                  बटन दबाकर अपना संदेश रिकॉर्ड करें। यह सीधे आपके बच्चे के शिक्षक को भेजा जाएगा।
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
