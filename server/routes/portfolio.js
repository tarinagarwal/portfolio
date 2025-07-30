import express from "express";
import db from "../database.js";

const router = express.Router();

// Get profile information
router.get("/profile", async (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM profile WHERE id = 1");
    const profile = await stmt.get();
    res.json(profile);
  } catch (error) {
    console.error("Error in /profile route:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all projects
router.get("/projects", async (req, res) => {
  try {
    const { featured } = req.query;

    let query =
      "SELECT * FROM projects ORDER BY featured DESC, created_at DESC";

    if (featured === "true") {
      query =
        "SELECT * FROM projects WHERE featured = 1 ORDER BY created_at DESC";
    }

    const stmt = db.prepare(query);
    const projects = await stmt.all();

    // Ensure projects is an array
    if (!Array.isArray(projects)) {
      console.error("Projects query did not return an array:", projects);
      return res.status(500).json({ error: "Database query error" });
    }

    const formattedProjects = projects.map((project) => ({
      ...project,
      technologies: project.technologies.split(", "),
      featured: Boolean(project.featured),
      category: project.category || null,
    }));

    res.json(formattedProjects);
  } catch (error) {
    console.error("Error in /projects route:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get project by ID
router.get("/projects/:id", async (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM projects WHERE id = ?");
    const project = await stmt.get(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const formattedProject = {
      ...project,
      technologies: project.technologies.split(", "),
      featured: Boolean(project.featured),
      category: project.category || null,
    };

    res.json(formattedProject);
  } catch (error) {
    console.error("Error in /projects/:id route:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all skills
router.get("/skills", async (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT * FROM skills ORDER BY category, proficiency DESC"
    );
    const skills = await stmt.all();

    // Ensure skills is an array
    if (!Array.isArray(skills)) {
      console.error("Skills query did not return an array:", skills);
      return res.status(500).json({ error: "Database query error" });
    }

    res.json(skills);
  } catch (error) {
    console.error("Error in /skills route:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get skills by category
router.get("/skills/category/:category", async (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT * FROM skills WHERE category = ? ORDER BY proficiency DESC"
    );
    const skills = await stmt.all(req.params.category);

    // Ensure skills is an array
    if (!Array.isArray(skills)) {
      console.error(
        "Skills by category query did not return an array:",
        skills
      );
      return res.status(500).json({ error: "Database query error" });
    }

    res.json(skills);
  } catch (error) {
    console.error("Error in /skills/category/:category route:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all experience
router.get("/experience", async (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT * FROM experience ORDER BY start_date DESC"
    );
    const experience = await stmt.all();

    // Ensure experience is an array
    if (!Array.isArray(experience)) {
      console.error("Experience query did not return an array:", experience);
      return res.status(500).json({ error: "Database query error" });
    }

    const formattedExperience = experience.map((exp) => ({
      ...exp,
      technologies: exp.technologies.split(", "),
    }));

    res.json(formattedExperience);
  } catch (error) {
    console.error("Error in /experience route:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all testimonials
router.get("/testimonials", async (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT * FROM testimonials ORDER BY rating DESC, id DESC"
    );
    const testimonials = await stmt.all();

    // Ensure testimonials is an array
    if (!Array.isArray(testimonials)) {
      console.error(
        "Testimonials query did not return an array:",
        testimonials
      );
      return res.status(500).json({ error: "Database query error" });
    }

    res.json(testimonials);
  } catch (error) {
    console.error("Error in /testimonials route:", error);
    res.status(500).json({ error: error.message });
  }
});

// Contact form submission
router.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Save to database
    const stmt = db.prepare(`
      INSERT INTO contact_submissions (name, email, subject, message)
      VALUES (?, ?, ?, ?)
    `);

    const result = await stmt.run(name, email, subject, message);

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
