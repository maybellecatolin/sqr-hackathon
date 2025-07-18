// libs/useApi.ts
import { useCallback } from "react";
import { api } from "../libs/api";

export const useApi = () => {
  const get = useCallback(async (path: string) => {
    return await api.get(path);
  }, []);

  const post = useCallback(async (path: string, body: unknown) => {
    return await api.post(path, body);
  }, []);

  return { get, post };
};
