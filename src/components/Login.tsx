import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";

export const Login = () => {
    const { login } = useUser();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) {
            setError("Please enter both name and email.");
            return;
        }
        setError("");
        login(name, email);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f5f6fa",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    width: "350px",
                    padding: "2rem",
                    borderRadius: "1rem",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                    background: "#fff",
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                    <span style={{ fontSize: "3rem" }}>🔐</span>
                    <h2 style={{ fontWeight: 700, fontSize: "1.7rem", margin: "0.5rem 0" }}>
                        Welcome Back!
                    </h2>
                    <p style={{ color: "#888", fontSize: "1rem" }}>
                        Please login to continue
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "1rem" }}>
                        <label
                            style={{
                                fontWeight: 600,
                                color: "#333",
                                fontSize: "1rem",
                                marginBottom: "0.3rem",
                                display: "block",
                            }}
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            style={{
                                width: "100%",
                                padding: "0.7rem",
                                fontSize: "1rem",
                                borderRadius: "0.5rem",
                                border: "1px solid #ddd",
                                marginBottom: "0.3rem",
                            }}
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                        <label
                            style={{
                                fontWeight: 600,
                                color: "#333",
                                fontSize: "1rem",
                                marginBottom: "0.3rem",
                                display: "block",
                            }}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            style={{
                                width: "100%",
                                padding: "0.7rem",
                                fontSize: "1rem",
                                borderRadius: "0.5rem",
                                border: "1px solid #ddd",
                                marginBottom: "0.3rem",
                            }}
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {error && (
                        <div
                            style={{
                                color: "#e74c3c",
                                marginBottom: "1rem",
                                fontWeight: 500,
                                textAlign: "center",
                            }}
                        >
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "0.8rem",
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            borderRadius: "0.5rem",
                            border: "none",
                            background: "#2575fc",
                            color: "#fff",
                            cursor: "pointer",
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};
