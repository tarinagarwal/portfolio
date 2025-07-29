import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  Briefcase,
  Code,
  Award,
  Star,
  TrendingUp,
  Calendar,
  LogOut,
  Mail,
  Database,
  Wifi,
  WifiOff,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";
import SkeletonLoader from "../../components/SkeletonLoader";

interface DashboardStats {
  projects: number;
  skills: number;
  experience: number;
  testimonials: number;
  featuredProjects: number;
}

interface ConnectionStatus {
  type: "local" | "cloud";
  isConnected: boolean;
  isHealthy: boolean;
  retries: number;
  hasHeartbeat: boolean;
  lastError?: string;
  responseTime?: number;
  timestamp: string;
}
const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const userData = localStorage.getItem("adminUser");

    if (!token || !userData) {
      navigate("/admin/login");
      return;
    }

    setUser(JSON.parse(userData));
    fetchDashboardStats();
    fetchConnectionStatus();

    // Set up interval to refresh stats every 30 seconds
    const interval = setInterval(fetchDashboardStats, 30000);
    // Set up interval to refresh connection status every 5 seconds
    const connectionInterval = setInterval(fetchConnectionStatus, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(connectionInterval);
    };
  }, [navigate]);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        "http://localhost:3001/api/admin/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        toast.error("Failed to fetch dashboard stats");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const fetchConnectionStatus = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        "http://localhost:3001/api/admin/dashboard/connection-status",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setConnectionStatus(data);
      }
    } catch (error) {
      // Silently handle connection status errors
      console.error("Failed to fetch connection status:", error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const getConnectionStatusColor = (status: ConnectionStatus | null) => {
    if (!status) return "bg-gray-500";
    if (!status.isConnected) return "bg-red-500";
    if (!status.isHealthy) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getConnectionStatusText = (status: ConnectionStatus | null) => {
    if (!status) return "Unknown";
    if (!status.isConnected) return "Disconnected";
    if (!status.isHealthy) return "Unhealthy";
    return "Connected";
  };

  const getConnectionIcon = (status: ConnectionStatus | null) => {
    if (!status || !status.isConnected) return WifiOff;
    if (!status.isHealthy) return AlertTriangle;
    return status.type === "cloud" ? Wifi : Database;
  };
  const statCards = [
    {
      title: "Total Projects",
      value: stats?.projects || 0,
      icon: Briefcase,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/20",
      change: "+12%",
    },
    {
      title: "Skills",
      value: stats?.skills || 0,
      icon: Code,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-500/20",
      change: "+8%",
    },
    {
      title: "Experience",
      value: stats?.experience || 0,
      icon: Award,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/20",
      change: "+5%",
    },
    {
      title: "Testimonials",
      value: stats?.testimonials || 0,
      icon: Star,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/20",
      change: "+15%",
    },
    {
      title: "Featured Projects",
      value: stats?.featuredProjects || 0,
      icon: TrendingUp,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-500/20",
      change: "+3%",
    },
  ];

  const quickActions = [
    {
      title: "Manage Projects",
      path: "/admin/projects",
      icon: Briefcase,
      color: "bg-blue-500",
    },
    {
      title: "Manage Skills",
      path: "/admin/skills",
      icon: Code,
      color: "bg-purple-500",
    },
    {
      title: "Manage Experience",
      path: "/admin/experience",
      icon: Award,
      color: "bg-green-500",
    },
    {
      title: "Manage Testimonials",
      path: "/admin/testimonials",
      icon: Star,
      color: "bg-yellow-500",
    },
    {
      title: "View Contacts",
      path: "/admin/contacts",
      icon: Mail,
      color: "bg-indigo-500",
    },
    {
      title: "Edit Profile",
      path: "/admin/profile",
      icon: Users,
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-400">
                  Welcome back, {user?.username}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Connection Status Indicator */}
              {connectionStatus && (
                <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center space-x-2">
                    {(() => {
                      const IconComponent = getConnectionIcon(connectionStatus);
                      return (
                        <IconComponent className="w-4 h-4 text-gray-300" />
                      );
                    })()}
                    <div
                      className={`w-2 h-2 rounded-full ${getConnectionStatusColor(
                        connectionStatus
                      )} animate-pulse`}
                    ></div>
                  </div>
                  <div className="text-xs">
                    <div className="text-gray-300 font-medium">
                      {connectionStatus.type === "cloud"
                        ? "SQLiteCloud"
                        : "Local SQLite"}
                    </div>
                    <div
                      className={`${
                        connectionStatus.isHealthy
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {getConnectionStatusText(connectionStatus)}
                      {connectionStatus.responseTime && (
                        <span className="text-gray-400 ml-1">
                          ({connectionStatus.responseTime}ms)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors duration-200"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            Dashboard Overview
          </h2>
          <p className="text-gray-400">
            Manage your portfolio content and track your progress
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <SkeletonLoader key={index} variant="card" className="h-32" />
              ))
            : statCards.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.title}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-green-400 text-sm font-medium">
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.title}</div>
                  </motion.div>
                );
              })}
        </div>

        {/* Quick Actions */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <motion.button
                  key={action.title}
                  onClick={() => navigate(action.path)}
                  className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-purple-500/50 transition-all duration-300 text-left group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold group-hover:text-purple-400 transition-colors duration-200">
                    {action.title}
                  </h4>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {/* Database Connection Details */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-purple-400" />
              Database Connection
            </h3>
            <div className="space-y-4">
              {connectionStatus ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Database Type</span>
                    <div className="flex items-center">
                      <span className="text-purple-400 text-sm font-medium">
                        {connectionStatus.type === "cloud"
                          ? "SQLiteCloud"
                          : "Local SQLite"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Connection Status</span>
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${getConnectionStatusColor(
                          connectionStatus
                        )}`}
                      ></div>
                      <span
                        className={`text-sm ${
                          connectionStatus.isHealthy
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {getConnectionStatusText(connectionStatus)}
                      </span>
                    </div>
                  </div>
                  {connectionStatus.responseTime && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Response Time</span>
                      <span className="text-blue-400 text-sm">
                        {connectionStatus.responseTime}ms
                      </span>
                    </div>
                  )}
                  {connectionStatus.type === "cloud" && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Heartbeat</span>
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                              connectionStatus.hasHeartbeat
                                ? "bg-green-400"
                                : "bg-red-400"
                            }`}
                          ></div>
                          <span
                            className={`text-sm ${
                              connectionStatus.hasHeartbeat
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {connectionStatus.hasHeartbeat
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </div>
                      </div>
                      {connectionStatus.retries > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Retry Attempts</span>
                          <span className="text-yellow-400 text-sm">
                            {connectionStatus.retries}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                  {connectionStatus.lastError && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div className="flex items-center mb-1">
                        <AlertTriangle className="w-4 h-4 text-red-400 mr-2" />
                        <span className="text-red-400 text-sm font-medium">
                          Last Error
                        </span>
                      </div>
                      <p className="text-red-300 text-xs">
                        {connectionStatus.lastError}
                      </p>
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-4">
                    Last updated:{" "}
                    {new Date(connectionStatus.timestamp).toLocaleTimeString()}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <LoadingSpinner size="sm" className="mr-2" />
                  <span className="text-gray-400">
                    Loading connection status...
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Database</span>
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${
                      connectionStatus?.isHealthy
                        ? "bg-green-400"
                        : "bg-red-400"
                    }`}
                  ></div>
                  <span
                    className={`text-sm ${
                      connectionStatus?.isHealthy
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {connectionStatus?.isHealthy ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Email Service</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-green-400 text-sm">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">API Server</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-green-400 text-sm">Running</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
