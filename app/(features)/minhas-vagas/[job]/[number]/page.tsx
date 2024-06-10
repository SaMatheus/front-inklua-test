 'use client'
import { Button } from '@Inklua/components-library';
import { useParams, useRouter } from 'next/navigation';

const DefaultPage = () => {
  const router = useRouter();
  const params = useParams();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
      <h1 style={{ textTransform: 'capitalize' }}>Job: {params.job.split('-').join(' ')} número {params.number}</h1>
      <Button style={{ width: '30rem' }} onClick={handleGoBack}>Voltar</Button>
    </div>
  );
};

export default DefaultPage;