import type { LucideIcon } from "lucide-react";

export const NAV_ITEM_TYPE = {
  LINK: "link",
  GROUP: "group",
} as const;

export interface NavLinkConfig {
  name: string;
  path: string;
  description: string;
  icon: LucideIcon;
}

export interface NavLinkItem extends NavLinkConfig {
  type: typeof NAV_ITEM_TYPE.LINK;
}

export interface NavGroupItem {
  type: typeof NAV_ITEM_TYPE.GROUP;
  name: string;
  description: string;
  icon: LucideIcon;
  links: NavLinkConfig[];
}

export type NavigationItem = NavLinkItem | NavGroupItem;
