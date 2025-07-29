import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Clock,
  CheckCircle,
  Trash2,
  Eye,
  Reply,
  Filter,
  Search,
  Calendar,
  User,
  MessageSquare,
  X,
  Save,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";
import SkeletonLoader from "../../components/SkeletonLoader";

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied" | "archived";
  created_at: string;
  replied_at: string | null;
  notes: string | null;
}

interface ContactStats {
  total: number;
  unread: number;
  replied: number;
  recent: number;
}

const AdminContacts: React.FC = () => {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [stats, setStats] = useState<ContactStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] =
    useState<ContactSubmission | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  const [modalData, setModalData] = useState({
    status: "unread",
    notes: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchContacts();
    fetchStats();
  }, [navigate, statusFilter]);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:3001/api/admin/contacts?status=${statusFilter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts);
      } else {
        toast.error("Failed to fetch contacts");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        "http://localhost:3001/api/admin/dashboard/contact-stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch contact stats:", error);
    }
  };

  const openModal = (contact: ContactSubmission) => {
    setSelectedContact(contact);
    setModalData({
      status: contact.status,
      notes: contact.notes || "",
    });
    setShowModal(true);

    // Mark as read if it's unread
    if (contact.status === "unread") {
      updateContactStatus(contact.id, "read", contact.notes || "");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  const updateContactStatus = async (
    id: number,
    status: string,
    notes: string
  ) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:3001/api/admin/contacts/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status, notes }),
        }
      );

      if (response.ok) {
        await fetchContacts();
        await fetchStats();
        return true;
      } else {
        toast.error("Failed to update contact");
        return false;
      }
    } catch (error) {
      toast.error("Network error");
      return false;
    }
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact) return;

    setUpdating(true);
    const success = await updateContactStatus(
      selectedContact.id,
      modalData.status,
      modalData.notes
    );

    if (success) {
      toast.success("Contact updated successfully!");
      closeModal();
    }
    setUpdating(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this contact submission?"))
      return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:3001/api/admin/contacts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Contact deleted!");
        await fetchContacts();
        await fetchStats();
      } else {
        toast.error("Failed to delete contact");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "read":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "replied":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "archived":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "unread":
        return <Mail size={14} />;
      case "read":
        return <Eye size={14} />;
      case "replied":
        return <CheckCircle size={14} />;
      case "archived":
        return <Clock size={14} />;
      default:
        return <Mail size={14} />;
    }
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/admin/dashboard"
                className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-xl font-bold text-white">
                Contact Submissions
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Contacts</p>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-400" />
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Unread</p>
                  <p className="text-2xl font-bold text-red-400">
                    {stats.unread}
                  </p>
                </div>
                <Mail className="w-8 h-8 text-red-400" />
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Replied</p>
                  <p className="text-2xl font-bold text-green-400">
                    {stats.replied}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">This Week</p>
                  <p className="text-2xl font-bold text-purple-400">
                    {stats.recent}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-purple-400" />
              </div>
            </motion.div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonLoader key={index} variant="card" className="h-24" />
            ))
          ) : filteredContacts.length === 0 ? (
            <div className="text-center py-20">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                No contact submissions found
              </p>
            </div>
          ) : (
            filteredContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                className={`bg-gray-800/50 backdrop-blur-sm border rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 cursor-pointer ${
                  contact.status === "unread"
                    ? "border-red-500/30 bg-red-500/5"
                    : "border-gray-700"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => openModal(contact)}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {contact.name}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full border flex items-center space-x-1 ${getStatusColor(
                          contact.status
                        )}`}
                      >
                        {getStatusIcon(contact.status)}
                        <span className="capitalize">{contact.status}</span>
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <Mail size={14} />
                        <span>{contact.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{formatDate(contact.created_at)}</span>
                      </div>
                    </div>

                    <h4 className="text-white font-medium mb-2">
                      {contact.subject}
                    </h4>
                    <p className="text-gray-300 line-clamp-2">
                      {contact.message}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          `mailto:${contact.email}?subject=Re: ${contact.subject}`,
                          "_blank"
                        );
                      }}
                      className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all duration-200"
                      title="Reply via Email"
                    >
                      <Reply size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(contact.id);
                      }}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Contact Detail Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            className="bg-gray-800 border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="w-6 h-6 text-purple-400" />
                  <h2 className="text-2xl font-bold text-white">
                    {selectedContact.name}
                  </h2>
                  <span
                    className={`px-2 py-1 text-xs rounded-full border flex items-center space-x-1 ${getStatusColor(
                      selectedContact.status
                    )}`}
                  >
                    {getStatusIcon(selectedContact.status)}
                    <span className="capitalize">{selectedContact.status}</span>
                  </span>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700 transition-all duration-200"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-white">{selectedContact.email}</span>
                    <button
                      onClick={() =>
                        window.open(
                          `mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`,
                          "_blank"
                        )
                      }
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Reply size={16} />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Date
                  </label>
                  <span className="text-white">
                    {formatDate(selectedContact.created_at)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <p className="text-white bg-gray-700/50 p-3 rounded-lg">
                  {selectedContact.subject}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <div className="text-white bg-gray-700/50 p-4 rounded-lg whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>

              {/* Update Form */}
              <form
                onSubmit={handleModalSubmit}
                className="space-y-4 pt-6 border-t border-gray-700"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={modalData.status}
                      onChange={(e) =>
                        setModalData((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="unread">Unread</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={modalData.notes}
                    onChange={(e) =>
                      setModalData((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    placeholder="Add internal notes about this contact..."
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {updating ? (
                      <div className="flex items-center">
                        <LoadingSpinner size="sm" className="mr-2" />
                        Updating...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Save size={18} className="mr-2" />
                        Update Contact
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
    