import express from "express";
import { login, Post } from "../controllers/login";
import { authenticate } from "../middleware/authMidddleWare";
import { RegisterUser } from "../controllers/RegisterUser";
import { userProfile } from "../controllers/user";
import { Thread } from "../controllers/GetThread";
import { createThread, DeleteThread, EditThread } from "../controllers/Thread";
import { uploadIMG } from "../middleware/upload-image";
import { getPostUser } from "../controllers/getProfile/getPost";
import { getMEdiaUSer } from "../controllers/getProfile/getMedia";
import { detailThread, Replythread } from "../controllers/getDetailThread";
import { AllReplay, deleteReplay } from "../controllers/getAllReply";
import {
  Like,
  LikeReply,
  LikeReplyStatus,
  LikeStatus,
} from "../controllers/like";
import { UserById } from "../controllers/getProfileByUser";
import { sugestFollow } from "../controllers/sugestFollow";
import {
  Follow,
  followers,
  followStatus,
  following,
} from "../controllers/follow";
import { Search } from "../controllers/Search";
import { getPostAnotherUSers } from "../controllers/getProfile/anotherUsers/postAnotherUsers";
import { getMediaByUserProfile } from "../controllers/getProfile/anotherUsers/mediaAnotherUser";
import { editProfile } from "../controllers/editUser/editUser";

const router = express.Router();

router.get("/", Post);
router.post("/login", login); //login
router.post("/register", RegisterUser); //register user
router.get("/me", authenticate, userProfile); // get user
router.post(
  "/edit-profile",
  uploadIMG.fields([
    { name: "photoProfile", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  authenticate,
  editProfile
);

// all thread schenario
router.get("/thread", authenticate, Thread);
router.post(
  "/create-thread",
  authenticate,
  uploadIMG.single("image"),
  createThread
);

// get user by Id
router.get("/user-profile/:id", UserById);

router.get("/detail-thread/:id", authenticate, detailThread); //detailthread
router.post("/detail-thread/reply/:id", authenticate, Replythread); //buat Reply
router.delete("/delete-thread/:id", DeleteThread);
// router.patch("  ", uploadIMG.single("img"), EditThread);
router.delete("/delete-reply/:id", deleteReplay);
router.get("/all-reply/:id", AllReplay);
router.post("/like/:id", authenticate, Like);
router.post("/like-reply/:id", authenticate, LikeReply);
router.get("/like-status/:id", LikeStatus);
router.get("/like-reply-status/:id", LikeReplyStatus);

// get post per user yang login di halaman profile
router.get("/allpost-user", authenticate, getPostUser); //yang login
router.get("/allpost-media", authenticate, getMEdiaUSer); //yang login
router.get("/allpost-media-profile/:id", getMediaByUserProfile);
router.get("/allpost-user-profile/:id", getPostAnotherUSers);

// follow
router.get("/sugest-follow", authenticate, sugestFollow);
router.post("/follow", authenticate, Follow);
router.get("/followers", authenticate, followers);
router.get("/following", authenticate, following);
router.get("/status-follow/:id", authenticate, followStatus);

//searach
router.get("/search", Search);

export default router;
