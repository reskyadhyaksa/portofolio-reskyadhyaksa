import { getRouterJson, readRouterEnv } from "./router-http";

const ROUTER_STATUS_PATH = "/api/v1/me/status";

interface RouterStatusResponse {
  usage?: { cost?: { remainingUsd?: number | null } };
}

export interface BalanceSnapshot {
  remainingUsd: number | null;
}

export async function fetchRouterBalance(): Promise<BalanceSnapshot> {
  const statusUrl = new URL(ROUTER_STATUS_PATH, readRouterEnv("AI_ROUTER_BASE_URL")).toString();
  const status = await getRouterJson<RouterStatusResponse>(statusUrl);
  const remainingUsd = status.usage?.cost?.remainingUsd;
  return { remainingUsd: typeof remainingUsd === "number" ? remainingUsd : null };
}
