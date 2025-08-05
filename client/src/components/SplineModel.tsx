import React, { Suspense, useCallback, useState, useEffect } from "react";
import Spline, { SplineEvent } from "@splinetool/react-spline";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
// import DinoGame from "./DinoGame";

interface SplineModelProps {
  sceneUrl: string;
  className?: string;
  fallbackContent?: React.ReactNode;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

// Error Boundary Component for Spline
class SplineErrorBoundary extends React.Component<
  { children: React.ReactNode; onError?: (error: Error) => void },
  { hasError: boolean }
> {
  constructor(props: {
    children: React.ReactNode;
    onError?: (error: Error) => void;
  }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Spline Error Boundary caught an error:", error, errorInfo);
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return null; // Return null to trigger fallback
    }

    return this.props.children;
  }
}

const SplineModel: React.FC<SplineModelProps> = ({
  sceneUrl,
  className = "",
  fallbackContent,
  onLoad,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [splineApp, setSplineApp] = useState<any>(null);
  const [loadTimeout, setLoadTimeout] = useState<NodeJS.Timeout | null>(null);

  // Validate URL format
  const isValidSplineUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return (
        urlObj.hostname.includes("spline.design") ||
        urlObj.hostname.includes("prod.spline.design") ||
        url.includes(".splinecode")
      );
    } catch {
      return false;
    }
  };

  useEffect(() => {
    // Set a timeout for loading
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.warn("Spline model loading timeout");
        setHasError(true);
        setIsLoading(false);
        onError?.(new Error("Spline loading timeout"));
      }
    }, 15000); // 15 second timeout

    setLoadTimeout(timeout);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isLoading, onError]);

  const handleLoad = useCallback(
    (splineApp: SplineEvent) => {
      try {
        if (loadTimeout) {
          clearTimeout(loadTimeout);
        }
        setSplineApp(splineApp);
        setIsLoading(false);
        setHasError(false);
        onLoad?.();
      } catch (error) {
        console.error("Error in Spline load handler:", error);
        setHasError(true);
        setIsLoading(false);
        onError?.(
          error instanceof Error
            ? error
            : new Error("Spline load handler error")
        );
      }
    },
    [onLoad, onError, loadTimeout]
  );

  const handleError = useCallback(
    (error: any) => {
      console.error("Spline loading error:", error);
      if (loadTimeout) {
        clearTimeout(loadTimeout);
      }
      setHasError(true);
      setIsLoading(false);
      onError?.(
        error instanceof Error ? error : new Error("Spline loading failed")
      );
    },
    [onError, loadTimeout]
  );

  const handleBoundaryError = useCallback((error: Error) => {
    console.error("Spline boundary error:", error);
    setHasError(true);
    setIsLoading(false);
  }, []);

  // Fallback content when Spline fails to load
  const renderFallback = () => {
    if (fallbackContent) {
      return fallbackContent;
    }

    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800/30 rounded-2xl border-2 border-gray-700 p-4">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">🎮</div>
          <h3 className="text-lg font-semibold text-white mb-1">
            {/* Play While You Wait! */}
            Sorry but...
          </h3>
          <p className="text-gray-400 text-sm">
            3D model failed to load :(
            {/* , but here's a fun game instead */}
          </p>
        </div>

        {/* <DinoGame className="scale-75 origin-center" autoStart={false} /> */}
      </div>
    );
  };

  // Check if URL is valid
  if (!isValidSplineUrl(sceneUrl)) {
    console.warn("Invalid Spline URL provided:", sceneUrl);
    return <div className={`relative ${className}`}>{renderFallback()}</div>;
  }

  if (hasError) {
    return <div className={`relative ${className}`}>{renderFallback()}</div>;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Loading overlay */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm rounded-2xl z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-white font-medium">Loading 3D Model...</p>
            <p className="text-gray-400 text-sm mt-1">This may take a moment</p>
          </div>
        </motion.div>
      )}

      {/* Spline Component with Error Boundary */}
      <SplineErrorBoundary onError={handleBoundaryError}>
        <Suspense fallback={<LoadingSpinner size="lg" />}>
          <div className="w-full h-full rounded-2xl overflow-hidden">
            <Spline
              scene={sceneUrl}
              onLoad={handleLoad}
              onError={handleError}
              style={{
                width: "100%",
                height: "100%",
                background: "transparent",
              }}
            />
          </div>
        </Suspense>
      </SplineErrorBoundary>
    </div>
  );
};

export default SplineModel;
