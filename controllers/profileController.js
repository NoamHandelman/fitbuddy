import Profile from '../models/Profile.js';
import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from '../customErrors/index.js';

const allProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find({});
    res.status(200).json({ profiles });
  } catch (error) {
    next(error);
  }
};

const createProfile = async (req, res, next) => {
  try {
    const alreadyHasProfile = await Profile.findOne({ user: req.user });
    if (alreadyHasProfile) {
      throw new BadRequestError('This user already has a profile!');
    }
    const profile = await Profile.create({ ...req.body, user: req.user });
    res.status(201).json({ profile });
  } catch (error) {
    next(error);
  }
};

const editProfile = async (req, res, next) => {
  try {
    res.send('editProfile');
  } catch (error) {
    next(error);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user });
    if (!profile) {
      throw new BadRequestError('No profile belong to this user!')
    }
    await profile.remove()
    res.status(200).json({message: "Profile successfully deleted!"})
  } catch (error) {
    next(error);
  }
};

export { allProfiles, createProfile, editProfile, deleteProfile };
