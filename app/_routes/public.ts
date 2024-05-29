export const publicRoutes = [
  {
    label: "Início",
    url: "/",
    icon: "icon-home-outline",
    external: false
  },
  {
    label: "Soluções para R&S",
    url: "/solucoes-rs",
    icon: "icon-star-outline",
    external: false
  },
  {
    label: "Mapeamento tech",
    url: "/mapeamento-tech",
    icon: "icon-checkmark-circle",
    external: false
  },
  {
    label: "Palestras",
    url: "/palestras",
    icon: "icon-message-circle-outline",
    external: false
  },
  {
    label: "Sobre Nós",
    url: "/institucional",
    icon: "icon-star-outline",
    external: false
  },
  {
    label: "Contato",
    url: "/contato",
    icon: "icon-email-outline",
    external: false
  }
];

export const publicRoutesMenu = [
  {
    label: "Início",
    url: "/",
    icon: "icon-home-outline",
    external: false
  },
  {
    label: "Cadastrar",
    url: "/autenticacao/cadastrar",
    icon: "icon-person-add-outline",
    external: false
  },
  {
    label: "Acessar",
    url: "/autenticacao/login",
    icon: "icon-log-in",
    external: false
  },
];

export const publicRoutesMenuMobile = [
  ...publicRoutes,
  {
    label: "splitter",
    url: "",
    icon: "",
    external: false
  },
  ...publicRoutesMenu.slice(1)
]

export const socialMediaRoutes = [
  {
    icon: "icon-instagram",
    url: "https://www.instagram.com/inkluaoficial",
    external: true
  },
  {
    icon: "icon-facebook",
    url: "https://www.facebook.com/Inklua",
    external: true
  },
  {
    icon: "icon-linkedin",
    url: "https://www.linkedin.com/company/inklua",
    external: true
  }
];