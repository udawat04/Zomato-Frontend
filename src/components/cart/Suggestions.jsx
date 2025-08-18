import React from "react";

const HeartIcon = ({ className = "" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24">
    <path
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
    />
  </svg>
);

export default function Suggestions({ list }) {
  return (
    <section className="mt-8">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        People also bought
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {list.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-gray-200 bg-white shadow p-6 flex flex-col items-center space-y-4"
          >
            <img
              src={item.image.light}
              alt={item.title}
              className="h-28 w-28 object-contain rounded-lg"
            />
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900">
                {item.title}
              </p>
              <p className="mt-2 text-sm text-gray-500">{item.desc}</p>
            </div>
            <div>
              <span className="text-base line-through text-gray-400">
                ${item.priceOld}
              </span>{" "}
              <span className="text-lg font-bold text-red-600">
                ${item.price}
              </span>
            </div>
            <div className="flex gap-3">
              <button className="rounded-full border border-gray-300 w-9 h-9 flex items-center justify-center hover:bg-gray-100">
                <HeartIcon className="h-5 w-5 text-gray-400" />
              </button>
              <button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white w-28 h-9 flex items-center justify-center font-bold transition">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
