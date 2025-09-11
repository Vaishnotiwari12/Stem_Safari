"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, MicOff, VolumeX, Bot, Send } from "lucide-react"

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  language: string
  timestamp: Date
  audioUrl?: string
}

interface AITutorProps {
  currentQuest?: {
    id: string
    title: string
    subject: string
    difficulty: string
  }
}

export function AITutor({ currentQuest }: AITutorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const recognitionRef = useRef<any>(null)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: "en", name: "English", voice: "en-US", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", voice: "hi-IN", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", voice: "bn-IN", flag: "🇧🇩" },
    { code: "te", name: "తెలుగు", voice: "te-IN", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", voice: "ta-IN", flag: "🇮🇳" },
  ]

  const currentLanguage = languages.find((lang) => lang.code === selectedLanguage) || languages[0]

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize Speech Recognition
      if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = currentLanguage.voice

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          handleUserMessage(transcript, true)
          setIsListening(false)
        }

        recognitionRef.current.onerror = (_event: Event) => {
          setIsListening(false)
        }

        recognitionRef.current.onend = (_event: Event) => {
          setIsListening(false)
        }
      }

      // Initialize Speech Synthesis
      if ("speechSynthesis" in window) {
        synthesisRef.current = window.speechSynthesis
      }
    }
  }, [selectedLanguage])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = getWelcomeMessage()
      setMessages([
        {
          id: "welcome",
          type: "ai",
          content: welcomeMessage,
          language: selectedLanguage,
          timestamp: new Date(),
        },
      ])
      speakMessage(welcomeMessage)
    }
  }, [isOpen, selectedLanguage])

  const getWelcomeMessage = () => {
    const welcomeMessages = {
      en: `Hello! I'm your AI tutor. I'm here to help you with your studies. ${currentQuest ? `I see you're working on "${currentQuest.title}". ` : ""}Ask me anything about ${currentQuest?.subject || "your subjects"}!`,
      hi: `नमस्ते! मैं आपका AI शिक्षक हूं। मैं आपकी पढ़ाई में मदद करने के लिए यहां हूं। ${currentQuest ? `मैं देख रहा हूं कि आप "${currentQuest.title}" पर काम कर रहे हैं। ` : ""}${currentQuest?.subject || "आपके विषयों"} के बारे में मुझसे कुछ भी पूछें!`,
      bn: `হ্যালো! আমি আপনার AI শিক্ষক। আমি আপনার পড়াশোনায় সাহায্য করতে এখানে আছি। ${currentQuest ? `আমি দেখছি আপনি "${currentQuest.title}" নিয়ে কাজ করছেন। ` : ""}${currentQuest?.subject || "আপনার বিষয়গুলি"} সম্পর্কে আমাকে যেকোনো কিছু জিজ্ঞাসা করুন!`,
      te: `హలో! నేను మీ AI ట్యూటర్‌ని. మీ చదువులలో సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను. ${currentQuest ? `మీరు "${currentQuest.title}" పై పని చేస్తున్నారని నేను చూస్తున్నాను. ` : ""}${currentQuest?.subject || "మీ విషయాలు"} గురించి నన్ను ఏదైనా అడగండి!`,
      ta: `வணக்கம்! நான் உங்கள் AI ஆசிரியர். உங்கள் படிப்பில் உதவ நான் இங்கே இருக்கிறேன். ${currentQuest ? `நீங்கள் "${currentQuest.title}" இல் வேலை செய்கிறீர்கள் என்று நான் பார்க்கிறேன். ` : ""}${currentQuest?.subject || "உங்கள் பாடங்கள்"} பற்றி என்னிடம் எதையும் கேளுங்கள்!`,
    }
    return welcomeMessages[selectedLanguage as keyof typeof welcomeMessages] || welcomeMessages.en
  }

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      recognitionRef.current.lang = currentLanguage.voice
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speakMessage = (text: string) => {
    if (synthesisRef.current && !isSpeaking) {
      // Cancel any ongoing speech
      synthesisRef.current.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = currentLanguage.voice
      utterance.rate = 0.9
      utterance.pitch = 1

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      synthesisRef.current.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const handleUserMessage = async (content: string, isVoice = false) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      language: selectedLanguage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsProcessing(true)

    // Simulate AI processing and response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content, currentQuest)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse,
        language: selectedLanguage,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsProcessing(false)

      // Speak the AI response
      speakMessage(aiResponse)
    }, 1500)
  }

  const generateAIResponse = (userInput: string, quest?: any) => {
    const input = userInput.toLowerCase()

    // Context-aware responses based on current quest
    if (quest) {
      if (quest.subject === "Mathematics" && (input.includes("algebra") || input.includes("equation"))) {
        const responses = {
          en: "Great question about algebra! Remember, when solving equations, always do the same operation to both sides. For example, if you have x + 5 = 12, subtract 5 from both sides to get x = 7. Would you like me to explain a specific type of equation?",
          hi: "बीजगणित के बारे में बहुत अच्छा सवाल! याद रखें, समीकरण हल करते समय हमेशा दोनों तरफ समान ऑपरेशन करें। उदाहरण के लिए, यदि आपके पास x + 5 = 12 है, तो दोनों तरफ से 5 घटाएं और x = 7 मिलेगा।",
          bn: "বীজগণিত সম্পর্কে দুর্দান্ত প্রশ্ন! মনে রাখবেন, সমীকরণ সমাধান করার সময় সর্বদা উভয় পাশে একই অপারেশন করুন। উদাহরণস্বরূপ, যদি আপনার x + 5 = 12 থাকে, তাহলে উভয় পাশ থেকে 5 বিয়োগ করুন এবং x = 7 পাবেন।",
          te: "బీజగణితం గురించి అద్భుతమైన ప్రశ్న! గుర్తుంచుకోండి, సమీకరణాలను పరిష్కరించేటప్పుడు ఎల్లప్పుడూ రెండు వైపులా అదే ఆపరేషన్ చేయండి। ఉదాహరణకు, మీకు x + 5 = 12 ఉంటే, రెండు వైపుల నుండి 5 ను తీసివేసి x = 7 పొందండి।",
          ta: "இயற்கணிதம் பற்றிய சிறந்த கேள்வி! நினைவில் கொள்ளுங்கள், சமன்பாடுகளை தீர்க்கும்போது எப்போதும் இரு பக்கங்களிலும் அதே செயல்பாட்டைச் செய்யுங்கள். உதாரணமாக, உங்களிடம் x + 5 = 12 இருந்தால், இரு பக்கங்களிலிருந்தும் 5 ஐ கழித்து x = 7 பெறுங்கள்।",
        }
        return responses[selectedLanguage as keyof typeof responses] || responses.en
      }

      if (quest.subject === "Chemistry" && (input.includes("atom") || input.includes("element"))) {
        const responses = {
          en: "Excellent chemistry question! Atoms are the building blocks of everything around us. Each element has a unique number of protons in its nucleus. For example, hydrogen has 1 proton, carbon has 6, and oxygen has 8. What specific element would you like to learn about?",
          hi: "रसायन विज्ञान का उत्कृष्ट प्रश्न! परमाणु हमारे चारों ओर की हर चीज़ के निर्माण खंड हैं। प्रत्येक तत्व के नाभिक में प्रोटॉन की एक अनूठी संख्या होती है। उदाहरण के लिए, हाइड्रोजन में 1 प्रोटॉन, कार्बन में 6, और ऑक्सीजन में 8 होते हैं।",
          bn: "চমৎকার রসায়ন প্রশ্ন! পরমাণুলু আমাদের চারপাশের সবকিছুর নির্মাণ খন্ড। প্রতিটি তত্বের নাভিকে একটি অনন্য প্রোটনের সংখ্যা রয়েছে। উদাহরণস্বরূপ, হাইড্রোজেনে 1 প্রোটন, কার্বনে 6 এবং অক্সিজেনে 8 রয়েছে।",
          te: "రసాయన శాస్త్రం గురించి అద్భుతమైన ప్రశ్న! పరమాణులు మనం చూద్దాం కాబట్టి ప్రతి తత్వం నాక్కు ఏక అనుభూతి సంఖ్య ఉంది। ఉదాహరణకు, హైడ్రోజెన్‌లో 1 ప్రోటన్, కార్బన్‌లో 6 మరియు అక్సిజెన్‌లో 8 ఉంది।",
          ta: "ரஸாயின் விஞ்ஞானம் பற்றிய சிறந்த கேள்வி! பரமாணுகள் எல்லாவற்றின் நிர்மாணம், அவை ஒவ்வொரு தத்துவத்தின் நடுவில் ஒரு வெற்றி வேற்றியான ப்ரோடன்களின் எண்ணிக்கை உள்ளது. உதாரணமாக, ஹைட்ரோஜன்‌லோ 1 ப்ரோடன், கார்பன்‌லோ 6 மற்றும் அக்ஸிஜன்‌லோ 8 உள்ளது.",
        }
        return responses[selectedLanguage as keyof typeof responses] || responses.en
      }
    }

    // Default response if no context is available
    const defaultResponses = {
      en: "I'm sorry, I couldn't understand your question. Could you please rephrase it?",
      hi: "मुझे आपका प्रश्न समझ नहीं आया। कृपया इसे फिर से बताएं।",
      bn: "আমি আপনার প্রশ্নটি বোঝতে পারি নি। দয়া করে এটি আবার বলুন।",
      te: "నేను మీ ప్రశ్నను చూద్దాం. మీరు ఇది మళ్ళీ చూద్దాం?",
      ta: "நான் உங்கள் கேள்வியை அறிவியலாக காட்டிய விரும்பிகிறேன். உங்கள் கேள்வியை முறைவரை சொல்லுங்களா?",
    }
    return defaultResponses[selectedLanguage as keyof typeof defaultResponses] || defaultResponses.en
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto bg-transparent">
          <Bot className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">AI Tutor</span>
          <span className="sm:hidden">AI</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[425px] h-[90vh] max-h-[600px] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>AI Tutor</DialogTitle>
          <DialogDescription className="text-sm">
            {currentQuest ? `Working on: "${currentQuest.title}"` : "Ask me anything!"}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 w-full min-h-0 px-1">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-2 sm:gap-4 py-2 sm:py-4">
              {message.type === "user" ? (
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                  <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                  <AvatarImage src="/ai-tutor-avatar.png" alt="@ai" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div className="flex flex-col gap-1 sm:gap-2 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {message.type === "user" ? "You" : "AI"}
                  </Badge>
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm break-words">{message.content}</p>
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex gap-2 sm:gap-4 py-2 sm:py-4">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                <AvatarImage src="/ai-tutor-avatar.png" alt="@ai" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 sm:gap-2">
                <Badge variant="outline" className="text-xs">
                  AI
                </Badge>
                <p className="text-sm text-muted-foreground">Thinking...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>

        <div className="flex-shrink-0 space-y-3 pt-3 border-t">
          {/* Language selector row */}
          <div className="flex gap-2">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="flex-1 min-w-0">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="hidden sm:inline">
                      {lang.flag} {lang.name}
                    </span>
                    <span className="sm:hidden">{lang.flag}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Voice controls row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <Button
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing}
              variant={isListening ? "destructive" : "default"}
              size="sm"
              className="text-xs"
            >
              {isListening ? (
                <>
                  <MicOff className="mr-1 h-3 w-3" />
                  <span className="hidden sm:inline">Stop</span>
                </>
              ) : (
                <>
                  <Mic className="mr-1 h-3 w-3" />
                  <span className="hidden sm:inline">Listen</span>
                </>
              )}
            </Button>

            <Button
              onClick={stopSpeaking}
              disabled={!isSpeaking}
              variant="outline"
              size="sm"
              className="text-xs bg-transparent"
            >
              <VolumeX className="mr-1 h-3 w-3" />
              <span className="hidden sm:inline">Stop Speech</span>
            </Button>

            <Button
              onClick={() => handleUserMessage(inputText)}
              disabled={isProcessing || !inputText.trim()}
              size="sm"
              className="text-xs col-span-2 sm:col-span-1"
            >
              <Send className="mr-1 h-3 w-3" />
              Send
            </Button>
          </div>

          {/* Input row */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !isProcessing && inputText.trim()) {
                  handleUserMessage(inputText)
                }
              }}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isProcessing}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
