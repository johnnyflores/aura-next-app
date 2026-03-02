export const login = (username: string, password: string) => {
  // In a real app, you would call your backend
  if (
    typeof window !== "undefined" &&
    username === "demo" &&
    password === "demo"
  ) {
    localStorage.setItem("token", "mock-jwt-token");
    return true;
  }
  return false;
};

export const logout = () => {
  if (typeof window !== "undefined") localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
};
