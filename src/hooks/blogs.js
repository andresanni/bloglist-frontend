import blogService from "../services/blogs";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

const useFetchBlogs = () => {
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  return result;
};

const useBlogMutation = (mutationFn) => {
  const queryClient = useQueryClient();

  const blogMutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
  return blogMutation;
};

const useCreateBlog = () => {
  return useBlogMutation(blogService.createBlogPost);
};

const useUpdateBlog = () => {
  return useBlogMutation(blogService.updateBlogPost);
};

const useDeleteBlog = () => {
  return useBlogMutation(blogService.deleteBlogPost);
};

export { useFetchBlogs, useCreateBlog, useUpdateBlog, useDeleteBlog };
