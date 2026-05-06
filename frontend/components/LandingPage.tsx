'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FileText, Shield, Zap, Users } from 'lucide-react'

export function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">Casefy.ai</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-foreground">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <p className="text-sm font-medium text-primary">AI-Powered Legal Intelligence</p>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            Master Your Legal Cases with AI
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Casefy.ai transforms how legal professionals manage cases and analyze documents. Upload PDFs, ask intelligent questions, and get instant insights powered by advanced AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                Get Started Free
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Powerful Features for Modern Legal Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage cases efficiently and analyze documents with AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all">
              <FileText className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Smart Case Management</h3>
              <p className="text-muted-foreground">
                Organize unlimited cases with detailed case numbers, descriptions, and file attachments. Keep everything in one secure place.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all">
              <Zap className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">AI-Powered Analysis</h3>
              <p className="text-muted-foreground">
                Ask questions about your documents and get instant AI-generated insights. Understand complex documents in seconds.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your confidential legal documents are encrypted and stored securely. Enterprise-grade security for peace of mind.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Team Collaboration</h3>
              <p className="text-muted-foreground">
                Share cases and collaborate with team members. Keep your entire legal team on the same page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Trusted by Legal Professionals
            </h2>
            <p className="text-lg text-muted-foreground">
              Join hundreds of attorneys and firms using Casefy.ai
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="p-6 rounded-lg border border-border bg-background">
              <div className="flex gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-lg">★</span>
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                &quot;Casefy.ai has cut our document analysis time by 60%. The AI insights are incredibly accurate.&quot;
              </p>
              <p className="font-semibold text-foreground">Sarah Mitchell</p>
              <p className="text-sm text-muted-foreground">Senior Attorney, Mitchell & Associates</p>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 rounded-lg border border-border bg-background">
              <div className="flex gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-lg">★</span>
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                &quot;The case management features are intuitive and the AI chatbot understands legal context perfectly.&quot;
              </p>
              <p className="font-semibold text-foreground">James Chen</p>
              <p className="text-sm text-muted-foreground">Managing Partner, Chen & Co. Law Firm</p>
            </div>

            {/* Testimonial 3 */}
            <div className="p-6 rounded-lg border border-border bg-background">
              <div className="flex gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-lg">★</span>
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                &quot;Best investment we&apos;ve made in legal tech. Our team productivity has increased significantly.&quot;
              </p>
              <p className="font-semibold text-foreground">Emily Rodriguez</p>
              <p className="text-sm text-muted-foreground">Partner, Corporate Law Group</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Legal Practice?
            </h2>
            <p className="text-lg text-muted-foreground">
              Start using Casefy.ai today. No credit card required.
            </p>
          </div>
          <Link href="/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; 2024 Casefy.ai. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
