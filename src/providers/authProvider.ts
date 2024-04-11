import { AuthBindings } from "@refinedev/core";

export const TOKEN_KEY = "refine-auth";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    if (email && password) {
      const username = email;
      const response = await fetch(`${BASE_URL}/SignIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem(TOKEN_KEY, token);
        return {
          success: true,
          redirectTo: "/",
        };
      }
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid email or password",
      },
    };
  },
  register: async ({ email, password }) => {
  if (email && password) {
      const username = email;
    const response = await fetch(`${BASE_URL}/SignUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem(TOKEN_KEY, token);
      return {
        success: true,
        redirectTo: "/",
      };
    }
  }

  return {
    success: false,
    error: {
      name: "SignupError",
      message: "Invalid email or password",
    },
  };
},
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
