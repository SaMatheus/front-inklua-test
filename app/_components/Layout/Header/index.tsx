'use client'

import {
  Header as HeaderContainer,
  Icon
} from "@Inklua/components-library";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "app/_providers/authentication";
import { publicRoutes } from "app/_routes";
import styles from "./styles.module.scss";
import { Menu } from "../Menu";

function LogoImgEnterprise() {
  return (
    <Link href='/'>
      <Image
        src='https://s3.sa-east-1.amazonaws.com/public.inklua/para-empresas/logo_empresa.svg'
        alt='Logo Inklua Para Empresas'
        width={164}
        height={60}
        priority
      />
    </Link>
  )
}

function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {publicRoutes.slice(1).map(item => (
        <Link
          key={item.label}
          href={item.url}
          className={[
            styles.url,
            item.url === pathname ? styles.active : ''
          ].join(' ')}
        >
          {item.label}
        </Link>
      )
      )}
    </>
  )
}

function UserInfoButton() {
  const { userData, loading } = useAuth();
  const profileLink = userData?.inkluer ? '/recrutador/minha-conta' : '/minha-conta';

  if (!userData || !userData.name) return (
    <Link
      href='/autenticacao/login'
      className={styles.link}
    >
      <Icon name='icon-person-outline' />
      {loading ? '' : 'Entrar'}
    </Link>
  )

  return (
    <Link
      href={profileLink}
      className={styles.link}
    >
      <Icon name='icon-person-outline' />
      {userData.name}
    </Link>
  )
}

function DefaultHeader() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <HeaderContainer
        palette='business'
        navLinks={<NavLinks />}
        logo={<LogoImgEnterprise />}
        toggleMenu={() => setIsOpened(true)}
        userInfo={<UserInfoButton />}
      />
      <Menu
        isOpened={isOpened}
        onClose={() => setIsOpened(false)}
      />
    </>
  )
}

function SimpleHeader() {
  return (
    <HeaderContainer
      palette="business"
      logo={<LogoImgEnterprise />}
    />
  )
}

export function Header() {
  const pathname = usePathname();
  const alternativeHeaderRoutes = [
    '/autenticacao/login',
    '/autenticacao/cadastro',
    '/autenticacao/confirme-seu-email',
    '/autenticacao/esqueci-minha-senha',
    '/autenticacao/validar-email',
    '/politica-de-privacidade',
    '/autenticacao/criacao-senha'
  ];

  return (
    <>
      {alternativeHeaderRoutes.includes(pathname) ?
        <SimpleHeader />
        :
        <DefaultHeader />
      }
    </>
  )
}