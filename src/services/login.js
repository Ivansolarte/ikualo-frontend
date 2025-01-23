const URL = `http://localhost:3000/login`;
const URL_User = `http://localhost:3000/users`;
export const loginService = () => {
  const get = async () => {
    const options = {
      method: "GET", // or 'PUT'// data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const resp = await fetch(URL, options);
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const data = await resp.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const post = async (payload) => {
    const options = {
      method: "POST", // or 'PUT'
      body: JSON.stringify(payload), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    };
    const resp = await fetch(URL, options);
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const data = await resp.json();
    return data;
  };

  const postUser = async (payload) => {
    const options = {
      method: "POST", // or 'PUT'
      body: JSON.stringify(payload), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    };
    const resp = await fetch(URL_User, options);
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const data = await resp.json();
    return data;
  };

  return { get, post, postUser };
};
