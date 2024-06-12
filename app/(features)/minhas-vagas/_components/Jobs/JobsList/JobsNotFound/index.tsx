import { useMobileStore } from 'app/(features)/minhas-vagas/_store';

const JobsNotFound = () => {
  const { isMobile } = useMobileStore();
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: isMobile ? '2rem': '5rem 0' }}>
      <p style={{ fontSize: isMobile ? '1rem' : '1.5rem', fontWeight: '600' }} >Não foram encontradas vagas com os filtros selecionados.</p>
    </div>
  )
}

export default JobsNotFound;