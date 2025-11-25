"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Bell, TrendingUp, Plus, Search, Award, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your clubs, events, and university community
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/search">
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              Find Clubs
            </Button>
          </Link>
          <Link href="/universities">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Club
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Clubs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              3 as admin, 5 as member
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Next 7 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              8 unread
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              Event attendance rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* My Clubs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Clubs</CardTitle>
                <CardDescription>Clubs you're a member of</CardDescription>
              </div>
              <Link href="/universities">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Computer Science Club", role: "Admin", members: 245, events: 3 },
                { name: "Photography Society", role: "Member", members: 128, events: 2 },
                { name: "Debate Team", role: "Admin", members: 67, events: 1 },
              ].map((club, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="h-12 w-12 rounded bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{club.name}</p>
                    <p className="text-sm text-muted-foreground">
                      <span className={club.role === "Admin" ? "text-emerald-600" : "text-blue-600"}>
                        {club.role}
                      </span> • {club.members} members
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{club.events}</p>
                    <p className="text-xs text-muted-foreground">events</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events from your clubs</CardDescription>
              </div>
              <Link href="/events">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Hackathon 2024", club: "Computer Science Club", date: "Tomorrow, 9:00 AM", attendees: 45 },
                { title: "Photo Walk Downtown", club: "Photography Society", date: "Friday, 2:00 PM", attendees: 18 },
                { title: "Debate Competition", club: "Debate Team", date: "Next Monday, 6:00 PM", attendees: 32 },
              ].map((event, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.club}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {event.date} • {event.attendees} attending
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/search" className="block">
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                <Search className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Find Clubs</div>
                  <div className="text-xs text-muted-foreground">Discover new clubs</div>
                </div>
              </Button>
            </Link>
            <Link href="/universities" className="block">
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                <Plus className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Create Event</div>
                  <div className="text-xs text-muted-foreground">Schedule activity</div>
                </div>
              </Button>
            </Link>
            <Link href="/settings" className="block">
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                <Users className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Manage Clubs</div>
                  <div className="text-xs text-muted-foreground">Admin tools</div>
                </div>
              </Button>
            </Link>
            <Link href="/notifications" className="block">
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                <Bell className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Notifications</div>
                  <div className="text-xs text-muted-foreground">8 unread</div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your clubs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { club: "Computer Science Club", action: "New event posted", item: "Hackathon 2024", time: "2 hours ago", icon: Calendar },
              { club: "Photography Society", action: "New member joined", item: "Sarah Johnson", time: "5 hours ago", icon: Users },
              { club: "Debate Team", action: "Achievement unlocked", item: "Regional Champions", time: "1 day ago", icon: Award },
              { club: "Computer Science Club", action: "New discussion", item: "Best practices for React", time: "2 days ago", icon: MessageSquare },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <activity.icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{activity.club}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.action}: {activity.item}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
