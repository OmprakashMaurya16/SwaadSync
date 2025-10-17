// auth.js
export const saveUserData = (user, token) => {
  try {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

export const getUserData = () => {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return { user, token };
  } catch (error) {
    console.error("Error reading user data:", error);
    return { user: null, token: null };
  }
};

export const logout = () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Error clearing user data:", error);
  }
};

export const isAuthenticated = () => {
  const { token } = getUserData();
  return !!token;
};