/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/NavBar";
import { getProduct } from "../../services/querys";

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(false);

  const [product, setProduct] = useState({});

  const initFetch = async () => {
    setIsLoading(true);
    const res = await getProduct(id);

    setProduct(res);

    setIsLoading(false);
  };

  useEffect(() => {
    if (!id) return;
    initFetch();
  }, [id]);
  return (
    <div>
      <Navbar />
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <p>Cargando producto...</p>
        </div>
      ) : Object.keys(product).length !== 0 ? (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={
                  product.images.length !== 0
                    ? product.images[0]
                    : "https://dummyimage.com/400x400"
                }
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {product.category.name}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product.title}
                </h1>

                <p className="leading-relaxed">{product.description}</p>

                <div className="flex mt-5">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    Q {product.price}
                  </span>
                  <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    Comprar
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p>Ops.. este producto no existe o fue eliminado</p>
      )}
    </div>
  );
};

export default ProductPage;
