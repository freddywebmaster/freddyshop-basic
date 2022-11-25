import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useQuery } from "../hooks/useQuery";
import { getAllCategories } from "../services/querys";
import { categoriesState } from "../store/categories";
import { searchState } from "../store/search";
import Search from "./Search";

const Navbar = () => {
  const router = useRouter();

  const [search, setSearch] = useRecoilState(searchState);

  const { data, isLoading } = useQuery(getAllCategories, categoriesState);

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a
          onClick={() => router.push("/")}
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl">FreddyShop</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {isLoading ? (
            <p>Cargando categorias...</p>
          ) : data.length !== 0 ? (
            data.map((category) => (
              <a
                onClick={() => {
                  router.push(`/categories/${category.id}`);
                  setSearch("");
                }}
                key={category.id}
                className="mr-5 hover:text-gray-900"
              >
                {category.name}
              </a>
            ))
          ) : (
            <p>Sin categorias</p>
          )}
        </nav>
        <Search />
      </div>
    </header>
  );
};

export default Navbar;
