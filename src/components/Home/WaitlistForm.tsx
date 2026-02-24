import { useState } from "react";

type WaitlistFormProps = {
  closeModal?: () => void; // optional prop to close modal
};

export default function WaitlistForm({ closeModal }: WaitlistFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    designation: "",
  });
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const designations = [
    "Chef",
    "Farmer",
    "Food Content Creator",
    "Culinary Instructor",
    "Hotel Manager",
    "Restauranteur / Cafe Owner",
    "Government Body",
    "Bartender",
    "HORECA Supplier",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });

    if (type === "success" && closeModal) {
      // Close modal after 1.5 seconds, letting the toast show first
      setTimeout(() => closeModal(), 1500);
    }

    // Remove toast after 4 seconds
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        showToast("success", "You are on the waitlist!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          country: "",
          city: "",
          designation: "",
        });
      } else {
        showToast("error", data.message || "Something went wrong.");
      }
    } catch (error) {
      showToast("error", "Error submitting form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Designation</option>
          {designations.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Join Waitlist"}
        </button>
      </form>

      {/* Floating Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center px-4 py-3 rounded shadow-lg border ${
            toast.type === "success"
              ? "bg-green-100 border-green-400 text-green-800"
              : "bg-red-100 border-red-400 text-red-800"
          } animate-slide-in`}
          role="alert"
        >
          <span className="mr-2">{toast.type === "success" ? "✔️" : "❌"}</span>
          <span className="font-medium">{toast.text}</span>
        </div>
      )}
    </>
  );
}