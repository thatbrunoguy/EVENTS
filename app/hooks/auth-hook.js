import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import authServices from "../services";
import { Login, Register } from "../types";

// const useAllPosts = () => {
//   return useQuery(["posts"], authServices.getAllPosts());
// };

// const usePostById = () => {
//   return useQuery(["posts"], authServices.getByPostId());
// };

// const useLogin = () => {
//   return useMutation(
//     (data:Login) => {
//       return authServices.authServiceInstance.login(data);
//     },
//     {
//       onSuccess: () => {
//         // queryClient.invalidateQueries("login");
//       },
//     }
//   );
// };
const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      return authServices.authServiceInstance.register(data);
    },
    {
      onSuccess: () => {
        // queryClient.invalidateQueries("login");
      },
    }
  );
};

// const useRegister = useMutation({
//   mutationFn: (data: Register) => {
//     return authServices.authServiceInstance.register(data);
//   },
//   onSuccess: async () => {
//     console.log("Successfully done!");
//   },
// });

// const useUpdatePost = () => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     () => {
//       return authServices.updatePost();
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries("posts");
//       },
//     }
//   );
// };

// const useDeletePost = () => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     () => {
//       return authServices.deletePost();
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries("posts");
//       },
//     }
//   );
// };

export {
  //   useCreatePost,
  //   useUpdatePost,
  //   usePostById,
  //   useAllPosts,
  //   useDeletePost,
  useRegister,
};
