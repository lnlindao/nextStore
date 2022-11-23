import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { Fragment } from "react";
import { Product } from "src/interfaces/Product";

interface Props {
  products: Product[];
}

export default function ListProducts({ products = [] }: Props) {
  return (
    <Fragment>
      <div className={"container"}>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.length > 0
            ? products.map((product) => (
                <div key={product.id} className="group relative">
                  <div className=" min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <img
                      src={
                        product.image
                          ? product.image
                          : "/images/no-thumbnail.png"
                      }
                      alt={product.name}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 justify-between flex flex-row">
                    <div className=" basis-3/4">
                      <h3 className="text-sm text-gray-900">
                        <Link
                          href={`products/edit/${product.id}`}
                          className={
                            "font-sans	ui-sans-serif, system-ui font-bold"
                          }
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0  "
                          />
                          {product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.summary.slice(0, 50)}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900 basis-1/4 text-right">
                      ${" "}
                      {product.price
                        ? product.price.toLocaleString("en-US")
                        : 0}
                    </p>
                  </div>
                </div>
              ))
            : "No hay productos aùn"}
        </div>
      </div>
    </Fragment>
  );
}
