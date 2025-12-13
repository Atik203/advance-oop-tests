import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UniversityAPI } from "../services/api";
import "../styles/UniversityManagement.css";
import { University } from "../types";

const UniversityManagement: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [formData, setFormData] = useState<University>({
    name: "",
    location: "",
    description: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUniversities = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await UniversityAPI.getAll();
      setUniversities(response.data);
    } catch (err) {
      setError("Failed to fetch universities");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: University) => ({
      ...prev,
      [name]:
        name === "foundedYear" ? (value ? parseInt(value) : undefined) : value,
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.location) {
      setError("Please fill in all required fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await UniversityAPI.create(formData);
      setUniversities([...universities, response.data]);
      setFormData({ name: "", location: "", description: "" });
      toast.success("University created successfully!");
    } catch (err) {
      setError("Failed to create university");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    if (!formData.name || !formData.location) {
      setError("Please fill in all required fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await UniversityAPI.update(editingId, formData);
      setUniversities(
        universities.map((u: University) =>
          u.id === editingId ? response.data : u
        )
      );
      setFormData({ name: "", location: "", description: "" });
      setEditingId(null);
      toast.success("University updated successfully!");
    } catch (err) {
      setError("Failed to update university");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (university: University) => {
    setFormData(university);
    setEditingId(university.id || null);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this university?"))
      return;
    setLoading(true);
    setError("");
    try {
      await UniversityAPI.delete(id);
      setUniversities(universities.filter((u: University) => u.id !== id));
      toast.success("University deleted successfully!");
    } catch (err) {
      setError("Failed to delete university");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", location: "", description: "" });
    setEditingId(null);
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  return (
    <div className="management-container">
      <div className="management-header">
        <h1>🏫 Universities Management</h1>
        <p>Manage university information and profiles</p>
      </div>

      <div className="form-section">
        <h2>{editingId ? "✏️ Edit University" : "➕ Add New University"}</h2>
        <form onSubmit={editingId ? handleUpdate : handleCreate}>
          <div className="form-group">
            <label htmlFor="name">University Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Harvard University"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., Cambridge, MA"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="foundedYear">Founded Year</label>
            <input
              type="number"
              id="foundedYear"
              name="foundedYear"
              value={formData.foundedYear || ""}
              onChange={handleInputChange}
              placeholder="e.g., 1636"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              placeholder="University description..."
              rows={4}
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
                ? "Update University"
                : "Create University"}
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

      {error && <div className="error-message">{error}</div>}

      <div className="list-section">
        <h2>📋 Universities List</h2>
        {loading && <p className="loading">Loading...</p>}
        {universities.length === 0 ? (
          <p className="empty-message">
            No universities found. Create one to get started!
          </p>
        ) : (
          <div className="universities-grid">
            {universities.map((university: University) => (
              <div key={university.id} className="university-card">
                <div className="card-header">
                  <h3>{university.name}</h3>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Location:</strong> {university.location}
                  </p>
                  {university.foundedYear && (
                    <p>
                      <strong>Founded:</strong> {university.foundedYear}
                    </p>
                  )}
                  {university.description && (
                    <p>
                      <strong>Description:</strong> {university.description}
                    </p>
                  )}
                </div>
                <div className="card-actions">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(university)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(university.id!)}
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

export default UniversityManagement;
