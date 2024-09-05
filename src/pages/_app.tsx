import Image from "next/image"
import logoImgSvg from '../assets/logo.svg'
import { globalStyles } from "../styles/global"
import { Container, Header } from "../styles/pages/app"

globalStyles()

export default function App({ Component, pageProps }) {
  return (
    <Container>
      <Header>
        <Image src={logoImgSvg} alt="logo" />
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
