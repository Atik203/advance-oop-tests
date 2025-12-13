import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CollaborationAPI, UniversityAPI } from "../services/api";
import "../styles/CollaborationManagement.css";
import { Collaboration, University } from "../types";

const CollaborationManagement: React.FC = () => {
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [formData, setFormData] = useState<Collaboration>({
    title: "",
    description: "",
    universityOne: {} as University,
    universityTwo: {} as University,
    status: "ACTIVE",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [collabRes, univRes] = await Promise.all([
        CollaborationAPI.getAll(),
        UniversityAPI.getAll(),
      ]);
      setCollaborations(collabRes.data);
      setUniversities(univRes.data);
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: Collaboration) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUniversitySelect = (fieldName: string, univId: string) => {
    const selectedUniv = universities.find((u) => u.id === parseInt(univId));
    setFormData((prev: Collaboration) => ({
      ...prev,
      [fieldName]: selectedUniv || ({} as University),
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.universityOne?.id ||
      !formData.universityTwo?.id
    ) {
      setError("Please fill in all required fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await CollaborationAPI.create(formData);
      setCollaborations([...collaborations, response.data]);
      setFormData({
        title: "",
        description: "",
        universityOne: {} as University,
        universityTwo: {} as University,
        status: "ACTIVE",
      });
      toast.success("Collaboration created successfully!");
    } catch (err) {
      setError("Failed to create collaboration");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    if (
      !formData.title ||
      !formData.universityOne?.id ||
      !formData.universityTwo?.id
    ) {
      setError("Please fill in all required fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await CollaborationAPI.update(editingId, formData);
      setCollaborations(
        collaborations.map((c: Collaboration) =>
          c.id === editingId ? response.data : c
        )
      );
      setFormData({
        title: "",
        description: "",
        universityOne: {} as University,
        universityTwo: {} as University,
        status: "ACTIVE",
      });
      setEditingId(null);
      toast.success("Collaboration updated successfully!");
    } catch (err) {
      setError("Failed to update collaboration");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (collaboration: Collaboration) => {
    setFormData(collaboration);
    setEditingId(collaboration.id || null);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this collaboration?"))
      return;
    setLoading(true);
    setError("");
    try {
      await CollaborationAPI.delete(id);
      setCollaborations(
        collaborations.filter((c: Collaboration) => c.id !== id)
      );
      toast.success("Collaboration deleted successfully!");
    } catch (err) {
      setError("Failed to delete collaboration");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      universityOne: {} as University,
      universityTwo: {} as University,
      status: "ACTIVE",
    });
    setEditingId(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="management-container">
      <div className="management-header">
        <h1>🤝 Collaborations Management</h1>
        <p>Manage research collaborations between universities</p>
      </div>

      <div className="form-section">
        <h2>
          {editingId ? "✏️ Edit Collaboration" : "➕ Add New Collaboration"}
        </h2>
        <form onSubmit={editingId ? handleUpdate : handleCreate}>
          <div className="form-group">
            <label htmlFor="title">Collaboration Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Joint Research Initiative"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="universityOne">University One *</label>
            <select
              id="universityOne"
              value={formData.universityOne?.id || ""}
              onChange={(e) =>
                handleUniversitySelect("universityOne", e.target.value)
              }
              required
            >
              <option value="">Select a university</option>
              {universities.map((u: University) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="universityTwo">University Two *</label>
            <select
              id="universityTwo"
              value={formData.universityTwo?.id || ""}
              onChange={(e) =>
                handleUniversitySelect("universityTwo", e.target.value)
              }
              required
            >
              <option value="">Select a university</option>
              {universities.map((u: University) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status || "ACTIVE"}
              onChange={handleInputChange}
            >
              <option value="PLANNED">Planned</option>
              <option value="ACTIVE">Active</option>
              <option value="PAUSED">Paused</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              placeholder="Collaboration description..."
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
                ? "Update Collaboration"
                : "Create Collaboration"}
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
        <h2>📋 Collaborations List</h2>
        {loading && <p className="loading">Loading...</p>}
        {collaborations.length === 0 ? (
          <p className="empty-message">
            No collaborations found. Create one to get started!
          </p>
        ) : (
          <div className="collaborations-grid">
            {collaborations.map((collaboration: Collaboration) => (
              <div key={collaboration.id} className="collaboration-card">
                <div className="card-header">
                  <h3>{collaboration.title}</h3>
                </div>
                <div className="card-body">
                  <p>
                    <strong>University 1:</strong>{" "}
                    {collaboration.universityOne?.name}
                  </p>
                  <p>
                    <strong>University 2:</strong>{" "}
                    {collaboration.universityTwo?.name}
                  </p>
                  <p>
                    <strong>Status:</strong> {collaboration.status}
                  </p>
                  {collaboration.startDate && (
                    <p>
                      <strong>Start Date:</strong> {collaboration.startDate}
                    </p>
                  )}
                  {collaboration.description && (
                    <p>
                      <strong>Description:</strong> {collaboration.description}
                    </p>
                  )}
                </div>
                <div className="card-actions">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(collaboration)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(collaboration.id!)}
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

export default CollaborationManagement;
