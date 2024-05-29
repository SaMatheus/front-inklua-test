"use client"

import LinkCP from "next/link";
import React, { ReactElement, ReactNode } from "react";
import styles from "./styles.module.scss";

export interface LinkProps {
  href: string
  rel?: string
  target?: string
  palette?: 'business' | 'institutional' | 'blank'
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'small' | 'medium'
  disabled?: boolean
  outlined?: boolean
  icon?: ReactElement
  children: ReactNode
  color?: string
}

const colorPalette = {
  business: styles.business,
  institutional: styles.institutional,
  blank: ''
}

const linkVariant = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost
}

const linkSize = {
  small: styles.small,
  medium: styles.medium
}

export function Link(props: LinkProps): ReactElement {
  const {
    href,
    palette = 'institutional',
    variant = 'primary',
    size = 'medium',
    disabled = false,
    outlined = false,
    icon,
    children,
    color,
    ...rest
  } = props

  return (
    <LinkCP
      href={href}
      style={{ color }}
      className={[
        styles.wrapper,
        colorPalette[palette],
        linkVariant[variant],
        linkSize[size],
        outlined ? styles.outlined : '',
        disabled ? styles.disabled : ''
      ].join(' ')}
      {...rest}
    >
      {icon}
      {children}
    </LinkCP>
  )
}

export default Link;
