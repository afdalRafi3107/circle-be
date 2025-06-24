import express from "express";
import { Router } from "express";
import { login, Post } from "../controllers/login";
import { authenticate } from "../middleware/authMidddleWare";
import { GetUSer } from "../controllers/fetchUser";
import { RegisterUser } from "../controllers/RegisterUser";
import { userProfile } from "../controllers/user";
import { Thread } from "../controllers/GetThread";
import { EditProfile } from "../controllers/editUser/editUser";
import { createThread } from "../controllers/createThread";
import { uploadIMG } from "../middleware/upload-image";
import { getPostUser } from "../controllers/getProfile/getPost";
import { getMEdiaUSer } from "../controllers/getProfile/getMedia";
import { detailThread, Replythread } from "../controllers/getDetailThread";
import { AllReplay } from "../controllers/getAllReply";

const router = express.Router();

router.get("/", Post);
router.post("/login", login); //login
router.post("/register", RegisterUser); //register user
router.get("/me", authenticate, userProfile); // get user
router.post("/edit-profile", authenticate, EditProfile);

// all thread schenario
router.get("/thread", Thread);
router.post(
  "/create-thread",
  authenticate,
  uploadIMG.single("img"),
  createThread
);

router.get("/detail-thread/:id", detailThread); //detailthread
router.post("/detail-thread/reply/:id", authenticate, Replythread); //buat Reply
router.get("/all-reply/:id", AllReplay);

// get post per user yang login di halaman profile
router.get("/allpost-user", authenticate, getPostUser);
router.get("/allpost-media", authenticate, getMEdiaUSer);

export default router;
