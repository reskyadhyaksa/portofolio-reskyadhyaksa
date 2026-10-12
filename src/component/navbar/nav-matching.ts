import type { NavLinkConfig } from "./nav-types";

export function isPathActive(pathname: string | null, path: string | undefined): boolean {
  if (!pathname || !path) return false;
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function isGroupActive(pathname: string | null, links: NavLinkConfig[] = []): boolean {
  return links.some((link) => isPathActive(pathname, link.path));
}
