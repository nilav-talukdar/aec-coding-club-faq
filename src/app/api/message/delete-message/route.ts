import connectToDb from "@/db/mongodb";
import { authOptions } from "@/lib/auth";
import Message from "@/models/message.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const query = z.object({
  messageId: z.string().min(2, { message: "messageId is too short" }),
});

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "you are not an admin" },
        { status: 401 }
      );
    }
    await connectToDb();
    const messageId = request.nextUrl.searchParams.get("messageId");
    const parsedQuery = query.safeParse({ messageId });
    if (!parsedQuery.success) {
      return NextResponse.json(
        { error: parsedQuery.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    await Message.findByIdAndDelete(parsedQuery.data.messageId);
    return NextResponse.json(
      { success: true, message: "message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to delete message" },
      { status: 500 }
    );
  }
}
