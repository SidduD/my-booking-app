import FilterButton from "./FilterButton";

function Filter({ filterField, options }) {
  return (
    <div className="border rounded-md shadow py-2 px-4 flex gap-3">
      {options.map((option, i) => (
        <FilterButton key={i} filterField={filterField} click={option.value}>
          {option.label}
        </FilterButton>
      ))}
    </div>
  );
}

export default Filter;
