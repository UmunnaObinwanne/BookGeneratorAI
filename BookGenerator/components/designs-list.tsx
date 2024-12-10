"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import Image from "next/image";

interface Design {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
}

export default function DesignsList({ userId }: { userId: string }) {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await fetch(`/api/designs?userId=${userId}`);
        const data = await response.json();
        setDesigns(data);
      } catch (error) {
        console.error("Failed to fetch designs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (designs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No designs yet. Start creating!</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {designs.map((design) => (
        <Card key={design.id} className="overflow-hidden">
          <div className="relative aspect-[3/4]">
            <Image
              src={design.imageUrl}
              alt={design.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">{design.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Created on {new Date(design.createdAt).toLocaleDateString()}
            </p>
            <Button variant="outline" className="w-full gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}