import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h1>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Free</h2>
          <p className="text-3xl font-bold mb-6">$0</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <Check className="w-5 h-5 mr-2 text-green-500" />
              3 covers per month
            </li>
            <li className="flex items-center">
              <Check className="w-5 h-5 mr-2 text-green-500" />
              Basic customization
            </li>
            <li className="flex items-center">
              <Check className="w-5 h-5 mr-2 text-green-500" />
              Standard quality
            </li>
          </ul>
          <Button className="w-full">Get Started</Button>
        </Card>

        <Card className="p-6 border-primary">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm rounded-bl">
            Popular
          </div>
          <h2 className="text-2xl font-bold mb-4">Pro</h2>
          <p className="text-3xl font-bold mb-6">$29/mo</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <Check className="w-5 h-5 mr-2 text-green-500" />
              Unlimited covers
            </li>
            <li className="flex items-center">
              <Check className="w-5 h-5 mr-2 text-green-500" />
              Advanced customization
            </li>
            <li className="flex items-center">
              <Check className="w-5 h-5 mr-2 text-green-500" />
              HD quality
            </li>
            <li className="flex items-center">
              <Check className="w-5 h-5 mr-2 text-green-500" />
              Priority support
            </li>
          </ul>
          <Button className="w-full">Subscribe Now</Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Enterprise</h2>
          <p className="text-3xl font-bold mb-6">Custom</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <Check className="w-5 h-5 mr-2 text-green-500" />
              Everything in Pro
            </li>
            <li className="flex items-center">
              <Check className="w-5 h-5 mr-2 text-green-500" />
              Custom integration
            </li>
            <li className="flex items-center">
              <Check className="w-5 h-5 mr-2 text-green-500" />
              Dedicated support
            </li>
          </ul>
          <Button variant="outline" className="w-full">Contact Sales</Button>
        </Card>
      </div>
    </div>
  );
}