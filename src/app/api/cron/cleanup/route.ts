import { timingSafeEqual } from "node:crypto";
import { describeError, jsonFailure, jsonSuccess } from "@/lib/api-response";
import { runCleanup } from "@/lib/cleanup";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const authHeader = request.headers.get("authorization");
  if (authHeader) {
    const provided = Buffer.from(authHeader);
    const expected = Buffer.from(`Bearer ${secret}`);
    if (provided.length === expected.length && timingSafeEqual(provided, expected)) {
      return true;
    }
  }

  const url = new URL(request.url);
  const querySecret = url.searchParams.get("secret");
  if (querySecret) {
    const provided = Buffer.from(querySecret);
    const expected = Buffer.from(secret);
    if (provided.length === expected.length && timingSafeEqual(provided, expected)) {
      return true;
    }
  }

  return false;
}

async function handleCleanup(request: Request): Promise<Response> {
  if (!process.env.CRON_SECRET) return jsonFailure("CRON_SECRET is not configured", 500);
  if (!isAuthorized(request)) return jsonFailure("Unauthorized", 401);

  try {
    const report = await runCleanup();
    return jsonSuccess(report);
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
