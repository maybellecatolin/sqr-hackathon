// libs/api.ts
export const createApiClient = (baseUrl: string) => {
  return {
    get: async (path: string) => {
      const res = await fetch(`${baseUrl}${path}`);
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    post: async (path: string, body: unknown) => {
      const res = await fetch(`${baseUrl}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
  };
};

export const api = createApiClient("http://localhost:3000");
