import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Star, Trophy, BookOpen, Calendar, Edit } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-6 pb-24">
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Avatar className="h-24 w-24 border-2 border-primary">
                <AvatarImage src="/student-avatar.png" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">RK</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl font-bold">Raj Kumar</h1>
                <p className="text-muted-foreground">Grade 9 • Village School</p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">Level 8</span>
                  <Badge variant="secondary" className="ml-2">
                    1250 XP
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Quests Completed</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl font-bold">8</div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">1250</div>
              <div className="text-sm text-muted-foreground">Total XP</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">15</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <Card>
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
            <CardDescription>Your progress across different subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Mathematics</span>
                <span>75%</span>
              </div>
              <Progress value={75} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Physics</span>
                <span>60%</span>
              </div>
              <Progress value={60} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Chemistry</span>
                <span>85%</span>
              </div>
              <Progress value={85} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
