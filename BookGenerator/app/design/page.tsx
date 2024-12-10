// Make sure to have these imports at the top of your page.tsx

'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, BookOpen, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Add this to your globals.css
// @tailwind base;
// @tailwind components;
// @tailwind utilities;

export default function DesignPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });
  const [preview, setPreview] = useState("");
  const { toast } = useToast();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      description: "",
    };

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    } else if (formData.description.length < 50) {
      newErrors.description = "Description must be at least 50 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate cover");
      }

      const data = await response.json();
      setPreview(data.coverUrl);
      
      toast({
        title: "Success!",
        description: "Your book cover has been generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate book cover. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Design Your Book Cover
            </h1>
            <p className="text-muted-foreground mt-2">
              Create a unique cover for your book using AI-powered generation
            </p>
          </div>

          <Card className="border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Cover Details
              </CardTitle>
              <CardDescription>
                Fill in the details below to generate your book cover
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" 
                    htmlFor="title"
                  >
                    Book Title
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter your book title"
                    className={cn(
                      "transition-colors focus-visible:ring-1",
                      errors.title && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.title && (
                    <p className="text-sm font-medium text-red-500">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" 
                    htmlFor="description"
                  >
                    Cover Description
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your book and the cover style you want..."
                    className={cn(
                      "min-h-[100px] transition-colors focus-visible:ring-1",
                      errors.description && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.description && (
                    <p className="text-sm font-medium text-red-500">{errors.description}</p>
                  )}
                </div>

                {preview && (
                  <div className="mt-6 space-y-2">
                    <h3 className="text-lg font-semibold">Preview</h3>
                    <div className="relative aspect-[2/3] w-full max-w-md mx-auto overflow-hidden rounded-lg border bg-muted">
                      <img
                        src={preview}
                        alt="Generated book cover preview"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                )}

                <Alert className="bg-muted">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    For best results, provide a detailed description of your desired cover style,
                    including mood, colors, and key elements.
                  </AlertDescription>
                </Alert>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Cover...
                    </>
                  ) : (
                    "Generate Cover"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </>
  );
}