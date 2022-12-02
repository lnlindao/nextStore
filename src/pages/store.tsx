import { GetStaticProps, NextPage } from "next";
import { Products } from "@prisma/client";
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

const Store: NextPage<Props> = ({ products }) => {
  return (
    <Layout>
      <section className="content grid grid-cols-5 gap-8 ">
        <aside>Filtros</aside>
        <section className="col-span-4">
          <ListProducts products={products} />
        </section>
      </section>
    </Layout>
  );
};

export default Store;
