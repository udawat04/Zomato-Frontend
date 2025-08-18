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

const TrashIcon = (props) => (
  <svg fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 17.94 6M18 18 6.06 6"
    />
  </svg>
);

const PlusIcon = (props) => (
  <svg fill="none" viewBox="0 0 18 18" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 1v16M1 9h16"
    />
  </svg>
);

const MinusIcon = (props) => (
  <svg fill="none" viewBox="0 0 18 2" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 1h16"
    />
  </svg>
);

export default function CartItem({ item, onRemove, onQtyChange }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-md p-4 flex flex-col md:flex-row md:items-center gap-5">
      <img
        src={
          item?.images[0]?.imageUrl ||
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80"
        }
        className="h-24 w-24 object-contain rounded-lg border bg-gray-50"
        alt={item.title || "not"}
      />
      <div className="flex-1 min-w-0 space-y-2">
        <p className="text-base font-medium text-gray-900">{item.itemId.foodName}</p>
        <div className="flex gap-3">
          
          <button
            onClick={() => onRemove(item._id)}
            className="inline-flex items-center text-sm text-red-500 hover:text-red-700"
          >
            <TrashIcon className="h-5 w-5 mr-2" />
            Remove
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 min-w-[120px]">
        <div className="flex items-center bg-gray-50 border border-gray-300 rounded-full px-2">
          <button
            onClick={() => onQtyChange(item._id, Math.max(1, item.quantity - 1))}
            className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="Decrease quantity"
          >
            <MinusIcon className="h-3 w-3 text-gray-900" />
          </button>
          <input
            type="text"
            value={item.quantity}
            readOnly
            className="w-8 text-center mx-1 bg-transparent text-sm font-semibold text-gray-900 outline-none"
          />
          <button
            onClick={() => onQtyChange(item._id, item.quantity + 1)}
            className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="Increase quantity"
          >
            <PlusIcon className="h-3 w-3 text-gray-900" />
          </button>
        </div>
        <div className="text-right font-bold text-gray-900">
          ₹{item.itemId.price*item.quantity}
        </div>
      </div>
    </div>
  );
}
