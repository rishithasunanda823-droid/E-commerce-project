function SearchBar({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control form-control-lg"
        placeholder="🔍 Search products..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(
            e.target.value
          )
        }
      />
    </div>
  );
}

export default SearchBar;