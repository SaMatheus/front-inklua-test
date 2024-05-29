import { 
  protectedRoutesFooter, 
  protectedRoutesFooterInkluer, 
  protectedRoutesMenu, 
  protectedRoutesMenuInkluer, 
  protectedRoutesMenuMobile, 
  protectedRoutesMenuMobileSearch, 
  protectedRoutesMenuWithSearch, 
  publicRoutes,
  publicRoutesMenu,
  publicRoutesMenuMobile
} from "app/_routes";
import { UserData } from "app/_types";

interface GetNavLinksProps {
  userData?: UserData | null | undefined;
  component: 'menu' | 'footer';
  isMobile?: boolean;
}

export function getNavLinks({ userData, component, isMobile }: GetNavLinksProps) {
  if (!userData) {
    if (component === 'menu' && !isMobile) return publicRoutesMenu;

    if (component === 'menu' && isMobile) return publicRoutesMenuMobile;

    if (component === 'footer') return publicRoutes;

    return publicRoutes;
  }

  if (userData.type !== 'PJ' && !userData.inkluer) {
    if (component === 'menu'  && !isMobile) return publicRoutesMenu;

    if (component === 'menu' && isMobile) return publicRoutesMenuMobile;

    if (component === 'footer') return publicRoutes;
  }

  if (userData.type !== 'PJ' || userData.inkluer) {
    if (component === 'menu') return protectedRoutesMenuInkluer;

    if (component === 'footer') return protectedRoutesFooterInkluer;
  }

  if (userData.type === 'PJ' && !userData.permissions?.externalHunting) {
    if (component === 'menu' && !isMobile) return protectedRoutesMenu;

    if (component === 'menu' && isMobile) return protectedRoutesMenuMobile;

    if (component === 'footer') return protectedRoutesFooter;
  }

  if (userData.permissions.externalHunting) {
    if (component === 'menu' && !isMobile) return protectedRoutesMenuWithSearch;

    if (component === 'menu' && isMobile) return protectedRoutesMenuMobileSearch;

    if (component === 'footer') return protectedRoutesFooter;
  }

  return publicRoutesMenu;
}