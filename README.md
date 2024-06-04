# 💻 Inklua Front-end Test

O seguinte projeto é um boilerplate de aplicação NextJs desenvolvido para iniciar novos projetos, com o objetivo de criar uma aplicação escalável e fácil de manter baseada nas boas práticas da biblioteca React e do framework Nextjs.


## 🚀 Get Started

Pré-requisitos:

- Node 18+
- Yarn 1.22+


##### `yarn dev`

Executa o aplicativo no modo de desenvolvimento.\
Depois, abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.

#### `live preview`

Este projeto foi implantado no vercel, você pode verificar [aqui]("inserir-link")

## 📂 Project Structure

Para escalar a aplicação da maneira mais fácil e sustentável, preferimos manter a maior parte do meu código dentro da pasta "features". Dentro desta pasta, categorizamos o código com base em diferentes funcionalidades de acordo com cada rota. Cada pasta de feature contém código específico para o domínio dessa.. Isso nos ajuda a manter a feature restrita a seus componentes e evita que eu misture suas declarações com elementos compartilhados. Acho essa abordagem muito mais fácil de manter do que usar uma estrutura de pasta plana com muitos arquivos.


```sh
app
|
+-- _assets            # assets folder can contain all the static files such as images, fonts, etc.
|
+-- _components        # shared components used across the entire application
|
+-- _config            # all the global configuration, env variables etc.
|
+-- (features)         # feature based modules
|
+-- _hooks             # shared hooks used across the entire application
|
+-- _lib               # re-exporting different libraries preconfigured for the application
|
+-- _providers         # all of the application providers
|
+-- _styles            # all global styles and theme used across the entire application
|
+-- _types             # base types used across the application
|
+-- _utils             # shared utility functions
```

Uma feature tem a seguinte estrutura:

```sh
app/(features)/someFeature
|
+-- _api         # exported API request declarations and api hooks related to a specific feature
|
+-- _assets      # assets folder can contain all the static files for a specific feature
|
+-- _components  # components scoped to a specific feature
|
+-- _hooks       # hooks scoped to a specific feature
|
+-- _(routes)    # route components for a specific feature pages
|
+-- _stores      # state stores for a specific feature
|
+-- _types       # typescript types for TS specific feature domain
|
+-- _utils       # utility functions for a specific feature
```

## 🗄 Component Structure

Para garantir um código limpo e performático, todos os componentes seguem uma estrutura de projeto para garantir que as regras de negócio não estejam no mesmo arquivo que a UI do componente. No entanto, todos os arquivos relacionados a esse componente são agrupados na mesma pasta porque compartilham um comportamento semelhante.


```sh
MyComponent
|
+-- index.tsx           # Folder that contains all the UI
|
+-- styles.module.scss  # Styles of the component
|
+-- index.stories.tsx   # Stories to use in Storybook
|
+-- index.test.tsx      # Component unit tests

```

## 🎨 Styling Approach

No desenvolvimento e estilização dos componentes, escolhemos usar Sass Modules por várias razões, incluindo:


- [Sass Modules](https://sass-lang.com/documentation/at-rules/use)

  - Organização e Encapsulamento;

  - Reutilização de Estilo;

  - Fácil de criar um tema ou sistema de design;

  - Manutenção Simplificada;

  - Biblioteca Leve.


## 📍 State Management


#### Server State
- [React Query](https://tanstack.com/query/v5):
React Query é a melhor alternativa atual para lidar com o estado do servidor dentro do React, pois é fácil de manter e instalar, além de ter várias funcionalidades como cache, consultas e mutações.


#### Global State
- [Zustand](https://github.com/pmndrs/zustand):
Zustand é uma das melhores bibliotecas para controlar estados globais em aplicações React, sua implementação é menos verbosa e mais fácil do que o redux.


#### Form State
- [React Hook Form](https://react-hook-form.com/):
React Hook Form é uma boa escolha quando preciso lidar com formulários no react, ele tem boas funcionalidades que reduzem a quantidade de bugs nos formulários.
