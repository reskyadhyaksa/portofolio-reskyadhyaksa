import DesktopNavLink from "./DesktopNavLink";
import NavDropdown from "./NavDropdown";
import { NAVIGATION_ITEMS, NAV_ITEM_TYPE } from "./nav-config";
import { isPathActive } from "./nav-matching";

interface DesktopNavProps {
  pathname: string | null;
  onNavigate: () => void;
}

export default function DesktopNav({ pathname, onNavigate }: DesktopNavProps) {
  return (
    <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
      {NAVIGATION_ITEMS.map((item) => {
        if (item.type === NAV_ITEM_TYPE.GROUP) {
          return (
            <NavDropdown
              key={item.name}
              group={item}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          );
        }

        return (
          <DesktopNavLink
            key={item.name}
            link={item}
            isActive={isPathActive(pathname, item.path)}
            onNavigate={onNavigate}
          />
        );
      })}
    </nav>
  );
}

