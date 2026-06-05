import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/config/db";
import { visitors } from "@/db/models/schema";
import { eq, count } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { visitorId } = await req.json();

  if (!visitorId) {
    return NextResponse.json(
      { error: "Visitor ID required" },
      { status: 400 }
    );
  }

  const existingVisitor = await db.select().from(visitors).where(eq(visitors.visitorId, visitorId)).limit(1);

  if (!existingVisitor || existingVisitor.length === 0) {
    await db.insert(visitors).values({
      visitorId,
    });
  }

  const result = await db.select({ count: count() }).from(visitors);
  const visitorCount = result[0]?.count || 0;

  return NextResponse.json({
    success: true,
    count: visitorCount,
  });
}
