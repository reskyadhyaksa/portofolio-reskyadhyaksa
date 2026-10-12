import { describeError, jsonFailure, jsonSuccess, readSessionId } from "@/lib/api-response";
import { fetchRouterBalance } from "@/lib/router-balance";
import { UpstreamError } from "@/lib/router-http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!readSessionId(request)) return jsonFailure("Missing or invalid session id", 400);

  try {
    return jsonSuccess(await fetchRouterBalance());
  } catch (error) {
    const status = error instanceof UpstreamError ? error.status : 500;
    return jsonFailure(describeError(error, "Failed to load balance"), status);
  }
}
