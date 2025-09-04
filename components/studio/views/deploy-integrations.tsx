import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Facebook, Instagram, Zap } from "lucide-react"

export default function DeployIntegrations() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Deploy Integrations</h2>
      <Card>
        <CardHeader>
          <CardTitle>Messaging Platforms</CardTitle>
          <CardDescription>Connect your bot to popular messaging applications.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <span>WhatsApp</span>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center gap-2">
              <Facebook className="h-5 w-5" />
              <span>Facebook Messenger</span>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center gap-2">
              <Instagram className="h-5 w-5" />
              <span>Instagram Direct</span>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>CRM & Marketing Integrations</CardTitle>
          <CardDescription>Sync bot data with your CRM and marketing tools.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <span>Salesforce</span>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <span>HubSpot</span>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <span>Mailchimp</span>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
