import { useState, createContext, useContext, useEffect, use } from "react";

const StoreContext = createContext<TStoreContext>({} as TStoreContext);

function Store({ children }: TStore) {
  const [metaTitle, setMetaTitle] = useState("TappTask Home");
  const [userDetails, setUserDetails] = useState({} as any);
  const [todos, setTodos] = useState([] as any);

  return (
    <StoreContext.Provider
      value={{
        metaTitle,
        setMetaTitle,
        userDetails,
        setUserDetails,
        todos,
        setTodos,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export default Store;
export const useStore = () => useContext(StoreContext);

type TStore = {
  children: React.ReactNode;
};
type TStoreContext = {
  metaTitle: string;
  setMetaTitle: (title: string) => void;
  userDetails: any;
  setUserDetails: (userDetails: any) => void;
  todos: any;
  setTodos: (todos: any) => void;
};
