'use client'

import {
  Button,
  Icon,
  Menu as MenuContainer,
  Splitter
} from '@Inklua/components-library';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { getNavLinks } from 'app/_helpers/getNavLinks';
import { useAuth } from 'app/_providers/authentication';

interface MenuProps {
  isOpened: boolean;
  onClose: () => void;
}

function BackgroundImage() {
  return (
    <Image
      alt="Logo Inklua"
      src="https://s3.sa-east-1.amazonaws.com/public.inklua/para-empresas/assets/logo_a.webp"
      title="Logo da Inklua sobre fundo azul"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: '100%', height: 'auto', maxWidth: '404px' }}
    />
  )
}

function MenuItems({ onClose }: { onClose: () => void }) {
  const { userData } = useAuth();
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1200;
  const navLinks = getNavLinks({ userData, component: 'menu', isMobile });
  const pathname = usePathname();

  const handleClick = (url: string) => {
    if (url === pathname) {
      window.location.href = url;
    }
    onClose();
  };

  return (
    <>
      {navLinks.map((item, index) => {
        if (item.label === "splitter") return <Splitter key={index} />

        return (
          <li key={item.label}>
            <Link
              data-actived={item.url === pathname}
              href={item.url}
              onClick={() => handleClick(item.url)}
              rel={item.external ? 'noopener noreferrer' : undefined}
              target={item.external ? '_blank' : '_self'}
            >
              <Icon name={item.icon} />
              {item.label}
            </Link>
          </li>
        )
      })}
    </>
  )
}

function LogoutButton({ onClose }) {
  const { removeUserData, removeUserToken, loading } = useAuth();
  const router = useRouter();

  function handleLogout() {
    removeUserData();
    removeUserToken();
    router.push('/');
    onClose();
  }

  return (
    <Button
      onClick={handleLogout}
      palette="blank"
      size="medium"
      variant="ghost"
      icon={<Icon name="icon-log-out" color="#fff" size="large" />}
      disabled={loading}
    >
      Sair da conta
    </Button>
  )
}

export function Menu({ isOpened, onClose }: MenuProps) {
  return (
    <MenuContainer
      palette="business"
      isOpened={isOpened}
      closeMenu={onClose}
      backgroundImage={<BackgroundImage />}
      logoutButton={<LogoutButton onClose={onClose} />}
    >
      <MenuItems onClose={onClose} />
    </MenuContainer>
  )
}