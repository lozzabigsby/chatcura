import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Mail, Phone, MessageCircle } from "lucide-react"

export default function ActionsManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Actions Manager</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Action
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Send Email
            </CardTitle>
            <CardDescription>Configure bot to send emails to users or internal teams.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              Configure
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Make Call
            </CardTitle>
            <CardDescription>Enable bot to initiate phone calls (e.g., to support agents).</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              Configure
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Send SMS
            </CardTitle>
            <CardDescription>Allow bot to send SMS messages for notifications or confirmations.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              Configure
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custom Webhooks</CardTitle>
          <CardDescription>Integrate with external services via custom webhooks.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-md bg-muted/50 text-muted-foreground">
            No custom webhooks configured yet.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
