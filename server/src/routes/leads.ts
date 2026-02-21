import { Router, Request, Response } from "express";
import Lead from "../models/Lead.js";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      phone,
      email,
      degree,
      gpa,
      testType,
      testScore,
      country,
      budget,
    } = req.body;

    if (!fullName || !phone || !degree || !gpa || !country || !budget) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const lead = await Lead.create({
      fullName,
      phone,
      email: email || undefined,
      degree,
      gpa,
      testType,
      testScore: testType === "none" ? undefined : testScore,
      country,
      budget,
    });

    res.status(201).json({ success: true, id: lead._id });
  } catch (err) {
    console.error("Lead creation failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
