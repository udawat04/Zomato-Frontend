import React, { useState } from "react";

export default function VoucherForm() {
  const [code, setCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="rounded-xl border border-gray-200 bg-white p-5 shadow-md space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 1200);
        setCode("");
      }}
    >
      <label
        htmlFor="voucher"
        className="block text-sm font-semibold text-gray-900 mb-1"
      >
        Have a voucher or gift card?
      </label>
      <div className="flex items-center gap-2">
        <input
          id="voucher"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="rounded-lg px-3 py-2 bg-gray-50 border border-gray-300 flex-1 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 text-gray-900"
          placeholder="Enter your code"
        />
        <button
          type="submit"
          className="rounded-lg px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          disabled={!code}
        >
          {submitted ? "Applied!" : "Apply"}
        </button>
      </div>
    </form>
  );
}
