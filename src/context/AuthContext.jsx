import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  logActivity,
} from "../utils/activityLogger";

const AuthContext =
  createContext();

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  useEffect(() => {
    const savedUser =
      JSON.parse(
        localStorage.getItem(
          "currentUser"
        )
      );

    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

const register = (
  name,
  email,
  password
) => {
  const users =
    JSON.parse(
      localStorage.getItem("users")
    ) || [];

  const exists = users.find(
    (u) => u.email === email
  );

  if (exists) {
    return {
      success: false,
      message:
        "Email already exists",
    };
  }

const newUser = {
  id: Date.now(),

  name,

  email,

  password,

  role: "user",

  blocked: false,

  phone: "",

  address: "",

  createdAt:
    new Date().toISOString(),
};

  users.push(newUser);

logActivity(
  "Registered New Account",
  email
);

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  return {
    success: true,
  };
};

  const login = (
    email,
    password
  ) => {
    const users =
      JSON.parse(
        localStorage.getItem(
          "users"
        )
      ) || [];

    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (!user) {
  return {
    success: false,
    message:
      "Invalid credentials",
  };
}

if (user.blocked) {
  return {
    success: false,
    message:
      "Your account has been blocked",
  };
}

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    setUser(user);

  logActivity(
  "Logged In",
  email
);

    return {
      success: true,
    };
  };

  const logout = () => {

if (user) {

  logActivity(
    "Logged Out",
    user.email
  );

}

    localStorage.removeItem(
      "currentUser"
    );

    setUser(null);

    window.location.href =
      "/login";
  };

const updateUser = (
  updatedUser
) => {

logActivity(
  "Updated Profile",
  updatedUser.email
);

  setUser(updatedUser);

  localStorage.setItem(
    "currentUser",
    JSON.stringify(updatedUser)
  );
};
  return (
    <AuthContext.Provider 
    value={{
      user,
      register,
      login,
      logout,
      updateUser,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () =>
  useContext(AuthContext);