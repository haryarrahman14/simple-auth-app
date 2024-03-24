import client from "./client";

export const postLogout = () => {
  return client.post("/api/logout");
};
