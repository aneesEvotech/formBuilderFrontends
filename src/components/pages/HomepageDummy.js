import React from "react";

const HomepageDummy = () => {
    return (
        <div className="p-4">
            <div className="text-center mb-5">
                <h1 className="fw-bold">📋 Form Builder</h1>
                <p className="text-muted">Manage your forms, view submissions, and monitor activity with ease.</p>
            </div>

            <div className="row g-4">
                {/* My Forms */}
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body text-center">
                            <h5 className="card-title">🗂️ My Forms</h5>
                            <p className="card-text text-muted">Create and manage your forms and folders.</p>
                            <button className="btn btn-outline-primary">Open Forms</button>
                        </div>
                    </div>
                </div>

                {/* Submissions */}
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body text-center">
                            <h5 className="card-title">📥 Submissions</h5>
                            <p className="card-text text-muted">View and analyze form responses from users.</p>
                            <button className="btn btn-outline-success">View Submissions</button>
                        </div>
                    </div>
                </div>

                {/* Analytics */}
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body text-center">
                            <h5 className="card-title">📊 Analytics</h5>
                            <p className="card-text text-muted">Track performance, response rates, and trends.</p>
                            <button className="btn btn-outline-info">View Analytics</button>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body text-center">
                            <h5 className="card-title">💬 Messages</h5>
                            <p className="card-text text-muted">Stay connected with form submitters and collaborators.</p>
                            <button className="btn btn-outline-warning">Check Inbox</button>
                        </div>
                    </div>
                </div>

                {/* Profile Settings */}
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body text-center">
                            <h5 className="card-title">👤 Profile Settings</h5>
                            <p className="card-text text-muted">Update your user information and preferences.</p>
                            <button className="btn btn-outline-dark">Edit Profile</button>
                        </div>
                    </div>
                </div>

                {/* Support / Help */}
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body text-center">
                            <h5 className="card-title">🆘 Support</h5>
                            <p className="card-text text-muted">Need help? Visit our help center or contact support.</p>
                            <button className="btn btn-outline-danger">Get Help</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomepageDummy;
