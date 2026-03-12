import React, { useState } from "react";
import "./App.css";

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = (data) => {
    let newErrors = {};

    // AGE VALIDATION
    if (data.age && (Number(data.age) < 10 || Number(data.age) > 150)) {
      newErrors.age = "Age must be between 10 and 150";
    }

    // PHONE VALIDATION
    const phonePattern = /^[0-9]{10}$/;
    if (data.phone && !phonePattern.test(data.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // EMAIL VALIDATION
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailPattern.test(data.email)) {
      newErrors.email = "Enter valid email";
    }

    // PASSWORD VALIDATION
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (data.password && !passwordPattern.test(data.password)) {
      newErrors.password =
        "Password must contain capital, small, number, special character  and minimum 8 characters";
    }

    // CONFIRM PASSWORD
    if (data.confirmPassword && data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);

    // LIVE VALIDATION
    validate(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="success-container">
        <div className="checkmark">✔</div>
        <h1>Your Registration Has Been Completed</h1>
        <p>Welcome! Your account has been created successfully.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Registration Form</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          onChange={handleChange}
          required
        />
        {errors.age && <p className="error">{errors.age}</p>}

        {/* Gender */}
        <div style={{ display: "flex", gap: "15px", margin: "10px 0" }}>
          <label>
            <input type="radio" name="gender" required /> Male
          </label>
          <label>
            <input type="radio" name="gender" /> Female
          </label>
          <label>
            <input type="radio" name="gender" /> Other
          </label>
        </div>

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <textarea
          name="address"
          placeholder="Enter Address"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default App;