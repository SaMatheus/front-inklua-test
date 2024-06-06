'use client'
import { Heading, Paragraph, Span, Title } from '@Inklua/components-library';

const JobsTitle = () => {
  return (
    <Title>
        <Heading tag='h1'>
        <Span
          color="var(--color-inst-primary-800)"
          weight={700}
        >
          Buscar
        </Span>
        {' '} vagas
        </Heading>
        <Paragraph
          weight={400}
        >
          1.893 candidatos encontrados
        </Paragraph>
      </Title>
  )
}

export default JobsTitle