export type CreateCommentRequest = {
  author_name: string;
  content: string;
}

export type UpdateCommentRequest = {
  author_name?: string;
  content?: string;
}

export type CommentResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
}
