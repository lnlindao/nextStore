import { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { Products } from "@prisma/client";
import styles from "../styles/Home.module.css";

import { Layout } from "src/components/Layout";
import { ListProducts } from "src/components/products/ListProducts";

type Props = {
  products: Products[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();
  return {
    props: { products },
  };
};

const Index: NextPage<Props> = ({ products }) => {
  console.log("products getstaticprops", products);
  return (
    <Layout>
      <ListProducts products={products} />
    </Layout>
  );
};

export default Index;
