import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { openai } from "@/lib/api/openai";
import { designSchema } from "@/lib/utils/validation";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const validatedData = designSchema.parse(body);

    const response = await openai.createImage({
      prompt: `Book cover for "${validatedData.title}": ${validatedData.description}`,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data.data[0].url;

    // Save the design to MongoDB
    const client = await clientPromise;
    const db = client.db("bookcovers");
    
    const design = await db.collection("designs").insertOne({
      userId: session.user.id,
      title: validatedData.title,
      description: validatedData.description,
      imageUrl,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ 
      id: design.insertedId,
      imageUrl 
    });
  } catch (error) {
    console.error("[GENERATE_ERROR]", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Internal Error", 
      { status: 500 }
    );
  }
}