import { SEO } from "@/components/SEO"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Heart, Users, GraduationCap } from "lucide-react"

export default function ParentComingSoon() {
  const navigate = useNavigate()
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate("/auth?mode=signup", { replace: true })
    }
  }

  return (
    <>
      <SEO 
        title="Parent Panel – Coming Soon"
        description="A dedicated Parent experience with progress monitoring and secure communication is coming soon."
        keywords="parent portal, parent dashboard, campus sync, coming soon"
      />

      <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-10 -left-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <header className="absolute top-0 left-0 right-0 z-30 h-16 flex items-center justify-between px-4 sm:px-6">
          <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="inline-flex items-center gap-2 text-foreground/80">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="font-semibold">CampusSync</span>
          </div>
        </header>

        <main className="relative z-10 w-full px-4">
          <section className="mx-auto max-w-3xl text-center py-20 md:py-28">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/15 text-primary mx-auto shadow-[var(--shadow-elegant,0_10px_30px_-10px_rgba(0,0,0,0.1))]">
              <Heart className="h-7 w-7" />
            </div>

            <h1 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight">
              Parent Dashboard
            </h1>
            <p className="mt-3 text-muted-foreground">
              Coming soon
            </p>

            <div className="mt-8 mx-auto max-w-xl text-muted-foreground">
              <p>
                We’re crafting a dedicated Parent experience to help you monitor your child’s progress, view attendance and schedules, and stay connected with teachers—securely and effortlessly.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
              <div className="rounded-xl border bg-card p-4">
                <Users className="h-5 w-5 text-primary mb-2 inline" />
                <p className="text-sm font-medium">Stay Connected</p>
                <p className="text-xs text-muted-foreground">Direct teacher communication</p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <Heart className="h-5 w-5 text-primary mb-2 inline" />
                <p className="text-sm font-medium">Progress Insights</p>
                <p className="text-xs text-muted-foreground">Track grades and growth</p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <GraduationCap className="h-5 w-5 text-primary mb-2 inline" />
                <p className="text-sm font-medium">Smart Overview</p>
                <p className="text-xs text-muted-foreground">Schedules and events at a glance</p>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-center gap-3">
              <Button variant="secondary" onClick={handleBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Sign Up
              </Button>
              <Button onClick={() => navigate("/auth")}>Go to Login</Button>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

