import { useContext } from "react";
import { AuthContext } from "./AuthContext";


export const useUserContext = () => useContext(AuthContext);