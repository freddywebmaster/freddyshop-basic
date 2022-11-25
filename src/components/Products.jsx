/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useInfiniteLoader } from "../hooks/useInfiniteLoader";
import { useQuery } from "../hooks/useQuery";
import { getAllProducts } from "../services/querys";
import { productsState } from "../store/products";

const Products = () => {
  const router = useRouter();
  const { isLoading, data } = useQuery(getAllProducts, productsState);
  const { getMore, isEnd, list } = useInfiniteLoader(data, 12);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {isLoading ? (
            <p>Cargando productos...</p>
          ) : list.length !== 0 ? (
            list.map((product) => (
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
            ))
          ) : (
            <p>Sin categorias</p>
          )}
        </div>
      </div>

      {!isEnd && (
        <div className="mb-6 flex items-center justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 font-bold rounded"
            onClick={() => getMore()}
          >
            Cargar mas...
          </button>
        </div>
      )}
    </section>
  );
};

export default Products;
