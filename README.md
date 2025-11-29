# Controlled Inputs in React
 Live Demo: https://react-controlled-input.vercel.app

A comprehensive guide to understanding and using controlled inputs in React applications.

---

## 📋 Table of Contents

- [What are Controlled Inputs?](#what-are-controlled-inputs)
- [Why Use Controlled Inputs?](#why-use-controlled-inputs)
- [Benefits](#benefits)
- [When to Use Controlled Inputs](#when-to-use-controlled-inputs)
- [When NOT to Use Controlled Inputs](#when-not-to-use-controlled-inputs)
- [Code Examples](#code-examples)
- [Best Practices](#best-practices)
- [Common Mistakes](#common-mistakes)

---

## 🎯 What are Controlled Inputs?

**Controlled inputs** are form elements (input, textarea, select) whose values are controlled by React state. The input's value is always synced with the component's state, making React the "single source of truth."

### Controlled Input:
```jsx
const [value, setValue] = useState("");

<input 
  value={value}                           // ✅ Value from state
  onChange={(e) => setValue(e.target.value)} // ✅ Updates state
/>
```

### Uncontrolled Input:
```jsx
<input defaultValue="Hello" />  // ❌ DOM controls the value
```

---

## 💡 Why Use Controlled Inputs?

### 1. **Single Source of Truth**
React state is the single source of truth for the input's value. You always know the current value without querying the DOM.

```jsx
// ✅ With Controlled Input
console.log(value); // Always accurate

// ❌ With Uncontrolled Input
console.log(inputRef.current.value); // Must query DOM
```

### 2. **Predictable Behavior**
The input value is always predictable and can be easily managed, tested, and debugged.

### 3. **React Philosophy**
Controlled inputs follow React's declarative programming model - the UI is a function of state.

```
UI = f(state)
```

---

## ✨ Benefits

### 1. **Real-time Validation**
Validate input as the user types:

```jsx
const [email, setEmail] = useState("");
const [error, setError] = useState("");

const handleChange = (e) => {
  const value = e.target.value;
  setEmail(value);
  
  // Real-time validation
  if (!value.includes("@")) {
    setError("Invalid email");
  } else {
    setError("");
  }
};

return (
  <>
    <input value={email} onChange={handleChange} />
    {error && <span className="error">{error}</span>}
  </>
);
```

### 2. **Input Formatting**
Format input automatically as user types:

```jsx
const [phone, setPhone] = useState("");

const handleChange = (e) => {
  let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
  
  // Format as (XXX) XXX-XXXX
  if (value.length > 3 && value.length <= 6) {
    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
  } else if (value.length > 6) {
    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
  }
  
  setPhone(value);
};

// User types: 1234567890
// Displays: (123) 456-7890
```

### 3. **Conditional Rendering**
Show/hide UI elements based on input value:

```jsx
const [password, setPassword] = useState("");

return (
  <>
    <input 
      type="password" 
      value={password} 
      onChange={(e) => setPassword(e.target.value)} 
    />
    
    {password.length > 0 && (
      <div className="password-strength">
        Strength: {password.length < 6 ? "Weak" : "Strong"}
      </div>
    )}
  </>
);
```

### 4. **Easy Form Submission**
Access all form values directly from state:

```jsx
const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: ""
});

const handleSubmit = (e) => {
  e.preventDefault();
  
  // All values are in state - no DOM querying needed!
  console.log(formData);
  
  fetch("/api/submit", {
    method: "POST",
    body: JSON.stringify(formData)
  });
};
```

### 5. **Dependent Fields**
Update one field based on another:

```jsx
const [quantity, setQuantity] = useState(1);
const [price, setPrice] = useState(10);
const total = quantity * price;

return (
  <>
    <input 
      type="number" 
      value={quantity} 
      onChange={(e) => setQuantity(Number(e.target.value))} 
    />
    <p>Total: ${total}</p>  {/* Auto-updates! */}
  </>
);
```

### 6. **Easy Testing**
Test input behavior without DOM manipulation:

```jsx
// Easy to test
const { result } = renderHook(() => useState(""));
act(() => result.current[1]("test value"));
expect(result.current[0]).toBe("test value");
```

### 7. **Undo/Redo Functionality**
Maintain history of input changes:

```jsx
const [value, setValue] = useState("");
const [history, setHistory] = useState([""]);

const handleChange = (e) => {
  const newValue = e.target.value;
  setValue(newValue);
  setHistory([...history, newValue]);
};

const undo = () => {
  if (history.length > 1) {
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);
    setValue(newHistory[newHistory.length - 1]);
  }
};
```

### 8. **Centralized State Management**
Easily integrate with Redux, Context API, or other state management:

```jsx
// Redux example
const value = useSelector(state => state.form.email);
const dispatch = useDispatch();

<input 
  value={value}
  onChange={(e) => dispatch(updateEmail(e.target.value))}
/>
```

---

## 📅 When to Use Controlled Inputs

### ✅ **Use Controlled Inputs When:**

1. **Real-time validation is needed**
   ```jsx
   // Check password strength as user types
   const strength = calculateStrength(password);
   ```

2. **Input formatting is required**
   ```jsx
   // Format credit card: 1234 5678 9012 3456
   ```

3. **Conditional logic depends on input**
   ```jsx
   // Show "Forgot Password?" only if email is entered
   {email && <a href="/forgot">Forgot Password?</a>}
   ```

4. **Multiple fields are interdependent**
   ```jsx
   // Update total when quantity or price changes
   ```

5. **Form data needs to be accessible throughout the component**
   ```jsx
   // Use form values in multiple places
   ```

6. **Implementing search/filter functionality**
   ```jsx
   const filtered = items.filter(item => 
     item.name.includes(searchTerm)
   );
   ```

7. **Building complex forms with steps**
   ```jsx
   // Multi-step forms need to preserve state
   ```

8. **Need to programmatically set/clear values**
   ```jsx
   const clearForm = () => {
     setFormData({ name: "", email: "" });
   };
   ```

---

## 🚫 When NOT to Use Controlled Inputs

### ❌ **Consider Uncontrolled Inputs When:**

1. **Simple form with no validation**
   ```jsx
   // Basic contact form with no real-time checks
   ```

2. **File uploads**
   ```jsx
   // File inputs cannot be controlled (security reasons)
   const fileRef = useRef();
   <input type="file" ref={fileRef} />
   ```

3. **Performance-critical forms with many inputs**
   ```jsx
   // 100+ inputs might cause re-render issues
   // Use uncontrolled inputs + refs
   ```

4. **Third-party libraries that manage their own state**
   ```jsx
   // Rich text editors, date pickers often prefer uncontrolled
   ```

5. **Integrating with non-React code**
   ```jsx
   // jQuery plugins, legacy code
   ```

---

## 💻 Code Examples

### Basic Controlled Input
```jsx
import { useState } from "react";

function ControlledInput() {
  const [value, setValue] = useState("");

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type something..."
    />
  );
}
```

### Multiple Controlled Inputs
```jsx
function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="age"
        value={formData.age}
        onChange={handleChange}
      />
    </form>
  );
}
```

### Controlled Input with Validation
```jsx
function ValidatedInput() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validate = (value) => {
    if (!value) {
      setError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setError("Invalid email format");
    } else {
      setError("");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validate(value);
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={handleChange}
        className={error ? "error" : ""}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
```

### Controlled Input with Formatting
```jsx
function PhoneInput() {
  const [phone, setPhone] = useState("");

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    }
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handleChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  return (
    <input
      type="tel"
      value={phone}
      onChange={handleChange}
      placeholder="(555) 555-5555"
    />
  );
}
```

---

## 🎯 Best Practices

### 1. **Always provide both `value` and `onChange`**
```jsx
// ✅ Correct
<input value={value} onChange={handleChange} />

// ❌ Wrong (Warning: component is changing from uncontrolled to controlled)
<input onChange={handleChange} />
```

### 2. **Initialize state with appropriate default values**
```jsx
// ✅ Good
const [name, setName] = useState("");

// ❌ Bad (undefined causes controlled/uncontrolled warning)
const [name, setName] = useState();
```

### 3. **Use a single handler for multiple inputs**
```jsx
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};
```

### 4. **Handle different input types appropriately**
```jsx
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  
  setFormData(prev => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value
  }));
};
```

### 5. **Debounce expensive operations**
```jsx
import { useState, useEffect } from "react";
import { debounce } from "lodash";

const [searchTerm, setSearchTerm] = useState("");

const debouncedSearch = debounce((term) => {
  // Expensive API call
  searchAPI(term);
}, 500);

useEffect(() => {
  debouncedSearch(searchTerm);
}, [searchTerm]);
```

---

## ⚠️ Common Mistakes

### 1. **Forgetting to initialize state**
```jsx
// ❌ Wrong
const [value, setValue] = useState();

// ✅ Correct
const [value, setValue] = useState("");
```

### 2. **Not using event parameter correctly**
```jsx
// ❌ Wrong
onChange={setValue}

// ✅ Correct
onChange={(e) => setValue(e.target.value)}
```

### 3. **Mutating state directly**
```jsx
// ❌ Wrong
formData.name = "John";
setFormData(formData);

// ✅ Correct
setFormData({ ...formData, name: "John" });
```

### 4. **Not preventing default on form submit**
```jsx
// ❌ Wrong - page will reload
const handleSubmit = () => {
  console.log(formData);
};

// ✅ Correct
const handleSubmit = (e) => {
  e.preventDefault();
  console.log(formData);
};
```

### 5. **Creating new functions on every render**
```jsx
// ❌ Bad for performance
{items.map(item => (
  <input onChange={(e) => handleChange(item.id, e)} />
))}

// ✅ Better
const handleChange = useCallback((id, e) => {
  // handle change
}, []);
```

---

## 📊 Controlled vs Uncontrolled Comparison

| Feature | Controlled | Uncontrolled |
|---------|-----------|--------------|
| **Data source** | React state | DOM |
| **Real-time validation** | ✅ Easy | ❌ Difficult |
| **Formatting** | ✅ Easy | ❌ Difficult |
| **Testing** | ✅ Easy | ⚠️ Requires DOM |
| **Performance** | ⚠️ Re-renders | ✅ No re-renders |
| **Form libraries** | ✅ Full support | ⚠️ Limited |
| **File inputs** | ❌ Not possible | ✅ Required |
| **Complexity** | ⚠️ More code | ✅ Less code |

---

## 🎓 Summary

### Use Controlled Inputs for:
- ✅ Form validation
- ✅ Dynamic input formatting
- ✅ Conditional UI updates
- ✅ State management integration
- ✅ Complex form logic
- ✅ Search/filter features
- ✅ Multi-step forms

### Use Uncontrolled Inputs for:
- ✅ Simple forms
- ✅ File uploads
- ✅ Performance-critical scenarios
- ✅ Third-party integrations

---

## 📚 Additional Resources

- [React Documentation - Controlled Components](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)
- [React Hook Form](https://react-hook-form.com/) - Library for form management
- [Formik](https://formik.org/) - Another popular form library

---

## 🤝 Contributing

Feel free to contribute to this guide by submitting issues or pull requests!

---

## 📝 License

MIT License - feel free to use this guide in your projects.

---

**Made with ❤️ for React developers**