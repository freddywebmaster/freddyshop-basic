/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Navbar from "../../components/NavBar";
import { useQuery } from "../../hooks/useQuery";
import { getAllProducts } from "../../services/querys";
import { productsState } from "../../store/products";
import { resultsState } from "../../store/results";
import { searchState } from "../../store/search";

const ResultsPage = () => {
  const router = useRouter();
  const [results, setResults] = useRecoilState(resultsState);
  const [search, setSearch] = useRecoilState(searchState);

  const { isLoading, data } = useQuery(getAllProducts, productsState);

  const filterProducts = () => {
    if (data.length === 0 || results === "") return [];

    const list = data.filter(
      (p) =>
        p.title.toLowerCase().includes(results) ||
        p.description.toLowerCase().includes(results)
    );
    return list;
  };

  return (
    <div>
      <Navbar />

      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {isLoading ? (
            <p>Cargando productos...</p>
          ) : filterProducts().length !== 0 ? (
            filterProducts().map((product) => (
              <div
                onClick={() => {
                  router.push(`/product/${product.id}`);
                  setSearch("");
                }}
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
            <p>Sin Datos, busca otro producto</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
