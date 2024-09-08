import express from "express";
import {
  getUserProfileandRepos,
  likeProfile,
  getLikes,
} from "../controllers/user.controller.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const router = express.Router();

router.get("/profile/:username", getUserProfileandRepos);
//TODO => GET likes (who liked our profile)
router.get("/likes", ensureAuthenticated, getLikes);
router.post("/like/:username", ensureAuthenticated, likeProfile);

export default router;
