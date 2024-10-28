import { supabase } from "../config/supabase";
import { Database } from "../types/database.types";

type Post = Database["public"]["Tables"]["posts"]["Row"];

export const getPublishedPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }

  return data || [];
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // no rows found
      return null;
    }
    throw new Error(`Error fetching post: ${error.message}`);
  }

  return data;
};

export const createPost = async (postData: {
  title: string;
  slug: string;
  description: string;
  content: string;
  status: "draft" | "published";
}): Promise<Post> => {
  const { data, error } = await supabase
    .from("posts")
    .insert(postData)
    .select()
    .single();

  if (error) {
    throw new Error(`Error creating post: ${error.message}`);
  }

  if (!data) {
    throw new Error("No data returned from insert operation");
  }

  return data;
};

export const updatePost = async (
  slug: string,
  postData: Partial<{
    title: string;
    slug: string;
    description: string;
    content: string;
    status: "draft" | "published";
  }>
): Promise<Post> => {
  const { data, error } = await supabase
    .from("posts")
    .update(postData)
    .eq("slug", slug)
    .select()
    .single();

  if (error) {
    throw new Error(`Error updating post: ${error.message}`);
  }

  if (!data) {
    throw new Error("No data returned from update operation");
  }

  return data;
};

export const deletePost = async (slug: string): Promise<void> => {
  const { error } = await supabase.from("posts").delete().eq("slug", slug);

  if (error) {
    throw new Error(`Error deleting post: ${error.message}`);
  }
};

// İhtiyaç duyulursa tek bir obje olarak da export edebiliriz
export const postService = {
  getPublishedPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
};
