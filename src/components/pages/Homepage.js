import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from 'react-data-table-component';
import axios from "axios";
import { base_urlLink } from "../helper/config";
import { toast } from "react-toastify";
import HomepageDummy from "./HomepageDummy";

const Homepage = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState("forms");
  const [forms, setForms] = useState([]);
  const [responsevalue, setResponsevalue] = useState([]);
  const [formToDelete, setFormToDelete] = useState(null);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });


  let userlogo = 'https://th.bing.com/th?q=Windows+User+Account+Icon&w=100&h=100&c=7&o=5&dpr=1.3&pid=1.7&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1';

  useEffect(() => {
    if (user) {
      console.log("usr lo", user)
      setActiveModal("forms");
    } else {
      navigate('/login');
    }

    if (forms.length === 0 && responsevalue.length === 0) {
      getForms();
    }
  }, [user]);

  const getForms = () => {
    axios.get(`${base_urlLink}/api/forms/getall`)
      .then(response => {
        setForms(response.data);
        setResponsevalue(response.data);
      })
      .catch(error => {
        console.error('Error fetching forms:', error);
      });
  }

  const handleDeleteForm = (id) => {
    axios.delete(`${base_urlLink}/api/forms/${id}`)
      .then(response => {
        toast.success('Form deleted successfully');
        getForms();
      })
      .catch(error => {
        console.error('Error deleting form:', error);
        toast.error('Error deleting form');
      });
  }

  const closeModal = () => setActiveModal(null);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.info("Logged out successfully");
  };

  const columnsForm = [
    {
      name: 'Action', cell: (row) => (
        <>
          <button className="btn btn-primary btn-sm me-2" onClick={() => navigate(`/editform/${row._id}`)}>
            <i className="bi bi-pencil"></i>
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => setFormToDelete(row._id)}>
            <i className="bi bi-trash"></i>
          </button>
        </>
      )
    },
    { name: 'Title', selector: row => row.title, sortable: true },
    { name: 'Description', selector: row => row.description },
    { name: 'Fields', selector: row => row.fields.length },
    { name: 'Created', selector: row => new Date(row.createdAt).toLocaleDateString() },
  ];

  const columnsResponse = [
    {
      name: 'Action',
      cell: (row) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/response/${row._id}`);
          }}
        >
          Submit your answer
        </button>
      )
    },
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
      style: { cursor: 'pointer' }
    }
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-3">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-4" href="#">
            <i className="bi bi-folder-fill me-2"></i>Form Folder
          </a>
          <button
            className="btn btn-outline-light btn-sm ms-2"
            onClick={() => navigate('/adminDashboard')}
          >
            <i className="bi bi-speedometer2 me-1"></i> Dashboard
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center gap-3 flex-wrap">
              <li className="nav-item">
                <button
                  className="btn btn-outline-light btn-sm px-3"
                  onClick={() => setActiveModal("response")}
                >
                  <i className="bi bi-chat-dots-fill me-1"></i> Record Form
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-light btn-sm px-3 text-primary fw-semibold"
                  onClick={() => setActiveModal("forms")}
                >
                  <i className="bi bi-ui-checks-grid me-1"></i> Forms
                </button>
              </li>
              <li className="nav-item d-flex align-items-center">
                {user ? (
                  <>
                    <div className="d-flex flex-column align-items-center me-3">
                      <img
                        src={userlogo}
                        alt="User Avatar"
                        className="rounded-circle border border-white"
                        width="32"
                        height="32"
                        style={{ cursor: "pointer" }}
                        title={user.username || "User"}
                      />
                      <span>{user.user.username}</span>
                    </div>
                    <button className="btn btn-outline-light btn-sm px-3" onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <button className="btn btn-outline-light btn-sm px-3" onClick={handleLogin}>
                    Login
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="card">
          <HomepageDummy/>
      </div>
      {/* Forms Modal */}
      {activeModal === "forms" && (
        <div className="custom-modal-overlay" style={{ zIndex: 1000, width: '100%' }} onClick={closeModal}>
          <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="card shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
                <h5 className="mb-0">Form List</h5>
                <button className="btn btn-light btn-sm" onClick={() => navigate('/addform')}>
                  <i className="bi bi-plus-lg me-1"></i> Add Form
                </button>
              </div>
              <div className="card-body">
                <DataTable
                  title="All Forms"
                  columns={columnsForm}
                  data={forms}
                  pagination
                  highlightOnHover
                  responsive
                />
              </div>
            </div>
            <button className="btn btn-secondary mt-3" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Response Modal */}
      {activeModal === "response" && (
        <div className="custom-modal-overlay" style={{ zIndex: 1000, width: '100%' }} onClick={closeModal}>
          <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="card shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
                <h5 className="mb-0">Record Form</h5>
              </div>
              <div className="card-body">
                <DataTable
                  title="Record List"
                  columns={columnsResponse}
                  data={responsevalue}
                  onRowClicked={(row) => navigate(`/response/${row._id}`)}
                  pagination
                  highlightOnHover
                  responsive
                />
              </div>
            </div>
            <button className="btn btn-secondary mt-3" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Bootstrap Confirm Modal */}
      {formToDelete && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setFormToDelete(null)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this form?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setFormToDelete(null)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={() => {
                  handleDeleteForm(formToDelete);
                  setFormToDelete(null);
                }}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Homepage;
