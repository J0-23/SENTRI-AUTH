import { useRouter } from "next/navigation";
import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  Children,
} from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Nova_Slim } from "next/font/google";

const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:8000";

  const router = useRouter();

  const [user, setUser] = useState({});
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // register user
  const registerUser = async (e) => {
    e.preventDefault();
    if (
      !userState.email.includes("@") ||
      !userState.password ||
      userState.password.length < 6
    ) {
      toast.error("Please enter a valid email and password (min 6 characters");
      return;
    }

    try {
      const res = await axios.post(`${serverUrl}/api/v1/register`, userState);
      console.log("User registered successfully", res.data);
      toast.success("User registered successfully");

      // clear the form
      setUserState({
        name: "",
        email: "",
        password: "",
      });

      // redirect user to login page
      router.push("/login");
    } catch (error) {
      console.log("Error registering user", error);
      toast.error(error.response.data.message);
    }
  };

  // login user
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/login`,
        {
          email: userState.email,
          password: userState.password,
        },
        {
          withCredentials: true, // send cookies to server
        }
      );

      toast.success("User logged in successfully");

      // clear the form
      setUserState({
        email: "",
        password: "",
      });

      // push user to dashboard / main page
      router.push("/");
    } catch (error) {
      console.log("Error logging in user", error);
      toast.error(error.response.data.message);
    }
  };

  // get user logged in status
  const userLoginStatus = async () => {
    let loggedIn = false;
    try {
      const res = await axios.get(`${serverUrl}/api/v1/login-status`, {
        withCredentials: true, // send cookies to server
      });

      // coarce the string to boolean
      loggedIn = !!res.data;

      if (!loggedIn) {
        router.push("/login");
      }
    } catch (error) {
      console.log("Error getting user login status", error);
    }

    return loggedIn;
  };

  // logout user
  const logoutUser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/v1/logout`, {
        withCredentials: true, // send cookies to server
      });

      toast.success("User logged out successfully");

      // push user to login page
      router.push("/login");
    } catch (error) {
      console.log("Error logging out user", error);
      toast.error(error.response.data.message);
    }
  };

  // get user details
  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/v1/user`, {
        withCredentials: true, // send cookies to the server
      });

      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });

      setLoading(false);
    } catch (error) {
      console.log("Error getting user details", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  // update user details
  const updateUser = async (e, data) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.patch(`${serverUrl}/api/v1/user`, data, {
        withCredentials: true, // send cookies to server
      });

      // update user state
      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });

      toast.success("User updated successfully");

      setLoading(false);
    } catch (error) {
      console.log("Error updating user details", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  // dynamic form handler
  const handleUserInput = (name) => (e) => {
    const value = e.target.value;

    setUserState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const loginStatusGetUser = async () => {
      const isLoggedIn = await userLoginStatus();

      if (isLoggedIn) {
        getUser();
      }
    };

    loginStatusGetUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        registerUser,
        userState,
        handleUserInput,
        loginUser,
        logoutUser,
        userLoginStatus,
        user,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
