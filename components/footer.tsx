import Link from "next/link"
import { Facebook, Linkedin, X } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold font-poppins">
                <span className="gradient-text">Chat</span>cura
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">AI That Talks Like You</p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <X size={20} />
                <span className="sr-only">X (Twitter)</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-base font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Custom Chatbot Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  AI Training & NLP
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Analytics & Optimization
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Chatcura. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
