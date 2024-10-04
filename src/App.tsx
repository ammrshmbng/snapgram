import { Routes, Route } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import { Toaster } from "./components/ui/toaster";
import { CreatePost, EditPost, Explore, Home, PostDetails, Profile, UpdateProfile } from "./_root/pages";

function App() {
  return (
    <main className="flex h-screen ">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />

        </Route>
      </Routes>

      <Toaster />
    </main>
  );
}

export default App;
