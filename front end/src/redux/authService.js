import axios from "axios";

let BASE_AUTH_URL = "http://localhost:8081/auth";
let BASE_APPLICATION_URL = "http://localhost:8080/todo";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_AUTH_URL}/register`, {
      email: userData.email,
      username: userData.username,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      mfaEnabled: userData.mfaEnabled,
      application: "Just Do",
    });
    await createApplicationAccount({
      id: response.data.user.userId,
      username: userData.username,
      name: response.data.firstName + response.data.lastName,
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const createApplicationAccount = async (userData) => {
  await axios.post(`${BASE_APPLICATION_URL}/create`, {
    id: userData.id,
    username: userData.username,
    name: userData.name,
  });
};

export const loginToAccount = async (userData) => {
  try {
    const response = await axios.post(`${BASE_AUTH_URL}/login`, {
      username: userData.username,
      password: userData.password,
      application: "Just Do",
    });
    const jwt_token = response.data["jwt"];
    let mfaEnabled = false;
    if (jwt_token === "") mfaEnabled = true;
    else {
      // await createApplicationAccount({
      //   id: response.data.user.userId,
      //   username: userData.username,
      //   name: response.data.firstName + response.data.lastName,
      // });
      localStorage.setItem("token", jwt_token);
    }
    return [response.data, mfaEnabled];
  } catch (error) {
    throw new Error(error);
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const verifyCode = async (userData) => {
  const response = await axios.post(`${BASE_AUTH_URL}/verify`, {
    username: userData.username,
    password: userData.password,
    code: userData.code,
  });
  const jwt_token = response.data["jwt"];
  localStorage.setItem("token", jwt_token);
  return response;
};
