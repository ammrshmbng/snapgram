import { INITIAL_USER } from "@/constants";
import { getCurrentUser } from "@/lib/api";
import { IContextType, IUser } from "@/types";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount && currentAccount.id) {
        setUser({
          id: currentAccount.id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          profilePictureUrl: currentAccount.profilePictureUrl,
          bio: currentAccount.bio,
          phoneNumber: currentAccount.phoneNumber,
        });
        setIsAuthenticated(true);

        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    const token = localStorage.getItem('token');

    if (!token) {
      return navigate('/sign-in');
    }
    checkAuthUser();
  },[]);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
export  {AuthContext} ;
