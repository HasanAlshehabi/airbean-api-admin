global._activeUser = {};

export const getActiveUser = () => {
  return global._activeUser;
};

export const getActiveUserId = () => {
  return global._activeUser.userId;
};

export const setActiveUser = (user = null) => {
  if (user && typeof user === "object") {
    global._activeUser = user;
  } else {
    console.log("Must pass an user object.");
  }
};
