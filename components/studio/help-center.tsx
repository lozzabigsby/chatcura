"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Book, MessageCircle, Video, ExternalLink, Mail, FileText, Zap } from "lucide-react"

export default function HelpCenter() {
  const helpSections = [
    {
      title: "Getting Started",
      icon: Zap,
      items: [
        "Creating your first chatbot",
        "Understanding bot configuration",
        "Setting up data sources",
        "Customizing appearance",
      ],
    },
    {
      title: "Advanced Features",
      icon: Book,
      items: ["Memory and context settings", "File upload handling", "Search functionality", "Custom integrations"],
    },
    {
      title: "Deployment",
      icon: ExternalLink,
      items: ["Embedding on websites", "Widget installation", "Mobile optimization", "Performance monitoring"],
    },
    {
      title: "Troubleshooting",
      icon: HelpCircle,
      items: ["Common issues and fixes", "Bot not responding", "Styling problems", "Integration errors"],
    },
  ]

  const quickActions = [
    {
      title: "Video Tutorials",
      description: "Watch step-by-step video guides",
      icon: Video,
      action: "Watch Videos",
    },
    {
      title: "Documentation",
      description: "Read detailed documentation",
      icon: FileText,
      action: "View Docs",
    },
    {
      title: "Contact Support",
      description: "Get help from our team",
      icon: Mail,
      action: "Contact Us",
    },
    {
      title: "Community Forum",
      description: "Connect with other users",
      icon: MessageCircle,
      action: "Join Forum",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Help Center</h2>
        <p className="text-muted-foreground">Get help and learn how to use Chatcura Studio</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card key={index} className="card-hover cursor-pointer">
            <CardContent className="p-6 text-center">
              <action.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-medium mb-2">{action.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
              <Button size="sm" variant="outline">
                {action.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Help Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {helpSections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <section.icon className="h-5 w-5 mr-2" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Button variant="ghost" className="justify-start p-0 h-auto text-left">
                      {item}
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Common questions about Chatcura Studio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">How do I change my bot's colors?</h4>
              <p className="text-sm text-muted-foreground">
                Go to the bot builder, click on the "Style" tab, and use the color customizer to change all aspects of
                your bot's appearance.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Can I use my own domain for the chatbot?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, you can use custom domains. Contact support for help setting up CNAME records and SSL certificates.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">How do I backup my bots?</h4>
              <p className="text-sm text-muted-foreground">
                Use the Export Manager to download JSON configurations of your bots. This serves as a complete backup.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Is there an API for custom integrations?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, we provide REST APIs for advanced integrations. Check the documentation for API endpoints and
                authentication.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Still Need Help?</CardTitle>
          <CardDescription>Our support team is here to help you succeed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Email Support
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <MessageCircle className="h-4 w-4 mr-2" />
              Live Chat
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Video className="h-4 w-4 mr-2" />
              Schedule Call
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
