import express from "express";
import {
  employerGetAllApplications,
  ReqseekerDeleteApplication,
  ReqseekerGetAllApplications,
  postApplication,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, postApplication);
router.get("/employer/getall", isAuthenticated, employerGetAllApplications);
router.get("/Reqseeker/getall", isAuthenticated, ReqseekerGetAllApplications);
router.delete("/delete/:id", isAuthenticated, ReqseekerDeleteApplication);

export default router;
