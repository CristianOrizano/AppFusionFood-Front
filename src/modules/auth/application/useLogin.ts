/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginRequest, LoginResponse } from "../domain";
import { LoginRepository } from "../infraestructure";
import { UseMutationResult, useMutation } from "@tanstack/react-query";

const useLogin = (): UseMutationResult<LoginResponse, Error, LoginRequest> => {
  const response = useMutation({
    mutationFn: async (login: LoginRequest) =>
      await LoginRepository.login(login),
    onError: (error: Error) => {
      if ((error as any).response !== undefined) {
        console.log("error", (error as any).response.data.Message);
        // toastWarning((error as any).response.data.Message);
      } else {
        console.log("error", error.message);
      }
    },
  });
  return response;
};

export default useLogin;
