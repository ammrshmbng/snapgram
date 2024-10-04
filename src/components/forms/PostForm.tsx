"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useNavigate } from "react-router-dom";
import { PostValidation } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";
import { FileUploader, Loader } from "../shared";
import { PostElement } from "@/types";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queries";

type PostFormProps = {
  post?: PostElement;
  action: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
  const { toast } = useToast();
  // Query
  const { mutateAsync: createPost, isPending: isLoadingCreate } =  useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();


  

  const navigate = useNavigate();
  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post?.caption || "",
      file: [],
    },
  });

  // Watch the value of imageUrl

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    try {

        // ACTION = UPDATE
    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...values,
        postId: post.id,
        imageUrl: post.imageUrl,
      });

      
      if (!updatedPost) {
        toast({
          title: `${action} post failed. Please try again.`,
        });
      }


      return navigate(`/posts/${post.id}`);
    }

      const newPost = await createPost({
        ...values,
      });

      if (!newPost) {
        toast({
          title: `${action} post failed. Please try again.`,
        });
      }


      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-5xl gap-9"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Caption</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl || ""}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {(isLoadingCreate || isLoadingUpdate) && <Loader />}
            {action}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
