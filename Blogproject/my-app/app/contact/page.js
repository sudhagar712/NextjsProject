"use client";
import { useState } from "react";

export default function Contact() {
  const [inputs, setInputs] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setInputs((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");   
    try {
      const response = await fetch("http://localhost:3000/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      const resData = await response.json();
     
      if (response.ok) {
        setMessage(resData.message || "Your message has been sent!");
        setInputs({});
      } else {
        throw new Error(resData.error || "Failed to send your message.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="flex items-center mb-4">
            <label htmlFor="name" className="w-1/4">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInput}
              value={inputs.name || ""}
              className="border rounded px-2 py-1 w-3/4"
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="email" className="w-1/4">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInput}
              value={inputs.email || ""}
              className="border rounded px-2 py-1 w-3/4"
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="message" className="w-1/4">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              onChange={handleInput}
              value={inputs.message || ""}
              className="border rounded px-2 py-1 w-3/4"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-violet-500 hover:bg-violet-600 shadow-md text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
        {message && <p className="text-green-500 mt-4">{message}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </main>
    </>
  );
}
