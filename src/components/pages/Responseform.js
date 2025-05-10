import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { base_urlLink } from "../helper/config";
import { toast } from "react-toastify";

const FormResponse = () => {
    const [responses, setResponses] = useState({});
    const { id } = useParams();
    const [form, setForm] = useState(null);

    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
        };
        axios.get(`${base_urlLink}/api/forms/getbyid/${id}`)
            .then(response => {
                setForm(response.data);
            })
            .catch(error => {
                console.error('Error fetching form:', error);
            });
    }, [id]);


    const handleChange = (label, value) => {
        setResponses(prev => ({ ...prev, [label]: value }));
    };

    const handleSubmit = async () => {
        const payload = {
            formId: form._id,
            answers: Object.entries(responses).map(([label, response]) => ({
                fieldLabel: label,
                response,
            })),
        };
        try {
            const res = await axios.post(`${base_urlLink}/api/responses/responsesubmit`, payload, {
                headers: { "Content-Type": "application/json" },
            });
            toast.success("Response submitted successfully!")
            navigate('/');
            setResponses({});
        } catch (err) {
            toast.error("Response not submitted!")
            console.error("Submission failed:", err);
            alert("Submission failed!");
        }

    };

    return (
        <div className="container mt-5">
            {form ? (
                <div className="card shadow p-4">
                    <div className="card-body">
                        <h2 className="card-title mb-3">{form.title}</h2>
                        <p className="card-text text-muted">{form.description}</p>
                        <hr />

                        {form.fields.map((field, index) => (
                            <div key={index} className="mb-4">
                                <label className="form-label fw-semibold">{field.label}</label>

                                {field.type === "text" && (
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={field.placeholder}
                                        value={responses[field.label] || ""}
                                        onChange={(e) => handleChange(field.label, e.target.value)}
                                    />
                                )}

                                {field.type === "number" && (
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder={field.placeholder}
                                        value={responses[field.label] || ""}
                                        onChange={(e) => handleChange(field.label, e.target.value)}
                                    />
                                )}

                                {field.type === "checkbox" && (
                                    <div className="form-check mt-2">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`checkbox-${index}`}
                                            checked={responses[field.label] || false}
                                            onChange={(e) => handleChange(field.label, e.target.checked)}
                                        />
                                        <label className="form-check-label ms-2" htmlFor={`checkbox-${index}`}>
                                            {field.placeholder || "Check"}
                                        </label>
                                    </div>
                                )}

                                {field.type === "dropdown" && (
                                    <select
                                        className="form-select"
                                        value={responses[field.label] || ""}
                                        onChange={(e) => handleChange(field.label, e.target.value)}
                                    >
                                        <option value="">Select an option</option>
                                        {field.options.map((opt, i) => (
                                            <option key={i} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                )}

                                {field.type === "multiple_choice" && (
                                    <div className="mt-2">
                                        {field.options.map((opt, i) => (
                                            <div className="form-check" key={i}>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id={`mc-${field.label}-${i}`}
                                                    checked={(responses[field.label] || []).includes(opt)}
                                                    onChange={(e) => {
                                                        const selected = responses[field.label] || [];
                                                        const updated = e.target.checked
                                                            ? [...selected, opt]
                                                            : selected.filter(item => item !== opt);
                                                        handleChange(field.label, updated);
                                                    }}
                                                />
                                                <label className="form-check-label ms-2" htmlFor={`mc-${field.label}-${i}`}>
                                                    {opt}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="text-end">
                            <button className="btn btn-success me-2" onClick={handleSubmit}>
                                Submit Response
                            </button>
                            <button className="btn btn-success" onClick={() => navigate(-1)}>
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center mt-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="mt-3">Loading form...</p>
                </div>
            )}
        </div>
    );
};

export default FormResponse;
