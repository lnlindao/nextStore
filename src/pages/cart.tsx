import { useContext, useMemo, useState } from "react";
import { Layout } from "src/components/Layout";
import { CartItem } from "src/interfaces/Cart";
import { Store } from "src/reducer/Store";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Cart() {
  const { state, dispatch } = useContext(Store);
  const { cartItems } = state.cart;

  const subtotal: number = useMemo(() => {
    const result = cartItems.reduce(
      (a: number, b: CartItem) => a + b.quantity * b.price,
      0
    );
    return result;
  }, [cartItems]);
  const taxes: number = useMemo(() => {
    const result = subtotal * 0.12;
    return result;
  }, [subtotal]);
  const total = useMemo(() => {
    const result = subtotal + taxes;
    return result;
  }, [taxes]);

  console.log("cart state", cartItems);
  console.log("subtotal", subtotal);

  const deleteHandler = (item: CartItem) => {
    dispatch({ type: "REMOVE_ITEM_FROM_CART", payload: item.id });
  };

  return (
    <Layout>
      <section className="flex flex-col items-center max-w-screen-2xl prose dark:prose-invert">
        <h1>Carrito</h1>
        <div className="my-11 flex flex-col w-full items-center">
          {cartItems.length === 0 ? (
            <>
              <div>No hay productos en el carrito</div>
              <Link
                className="mt-6 flex w-fit items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 no-underline"
                href={"/store"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
                Regresar a la tienda
              </Link>
            </>
          ) : (
            <>
              <table className="table-auto text-center">
                <thead className="table-header-group bg-slate-100 border">
                  <tr>
                    <th></th>
                    <th className="py-3">PRODUCTO</th>
                    <th className="py-3">PRECIO</th>
                    <th className="py-3">CANTIDAD</th>
                    <th className="py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item: CartItem) => (
                    <tr>
                      <td>
                        {item.image ? (
                          item.image
                        ) : (
                          <img
                            className="w-20 m-0"
                            src="/images/no-thumbnail.png"
                          />
                        )}
                      </td>
                      <td className="align-middle ">{item.name}</td>
                      <td className="align-middle">
                        {item?.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </td>
                      <td className="align-middle content-center">
                        {item.quantity}
                      </td>
                      <td className="align-middle content-center">
                        <button onClick={() => deleteHandler(item)}>
                          <XMarkIcon className=" rounded-3xl w-6 hover:text-white hover:bg-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between w-full mt-8 md:flex-row sm:flex-col">
                <div>
                  <Link
                    className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 py-3 px-8 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 no-underline"
                    href={"/store"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      />
                    </svg>
                    Regresar a la tienda
                  </Link>
                </div>
                <div className=" border border-gray-200 p-7 bg-slate-100">
                  <div className="table-header-group ">
                    <div className="table-row">
                      <div className="table-cell text-left w-64 font-semibold py-5">
                        Subtotal
                      </div>
                      <div className="table-cell text-left  w-28  text-right">
                        {subtotal.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="table-row-group">
                    <div className="table-row">
                      <div className="table-cell font-semibold pb-5">
                        Impuestos
                      </div>
                      <div className="table-cell  text-right">
                        {taxes.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </div>
                    </div>
                    <div className="table-row">
                      <div className="table-cell font-semibold">Total</div>
                      <div className="table-cell text-right">
                        {total.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </div>
                    </div>
                  </div>
                  <Link
                    className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 no-underline"
                    href={"/store"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    Finalizar compra
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
