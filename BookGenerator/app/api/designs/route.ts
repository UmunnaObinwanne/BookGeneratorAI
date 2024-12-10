import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const client = await clientPromise;
    const db = client.db("bookcovers");
    
    const designs = await db
      .collection("designs")
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(designs);
  } catch (error) {
    console.error("[DESIGNS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}