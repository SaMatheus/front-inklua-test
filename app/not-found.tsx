'use client'

import { NotFound as NotFoundContainer } from "@Inklua/components-library";
import { useRouter } from "next/navigation";

const sectionStyle = {
  margin: '1rem',
  height: '100%'
};

export default function NotFound() {
  const router = useRouter();

  return (
    <section style={sectionStyle}>
      <NotFoundContainer
        pallete="business"
        firstAction={{
          label: "Voltar para a página inicial",
          onClick: () => router.push("/")
        }}
      />
    </section>
  )
}