import Link from "next/link";
import ActiveIndicator from "./ActiveIndicator";
import {
  getDesktopNavItemClassName,
  getDesktopNavIconClassName,
} from "./nav-styles";
import type { NavLinkConfig } from "./nav-types";

interface DesktopNavLinkProps {
  link: NavLinkConfig;
  isActive: boolean;
  onNavigate: () => void;
}

export default function DesktopNavLink({ link, isActive, onNavigate }: DesktopNavLinkProps) {
  const Icon = link.icon;

  return (
    <Link
      href={link.path}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={getDesktopNavItemClassName(isActive)}
    >
      <Icon aria-hidden="true" className={getDesktopNavIconClassName(isActive)} />
      <span>{link.name}</span>
      <ActiveIndicator isVisible={isActive} />
    </Link>
  );
}
