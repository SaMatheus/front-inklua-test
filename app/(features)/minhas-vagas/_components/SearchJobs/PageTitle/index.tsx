'use client'
import { Heading, Paragraph, Span, Title } from '@Inklua/components-library';
import { useMobileStore } from 'app/(features)/minhas-vagas/_store/MobileStore';
import { usePaginationStore } from 'app/(features)/minhas-vagas/_store/PaginationStore';

const PageTitle = () => {
  const { isMobile } = useMobileStore();
  const { pagination } = usePaginationStore();

  // console.log(pagination.total)

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