const SortRepos = ({ onSort, sortType }) => {
  const BUTTONS = [
    { type: "recent", text: "Most Recent" },
    { type: "stars", text: "Most Stars" },
    { type: "forks", text: "Most Forks" },
  ];
  return (
    <div className="mb-2 flex justify-center lg:justify-end">
      {BUTTONS.map((button) => (
        <button
          type="button"
          className={`py-2.5 px-5 me-2 mb-2 text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass
          ${sortType === button.type ? "border-blue-500 text-white" : ""}`}
          onClick={() => onSort(button.type)}
        >
          {button.text}
        </button>
      ))}

      {/* <button
        type="button"
        className={`py-2.5 px-5 me-2 mb-2 text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass
          ${sortType === "recent" ? "border-blue-500 text-white" : ""}`}
        onClick={() => onSort("recent")}
      >
        Most Recent
      </button>
      <button
        type="button"
        className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass
          ${sortType === "stars" ? "border-blue-500 text-white" : ""}`}
        onClick={() => onSort("stars")}
      >
        Most Stars
      </button>
      <button
        type="button"
        className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass
          ${sortType === "forks" ? "border-blue-500 text-white" : ""}`}
        onClick={() => onSort("forks")}
      >
        Most Forks
      </button> */}
    </div>
  );
};

export default SortRepos;
