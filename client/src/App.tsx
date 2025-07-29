import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Navigation from "./components/Navigation";
import ParticleBackground from "./components/ParticleBackground";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminSkills from "./pages/admin/AdminSkills";
import AdminExperience from "./pages/admin/AdminExperience";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminContacts from "./pages/admin/AdminContacts";

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-gray-900 text-white overflow-x-hidden">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1f2937",
              color: "#f3f4f6",
              border: "1px solid #374151",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#f3f4f6",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#f3f4f6",
              },
            },
          }}
        />
        <ParticleBackground />

        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/skills" element={<AdminSkills />} />
          <Route path="/admin/experience" element={<AdminExperience />} />
          <Route path="/admin/testimonials" element={<AdminTestimonials />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
          <Route
            path="/*"
            element={
              <>
                <Navigation />
                <main className="relative z-10">
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/portfolio" element={<Portfolio />} />
                      <Route path="/skills" element={<Skills />} />
                      <Route path="/experience" element={<Experience />} />
                      <Route path="/contact" element={<Contact />} />
                    </Routes>
                  </AnimatePresence>
                </main>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
