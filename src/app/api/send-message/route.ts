import connectToDb from "@/db/mongodb";
import Message from "@/models/message.model";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  message: z.string().min(2, { message: "message is too short" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedBody = schema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    await connectToDb();
    const result = await Message.create(parsedBody.data);
    return NextResponse.json(
      {
        success: true,
        id: result._id.toString(),
        message: "message has been sent",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to send message" },
      { status: 500 }
    );
  }
}
