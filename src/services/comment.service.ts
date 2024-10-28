import { supabase } from "../config/supabase";
import type { Database } from "../types/database.types";

type Comment = Database["public"]["Tables"]["comments"]["Row"];
type CommentInsert = Database["public"]["Tables"]["comments"]["Insert"];

export const getCommentsByPostId = async (
  postId: string
): Promise<Comment[]> => {
  const { data, error } = await supabase
    .from("comments")
    .select()
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Error fetching comments: ${error.message}`);
  }

  return data || [];
};

export const createComment = async (
  commentData: CommentInsert
): Promise<Comment> => {
  console.log("Creating comment with data:", commentData);
  const { data, error } = await supabase
    .from("comments")
    .insert(commentData)
    .select()
    .single();

  if (error) {
    throw new Error(`Error creating comment: ${error.message}`);
  }

  if (!data) {
    throw new Error("No data returned from insert operation");
  }

  return data;
};
