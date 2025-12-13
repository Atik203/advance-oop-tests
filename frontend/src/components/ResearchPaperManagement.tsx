import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ResearchPaperAPI } from "../services/api";
import "../styles/ResearchPaperManagement.css";
import { ResearchPaper } from "../types";

const ResearchPaperManagement: React.FC = () => {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [formData, setFormData] = useState<ResearchPaper>({
    title: "",
    authors: "",
    abstractText: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all papers
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const papersRes = await ResearchPaperAPI.getAll();
      setPapers(papersRes.data);
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "publicationYear" ? parseInt(value) : value,
    }));
  };

  // Create paper
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.authors) {
      setError("Please fill in all required fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await ResearchPaperAPI.create(formData);
      setPapers([...papers, response.data]);
      setFormData({ title: "", authors: "", abstractText: "" });
      toast.success("Research paper created successfully!");
    } catch (err) {
      setError("Failed to create research paper");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Update paper
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    if (!formData.title || !formData.authors) {
      setError("Please fill in all required fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await ResearchPaperAPI.update(editingId, formData);
      setPapers(papers.map((p) => (p.id === editingId ? response.data : p)));
      setFormData({ title: "", authors: "", abstractText: "" });
      setEditingId(null);
      toast.success("Research paper updated successfully!");
    } catch (err) {
      setError("Failed to update research paper");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Edit paper
  const handleEdit = (paper: ResearchPaper) => {
    setFormData(paper);
    setEditingId(paper.id || null);
  };

  // Delete paper
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this research paper?"))
      return;
    setLoading(true);
    setError("");
    try {
      await ResearchPaperAPI.delete(id);
      setPapers(papers.filter((p) => p.id !== id));
      toast.success("Research paper deleted successfully!");
    } catch (err) {
      setError("Failed to delete research paper");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setFormData({ title: "", authors: "", abstractText: "" });
    setEditingId(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="management-container">
      <div className="management-header">
        <h1>📄 Research Papers Management</h1>
        <p>Manage research papers and publications</p>
      </div>

      {/* Form Section */}
      <div className="form-section">
        <h2>
          {editingId ? "✏️ Edit Research Paper" : "➕ Add New Research Paper"}
        </h2>
        <form onSubmit={editingId ? handleUpdate : handleCreate}>
          <div className="form-group">
            <label htmlFor="title">Paper Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Advanced Deep Learning Techniques"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="authors">Authors *</label>
            <input
              type="text"
              id="authors"
              name="authors"
              value={formData.authors}
              onChange={handleInputChange}
              placeholder="e.g., John Doe, Jane Smith"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="abstractText">Abstract</label>
            <textarea
              id="abstractText"
              name="abstractText"
              value={formData.abstractText || ""}
              onChange={handleInputChange}
              placeholder="Paper abstract..."
              rows={4}
            />
          </div>
          <div className="form-group">
            <label htmlFor="publicationYear">Publication Year</label>
            <input
              type="number"
              id="publicationYear"
              name="publicationYear"
              value={formData.publicationYear || ""}
              onChange={handleInputChange}
              placeholder="e.g., 2024"
            />
          </div>
          <div className="form-group">
            <label htmlFor="journal">Journal</label>
            <input
              type="text"
              id="journal"
              name="journal"
              value={formData.journal || ""}
              onChange={handleInputChange}
              placeholder="e.g., Nature"
            />
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : editingId
                ? "Update Paper"
                : "Create Paper"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Papers List */}
      <div className="list-section">
        <h2>📋 Research Papers List</h2>
        {loading && <p className="loading">Loading...</p>}
        {papers.length === 0 ? (
          <p className="empty-message">
            No research papers found. Create one to get started!
          </p>
        ) : (
          <div className="papers-grid">
            {papers.map((paper) => (
              <div key={paper.id} className="paper-card">
                <div className="card-header">
                  <h3>{paper.title}</h3>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Authors:</strong> {paper.authors}
                  </p>
                  {paper.publicationYear && (
                    <p>
                      <strong>Year:</strong> {paper.publicationYear}
                    </p>
                  )}
                  {paper.journal && (
                    <p>
                      <strong>Journal:</strong> {paper.journal}
                    </p>
                  )}
                  {paper.abstractText && (
                    <p>
                      <strong>Abstract:</strong>{" "}
                      {paper.abstractText.substring(0, 100)}...
                    </p>
                  )}
                </div>
                <div className="card-actions">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(paper)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(paper.id!)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchPaperManagement;
