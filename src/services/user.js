import { UsersCollection } from '../db/models/user.js';

export const patchUser = (userId, user) => {
	return UsersCollection.findOneAndUpdate({ _id: userId }, user, {
    new: true,
  });
};

export const getUser = async (userId) => {
  return UsersCollection.findOne({ _id: userId });
};

export const updateUser = (userId, user) => {
  return UsersCollection.findOneAndUpdate({ _id: userId }, user, {
    new: true,
    upsert: true,
  });
};
