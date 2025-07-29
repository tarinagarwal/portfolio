import express from "express";
import db from "../database.js";

const router = express.Router();

// Get profile information
router.get("/profile", (req, res) => {
  try {
    const profile = db.prepare("SELECT * FROM profile WHERE id = 1").get();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all projects
router.get("/projects", (req, res) => {
  try {
    const { featured } = req.query;

    let query =
      "SELECT * FROM projects ORDER BY featured DESC, created_at DESC";

    if (featured === "true") {
      query =
        "SELECT * FROM projects WHERE featured = 1 ORDER BY created_at DESC";
    }

    const projects = db.prepare(query).all();
    const formattedProjects = projects.map((project) => ({
      ...project,
      technologies: project.technologies.split(", "),
      featured: Boolean(project.featured),
    }));

    res.json(formattedProjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get project by ID
router.get("/projects/:id", (req, res) => {
  try {
    const project = db
      .prepare("SELECT * FROM projects WHERE id = ?")
      .get(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const formattedProject = {
      ...project,
      technologies: project.technologies.split(", "),
      featured: Boolean(project.featured),
    };

    res.json(formattedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all skills
router.get("/skills", (req, res) => {
  try {
    const skills = db
      .prepare("SELECT * FROM skills ORDER BY category, proficiency DESC")
      .all();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get skills by category
router.get("/skills/category/:category", (req, res) => {
  try {
    const skills = db
      .prepare(
        "SELECT * FROM skills WHERE category = ? ORDER BY proficiency DESC"
      )
      .all(req.params.category);
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all experience
router.get("/experience", (req, res) => {
  try {
    const experience = db
      .prepare("SELECT * FROM experience ORDER BY start_date DESC")
      .all();
    const formattedExperience = experience.map((exp) => ({
      ...exp,
      technologies: exp.technologies.split(", "),
    }));

    res.json(formattedExperience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all testimonials
router.get("/testimonials", (req, res) => {
  try {
    const testimonials = db
      .prepare("SELECT * FROM testimonials ORDER BY rating DESC, id DESC")
      .all();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Contact form submission
router.post("/contact", (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Save to database
    const stmt = db.prepare(`
      INSERT INTO contact_submissions (name, email, subject, message)
      VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(name, email, subject, message);

    // Import email service dynamically to avoid circular dependency
    import("../services/emailService.js")
      .then(({ sendContactNotification, sendContactAutoReply }) => {
        // Send notification email to admin
        sendContactNotification({ name, email, subject, message });

        // Send auto-reply to user
        sendContactAutoReply({ name, email, subject, message });
      })
      .catch((error) => {
        console.error("Error sending emails:", error);
      });

    res.json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
      id: result.lastInsertRowid,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
