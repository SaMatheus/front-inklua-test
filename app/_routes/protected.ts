import { domain } from "app/_config";
import { publicRoutes } from "./public";

export const protectedRoutesMenu = [
  {
    label: "Início",
    url: "/",
    icon: "icon-home-outline",
    external: false
  },
  {
    label: "Minhas vagas",
    url: "/minhas-vagas",
    icon: "icon-folder-outline",
    external: false
  },
  {
    label: "splitter",
    url: "",
    icon: "",
    external: false
  },
  {
    label: "Minha conta",
    url: "/minha-conta",
    icon: "icon-person-outline",
    external: false
  }
];

export const protectedRoutesMenuMobile = [
  ...publicRoutes,
  {
    label: "splitter",
    url: "",
    icon: "",
    external: false
  },
  {
    label: "Minhas vagas",
    url: "/minhas-vagas",
    icon: "icon-folder-outline",
    external: false
  },
  {
    label: "Minha conta",
    url: "/minha-conta",
    icon: "icon-person-outline",
    external: false
  }
];

export const protectedRoutesMenuMobileSearch = [
  ...protectedRoutesMenuMobile,
  {
    label: "Buscar perfis",
    // url: "/busca-de-perfis",
    url: "/busca-inteligente",
    icon: "icon-search",
    external: false
  }
]

export const protectedRoutesMenuWithSearch = [
  {
    label: "Início",
    url: "/",
    icon: "icon-home-outline",
    external: false
  },
  {
    label: "Minhas vagas",
    url: "/minhas-vagas",
    icon: "icon-folder-outline",
    external: false
  },
  {
    label: "splitter",
    url: "",
    icon: "",
    external: false
  },
  {
    label: "Minha conta",
    url: "/minha-conta",
    icon: "icon-person-outline",
    external: false
  },
  {
    label: "Buscar perfis",
    url: "/busca-inteligente",
    icon: "icon-search",
    external: false
  }
];

export const protectedRoutesMenuInkluer = [
  {
    label: "Início",
    url: domain,
    icon: "icon-home-outline",
    external: true
  },
  {
    label: "Minhas vagas",
    url: domain + "/recrutador/minhas-vagas",
    icon: "icon-folder-outline",
    external: true
  },
  {
    label: "splitter",
    url: "",
    icon: ""
  },
  {
    label: "Minha conta",
    url: domain + "/recrutador/minha-conta",
    icon: "icon-person-outline",
    external: true
  }
];

export const protectedRoutesFooter = [
  {
    label: "Início",
    url: "/",
    icon: "icon-home-outline",
    external: false
  },
  {
    label: "Mapeamento tech",
    url: "/mapeamento-tech",
    icon: "icon-checkmark-circle",
    external: false
  },
  {
    label: "Minha conta",
    url: "/minha-conta",
    icon: "icon-person-outline",
    external: false
  },
  {
    label: "Minhas vagas",
    url: "/minhas-vagas",
    icon: "icon-folder-outline",
    external: false
  },
  {
    label: "Palestras",
    url: "/palestras",
    icon: "icon-message-circle-outline",
    external: false
  },
  {
    label: "Contato",
    url: "/contato",
    icon: "icon-email-outline",
    external: false
  }
];

export const protectedRoutesFooterInkluer = [
  {
    label: "Início",
    url: domain,
    icon: "icon-home-outline",
    external: true
  },
  {
    label: "Mapeamento tech",
    url: "/mapeamento-tech",
    icon: "icon-checkmark-circle",
    external: false
  },
  {
    label: "Minha conta",
    url: domain + "/recrutador/minha-conta",
    icon: "icon-person-outline",
    external: true
  },
  {
    label: "Minhas vagas",
    url: domain + "/recrutador/minhas-vagas",
    icon: "icon-folder-outline",
    external: true
  },
  {
    label: "Palestras",
    url: "/palestras",
    icon: "icon-message-circle-outline",
    external: false
  },
  {
    label: "Contato",
    url: "/contato",
    icon: "icon-email-outline",
    external: false
  }
];