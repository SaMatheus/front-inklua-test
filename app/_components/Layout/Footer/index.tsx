'use client'

import {
  Footer as FooterContainer,
  Icon
} from '@Inklua/components-library';
import Image from 'next/image';
import Link from 'next/link';
import { getNavLinks } from 'app/_helpers/getNavLinks';
import { useAuth } from 'app/_providers/authentication';
import { socialMediaRoutes } from 'app/_routes';

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
  const { userData } = useAuth();
  const navLinks = getNavLinks({ userData, component: 'footer' });

  return (
    <>
      {navLinks.map(item => {
        if (item.external) return (
          <li key={item.label}>
            <a
              href={item.url}
              target='_blank'
              rel='noopener noreferrer'
            >
              {item.label}
            </a>
          </li>
        )

        return (
          <li key={item.label}>
            <Link href={item.url} >
              {item.label}
            </Link>
          </li>
        )
      })}
    </>
  )
}

function PrivacyPolicy() {
  return (
    <Link href='/politica-de-privacidade'>
      Política de privacidade
    </Link>
  )
}

function SocialMediaLinks() {
  return (
    <>
      {socialMediaRoutes.map(item => (
        <li key={item.icon}>
          <a
            href={item.url}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Icon name={item.icon} />
          </a>
        </li>
      ))}
    </>
  )
}

export function Footer() {
  return (
    <FooterContainer
      palette="business"
      logo={<LogoImgEnterprise />}
      navLinks={<NavLinks />}
      privacyPolicy={<PrivacyPolicy />}
      socialMediaLinks={<SocialMediaLinks />}
    />
  );
}