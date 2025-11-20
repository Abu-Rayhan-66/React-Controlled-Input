import { useState } from "react";

interface FormData {
    name: string;
    email: string;
    age: string;
    url: string;
    password: string;
  }
  
  interface ValidationState {
    name: boolean;
    email: boolean;
    age: boolean;
    url: boolean;
    password: boolean;
  }
  
const ControlledInputFormValidation = () => {

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        age: "",
        url: "",
        password: "",
      });
    
      const [touched, setTouched] = useState<ValidationState>({
        name: false,
        email: false,
        age: false,
        url: false,
        password: false,
      });
    
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [submitMessage, setSubmitMessage] = useState("");
    
      // Validation functions
      const validateName = (name: string): boolean => {
        return name.trim().length >= 2 && name.trim().length <= 50;
      };
    
      const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
    
      const validateAge = (age: string): boolean => {
        const ageNum = parseInt(age);
        return !isNaN(ageNum) && ageNum >= 13 && ageNum <= 120;
      };
    
      const validateUrl = (url: string): boolean => {
        try {
          new URL(url);
          return url.startsWith("http://") || url.startsWith("https://");
        } catch {
          return false;
        }
      };
    
      const validatePassword = (password: string): boolean => {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        return hasMinLength && hasUpperCase && hasLowerCase && hasNumber;
      };
    
      // Check validity
      const isValid: ValidationState = {
        name: validateName(formData.name),
        email: validateEmail(formData.email),
        age: validateAge(formData.age),
        url: validateUrl(formData.url),
        password: validatePassword(formData.password),
      };
    
      // Handle input change
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      // Handle blur (when user leaves field)
      const handleBlur = (fieldName: keyof ValidationState) => {
        setTouched((prev) => ({
          ...prev,
          [fieldName]: true,
        }));
      };
    
      // Handle form submit
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // Mark all fields as touched
        setTouched({
          name: true,
          email: true,
          age: true,
          url: true,
          password: true,
        });
    
        // Check if all fields are valid
        if (
          isValid.name &&
          isValid.email &&
          isValid.age &&
          isValid.url &&
          isValid.password
        ) {
          setIsSubmitting(true);
          setSubmitMessage("");
    
          try {
            // POST to database
            const response = await fetch("http://localhost:3000/api/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                age: parseInt(formData.age),
                url: formData.url,
                password: formData.password, // Note: In production, hash this on backend!
              }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
              setSubmitMessage("✅ User registered successfully!");
              console.log("User created:", data);
    
              // Reset form
              setFormData({
                name: "",
                email: "",
                age: "",
                url: "",
                password: "",
              });
              setTouched({
                name: false,
                email: false,
                age: false,
                url: false,
                password: false,
              });
            } else {
              setSubmitMessage(`❌ Error: ${data.message || "Registration failed"}`);
              console.error("Error response:", data);
            }
          } catch (error) {
            console.error("Network error:", error);
            setSubmitMessage("❌ Failed to connect to server. Please try again.");
          } finally {
            setIsSubmitting(false);
          }
        } else {
          console.log("Form has validation errors");
          setSubmitMessage("❌ Please fix all validation errors before submitting");
        }
      };
    
      // Check if form is completely valid
      const isFormValid = Object.values(isValid).every((v) => v === true);

    return (
        <div className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">User Registration</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur("name")}
              placeholder="Enter your name"
              disabled={isSubmitting}
              className={`w-full p-2 border rounded disabled:bg-gray-100 ${
                touched.name
                  ? isValid.name
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {touched.name && !isValid.name && (
              <p className="text-red-500 text-sm mt-1">
                Name must be 2-50 characters
              </p>
            )}
          </div>
  
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
              placeholder="Enter your email"
              disabled={isSubmitting}
              className={`w-full p-2 border rounded disabled:bg-gray-100 ${
                touched.email
                  ? isValid.email
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {touched.email && !isValid.email && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid email address
              </p>
            )}
          </div>
  
          {/* Age Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              onBlur={() => handleBlur("age")}
              placeholder="Enter your age"
              disabled={isSubmitting}
              className={`w-full p-2 border rounded disabled:bg-gray-100 ${
                touched.age
                  ? isValid.age
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {touched.age && !isValid.age && (
              <p className="text-red-500 text-sm mt-1">
                Age must be between 13 and 120
              </p>
            )}
          </div>
  
          {/* URL Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Website URL</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              onBlur={() => handleBlur("url")}
              placeholder="https://example.com"
              disabled={isSubmitting}
              className={`w-full p-2 border rounded disabled:bg-gray-100 ${
                touched.url
                  ? isValid.url
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {touched.url && !isValid.url && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid URL starting with http:// or https://
              </p>
            )}
          </div>
  
          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={() => handleBlur("password")}
              placeholder="Enter your password"
              disabled={isSubmitting}
              className={`w-full p-2 border rounded disabled:bg-gray-100 ${
                touched.password
                  ? isValid.password
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {touched.password && !isValid.password && (
              <div className="text-red-500 text-sm mt-1">
                <p>Password must contain:</p>
                <ul className="list-disc list-inside">
                  <li
                    className={
                      formData.password.length >= 8 ? "text-green-600" : ""
                    }
                  >
                    At least 8 characters
                  </li>
                  <li
                    className={
                      /[A-Z]/.test(formData.password) ? "text-green-600" : ""
                    }
                  >
                    One uppercase letter
                  </li>
                  <li
                    className={
                      /[a-z]/.test(formData.password) ? "text-green-600" : ""
                    }
                  >
                    One lowercase letter
                  </li>
                  <li
                    className={
                      /[0-9]/.test(formData.password) ? "text-green-600" : ""
                    }
                  >
                    One number
                  </li>
                </ul>
              </div>
            )}
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-2 px-4 rounded font-medium ${
              isFormValid && !isSubmitting
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
  
          {/* Success/Error Message */}
          {submitMessage && (
            <div
              className={`p-3 rounded ${
                submitMessage.includes("✅")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {submitMessage}
            </div>
          )}
        </form>
      </div>
    );
};

export default ControlledInputFormValidation;