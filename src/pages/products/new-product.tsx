import { ServerIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Layout } from "src/components/Layout";
import { Product } from "../../interfaces/Product";
import Swal from "sweetalert2";

export default function NewProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState({
    name: "",
    summary: "",
    price: 0,
    image: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log("product", e.target.name);
    setProduct({ ...product, [e.target.name]: e.target.value });

    console.log(product);
  };

  const createProduct = async (product: Product) => {
    console.log("product creado", product);
    await fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const updateProduct = async (id: string, product: Product) => {
    await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  //CREAR O ACTUALIZAR PRODUCTO
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof id === "string") {
        Swal.fire({
          title: "¿Deseas guardar los cambios?",
          showCancelButton: true,
          confirmButtonText: "Guardar",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            updateProduct(id, product);
            Swal.fire("Guardado!", "", "success");
          }
        });
      } else {
        await createProduct(product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //CARGAR PRODUCTO SI YA EXISTE
  const loadProductData = async (id: string) => {
    const query = await fetch(`http://localhost:3000/api/products/${id}`);
    const result = await query.json();
    setProduct({
      name: result.name,
      summary: result.summary,
      price: result.price,
      image: result.image,
    });
    console.log("producto", product);
  };

  useEffect(() => {
    if (typeof id === "string") {
      //console.log("id", id);
      loadProductData(id);
    }
  }, [id]);

  return (
    <Layout>
      <section className="container py-8">
        <h1>Nuevo producto</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
          <div className="col-span-3 sm:col-span-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              value={product.name}
              type="text"
              placeholder="Ingresa el nombre del producto"
              name="name"
              id="first-name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-3 sm:col-span-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Precio
            </label>
            <input
              value={product.price}
              type="text"
              placeholder="Ingresa el precio"
              name="price"
              id="price"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-3 sm:col-span-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Imagen
            </label>
            <input
              value={product.image}
              type="text"
              placeholder="Ingresa el nombre del producto"
              name="image"
              id="image"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-3 sm:col-span-3">
            <label
              htmlFor="summary"
              className="block text-sm font-medium text-gray-700"
            >
              Descipción
            </label>
            <textarea
              value={product.summary}
              placeholder="Ingresa la descipción del producto"
              rows={5}
              name="summary"
              id="summary"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={handleChange}
            />
          </div>
          <div className="bg-gray-50 ">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <ServerIcon className="h-6 w-6 text-white py-1" />
              Guardar
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
}
