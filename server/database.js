import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SQLiteCloud connection string format:
// sqlitecloud://user:password@host.sqlite.cloud:8860/database?timeout=10
const SQLITECLOUD_CONNECTION = process.env.SQLITECLOUD_CONNECTION_STRING;

let db;
let dbType = "local";

const initializeDatabase = async () => {
  if (SQLITECLOUD_CONNECTION && SQLITECLOUD_CONNECTION.trim() !== "") {
    // Use SQLiteCloud for production
    console.log("🌐 Connecting to SQLiteCloud...");
    try {
      const { Database: CloudDatabase } = await import("@sqlitecloud/drivers");
      db = new CloudDatabase(SQLITECLOUD_CONNECTION);

      // Test connection
      const testResult = await db.sql("SELECT 1 as test");
      console.log("✅ SQLiteCloud connection successful");
      dbType = "cloud";
    } catch (error) {
      console.error("❌ SQLiteCloud connection failed:", error.message);
      console.log("📁 Falling back to local SQLite database");
      db = new Database(path.join(__dirname, "portfolio.db"));
      dbType = "local";
    }
  } else {
    // Use local SQLite for development
    console.log("📁 Using local SQLite database");
    db = new Database(path.join(__dirname, "portfolio.db"));
    dbType = "local";
  }
};

// Create tables
const createTables = async () => {
  const tableQueries = [
    `CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      long_description TEXT,
      technologies TEXT NOT NULL,
      github_url TEXT,
      live_url TEXT,
      image_url TEXT,
      featured BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      proficiency INTEGER NOT NULL,
      icon TEXT,
      years_experience INTEGER
    )`,

    `CREATE TABLE IF NOT EXISTS experience (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company TEXT NOT NULL,
      position TEXT NOT NULL,
      description TEXT NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT,
      location TEXT,
      technologies TEXT
    )`,

    `CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      position TEXT NOT NULL,
      company TEXT NOT NULL,
      content TEXT NOT NULL,
      avatar_url TEXT,
      rating INTEGER DEFAULT 5
    )`,

    `CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      published BOOLEAN DEFAULT 0,
      featured_image TEXT,
      tags TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      bio TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      location TEXT,
      avatar_url TEXT,
      resume_url TEXT,
      linkedin_url TEXT,
      github_url TEXT,
      twitter_url TEXT
    )`,

    `CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'unread',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      replied_at DATETIME,
      notes TEXT
    )`,
  ];

  if (dbType === "cloud") {
    // SQLiteCloud - execute queries sequentially
    for (const query of tableQueries) {
      try {
        await db.sql(query);
      } catch (error) {
        console.error("Error creating table:", error);
      }
    }
  } else {
    // Local SQLite - execute all at once
    const allQueries = tableQueries.join(";\n\n");
    db.exec(allQueries);
  }
};

// Helper function to escape SQL strings
const escapeSqlString = (str) => {
  if (str === null || str === undefined) return "NULL";
  if (typeof str === "number") return str.toString();
  if (typeof str === "boolean") return str ? "1" : "0";
  return `'${str.toString().replace(/'/g, "''")}'`;
};

// Helper function to build parameterized query for SQLiteCloud
const buildCloudQuery = (query, params) => {
  let finalQuery = query;
  params.forEach((param) => {
    finalQuery = finalQuery.replace("?", escapeSqlString(param));
  });
  return finalQuery;
};

// Helper function to normalize results
const normalizeResult = (result) => {
  if (!result) return null;

  // If it's already an array, return as is
  if (Array.isArray(result)) {
    return result;
  }

  // If it's an object with data property (some cloud responses)
  if (result.data && Array.isArray(result.data)) {
    return result.data;
  }

  // If it's a single object, wrap in array for .all() calls
  if (typeof result === "object") {
    return result;
  }

  return result;
};

// Initialize database and create tables
await initializeDatabase();
await createTables();

