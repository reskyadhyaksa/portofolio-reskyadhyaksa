import {
  Briefcase,
  TrendingUp,
  FolderGit2,
  User,
  MessageCircle,
  LayoutGrid,
} from "lucide-react";
import { NAV_ITEM_TYPE, type NavigationItem } from "./nav-types";

export { NAV_ITEM_TYPE };

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    type: NAV_ITEM_TYPE.LINK,
    name: "Experiences",
    path: "/experiences",
    description: "Career & stack",
    icon: Briefcase,
  },
  {
    type: NAV_ITEM_TYPE.GROUP,
    name: "Features",
    description: "Interactive tools",
    icon: LayoutGrid,
    links: [
      {
        name: "Trading",
        path: "/trading",
        description: "Market models",
        icon: TrendingUp,
      },
      {
        name: "Chat",
        path: "/chat",
        description: "Let's talk",
        icon: MessageCircle,
      },
    ],
  },
  {
    type: NAV_ITEM_TYPE.LINK,
    name: "Projects",
    path: "/projects",
    description: "Work highlights",
    icon: FolderGit2,
  },
  {
    type: NAV_ITEM_TYPE.LINK,
    name: "About Me",
    path: "/about-me",
    description: "Background",
    icon: User,
  },
];
