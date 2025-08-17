import connectToDb from "@/db/mongodb";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Message from "@/models/message.model";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "you are not an admin" },
        { status: 401 }
      );
    }
    await connectToDb();
    const result = await Message.find({}).sort({ createdAt: -1 });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to get messages" },
      { status: 500 }
    );
  }
}
