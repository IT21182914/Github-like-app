import express from "express";
import { getUserProfileandRepos } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", getUserProfileandRepos);
//TODO => GET likes (who liked our profile)
//TODO => POST like a profile

export default router;
