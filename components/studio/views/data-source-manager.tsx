import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Globe, Book, Lightbulb } from "lucide-react"

export default function DataSourceManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Data Sources</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Source
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Files
            </CardTitle>
            <CardDescription>Upload documents (PDF, TXT, DOCX) to train your bot.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              Manage Files
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Website
            </CardTitle>
            <CardDescription>Crawl content from your website to inform your bot.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              Configure Website
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              Q&A
            </CardTitle>
            <CardDescription>Manually add question and answer pairs for specific responses.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              Manage Q&A
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Text Input
            </CardTitle>
            <CardDescription>Directly input text snippets for your bot's knowledge base.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              Add Text
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connected Integrations</CardTitle>
          <CardDescription>Integrate with third-party services for data import.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 border rounded-md">
              <span>Notion</span>
              <Button variant="outline" size="sm">
                Connect
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-md">
              <span>Zendesk</span>
              <Button variant="outline" size="sm">
                Connect
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-md">
              <span>Intercom</span>
              <Button variant="outline" size="sm">
                Connect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
