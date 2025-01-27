const URL = `http://localhost:3000/movements`;
export const MovementsService = () => {
  const getMovementsById = async (userId) => {
    const options = {
      method: "GET", // or 'PUT'// data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token'),
      },
    };
    try {
      const resp = await fetch(`${URL}?userId=${userId}`, options);
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const data = await resp.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovement = async (movementId) => {
    const options = {
      method: "DELETE", // or 'PUT' // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token'),
      },
    };
    const resp = await fetch(`${URL}/${movementId}`, options);
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const data = await resp.json();
    return data;
  };

  const postMovement = async (payload) => {
    const options = {
      method: "POST", // or 'PUT'
      body: JSON.stringify(payload), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token'),
      },
    };
    const resp = await fetch(URL, options);
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const data = await resp.json();
    return data;
  };

  return { getMovementsById, deleteMovement, postMovement };
};
