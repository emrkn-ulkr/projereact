import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "", terms: false });
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    useEffect(() => {
        const emailError = emailRegex.test(form.email) ? "" : "Geçerli bir email giriniz.";
        const passwordError = passwordRegex.test(form.password)
            ? ""
            : "Şifre güçlü olmalı: min 8 karakter, büyük/küçük harf, sayı ve özel karakter";
        const termsError = form.terms ? "" : "Şartları kabul etmelisiniz.";

        setErrors({ email: emailError, password: passwordError, terms: termsError });
        setIsValid(!emailError && !passwordError && !termsError);
    }, [form]);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/success");
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
            <h2>Login</h2>

            <div>
                <label>Email</label>
                <input name="email" value={form.email} onChange={handleChange} />
                {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
            </div>

            <div>
                <label>Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} />
                {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
            </div>

            <div>
                <label>
                    <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} /> Şartları kabul ediyorum
                </label>
                {errors.terms && <div style={{ color: "red" }}>{errors.terms}</div>}
            </div>

            <button type="submit" disabled={!isValid}>Login</button>
        </form>
    );
}
