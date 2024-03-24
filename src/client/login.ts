import client from "./client";

export const postLogin = () => {
  return client.post("/api/login");
};
