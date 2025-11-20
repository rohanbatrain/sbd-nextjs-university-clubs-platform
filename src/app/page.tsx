import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Calendar, Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Discover Your Campus Community
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with student organizations, join events, and find your people.
            The ultimate platform for university clubs and societies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/universities">
              <Button size="lg" className="gap-2">
                Find Your University <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-card border shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Join Clubs</h3>
              <p className="text-muted-foreground">
                Browse hundreds of student organizations based on your interests, from tech to arts.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-card border shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Attend Events</h3>
              <p className="text-muted-foreground">
                Never miss out on campus activities. RSVP to workshops, socials, and hackathons.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-card border shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Lead & Grow</h3>
              <p className="text-muted-foreground">
                Manage your club, track members, and grow your leadership skills with our tools.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
