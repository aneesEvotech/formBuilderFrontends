import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { base_urlLink } from "../helper/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const fieldTypes = [
    { label: "Text", value: "text" },
    { label: "Number", value: "number" },
    { label: "Checkbox", value: "checkbox" },
    { label: "Multiple Choice", value: "multiple_choice" },
    { label: "Dropdown", value: "dropdown" },
];

const AddEditForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fields, setFields] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const handleAddField = () => {
        const newField = { type: "text", label: "", placeholder: "", options: [], order: fields.length + 1 }; // Default order based on the length of existing fields
        setFields([...fields, newField]);
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
        };
    }, [user]);

    const handleFieldChange = (index, key, value) => {
        const updated = [...fields];
        updated[index][key] = value;
        if (
            key === "type" &&
            (value === "dropdown" || value === "multiple_choice")
        ) {
            updated[index].options = [" "];
        }
        setFields(updated);
    };

    const handleOptionChange = (fIndex, oIndex, value) => {
        const updated = [...fields];
        updated[fIndex].options[oIndex] = value;
        setFields(updated);
    };

    const addOption = (fIndex) => {
        const updated = [...fields];
        // updated[fIndex].options.push(`Option ${updated[fIndex].options.length + 1}`);
        updated[fIndex].options.push(` `);
        setFields(updated);
    };

    const removeField = (index) => {
        const updated = fields.filter((_, i) => i !== index);
        // Re-adjust the order numbers after removal
        updated.forEach((field, i) => (field.order = i + 1));
        setFields(updated);
    };

    const handleOrderChange = (index, newOrder) => {
        const updated = [...fields];
        updated[index].order = newOrder;
        // Sort fields based on the order
        updated.sort((a, b) => a.order - b.order);
        setFields(updated);
    };

    const handleSubmit = () => {
        const userId = user.user.id;
        const payload = { title, description, fields , userId };
        axios.post(`${base_urlLink}/api/forms/add`, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => {
            toast.success('Form created successfully');
            navigate('/');
        })
        .catch(error => {
            toast.error('Error creating form: ' + error.response?.data?.message);
        });
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h3 className="mb-4">Create a New Form</h3>

                    <div className="mb-3">
                        <label className="form-label">Form Title</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter form title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Form Description</label>
                        <textarea
                            className="form-control"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>

                    {fields.sort((a, b) => a.order - b.order).map((field, index) => (
                        <div key={index} className="card mb-3 border border-primary">
                            <div className="card-body">
                                <div className="row mb-3">
                                    <div className="col-md-2">
                                        <label className="form-label">Field Type</label>
                                        <select
                                            className="form-select"
                                            value={field.type}
                                            onChange={(e) => handleFieldChange(index, "type", e.target.value)}
                                        >
                                            {fieldTypes.map((ft) => (
                                                <option key={ft.value} value={ft.value}>
                                                    {ft.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">Label</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Field label"
                                            value={field.label}
                                            onChange={(e) => handleFieldChange(index, "label", e.target.value)}
                                        />
                                    </div>

                                    {field.type !== "checkbox" && (
                                        <div className="col-md-4">
                                            <label className="form-label">Placeholder</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Field placeholder"
                                                value={field.placeholder}
                                                onChange={(e) => handleFieldChange(index, "placeholder", e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>

                                {(field.type === "dropdown" || field.type === "multiple_choice") && (
                                    <div className="mb-2">
                                        <label className="form-label">Options</label>
                                        {field.options.map((opt, oIndex) => (
                                            <input
                                                key={oIndex}
                                                type="text"
                                                className="form-control mb-2"
                                                value={opt}
                                                onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
                                            />
                                        ))}
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => addOption(index)}
                                        >
                                            + Add Option
                                        </button>
                                    </div>
                                )}

                                <div className="col-md-1 mb-2">
                                    <label className="form-label">Field Order</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={field.order}
                                        onChange={(e) => handleOrderChange(index, parseInt(e.target.value))}
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm mt-3"
                                    onClick={() => removeField(index)}
                                >
                                    Remove Field
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        className="btn btn-success mb-3"
                        onClick={handleAddField}
                    >
                        + Add Field
                    </button>

                    <div>
                        <button className="btn btn-primary me-2" onClick={handleSubmit}>
                            Save Form
                        </button>
                        <button className="btn btn-success" onClick={() => navigate(-1)}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEditForm;
