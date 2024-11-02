import { createContext, useContext, useState } from "react";

const UseContext = createContext();

const CIDProvider = ({ children }) => {
  const [CID, setCID] = useState("");
  return (
    <UseContext.Provider value={[CID, setCID]}>{children}</UseContext.Provider>
  );
};
const useCID = () => {
  return useContext(UseContext);
};
export { CIDProvider, useCID };
