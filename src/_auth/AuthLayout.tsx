import { Outlet, Navigate } from "react-router-dom";


const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (<Navigate to="/sign-in" />)
      :(
        <section className="flex flex-col items-center justify-center flex-1 py-10 bdr">
          <Outlet />
        </section>
      )  
    }
    </>
  )
}

export default AuthLayout