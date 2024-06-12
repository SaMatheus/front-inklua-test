'use client'
import { Heading, Paragraph, Span, Title } from '@Inklua/components-library';
import { useMobileStore, usePaginationStore } from 'app/(features)/minhas-vagas/_store';

const PageTitle = () => {
  const { isMobile } = useMobileStore();
  const { pagination } = usePaginationStore();

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
          {pagination.total} vagas encontradas
        </Paragraph>
      </Title>
  )
}

export default PageTitle