import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h1 className="section-title">Contact Us</h1>
            <p className="section-subtitle max-w-3xl">
              Got questions? Want to see how Chatcura can work for your business? Fill out the form below or reach out
              directly — we're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border border-border">
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="you@example.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name (optional)</Label>
                        <Input id="businessName" placeholder="Your company" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website URL (optional)</Label>
                        <Input id="website" placeholder="https://yourwebsite.com" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">What can we help you with?</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project or question..."
                        className="min-h-[150px]"
                      />
                    </div>

                    <Button type="submit" className="w-full md:w-auto glow-on-hover px-8 py-6">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div>
              <Card className="border border-border h-full">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <Mail className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium mb-1">Email Us</h4>
                          <a
                            href="mailto:hello@chatcura.com"
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            hello@chatcura.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <MapPin className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium mb-1">Location</h4>
                          <p className="text-muted-foreground">Based in the UK. Working with businesses worldwide.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-6 border-t border-border">
                    <h4 className="font-medium mb-4">Response Time</h4>
                    <p className="text-muted-foreground">
                      We typically respond to all inquiries within 24 hours during business days.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
