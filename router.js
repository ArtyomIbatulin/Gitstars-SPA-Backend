import { Router } from "express";
import repoController from "./repoController.js";

const router = new Router();

router.post("/repo", repoController.timer);
router.get("/repos", repoController.getAll);
router.get("/repo/:id", repoController.getOne);
router.post("/repo-name", repoController.getName);
router.post("/repo-id", repoController.getIdRepo);
router.delete("/remove", repoController.removeAll);

export default router;
