import connectToDb from "@/db/mongodb";
import { authOptions } from "@/lib/auth";
import Message from "@/models/message.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "you are not an admin" },
        { status: 401 }
      );
    }
    await connectToDb();
    await Message.deleteMany({});
    return NextResponse.json(
      { message: "messages deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to delete messages" },
      { status: 500 }
    );
  }
}
