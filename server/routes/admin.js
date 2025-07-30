import express from "express";
import db from "../database.js";
import {
  generateOTP,
  storeOTP,
  verifyOTP,
  generateToken,
  authenticateToken,
  requireAdmin,
} from "../middleware/auth.js";
import { sendOTPEmail } from "../services/emailService.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Request OTP for login
router.post("/login/request-otp", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || username !== process.env.ADMIN_USERNAME) {
      return res.status(401).json({ error: "Invalid username" });
    }

    const otp = generateOTP();
    storeOTP(process.env.ADMIN_EMAIL, otp);

    const emailSent = await sendOTPEmail(process.env.ADMIN_EMAIL, otp);

    if (!emailSent) {
      return res.status(500).json({ error: "Failed to send OTP email" });
    }

    res.json({
      success: true,
      message: `OTP sent to ${process.env.ADMIN_EMAIL}`,
      email: process.env.ADMIN_EMAIL.replace(/(.{2}).*(@.*)/, "$1***$2"), // Mask email
    });
  } catch (error) {
    console.error("OTP request error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Verify OTP and login
router.post("/login/verify-otp", (req, res) => {
  try {
    const { username, otp } = req.body;

    if (!username || username !== process.env.ADMIN_USERNAME) {
      return res.status(401).json({ error: "Invalid username" });
    }

    if (!verifyOTP(process.env.ADMIN_EMAIL, otp)) {
      return res.status(401).json({ error: "Invalid or expired OTP" });
    }

    const token = generateToken({
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      role: "admin",
    });

    res.json({
      success: true,
      token,
      user: {
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Verify token (for frontend auth check)
router.get("/verify-token", authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

// Dashboard stats
router.get(
  "/dashboard/stats",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const stats = {
        projects: (
          await db.prepare("SELECT COUNT(*) as count FROM projects").get()
        ).count,
        skills: (await db.prepare("SELECT COUNT(*) as count FROM skills").get())
          .count,
        experience: (
          await db.prepare("SELECT COUNT(*) as count FROM experience").get()
        ).count,
        testimonials: (
          await db.prepare("SELECT COUNT(*) as count FROM testimonials").get()
        ).count,
        featuredProjects: (
          await db
            .prepare(
              "SELECT COUNT(*) as count FROM projects WHERE featured = 1"
            )
            .get()
        ).count,
      };

      res.json(stats);
    } catch (error) {
      console.error("Error in /dashboard/stats route:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Database connection status
router.get(
  "/dashboard/connection-status",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const connectionInfo = db.getConnectionInfo();

      // Test connection with a simple query
      let isHealthy = false;
      let lastError = null;
      let responseTime = null;

      try {
        const startTime = Date.now();
        await db.prepare("SELECT 1 as test").get();
        responseTime = Date.now() - startTime;
        isHealthy = true;
      } catch (error) {
        lastError = error.message;
        isHealthy = false;
      }

      res.json({
        ...connectionInfo,
        isHealthy,
        lastError,
        responseTime,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error in /dashboard/connection-status route:", error);
      res.status(500).json({
        error: error.message,
        type: "unknown",
        isConnected: false,
        isHealthy: false,
        timestamp: new Date().toISOString(),
      });
    }
  }
);
// Profile management
router.get("/profile", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM profile WHERE id = 1");
    const profile = await stmt.get();
    res.json(profile);
  } catch (error) {
    console.error("Error in /profile route:", error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/profile", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const {
      name,
      title,
      bio,
      email,
      phone,
      location,
      linkedin_url,
      github_url,
      twitter_url,
    } = req.body;

    const stmt = db.prepare(`
      UPDATE profile 
      SET name = ?, title = ?, bio = ?, email = ?, phone = ?, location = ?, 
          linkedin_url = ?, github_url = ?, twitter_url = ?
      WHERE id = 1
    `);

    await stmt.run(
      name,
      title,
      bio,
      email,
      phone,
      location,
      linkedin_url,
      github_url,
      twitter_url
    );

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error in PUT /profile route:", error);
    res.status(500).json({ error: error.message });
  }
});

// Projects management
router.get("/projects", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM projects ORDER BY created_at DESC");
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
    }));
    res.json(formattedProjects);
  } catch (error) {
    console.error("Error in /projects route:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/projects", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const {
      title,
      description,
      long_description,
      technologies,
      category,
      github_url,
      live_url,
      image_url,
      featured,
    } = req.body;

    const stmt = db.prepare(`
      INSERT INTO projects (title, description, long_description, technologies, category, github_url, live_url, image_url, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = await stmt.run(
      title,
      description,
      long_description,
      Array.isArray(technologies) ? technologies.join(", ") : technologies,
      category,
      github_url,
      live_url || null,
      image_url,
      featured ? 1 : 0
    );

    res.json({
      success: true,
      id: result.lastInsertRowid,
      message: "Project created successfully",
    });
  } catch (error) {
    console.error("Error in POST /projects route:", error);
    res.status(500).json({ error: error.message });
  }
});

router.put(
  "/projects/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const {
        title,
        description,
        long_description,
        technologies,
        category,
        github_url,
        live_url,
        image_url,
        featured,
      } = req.body;

      const stmt = db.prepare(`
      UPDATE projects
      SET title = ?, description = ?, long_description = ?, technologies = ?, category = ?,
          github_url = ?, live_url = ?, image_url = ?, featured = ?
      WHERE id = ?
    `);

      await stmt.run(
        title,
        description,
        long_description,
        Array.isArray(technologies) ? technologies.join(", ") : technologies,
        category,
        github_url,
        live_url || null,
        image_url,
        featured ? 1 : 0,
        req.params.id
      );

      res.json({ success: true, message: "Project updated successfully" });
    } catch (error) {
      console.error("Error in PUT /projects route:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.delete(
  "/projects/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const stmt = db.prepare("DELETE FROM projects WHERE id = ?");
      await stmt.run(req.params.id);
      res.json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
      console.error("Error in DELETE /projects route:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Skills management
router.get("/skills", authenticateToken, requireAdmin, async (req, res) => {
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

router.post("/skills", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, category, proficiency, icon, years_experience } = req.body;

    const stmt = db.prepare(`
      INSERT INTO skills (name, category, proficiency, icon, years_experience)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = await stmt.run(
      name,
      category,
      proficiency,
      icon,
      years_experience
    );

    res.json({
      success: true,
      id: result.lastInsertRowid,
      message: "Skill created successfully",
    });
  } catch (error) {
    console.error("Error in POST /skills route:", error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/skills/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, category, proficiency, icon, years_experience } = req.body;

    const stmt = db.prepare(`
      UPDATE skills 
      SET name = ?, category = ?, proficiency = ?, icon = ?, years_experience = ?
      WHERE id = ?
    `);

    await stmt.run(
      name,
      category,
      proficiency,
      icon,
      years_experience,
      req.params.id
    );

    res.json({ success: true, message: "Skill updated successfully" });
  } catch (error) {
    console.error("Error in PUT /skills route:", error);
    res.status(500).json({ error: error.message });
  }
});

router.delete(
  "/skills/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const stmt = db.prepare("DELETE FROM skills WHERE id = ?");
      await stmt.run(req.params.id);
      res.json({ success: true, message: "Skill deleted successfully" });
    } catch (error) {
      console.error("Error in DELETE /skills route:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Experience management
router.get("/experience", authenticateToken, requireAdmin, async (req, res) => {
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

router.post(
  "/experience",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const {
        company,
        position,
        description,
        start_date,
        end_date,
        location,
        technologies,
      } = req.body;

      const stmt = db.prepare(`
      INSERT INTO experience (company, position, description, start_date, end_date, location, technologies)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

      const result = await stmt.run(
        company,
        position,
        description,
        start_date,
        end_date,
        location,
        Array.isArray(technologies) ? technologies.join(", ") : technologies
      );

      res.json({
        success: true,
        id: result.lastInsertRowid,
        message: "Experience created successfully",
      });
    } catch (error) {
      console.error("Error in POST /experience route:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.put(
  "/experience/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const {
        company,
        position,
        description,
        start_date,
        end_date,
        location,
        technologies,
      } = req.body;

      const stmt = db.prepare(`
      UPDATE experience 
      SET company = ?, position = ?, description = ?, start_date = ?, end_date = ?, location = ?, technologies = ?
      WHERE id = ?
    `);

      await stmt.run(
        company,
        position,
        description,
        start_date,
        end_date,
        location,
        Array.isArray(technologies) ? technologies.join(", ") : technologies,
        req.params.id
      );

      res.json({ success: true, message: "Experience updated successfully" });
    } catch (error) {
      console.error("Error in PUT /experience route:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.delete(
  "/experience/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const stmt = db.prepare("DELETE FROM experience WHERE id = ?");
      await stmt.run(req.params.id);
      res.json({ success: true, message: "Experience deleted successfully" });
    } catch (error) {
      console.error("Error in DELETE /experience route:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Testimonials management
router.get(
  "/testimonials",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
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
  }
);

router.post(
  "/testimonials",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const { name, position, company, content, avatar_url, rating } = req.body;

      const stmt = db.prepare(`
      INSERT INTO testimonials (name, position, company, content, avatar_url, rating)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

      const result = await stmt.run(
        name,
        position,
        company,
        content,
        avatar_url,
        rating
      );

      res.json({
        success: true,
        id: result.lastInsertRowid,
        message: "Testimonial created successfully",
      });
    } catch (error) {
      console.error("Error in POST /testimonials route:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.put(
  "/testimonials/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const { name, position, company, content, avatar_url, rating } = req.body;

      const stmt = db.prepare(`
      UPDATE testimonials 
      SET name = ?, position = ?, company = ?, content = ?, avatar_url = ?, rating = ?
      WHERE id = ?
    `);

      await stmt.run(
        name,
        position,
        company,
        content,
        avatar_url,
        rating,
        req.params.id
      );

      res.json({ success: true, message: "Testimonial updated successfully" });
    } catch (error) {
      console.error("Error in PUT /testimonials route:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.delete(
  "/testimonials/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const stmt = db.prepare("DELETE FROM testimonials WHERE id = ?");
      await stmt.run(req.params.id);
      res.json({ success: true, message: "Testimonial deleted successfully" });
    } catch (error) {
      console.error("Error in DELETE /testimonials route:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Contact submissions management
router.get("/contacts", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = "SELECT * FROM contact_submissions";
    let countQuery = "SELECT COUNT(*) as total FROM contact_submissions";
    let params = [];

    if (status && status !== "all") {
      query += " WHERE status = ?";
      countQuery += " WHERE status = ?";
      params.push(status);
    }

    query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(parseInt(limit), parseInt(offset));

    const contactsStmt = db.prepare(query);
    const contacts = await contactsStmt.all(...params);

    const countStmt = db.prepare(countQuery);
    const totalResult = await countStmt.get(
      ...(status && status !== "all" ? [status] : [])
    );

    // Ensure contacts is an array
    if (!Array.isArray(contacts)) {
      console.error("Contacts query did not return an array:", contacts);
      return res.status(500).json({ error: "Database query error" });
    }
    res.json({
      contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalResult.total,
        pages: Math.ceil(totalResult.total / limit),
      },
    });
  } catch (error) {
    console.error("Error in /contacts route:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get(
  "/contacts/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const stmt = db.prepare("SELECT * FROM contact_submissions WHERE id = ?");
      const contact = await stmt.get(req.params.id);
      if (!contact) {
        return res.status(404).json({ error: "Contact submission not found" });
      }
      res.json(contact);
    } catch (error) {
      console.error("Error in /contacts/:id route:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.put(
  "/contacts/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const { status, notes } = req.body;

      const stmt = db.prepare(`
      UPDATE contact_submissions 
      SET status = ?, notes = ?, replied_at = CASE WHEN status = 'replied' THEN CURRENT_TIMESTAMP ELSE replied_at END
      WHERE id = ?
    `);

      await stmt.run(status, notes || null, req.params.id);

      res.json({
        success: true,
        message: "Contact submission updated successfully",
      });
    } catch (error) {
      console.error("Error in PUT /contacts route:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.delete(
  "/contacts/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const stmt = db.prepare("DELETE FROM contact_submissions WHERE id = ?");
      await stmt.run(req.params.id);
      res.json({
        success: true,
        message: "Contact submission deleted successfully",
      });
    } catch (error) {
      console.error("Error in DELETE /contacts route:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Contact stats for dashboard
router.get(
  "/dashboard/contact-stats",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const stats = {
        total: (
          await db
            .prepare("SELECT COUNT(*) as count FROM contact_submissions")
            .get()
        ).count,
        unread: (
          await db
            .prepare(
              'SELECT COUNT(*) as count FROM contact_submissions WHERE status = "unread"'
            )
            .get()
        ).count,
        replied: (
          await db
            .prepare(
              'SELECT COUNT(*) as count FROM contact_submissions WHERE status = "replied"'
            )
            .get()
        ).count,
        recent: (
          await db
            .prepare(
              'SELECT COUNT(*) as count FROM contact_submissions WHERE created_at >= datetime("now", "-7 days")'
            )
            .get()
        ).count,
      };

      res.json(stats);
    } catch (error) {
      console.error("Error in /dashboard/contact-stats route:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
