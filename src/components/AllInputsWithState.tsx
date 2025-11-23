"use client"
import { useState } from "react";

function AllInputsWithState() {
  const [formData, setFormData] = useState({
    // Text-based inputs (6)
    text: "",
    password: "",
    email: "",
    url: "",
    tel: "",
    search: "",
    
    // Number inputs (2)
    number: "",
    range: 50,
    
    // Date & Time inputs (5)
    date: "",
    time: "",
    datetimeLocal: "",
    month: "",
    week: "",
    
    // Selection inputs (2)
    checkbox: false,
    radio: "",
    
    // File & Color (2)
    file: "",
    color: "#ff0000",
    
    // Button inputs (4)
    // submit, reset, button, image are buttons not data inputs
    
    // Hidden input (1)
    hidden: "secret-value-123",
    
    // Deprecated (1)
    datetime: "" // Deprecated but still exists
  });

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;

    console.log(`Field "${name}" changed:`, type === "checkbox" ? checked : type === "file" ? files?.[0]?.name : value);

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files?.[0]?.name || "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted with data:", formData);
    alert("Form submitted! Check console for data.");
  };

  const handleReset = () => {
    setFormData({
      text: "",
      password: "",
      email: "",
      url: "",
      tel: "",
      search: "",
      number: "",
      range: 50,
      date: "",
      time: "",
      datetimeLocal: "",
      month: "",
      week: "",
      checkbox: false,
      radio: "",
      file: "",
      color: "#ff0000",
      hidden: "secret-value-123",
      datetime: ""
    });
  };

  const handleButtonClick = () => {
    alert("Button input clicked!");
  };

  const handleImageClick = () => {
    alert("Image input clicked!");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-indigo-900">
          All 23 HTML Input Types Demo
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Complete collection of every HTML input type with live state tracking!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Text & Number Inputs */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-indigo-800 border-b pb-2">
              Text & Number Inputs (8)
            </h2>

            <div className="space-y-4">
              {/* 1. Text Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700 ">
                  1. Text:
                </label>
                <input
                  type="text"
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  placeholder="Enter text"
                  className="selection:bg-blue-600 selection:text-white w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              {/* 2. Password Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  2. Password:
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              {/* 3. Email Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  3. Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              {/* 4. URL Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  4. URL:
                </label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              {/* 5. Tel Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  5. Tel:
                </label>
                <input
                  type="tel"
                  name="tel"
                  value={formData.tel}
                  onChange={handleChange}
                  placeholder="+1234567890"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              {/* 6. Search Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  6. Search:
                </label>
                <input
                  type="search"
                  name="search"
                  value={formData.search}
                  onChange={handleChange}
                  placeholder="Search..."
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              {/* 7. Number Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  7. Number:
                </label>
                <input
                  type="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  placeholder="0-100"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              {/* 8. Range Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  8. Range: <span className="text-indigo-600 font-bold">{formData.range}</span>
                </label>
                <input
                  type="range"
                  name="range"
                  value={formData.range}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full"
                />
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4 mt-6 text-indigo-800 border-b pb-2">
              Date & Time Inputs (5)
            </h2>

            <div className="space-y-4">
              {/* 9. Date Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  9. Date:
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              {/* 10. Time Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  10. Time:
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              {/* 11. DateTime Local Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  11. DateTime-Local:
                </label>
                <input
                  type="datetime-local"
                  name="datetimeLocal"
                  value={formData.datetimeLocal}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              {/* 12. Month Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  12. Month:
                </label>
                <input
                  type="month"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              {/* 13. Week Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  13. Week:
                </label>
                <input
                  type="week"
                  name="week"
                  value={formData.week}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Middle Column - Selection, File, Special Inputs */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-indigo-800 border-b pb-2">
              Selection Inputs (2)
            </h2>

            <div className="space-y-4">
              {/* 14. Checkbox Input */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={formData.checkbox}
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    14. Checkbox (I agree)
                  </span>
                </label>
              </div>

              {/* 15. Radio Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  15. Radio:
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="radio"
                      value="option1"
                      checked={formData.radio === "option1"}
                      onChange={handleChange}
                    />
                    <span className="text-sm">Option 1</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="radio"
                      value="option2"
                      checked={formData.radio === "option2"}
                      onChange={handleChange}
                    />
                    <span className="text-sm">Option 2</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="radio"
                      value="option3"
                      checked={formData.radio === "option3"}
                      onChange={handleChange}
                    />
                    <span className="text-sm">Option 3</span>
                  </label>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4 mt-6 text-indigo-800 border-b pb-2">
              File & Color (2)
            </h2>

            <div className="space-y-4">
              {/* 16. File Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  16. File:
                </label>
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>

              {/* 17. Color Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  17. Color:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-20 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <span className="text-sm text-gray-600">{formData.color}</span>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4 mt-6 text-indigo-800 border-b pb-2">
              Button Inputs (4)
            </h2>

            <div className="space-y-4">
              {/* 18. Submit Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  18. Submit:
                </label>
                <input
                  type="submit"
                  value="Submit Form"
                  onClick={handleSubmit}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 cursor-pointer text-sm font-semibold"
                />
              </div>

              {/* 19. Reset Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  19. Reset:
                </label>
                <input
                  type="reset"
                  value="Reset Form"
                  onClick={handleReset}
                  className="w-full bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer text-sm font-semibold"
                />
              </div>

              {/* 20. Button Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  20. Button:
                </label>
                <input
                  type="button"
                  value="Click Me!"
                  onClick={handleButtonClick}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer text-sm font-semibold"
                />
              </div>

              {/* 21. Image Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  21. Image (as submit):
                </label>
                <input
                  type="image"
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='40'%3E%3Crect fill='%234f46e5' width='100' height='40' rx='5'/%3E%3Ctext x='50' y='25' text-anchor='middle' fill='white' font-family='Arial' font-size='14'%3EClick Me%3C/text%3E%3C/svg%3E"
                  alt="Submit"
                  onClick={handleImageClick}
                  className="cursor-pointer hover:opacity-80"
                />
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4 mt-6 text-indigo-800 border-b pb-2">
              Hidden & Deprecated (2)
            </h2>

            <div className="space-y-4">
              {/* 22. Hidden Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  22. Hidden (not visible):
                </label>
                <input
                  type="hidden"
                  name="hidden"
                  value={formData.hidden}
                  onChange={handleChange}
                />
                <div className="p-2 bg-gray-100 rounded text-xs text-gray-600">
                  Hidden value: {formData.hidden}
                </div>
              </div>

              {/* 23. DateTime Input (Deprecated) */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  23. DateTime ⚠️ (Deprecated):
                </label>
                <input
                  type="datetime"
                  name="datetime"
                  value={formData.datetime}
                  onChange={handleChange}
                  className="w-full p-2 border border-red-300 rounded text-sm bg-red-50"
                />
                <p className="text-xs text-red-600 mt-1">
                  Don/nt use - deprecated, use datetime-local instead
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - State Display */}
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6 h-fit">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800">
              Current State (Live)
            </h2>
            <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-auto max-h-[600px]">
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </div>
            
            <div className="mt-4 p-4 bg-indigo-50 rounded">
              <h3 className="font-bold text-indigo-900 mb-2">Summary:</h3>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✅ Text-based: 6 types</li>
                <li>✅ Number: 2 types</li>
                <li>✅ Date/Time: 5 types</li>
                <li>✅ Selection: 2 types</li>
                <li>✅ File/Color: 2 types</li>
                <li>✅ Buttons: 4 types</li>
                <li>✅ Hidden: 1 type</li>
                <li>✅ Deprecated: 1 type</li>
                <li className="font-bold text-indigo-900 pt-2">Total: 23 types!</li>
              </ul>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 rounded">
              <h3 className="font-bold text-yellow-900 mb-2">Note:</h3>
              <p className="text-xs text-gray-700">
                Button inputs (submit, reset, button, image) don/nt store data in state - they trigger actions instead!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllInputsWithState;