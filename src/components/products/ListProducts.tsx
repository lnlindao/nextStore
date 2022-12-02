import { Products } from "@prisma/client";
import { Fragment } from "react";
import { ProductItem } from "./ProductItem";
import { NextPage } from "next";

type Props = {
  products: Products[];
};

export const ListProducts: NextPage<Props> = ({ products }) => {
  return (
    <Fragment>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <ProductItem products={products} />
      </div>
    </Fragment>
  );
};

/*
export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();

  console.log("products", products);
  return {
    props: { products },
  };
};
*/
