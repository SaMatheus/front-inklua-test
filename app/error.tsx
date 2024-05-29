'use client'

import { Generic } from "@Inklua/components-library";
import { useRouter } from "next/navigation";

const sectionStyle = {
  margin: '1rem',
  height: "100%"
};

export default function Error() {
  const router = useRouter();

  return (
    <section style={sectionStyle}>
      <Generic
        pallete="business"
        firstAction={{
          label: "Voltar para a página inicial",
          onClick: () => router.push("/")
        }}
      />
    </section>

  )
}