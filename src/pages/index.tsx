import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "src/interfaces/Product";
import styles from "../styles/Home.module.css";
import ListProducts from "../components/products/ListProducts";
import { Layout } from "src/components/Layout";

interface Props {
  products: Product[];
}

export default function Index({ products }: Props) {
  return (
    <Layout>
      {/* <ListProducts products={products} /> */}
      <div>hola</div>
    </Layout>
  );
}
/*
export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();

  //  console.log("tasks", products);
  return {
    props: { products },
  };
};
*/
