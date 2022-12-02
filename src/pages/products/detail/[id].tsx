import React, { useContext, useState } from "react";
import { StarIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { Layout } from "src/components/Layout";
import { Products } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { Store } from "src/reducer/Store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  product: Products;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  const product = await res.json();
  return {
    props: { product },
  };
};

const ProductDetail: NextPage<Props> = ({ product }) => {
  const { state, dispatch } = useContext(Store);
  const [selectedColor, setSelectedColor] = useState();
  const router = useRouter();

  const addToCartHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("product to add", product);
    dispatch({
      type: "ADD_ITEM_TO_CART",
      payload: { ...product, quantity: 1 },
    });

    toast.info(`Producto añadido al carrito`, {
      theme: "colored",
      //onClose: () => router.push("/cart"),
    });
  };

  console.log("product", product);

  return (
    <Layout>
      {typeof product !== "string" ? (
        <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
          <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
            <img
              src={product?.image ? product.image : "/images/no-thumbnail.png"}
              alt={product.name}
              className="object-cover object-center"
            />
          </div>
          <div className="sm:col-span-8 lg:col-span-7">
            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
              {product.name}
            </h2>

            <section aria-labelledby="information-heading" className="mt-2">
              <h3 id="information-heading" className="sr-only">
                Product information
              </h3>

              <p className="text-2xl text-gray-900">
                {product.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h4 className="sr-only">Reviews</h4>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                  <a
                    href="#"
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  ></a>
                </div>
              </div>
            </section>

            <section aria-labelledby="options-heading" className="mt-10">
              <h3 id="options-heading" className="sr-only">
                Product options
              </h3>

              <form>
                {/* Colors */}
                {product.variations[0]?.variation.optionName === "Color" && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Color</h4>

                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a color
                      </RadioGroup.Label>
                      <span className="flex items-center space-x-3">
                        {product.variations[0]?.variation.optionName === "Color"
                          ? product.variations[0].map((color) => (
                              <RadioGroup.Option
                                key={color.variation.name}
                                value={color}
                                className={({ active, checked }) =>
                                  classNames(
                                    color.selectedClass,
                                    active && checked
                                      ? "ring ring-offset-1"
                                      : "",
                                    !active && checked ? "ring-2" : "",
                                    "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                                  )
                                }
                              >
                                <RadioGroup.Label as="span" className="sr-only">
                                  {color.name}
                                </RadioGroup.Label>
                                <span
                                  aria-hidden="true"
                                  className={classNames(
                                    color.class,
                                    "h-8 w-8 border border-black border-opacity-10 rounded-full"
                                  )}
                                />
                              </RadioGroup.Option>
                            ))
                          : ""}
                      </span>
                    </RadioGroup>
                  </div>
                )}

                <button
                  type="submit"
                  className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={(e) => {
                    addToCartHandler(e);
                  }}
                >
                  Añadir al carrito
                </button>
                <ToastContainer autoClose={300} />
              </form>
            </section>
          </div>
        </div>
      ) : (
        <div className="container pt-6 mx-auto">
          No se han encontrado resultados
        </div>
      )}

      {/** OTRO TIPO */}
    </Layout>
  );
};
export default ProductDetail;
