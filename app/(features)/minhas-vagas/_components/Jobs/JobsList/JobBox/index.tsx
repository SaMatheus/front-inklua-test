'use client'
import { Button, Chip, Heading, Icon, Paragraph, Span, Splitter } from '@Inklua/components-library'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
import { useFilterStore, useJobsStore, useMobileStore } from 'app/(features)/minhas-vagas/_store'
import { JobsProps } from 'app/(features)/minhas-vagas/_types'
import { getGranParentPosition } from 'app/(features)/minhas-vagas/_utils'
import styles from './styles.module.scss'

interface JobBoxProps {
  data: JobsProps
}

const JobBox = ({ data }: JobBoxProps) => {
  const { isMobile } = useMobileStore();
  const { setJobRectTop } = useJobsStore();
  const { fetchData, setFetchData, setReFetch } = useFilterStore();
  const router = useRouter();

  const handleSeeMore = (event: MouseEvent<HTMLButtonElement>) => {
    const elementPosition = getGranParentPosition(event.target as HTMLElement);
    if (elementPosition) setJobRectTop(elementPosition);
    if (fetchData) setFetchData(fetchData);

    setReFetch(true);
    return router.push(`/minhas-vagas/${data.uri}`);
  }

  return (
    <div className={styles.wrapper}>
      <div className={isMobile ? styles.headerMobile : styles.header}>
        <div className={isMobile ? styles.titleMobile : styles.title}>
          <Heading tag='h6'>{data.title}</Heading>
          <div className={styles.author}>
            <Span weight={600} color='#137784'>{data.company}</Span>
            <Paragraph weight={600}>Publicada em {data.publishedAt}</Paragraph>
          </div>
        </div>
        {isMobile && (
          <Button className={styles.shareBtn} size='small' outlined>
            <Icon name='icon-share-outline' color='#137784' />
          </Button>
        )}
      </div>
      <div className={isMobile ? styles.descriptionContentMobile : styles.descriptionContent}>
        <Paragraph>{data.description}</Paragraph>
      </div>
      <div className={styles.footer}>
          <div className={styles.chipBox}>
            {data.location && (
              <Chip
                text={data.location}
                icon={<Icon name='icon-pin' size='small' color='#137784' />}
              />
            )}
            {!data.location && data.workModel.map((model) => (
              <>
                <Chip
                  key={model}
                  text={model}
                  icon={<Icon name='icon-pin' size='small' color='#137784' />}
                />
              </>
            ))}
            {data.salary && (
              <Chip
                text={data.salary.slice(2, -3)}
                icon={<Icon name='icon-cifrao' size='small' color='#137784' />}
              />
            )}
          </div>
          <div className={`${isMobile ? styles.buttonBoxMobile : styles.buttonBox}`}>
            <Button size={isMobile ? 'small' : 'medium'} onClick={handleSeeMore}>Ver detalhes</Button>
            {!isMobile && (
              <Button className={styles.shareBtn} outlined>
                <Icon name='icon-share-outline' color='#137784' />
              </Button>
            )}
          </div>
      </div>
      <Splitter height='1px' />
    </div>
  )
}

export default JobBox