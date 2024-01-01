const INITIAL_DATA = {
  access_token: "",
  refresh_token: "",
};

export const getFromLocalStorage = () => localStorage.getItem("USER");

export const clientIdData = () => {
  const clientId = getFromLocalStorage();
  if (clientId) {
    return {
      ...INITIAL_DATA,
      access_token: JSON.parse(clientId).data.access_token,
      refresh_token: JSON.parse(clientId).data.refresh_token,
    };
  }
  return { ...INITIAL_DATA };
};
