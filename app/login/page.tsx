"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Users,
  ArrowLeft,
  Eye,
  EyeOff,
  TreePine,
  Binary as Binoculars,
  BookOpen,
  BarChart3,
} from "lucide-react"

type UserRole = "student" | "teacher" | null

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt:", { role: selectedRole, ...formData })
    // In a real app, this would handle authentication
  }

  const resetSelection = () => {
    setSelectedRole(null)
    setFormData({ email: "", password: "" })
  }

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-primary rounded-full p-4">
                <TreePine className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Welcome to STEM Safari</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your role to begin your educational adventure through the world of science and mathematics
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Student Role */}
            <Card
              className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-primary group"
              onClick={() => setSelectedRole("student")}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-full p-6 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                    <GraduationCap className="h-16 w-16 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Safari Explorer</CardTitle>
                <CardDescription className="text-base text-gray-600">
                  I'm a student ready to explore and learn
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Binoculars className="h-4 w-4 text-primary" />
                    <span>Interactive Learning Quests</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span>Animal Guide Companions</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <TreePine className="h-4 w-4 text-primary" />
                    <span>Offline Safari Adventures</span>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 px-4 py-2">🦁 Join the Adventure</Badge>
              </CardContent>
            </Card>

            {/* Teacher Role */}
            <Card
              className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-primary group"
              onClick={() => setSelectedRole("teacher")}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full p-6 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                    <Users className="h-16 w-16 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Safari Guide</CardTitle>
                <CardDescription className="text-base text-gray-600">
                  I'm a teacher guiding young explorers
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    <span>Student Progress Analytics</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4 text-primary" />
                    <span>Classroom Management</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span>Curriculum Planning Tools</span>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800 px-4 py-2">🐘 Guide Explorers</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 mb-4">
              New to STEM Safari?{" "}
              <Link href="/signup/student" className="text-primary hover:underline font-medium">
                Create an account
              </Link>
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
              <span>🌍 Available in 5+ Languages</span>
              <span>📱 Mobile & Offline Ready</span>
              <span>🎯 Gamified Learning</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button variant="ghost" onClick={resetSelection} className="mb-6 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Choose Different Role
        </Button>

        {/* Login Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-primary rounded-full p-3">
                {selectedRole === "student" ? (
                  <GraduationCap className="h-8 w-8 text-primary-foreground" />
                ) : (
                  <Users className="h-8 w-8 text-primary-foreground" />
                )}
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              {selectedRole === "student" ? "Safari Explorer Login" : "Safari Guide Login"}
            </CardTitle>
            <CardDescription>
              {selectedRole === "student" ? "Continue your learning adventure" : "Access your teaching dashboard"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={selectedRole === "student" ? "explorer@example.com" : "guide@school.edu"}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-12 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link href="/forgot-password" className="text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full h-12 text-base font-medium">
                {selectedRole === "student" ? "Start Safari Adventure" : "Access Guide Dashboard"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  href={selectedRole === "student" ? "/signup/student" : "/signup/teacher"}
                  className="text-primary hover:underline font-medium"
                >
                  Sign up as {selectedRole === "student" ? "Explorer" : "Guide"}
                </Link>
              </p>
            </div>

            {/* Role-specific features */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">
                {selectedRole === "student" ? "Explorer Features:" : "Guide Features:"}
              </h4>
              <div className="space-y-1 text-sm text-gray-600">
                {selectedRole === "student" ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">🦁</span>
                      <span>Interactive quests with animal guides</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">🏆</span>
                      <span>Earn badges and XP points</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">📱</span>
                      <span>Learn offline, sync when online</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">📊</span>
                      <span>Track student progress and engagement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">👥</span>
                      <span>Manage multiple classes and students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">📋</span>
                      <span>Generate detailed reports</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
