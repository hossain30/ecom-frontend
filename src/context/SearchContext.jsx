import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [values, setValues] = useState({
    keywords: "",
    result: [],
  });
  return (
    <SearchContext.Provider value={[values, setValues]}>
      {children}
    </SearchContext.Provider>
  );
};
const useSearch = () => {
  return useContext(SearchContext);
};
export { SearchProvider, useSearch };
