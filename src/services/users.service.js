const URL = `http://localhost:3000/users`;
export const UsersService = () => {

  const getUsers = async (userId) => {
    const options = {
      method: "GET", // or 'PUT'// data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
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
  return { getUsers };
};
