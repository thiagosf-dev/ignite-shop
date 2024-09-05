# How it was created! 🚧

```shell
npx create-next-app@12.2.5
```

- remove the `yarn.lock` file and run

  ```shell
  npm i
  ```

> Todas as páginas que representam uma rota da aplicação, devem ser criadas dentro da pasta `/pages`

- install **TypeScript**

  ```shell
  npm i typescript @types/react @types/node -D
  ```

  ```shell
  npm run dev
  ```

- create the `/src` folder and move the `/pages` folder inside it

> O arquivo `index.tsx` representa a página Home (inicial) da aplicação

> **File System Routing**: roteamento baseado em arquivos físicos

- create the HTML Global Document: `/src/pages/_document.tsx`

- install **Stitches**

  ```shell
  npm install @stitches/react
  ```

  create the file: `/src/styles/index.ts`

  create the file: `/src/styles/global.ts`

- instal **keen-slider** (a Carroussel library)

  ```shell
  npm i keen-slider
  ```

- instal **Stripe**

  ```shell
  npm i stripe
  ```
