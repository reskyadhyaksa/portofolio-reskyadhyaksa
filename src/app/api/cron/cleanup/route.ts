import { timingSafeEqual } from "node:crypto";
import { describeError, jsonFailure, jsonSuccess } from "@/lib/api-response";
import { runCleanup } from "@/lib/cleanup";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const provided = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  return provided.length === expected.length && timingSafeEqual(provided, expected);
}

function handleCleanup(request: Request): Response {
  if (!process.env.CRON_SECRET) return jsonFailure("CRON_SECRET is not configured", 500);
  if (!isAuthorized(request)) return jsonFailure("Unauthorized", 401);

  try {
    return jsonSuccess(runCleanup());
  } catch (error) {
    return jsonFailure(describeError(error, "Cleanup failed"), 500);
  }
}

export function GET(request: Request) {
  return handleCleanup(request);
}

export function POST(request: Request) {
  return handleCleanup(request);
}
