const moment = require("moment-timezone");
const express = require("express");
const router = express.Router();

const db = require("../db");

const { authMiddleware } = require("../auth");

router.get("/announcement", authMiddleware, async (req, res) => {
    try {
        const announcement = await db
            .select()
            .from("announcement")
            .orderBy("timestamp", "desc")
            .limit(10);
        // throw new Error();
        res.json({
            message: "Announcement fetched successfully",
            data: announcement,
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

router.delete("/delete-announcement", authMiddleware, async (req, res) => {
    const idAnnouncement = req.body.id;

    try {
        await db("announcement").where({ id: idAnnouncement }).del();
        res.json({ message: "Announcement deleted successfully", data: {} });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

router.post("/create-announcement", authMiddleware, async (req, res) => {
    const text = req.body.text;
    const authorId = req.body.authorId;

    const timezone = "Europe/Amsterdam";
    const timestamp = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");

    if (text.trim() === "") {
        res.status(400).json({ message: "Client error", data: {} });
    }

    const announcementData = {
        text: text,
        picture_key: "",
        author_id: authorId,
        timestamp: timestamp,
    };

    try {
        await db("announcement").insert(announcementData);
        res.json({
            message: "Announcement created successfully",
            data: {},
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

router.post("/update-announcement", authMiddleware, async (req, res) => {
    const id = req.body.id;
    const text = req.body.text;

    if (text.trim() === "") {
        res.status(400).json({ message: "Client error", data: {} });
    }

    try {
        await db("announcement").where({ id: id }).update({ text: text });
        res.json({
            message: "Announcement updated successfully",
            data: {},
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

module.exports = router;
