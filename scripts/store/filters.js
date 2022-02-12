const filters = {
  category: "",
  sorting: "dateCreated",
  order: "desc",
  limit: 12,
  page: 1,
  lastPage: 1,
};

export function resetFilters(filters) {
  filters.category = "";
  filters.sorting = "dateCreated";
  filters.order = "desc";
  filters.limit = 12;
  filters.page = 1;
  filters.lastPage = 1;
}

export function constructParams(filters) {
  const category = filters.category ? "category=" + filters.category : "";

  const sorting = filters.sorting
    ? "&_sort=" + filters.sorting + "&_order=" + filters.order
    : "";

  const page = "&_page=" + filters.page;
  const limit = "&_limit=" + filters.limit;

  return `${category}${sorting}${page}${limit}`;
}

export default filters;
