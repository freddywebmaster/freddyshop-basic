/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { BiSearchAlt } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { useQuery } from "../hooks/useQuery";
import { getAllProducts } from "../services/querys";
import { productsState } from "../store/products";
import { resultsState } from "../store/results";
import { searchState } from "../store/search";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useRecoilState(searchState);
  const [_, setResults] = useRecoilState(resultsState);

  const goToProduct = (id) => {
    setSearch("");
    router.push(`/product/${id}`);
  };

  const { isLoading, data } = useQuery(getAllProducts, productsState);

  const filterProducts = () => {
    if (data.length === 0 || search === "") return;

    const list = data.filter(
      (p) =>
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
    );
    return list;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSearch("");
    router.push("/results");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-5 ">
      <form
        onSubmit={onSubmit}
        className="flex items-center relative justify-between gap-3 border border-blue-500 p-2 rounded lg:w-1/3"
      >
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
            setResults(e.target.value.toLowerCase());
          }}
          className="outline-none w-full"
          type="search"
        />
        <button className="bg-blue-500 text-white text-2xl p-3 rounded">
          <BiSearchAlt />
        </button>
        {!isLoading && search !== "" && router.pathname !== "/results" && (
          <div className="absolute -bottom-[300px] flex flex-col gap-4 bg-gray-300 z-40 p-3 font-bold w-full left-0 max-h-[300px] min-h-[300px] overflow-scroll">
            {filterProducts().map((product) => {
              return (
                <div
                  onClick={() => goToProduct(product.id)}
                  className="flex items-center gap-4 cursor-pointer"
                  key={product.id}
                >
                  <img
                    className="rounded"
                    width={50}
                    height={100}
                    src={
                      product.images.length !== 0
                        ? product.images[0]
                        : "https://dummyimage.com/425x265"
                    }
                    alt={product.title}
                  />
                  <p>{product.title}</p>
                </div>
              );
            })}
          </div>
        )}
      </form>
    </div>
  );
};

export default Search;
