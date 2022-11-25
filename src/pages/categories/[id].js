/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/NavBar";
import { useInfiniteLoader } from "../../hooks/useInfiniteLoader";
import { getProductsByCategory } from "../../services/querys";

const CategoriesPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);

  const { getMore, isEnd, list } = useInfiniteLoader(products, 12);

  const initFetch = async () => {
    setIsLoading(true);
    const res = await getProductsByCategory(id);

    setProducts(res);

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
      ) : list.length !== 0 ? (
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {list.map((product) => (
              <div
                onClick={() => router.push(`/product/${product.id}`)}
                key={product.id}
                className="lg:w-1/4 md:w-1/2 p-4 w-full"
              >
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={
                      product.images.length !== 0
                        ? product.images[0]
                        : "https://dummyimage.com/425x265"
                    }
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {product.category.name}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {product.title}
                  </h2>
                  <p className="mt-1">Q {product.price}</p>
                </div>
              </div>
            ))}
          </div>
          {!isEnd && (
            <div className="mb-6 mt-6 flex items-center justify-center">
              <button
                className="bg-blue-500 text-white px-4 py-2 font-bold rounded"
                onClick={() => getMore()}
              >
                Cargar mas...
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="min-h-[70vh] flex items-center justify-center">
          <p>Ops.. no hay productos con esta categoria</p>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
