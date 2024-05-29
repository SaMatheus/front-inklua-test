"use client"

import styles from './styles.module.scss';

export interface TitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  linebreak?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const sizeMap = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

export function Title({
  title,
  subtitle,
  centered = false,
  linebreak = false,
  level = 'h1',
  size = 'medium'
}: TitleProps) {
  const HeadingTag = level;

  function renderContent() {
    return ({
      __html: title,
    })
  }

  return (
    <div
      className={[
        styles.container,
        centered ? styles.centered : ''
      ].join(' ')}
    >
      {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      <HeadingTag
        className={[
          styles.title,
          linebreak ? styles.linebreak : '',
          sizeMap[size]
        ].join(' ')}
        dangerouslySetInnerHTML={renderContent()}
      />
    </div>
  )
}