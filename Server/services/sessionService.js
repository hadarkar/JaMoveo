import Session from "../models/Session.js";

export const createNewSession = async (name, userId) => {
  const session = new Session({
    name,
    createdBy: userId,
    participants: [],
  });
  await session.save();
  return session;
};
