import { NextRequest, NextResponse } from "next/server";
import { checkDuplicate } from "@/lib/db/queries";
import { generateSourceHash } from "@/lib/utils";

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

  const sourceUrl = body.source_url as string;
  if (!sourceUrl) {
    return NextResponse.json(
      { error: "Missing required field: source_url" },
      { status: 400 }
    );
  }

  const hash = generateSourceHash(sourceUrl);
  const result = await checkDuplicate(hash);

  return NextResponse.json(result);
}
