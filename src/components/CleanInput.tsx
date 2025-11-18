import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  url: string;
  comment: string;
}

interface FormErrors {
  name: string;
  email: string;
  url: string;
  comment: string;
}

const CleanInput = () => {
  // One object for all fields
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    url: "",
    comment: "",
  });

  // Error messages for each field
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    url: "",
    comment: "",
  });

  // Validation functions for each field
  const validateName = (value: string): string => {
    if (!value.trim()) {
      return "Name is required";
    }
    if (value.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    if (value.trim().length > 50) {
      return "Name must be less than 50 characters";
    }
    return "";
  };

  const validateEmail = (value: string): string => {
    if (!value.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validateUrl = (value: string): string => {
    if (!value.trim()) {
      return "URL is required";
    }
    try {
      new URL(value);
      return "";
    } catch {
      return "Please enter a valid URL (e.g., https://example.com)";
    }
  };

  const validateComment = (value: string): string => {
    if (!value.trim()) {
      return "Comment is required";
    }
    if (value.trim().length < 10) {
      return "Comment must be at least 10 characters";
    }
    if (value.trim().length > 500) {
      return "Comment must be less than 500 characters";
    }
    return "";
  };

  // Generic input handler with real-time validation
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate the field in real-time
    let error = "";
    switch (name) {
      case "name":
        error = validateName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "url":
        error = validateUrl(value);
        break;
      case "comment":
        error = validateComment(value);
        break;
    }

    // Update errors
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Final validation check before submit
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const urlError = validateUrl(formData.url);
    const commentError = validateComment(formData.comment);

    // Update all errors
    setErrors({
      name: nameError,
      email: emailError,
      url: urlError,
      comment: commentError,
    });

    // If any errors exist, don't submit
    if (nameError || emailError || urlError || commentError) {
      console.log("Form has errors, cannot submit");
      return;
    }

    console.log("Submitting:", formData);

    // ---- Example API call (POST to backend) ----
    try {
      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Saved:", data);
    } catch (err) {
      console.error("Error:", err);
    }

    // Clear all fields after submitting
    setFormData({
      name: "",
      email: "",
      url: "",
      comment: "",
    });

    // Clear all errors
    setErrors({
      name: "",
      email: "",
      url: "",
      comment: "",
    });
  };

  // Check if form is valid (no errors and all fields filled)
  const isFormValid =
    !errors.name &&
    !errors.email &&
    !errors.url &&
    !errors.comment &&
    formData.name &&
    formData.email &&
    formData.url &&
    formData.comment;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className={`border p-2 w-full rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`border p-2 w-full rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* URL Field */}
        <div>
          <input
            name="url"
            type="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="Enter website URL (e.g., https://example.com)"
            className={`border p-2 w-full rounded ${
              errors.url ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.url && (
            <p className="text-red-500 text-sm mt-1">{errors.url}</p>
          )}
        </div>

        {/* Comment Field */}
        <div>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Write your comment (min 10 characters)"
            rows={4}
            className={`border p-2 w-full rounded ${
              errors.comment ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
          )}
          <p className="text-gray-500 text-sm mt-1">
            {formData.comment.length}/500 characters
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`px-4 py-2 rounded font-medium ${
            isFormValid
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CleanInput;