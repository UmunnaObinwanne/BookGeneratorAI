import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookCover, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            AI Book Cover Designer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create stunning book covers in seconds using artificial intelligence. Perfect for authors, publishers, and creative professionals.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link href="/design">
              <Button size="lg" className="gap-2">
                
                Start Designing
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="gap-2">
                <Sparkles className="w-5 h-5" />
                View Pricing
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
            <p className="text-muted-foreground">
              State-of-the-art AI technology generates unique and professional book covers based on your description.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">Customizable</h3>
            <p className="text-muted-foreground">
              Fine-tune your designs with our intuitive editor. Adjust colors, fonts, and layouts.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
            <p className="text-muted-foreground">
              Get professional-quality book covers in seconds, not days or weeks.
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}