import { NextRequest, NextResponse } from "next/server";
import { checkDuplicate } from "@/lib/db/queries";
import { generateTitleHash } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const title = body.title as string;
  if (!title) {
    return NextResponse.json(
      { error: "Missing required field: title" },
      { status: 400 }
    );
  }

  const titleHash = generateTitleHash(title);
  const result = await checkDuplicate(titleHash);

  return NextResponse.json(result);
}
