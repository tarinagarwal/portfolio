import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  ArrowLeft,
  RotateCcw,
  Maximize,
  Minimize,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

interface Profile {
  resume_url: string;
  name: string;
}

const ResumeViewer: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "https://portfolio-5y49.onrender.com/api/profile"
        );
        const data = await response.json();
        // Use resume from public folder instead of database URL
        setProfile({
          ...data,
          resume_url: "/resume.pdf", // This will fetch from public/resume.pdf
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width - 40); // Account for padding
      }
    };

    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);
    return () => window.removeEventListener("resize", updateContainerWidth);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPdfLoading(false);
    toast.success("Resume loaded successfully!");
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("Error loading PDF:", error);
    setError("Failed to load PDF. Please try again later.");
    setPdfLoading(false);
    toast.error("Failed to load resume");
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const resetZoom = () => {
    setScale(1.0);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // Direct link to public folder
    link.download = "Tarin_Agarwal_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Resume download started!");
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </PageTransition>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="text-6xl mb-4">📄</div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Resume Not Available
            </h1>
            <p className="text-gray-400 mb-8">{error}</p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Home
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div
        className={`min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 ${
          isFullscreen ? "fixed inset-0 z-50" : ""
        }`}
      >
        {/* Header */}
        <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <ArrowLeft size={20} />
                </Link>
                <h1 className="text-xl font-bold text-white">Resume Viewer</h1>
                {profile && (
                  <span className="text-gray-400">- {profile.name}</span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={downloadPDF}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
                >
                  <Download size={18} />
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Controls */}
            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Page Navigation */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={goToPrevPage}
                    disabled={pageNumber <= 1}
                    className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="flex items-center space-x-2 px-3 py-1 bg-gray-700/50 rounded-lg">
                    <span className="text-white text-sm">
                      Page {pageNumber} of {numPages}
                    </span>
                  </div>

                  <button
                    onClick={goToNextPage}
                    disabled={pageNumber >= numPages}
                    className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={zoomOut}
                    className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                    title="Zoom Out"
                  >
                    <ZoomOut size={20} />
                  </button>

                  <div className="px-3 py-1 bg-gray-700/50 rounded-lg">
                    <span className="text-white text-sm">
                      {Math.round(scale * 100)}%
                    </span>
                  </div>

                  <button
                    onClick={zoomIn}
                    className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                    title="Zoom In"
                  >
                    <ZoomIn size={20} />
                  </button>

                  <button
                    onClick={resetZoom}
                    className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                    title="Reset Zoom"
                  >
                    <RotateCcw size={20} />
                  </button>

                  
                </div>
              </div>
            </motion.div>

            {/* PDF Container */}
            <motion.div
              ref={containerRef}
              className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-4 overflow-auto"
              style={{
                height: isFullscreen ? "calc(100vh - 200px)" : "80vh",
                maxHeight: isFullscreen ? "calc(100vh - 200px)" : "80vh",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex justify-center">
                {pdfLoading && (
                  <div className="flex flex-col items-center justify-center py-20">
                    <LoadingSpinner size="lg" className="mb-4" />
                    <p className="text-gray-400">Loading resume...</p>
                  </div>
                )}

                <Document
                  file="/resume.pdf"
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading=""
                  className="flex justify-center"
                  options={{
                    cMapUrl: "https://unpkg.com/pdfjs-dist@3.11.174/cmaps/",
                    cMapPacked: true,
                    standardFontDataUrl:
                      "https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/",
                  }}
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    width={Math.min(containerWidth, 800)}
                    className="shadow-2xl border border-gray-600 rounded-lg overflow-hidden"
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              </div>
            </motion.div>

            {/* Mobile Navigation */}
            <div className="md:hidden mt-4">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={goToPrevPage}
                  disabled={pageNumber <= 1}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                <button
                  onClick={goToNextPage}
                  disabled={pageNumber >= numPages}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ResumeViewer;