// Add sample data if tables are empty
const addSampleDataIfEmpty = async () => {
  try {
    let profileCount;
    if (dbType === "cloud") {
      const result = await db.sql("SELECT COUNT(*) as count FROM profile");
      const normalizedResult = normalizeResult(result);
      profileCount = Array.isArray(normalizedResult)
        ? normalizedResult[0].count
        : normalizedResult.count;
    } else {
      profileCount = db
        .prepare("SELECT COUNT(*) as count FROM profile")
        .get().count;
    }

    if (profileCount === 0) {
      console.log("📝 Adding sample data...");

      if (dbType === "cloud") {
        // Add sample profile for cloud
        await db.sql(`INSERT INTO profile (id, name, title, bio, email, phone, location, avatar_url, resume_url, linkedin_url, github_url, twitter_url) VALUES (
          1,
          'Tarin Agarwal',
          'Full-Stack Developer & Game Developer',
          'A passionate full-stack developer with expertise in modern web technologies and game development. I love creating innovative solutions that make a difference.',
          'tarinagarwal@gmail.com',
          '+1 (555) 123-4567',
          'San Francisco, CA',
          'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://example.com/resume.pdf',
          'https://www.linkedin.com/in/tarin-agarwal-810793267/',
          'https://github.com/tarinagarwal',
          'https://twitter.com/tarinagarwal'
        )`);
      } else {
        // Add sample profile for local
        const stmt = db.prepare(`
          INSERT INTO profile (id, name, title, bio, email, phone, location, avatar_url, resume_url, linkedin_url, github_url, twitter_url)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        stmt.run(
          1,
          "Tarin Agarwal",
          "Full-Stack Developer & Game Developer",
          "A passionate full-stack developer with expertise in modern web technologies and game development. I love creating innovative solutions that make a difference.",
          "tarinagarwal@gmail.com",
          "+1 (555) 123-4567",
          "San Francisco, CA",
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
          "https://example.com/resume.pdf",
          "https://www.linkedin.com/in/tarin-agarwal-810793267/",
          "https://github.com/tarinagarwal",
          "https://twitter.com/tarinagarwal"
        );
      }

      console.log("✅ Sample data added successfully");
    }
  } catch (error) {
    console.error("Error adding sample data:", error);
  }
};

await addSampleDataIfEmpty();

// Export database instance with unified interface
export default {
  // For SELECT queries that return multiple rows
  prepare: (query) => {
    if (dbType === "cloud") {
      return {
        all: async (...params) => {
          try {
            const finalQuery = buildCloudQuery(query, params);
            const result = await db.sql(finalQuery);
            const normalized = normalizeResult(result);

            // Ensure we always return an array for .all() calls
            if (!Array.isArray(normalized)) {
              return normalized ? [normalized] : [];
            }
            return normalized;
          } catch (error) {
            console.error("Database query error (all):", error);
            console.error("Query:", query);
            console.error("Params:", params);
            throw error;
          }
        },
        get: async (...params) => {
          try {
            const finalQuery = buildCloudQuery(query, params);
            const result = await db.sql(finalQuery);
            const normalized = normalizeResult(result);

            // For .get() calls, return the first item if it's an array
            if (Array.isArray(normalized)) {
              return normalized[0] || null;
            }
            return normalized;
          } catch (error) {
            console.error("Database query error (get):", error);
            console.error("Query:", query);
            console.error("Params:", params);
            throw error;
          }
        },
        run: async (...params) => {
          try {
            const finalQuery = buildCloudQuery(query, params);
            const result = await db.sql(finalQuery);

            return {
              lastInsertRowid:
                result.meta?.last_insert_rowid ||
                result.insertId ||
                result.lastID ||
                null,
              changes: result.meta?.changes || result.affectedRows || 1,
            };
          } catch (error) {
            console.error("Database query error (run):", error);
            console.error("Query:", query);
            console.error("Params:", params);
            throw error;
          }
        },
      };
    } else {
      // Local SQLite
      return db.prepare(query);
    }
  },

  // For direct execution
  exec: async (query) => {
    if (dbType === "cloud") {
      await db.sql(query);
    } else {
      db.exec(query);
    }
  },

  // Close connection
  close: () => {
    if (db && typeof db.close === "function") {
      db.close();
    }
  },
};
