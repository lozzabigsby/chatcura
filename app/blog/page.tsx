import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BlogPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Why Every Small Business Should Have a Chatbot in 2024
              </h1>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="mr-2">💬</span> Intro
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Running a business is hard enough — dealing with constant messages, missed leads, and repetitive
                  customer questions shouldn't be part of the struggle. That's where AI chatbots come in.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  At Chatcura, we build smart, branded chatbots that actually help small businesses. Whether you're a
                  salon, tradesperson, online shop, or service provider, a chatbot can save you time, improve customer
                  experience, and help you grow — without needing a tech team or huge budget.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="mr-2">🚀</span> What Is a Chatbot?
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  A chatbot is a virtual assistant that lives on your website or landing page. It can answer questions,
                  book appointments, capture leads, and respond instantly — 24/7.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Modern AI chatbots don't sound robotic. They're trained to reflect your business tone and branding,
                  and they get smarter over time.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="mr-2">🛠️</span> How Chatbots Help Small Businesses
                </h2>
                <ol className="space-y-4 list-decimal pl-6">
                  <li className="text-lg">
                    <p className="font-bold">Save Time on Repetitive Tasks</p>
                    <p className="text-muted-foreground">
                      Tired of answering the same questions like "How much is X?" or "Are you open on Saturdays?" Let
                      your bot handle it.
                    </p>
                  </li>
                  <li className="text-lg">
                    <p className="font-bold">Capture Leads While You Sleep</p>
                    <p className="text-muted-foreground">
                      Chatbots never miss a message. Whether someone's browsing at 2 AM or on their lunch break, your
                      bot can collect their name, number, and what they need — then send it straight to your inbox.
                    </p>
                  </li>
                  <li className="text-lg">
                    <p className="font-bold">Look More Professional</p>
                    <p className="text-muted-foreground">
                      Even if you're a one-person team, a chatbot makes your business feel more established. It gives a
                      polished first impression and fast responses.
                    </p>
                  </li>
                  <li className="text-lg">
                    <p className="font-bold">Convert Visitors Into Customers</p>
                    <p className="text-muted-foreground">
                      Most people leave a site if they don't get what they need in the first 30 seconds. A chatbot grabs
                      attention, guides them to the right service, and encourages them to take action.
                    </p>
                  </li>
                </ol>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="mr-2">💡</span> Real Chatbot Use Cases
                </h2>
                <p className="text-lg text-muted-foreground mb-3">
                  A beauty salon that gets too many Instagram DMs? Let the chatbot handle bookings and FAQs.
                </p>
                <p className="text-lg text-muted-foreground mb-3">
                  A window cleaning business constantly repeating prices? Use a bot to qualify leads and collect
                  customer info.
                </p>
                <p className="text-lg text-muted-foreground mb-3">
                  An online store? Chatbots can suggest products, answer questions, and reduce support tickets.
                </p>
              </div>

              <div className="mb-8 bg-card border border-border rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="mr-2">🔧</span> Why Use Chatcura?
                </h2>
                <p className="text-lg text-muted-foreground mb-4">
                  At Chatcura, we build chatbots for real businesses — not tech startups with million-dollar budgets.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Custom branding</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Simple setup</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>No coding needed</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>2-week free trial</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Ongoing support</span>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="mr-2">🎯</span> Final Thoughts
                </h2>
                <p className="text-lg text-muted-foreground mb-3">
                  In 2024, your website shouldn't just sit there — it should talk back.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  A smart chatbot is the fastest, easiest way to automate your customer service and grow your business.
                </p>
              </div>

              <div className="bg-primary/10 rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold mb-4">Want to see what a chatbot could do for you?</h3>
                <Link href="/pricing">
                  <Button size="lg" className="glow-on-hover px-8 py-6">
                    Start your free 2-week trial
                  </Button>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}
