'use client'
import { Heading, Paragraph, Span, Title } from '@Inklua/components-library';
import { useJobsStore } from 'app/(features)/minhas-vagas/_store/JobsStore';
import { useMobileStore } from 'app/(features)/minhas-vagas/_store/MobileStore';

const PageTitle = () => {
  const { isMobile } = useMobileStore();
  const { jobs } = useJobsStore();	
  return (
    <Title>
        <Heading tag='h1'>
        <Span
          color="var(--color-inst-primary-800)"
          weight={700}
        >
          {isMobile ? 'Vagas' : 'Buscar'}
        </Span>
        {' '} {isMobile ? 'encontradas' : 'vagas'}
        </Heading>
        <Paragraph
          weight={400}
        >
          {jobs.length} vagas encontradas
        </Paragraph>
      </Title>
  )
}

export default PageTitle