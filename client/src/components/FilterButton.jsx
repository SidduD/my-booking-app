import { useSearchParams } from "react-router-dom";

function FilterButton({ children, filterField, click }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get("country") || "all";

  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }
  return (
    <button
      onClick={() => handleClick(click)}
      className={`border-none px-3 py-1.5 transition-all duration-300 rounded-md hover:bg-blue-600 hover:text-blue-50 ${
        currentFilter === click ? "bg-blue-600 text-white" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default FilterButton;
