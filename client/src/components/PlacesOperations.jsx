import Filter from "./Filter";
import SortBy from "./SortBy";

function PlacesOperations() {
  return (
    <div className="flex items-center justify-center grow gap-4">
      <Filter
        filterField="country"
        options={[
          { value: "all", label: "All" },
          { value: "canada", label: "Canada" },
          { value: "usa", label: "USA" },
        ]}
      />

      <SortBy
        options={[
          { value: "title-asc", label: "Sort by name (A-Z)" },
          { value: "title-desc", label: "Sort by name (Z-A)" },
          { value: "price-asc", label: "Price (low first)" },
          { value: "price-desc", label: "Price (high first)" },
        ]}
      />
    </div>
  );
}

export default PlacesOperations;
