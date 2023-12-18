import axios from "axios";

// let BASE_AUTH_URL = "http://localhost:8080/auth";
let BASE_AUTH_URL = "http://localhost:8080/api/v1/demo";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_AUTH_URL}/register`, {
      email: userData.email,
      username: userData.username,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      mfaEnabled: userData.mfaEnabled,
      application: "Split Bit",
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
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

//* This
// export const fetchAccount = async () => {
//   try {
//     const response = await axios.get(`${BASE_AUTH_URL}/userDetails`, {
//       withCredentials: true,
//     });
//     console.log("Fetch response: ", response);
//     return response.data;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

//* This
// export const logout = async () => {
//   document.cookie = "firstName=Shreyans";

//   // document.cookie =
//   //   "JSESSIONID=cookievalue; expires= Thu, 21 Aug 2014 20:00:00 UTC";
//   await axios.post(`http://localhost:8080/logout`, { withCredentials: true });

//   localStorage.removeItem("token");
// };

export const logout = async () => {
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
