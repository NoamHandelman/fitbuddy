import express from 'express';
const router = express.Router();

import {
  allProfiles,
  createProfile,
  editProfile,
  deleteProfile,
} from '../controllers/profileController.js';

router.route('/allProfiles').get(allProfiles);
router.route('/createProfile').post(createProfile);
router.route('/editProfile').patch(editProfile);
router.route('/deleteProfile').delete(deleteProfile);

export default router;
