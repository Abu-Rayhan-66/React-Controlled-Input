import { useState } from "react";


const SingleHandlerForEveryInput = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to: ${value}`);
    
    setFormData((prev) => {
      console.log("Previous state:", prev);
      const newState = { ...prev, [name]: value };
      console.log("New state:", newState);
      return newState;
    });
  };


  return (
    <div className="p-6">
    <form className="space-y-4">
      <input
        name="name"  // ← Links to formData.name
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 border rounded"
      />

      <input
        name="email"  // ← Links to formData.email
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 border rounded"
      />

      <input
        name="age"  // ← Links to formData.age
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
        className="w-full p-2 border rounded"
      />
    </form>

    {/* Show current state */}
    <div className="mt-4 p-4 bg-gray-700 rounded">
      <h3 className="font-bold">Current State:</h3>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  </div>
  );
};

export default SingleHandlerForEveryInput;