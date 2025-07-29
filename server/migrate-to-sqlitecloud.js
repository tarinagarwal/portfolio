import { Database } from "@sqlitecloud/drivers";
import BetterSqlite3 from "better-sqlite3";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const SQLITECLOUD_CONNECTION = process.env.SQLITECLOUD_CONNECTION_STRING;

if (!SQLITECLOUD_CONNECTION) {
  console.error("❌ SQLITECLOUD_CONNECTION_STRING is not set in .env file");
  console.log(
    "Format: sqlitecloud://user:password@host.sqlite.cloud:8860/database?timeout=10"
  );
  process.exit(1);
}

async function migrateData() {
  console.log("🚀 Starting migration from local SQLite to SQLiteCloud...\n");

  // Connect to local SQLite database
  const localDb = new BetterSqlite3(path.join(__dirname, "portfolio.db"));
  console.log("📁 Connected to local SQLite database");

  // Connect to SQLiteCloud
  const cloudDb = new Database(SQLITECLOUD_CONNECTION);
  console.log("🌐 Connected to SQLiteCloud");

  try {
    // Test cloud connection
    await cloudDb.sql("SELECT 1");
    console.log("✅ SQLiteCloud connection verified\n");

    // Tables to migrate
    const tables = [
      "profile",
      "projects",
      "skills",
      "experience",
      "testimonials",
      "contact_submissions",
      "blog_posts",
    ];

    for (const tableName of tables) {
      console.log(`📊 Migrating table: ${tableName}`);

      try {
        // Get data from local database
        const localData = localDb.prepare(`SELECT * FROM ${tableName}`).all();
        console.log(`   Found ${localData.length} records`);

        if (localData.length === 0) {
          console.log(`   ⚠️  No data to migrate for ${tableName}`);
          continue;
        }

        // Clear existing data in cloud database
        await cloudDb.sql(`DELETE FROM ${tableName}`);
        console.log(`   🗑️  Cleared existing data in cloud database`);

        // Get column names from the first record
        const columns = Object.keys(localData[0]);

        // Insert data into cloud database
        let successCount = 0;
        let errorCount = 0;

        for (const record of localData) {
          try {
            // Build the INSERT query with actual values (no placeholders)
            const values = columns
              .map((col) => {
                const value = record[col];
                if (value === null) return "NULL";
                if (typeof value === "string")
                  return `'${value.replace(/'/g, "''")}'`;
                return value;
              })
              .join(", ");

            const columnNames = columns.join(", ");
            const insertQuery = `INSERT INTO ${tableName} (${columnNames}) VALUES (${values})`;

            await cloudDb.sql(insertQuery);
            successCount++;
          } catch (error) {
            console.error(`     ❌ Error inserting record:`, error.message);
            errorCount++;
          }
        }

        console.log(`   ✅ Successfully migrated ${successCount} records`);
        if (errorCount > 0) {
          console.log(`   ⚠️  Failed to migrate ${errorCount} records`);
        }

        // Verify migration
        const cloudCount = await cloudDb.sql(
          `SELECT COUNT(*) as count FROM ${tableName}`
        );
        const actualCount = Array.isArray(cloudCount)
          ? cloudCount[0].count
          : cloudCount.count;
        console.log(
          `   📋 Verification: ${actualCount} records in cloud database`
        );
      } catch (error) {
        console.error(`   ❌ Error migrating ${tableName}:`, error.message);
      }

      console.log(""); // Empty line for readability
    }

    console.log("🎉 Migration completed successfully!");

    // Display summary
    console.log("\n📋 Migration Summary:");
    for (const tableName of tables) {
      try {
        const result = await cloudDb.sql(
          `SELECT COUNT(*) as count FROM ${tableName}`
        );
        const count = Array.isArray(result) ? result[0].count : result.count;
        console.log(`   ${tableName}: ${count} records`);
      } catch (error) {
        console.log(`   ${tableName}: Error getting count`);
      }
    }
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    // Close connections
    localDb.close();
    cloudDb.close();
    console.log("\n🔒 Database connections closed");
  }
}

// Add sample data function
async function addSampleData() {
  console.log("🌱 Adding sample data to SQLiteCloud...\n");

  const cloudDb = new Database(SQLITECLOUD_CONNECTION);

  try {
    // Sample profile data
    await cloudDb.sql(`INSERT OR REPLACE INTO profile (id, name, title, bio, email, phone, location, avatar_url, resume_url, linkedin_url, github_url, twitter_url) VALUES (
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

    // Sample projects
    const projects = [
      {
        title: "E-Commerce Platform",
        description:
          "A modern e-commerce platform built with React and Node.js",
        long_description:
          "A comprehensive e-commerce solution featuring user authentication, product management, shopping cart, payment integration, and admin dashboard. Built with modern technologies for optimal performance and user experience.",
        technologies: "React, Node.js, MongoDB, Stripe",
        github_url: "https://github.com/tarinagarwal/ecommerce",
        live_url: "https://ecommerce-demo.com",
        image_url:
          "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
        featured: 1,
      },
      {
        title: "Task Management App",
        description: "A collaborative task management application",
        long_description:
          "A full-featured task management application with real-time collaboration, project organization, deadline tracking, and team communication features.",
        technologies: "Vue.js, Express.js, PostgreSQL, Socket.io",
        github_url: "https://github.com/tarinagarwal/taskmanager",
        live_url: "https://taskmanager-demo.com",
        image_url:
          "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
        featured: 1,
      },
    ];

    for (const project of projects) {
      await cloudDb.sql(`INSERT INTO projects (title, description, long_description, technologies, github_url, live_url, image_url, featured) VALUES (
        '${project.title}',
        '${project.description}',
        '${project.long_description}',
        '${project.technologies}',
        '${project.github_url}',
        '${project.live_url}',
        '${project.image_url}',
        ${project.featured}
      )`);
    }

    // Sample skills
    const skills = [
      {
        name: "React",
        category: "Frontend",
        proficiency: 90,
        icon: "Code",
        years_experience: 3,
      },
      {
        name: "Node.js",
        category: "Backend",
        proficiency: 85,
        icon: "Server",
        years_experience: 3,
      },
      {
        name: "MongoDB",
        category: "Database",
        proficiency: 80,
        icon: "Database",
        years_experience: 2,
      },
      {
        name: "TypeScript",
        category: "Frontend",
        proficiency: 85,
        icon: "Code",
        years_experience: 2,
      },
      {
        name: "PostgreSQL",
        category: "Database",
        proficiency: 75,
        icon: "Database",
        years_experience: 2,
      },
    ];

    for (const skill of skills) {
      await cloudDb.sql(`INSERT INTO skills (name, category, proficiency, icon, years_experience) VALUES (
        '${skill.name}',
        '${skill.category}',
        ${skill.proficiency},
        '${skill.icon}',
        ${skill.years_experience}
      )`);
    }

    console.log("✅ Sample data added successfully!");
  } catch (error) {
    console.error("❌ Error adding sample data:", error);
  } finally {
    cloudDb.close();
  }
}

// Main execution
const command = process.argv[2];

if (command === "migrate") {
  migrateData();
} else if (command === "sample") {
  addSampleData();
} else {
  console.log("Usage:");
  console.log(
    "  node migrate-to-sqlitecloud.js migrate  - Migrate existing data"
  );
  console.log("  node migrate-to-sqlitecloud.js sample   - Add sample data");
}
