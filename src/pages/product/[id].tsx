import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const { isFallback } = useRouter();

  const router = useRouter();

  async function handleBuyButton() {
    setIsCreatingCheckoutSession(true);

    try {
      const response = await axios.post(`/api/checkout`, {
        priceId: product.defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      /**
       * redirecionamento para rotas externas
       */
      window.location.href = checkoutUrl;

      /**
       * redirecionamento para rotas internas
       */
      // router.push("/checkout");
    } catch (err) {
      alert("Falha ao redirecionar ao checkout!");
    } finally {
      setIsCreatingCheckoutSession(false);
    }
  }

  if (isFallback) {
    return <p>LOADING.....</p>;
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyButton}
          >
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

/**
 *
 * @returns Método obrigatório quando se usa SSG em página que tem parâmetros,
 * pois no momento do build da applicação, não tem acesso ao "id" da rotas (páginas)
 */
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_QiC1uJQYESoC7I" } }],
    fallback: true,
  };
};

/**
 *
 * SSG -> Página estáticas geradas no momento do build
 */
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        defaultPriceId: price.id,
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
      },
    },
    revalidate: 60 * 60 * 1, // 1 hora
  };
};
