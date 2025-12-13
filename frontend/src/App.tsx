import { useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CollaborationManagement from "./components/CollaborationManagement";
import ResearchPaperManagement from "./components/ResearchPaperManagement";
import UniversityManagement from "./components/UniversityManagement";
import "./styles/App.css";

function App() {
  const [activeTab, setActiveTab] = useState("universities");

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <h1>🎓 University Research Collaboration Platform</h1>
            <p>
              Manage universities, research papers, and collaborative projects
            </p>
          </div>
        </header>

        <nav className="app-nav">
          <Link
            to="/"
            className={`nav-link ${
              activeTab === "universities" ? "active" : ""
            }`}
            onClick={() => setActiveTab("universities")}
          >
            <span className="nav-icon">🏫</span> Universities
          </Link>
          <Link
            to="/papers"
            className={`nav-link ${activeTab === "papers" ? "active" : ""}`}
            onClick={() => setActiveTab("papers")}
          >
            <span className="nav-icon">📄</span> Research Papers
          </Link>
          <Link
            to="/collaborations"
            className={`nav-link ${
              activeTab === "collaborations" ? "active" : ""
            }`}
            onClick={() => setActiveTab("collaborations")}
          >
            <span className="nav-icon">🤝</span> Collaborations
          </Link>
        </nav>

        <main className="app-content">
          <Routes>
            <Route path="/" element={<UniversityManagement />} />
            <Route path="/papers" element={<ResearchPaperManagement />} />
            <Route
              path="/collaborations"
              element={<CollaborationManagement />}
            />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>
            © 2025 University Research Collaboration Platform | Advanced OOP Lab
            Test
          </p>
        </footer>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
