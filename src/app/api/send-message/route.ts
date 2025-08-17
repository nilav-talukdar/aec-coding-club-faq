import connectToDb from "@/db/mongodb";
import Message from "@/models/message.model";
import { NextRequest, NextResponse } from "next/server";
import arcjet, { tokenBucket } from "@arcjet/next";
import { z } from "zod";

const schema = z.object({
  message: z.string().min(2, { message: "message is too short" }),
});

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    tokenBucket({
      mode: "LIVE",
      characteristics: ["ip.src"],
      refillRate: 5,
      interval: 5,
      capacity: 15,
    }),
  ],
});

export async function POST(request: NextRequest) {
  try {
    const decision = await aj.protect(request, { requested: 5 });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return NextResponse.json(
          { error: "Too Many Requests", reason: decision.reason },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: "Forbidden", reason: decision.reason },
        { status: 403 }
      );
    }

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
