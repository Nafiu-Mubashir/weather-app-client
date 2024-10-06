import { useContext } from "react";

import { AuthContext } from "..";

export const useCtxt = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
