import Link from "next/link";
import React from "react";
import { Products } from ".prisma/client";
import { NextPage } from "next";

type Props = {
  products: Products[];
};

export const ProductItem: NextPage<Props> = ({ products }) => {
  console.log(products);
  return (
    <>
      {typeof products !== "string"
        ? products?.map((product) => (
            <div key={product.id} className="group relative">
              <div className=" min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={
                    product.image ? product.image : "/images/no-thumbnail.png"
                  }
                  alt={product.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 justify-between flex flex-row">
                <div className=" basis-3/4">
                  <h3 className="text-sm text-gray-900">
                    <Link
                      href={`products/detail/${product.id}`}
                      className={"font-sans	ui-sans-serif, system-ui font-bold"}
                    >
                      <span aria-hidden="true" className="absolute inset-0  " />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.summary.slice(0, 50)}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900 basis-1/4 text-right">
                  $ {product.price ? product.price.toLocaleString("en-US") : 0}
                </p>
              </div>
            </div>
          ))
        : products}
    </>
  );
};
