"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SigninValidation} from "@/lib/validation";
import { Loader } from "@/components/shared";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  useSignInAccount,
} from "@/lib/react-query/queries";
import { useUserContext } from "@/context/useUserContext";
// import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  // Queries

  const { mutateAsync: signInAccount, isPending: isSigningInUser } =
    useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      

      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session) {
        return toast({
          title: "Something went wrong. Please login your new account",
        });
      }

      
      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again.", });
        
        return;
      }


    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <div className="flex-col sm:w-420 flex-center ">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="pt-5 h3-bold md:h2-bold sm:pt-8 ">
        Log in to your account
        </h2>
        <p className="mt-2 text-light-3 small-medium md:base-regular">
          To use snapgram, Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-5 mt-4"
        >
          

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            { isUserLoading || isSigningInUser  ? (
              <div className="gap-2 flex-center">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
          <p className="mt-2 text-center text-small-regular text-light-2">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="ml-1 text-primary-500 text-small-semibold">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
