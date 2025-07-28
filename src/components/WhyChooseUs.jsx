import React from "react";
import foodImage from "../assets/chicken.jpeg"; // Use your actual image path

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-16 flex flex-col md:flex-row items-center">
      {/* Left Image Section */}
      <div className="relative w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
        {/* Image with custom shadow */}
        <img
          src={foodImage}
          alt="Delicious Food"
          className="rounded-full w-80 h-80 object-cover"
          style={{
            boxShadow:
              "0 15px 50px 0 rgba(0,0,0,0.45), 0 4px 12px 0 rgba(0,0,0,0.15)", // Thick, soft shadow and subtle extra shadow for depth
          }}
        />
      </div>

      {/* Right Content Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
          Why Choose DeliDash? Delivering More Than Just Food!
        </h2>
        <p className="text-gray-600 mb-8 max-w-lg">
          At DeliDash, we’re committed to delivering more than just a meal—we
          deliver convenience, quality, and satisfaction, straight to your door.
        </p>

        <div className="space-y-8">
          {/* Timeline Items */}
          {[
            {
              title: "Fresh & Hot, Always:",
              text: "Your order is prepared with care and delivered at its best—fresh, hot, and ready to eat.",
            },
            {
              title: "Lightning-Fast Delivery:",
              text: "We know hunger can’t wait. That’s why our reliable team ensures your meal arrives in record time.",
            },
            {
              title: "A World of Flavors:",
              text: "From local favorites to global cuisines, we partner with the best restaurants to bring a variety of delicious options to your fingertips.",
            },
            {
              title: "Customer Satisfaction First:",
              text: "We go the extra mile to ensure your experience is flawless every time, because your happiness matters to us.",
            },
          ].map((item, idx) => (
            <div key={idx} className="relative pl-8">
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 w-3 h-3 bg-orange-500 rounded-full"></div>
              {/* Vertical line */}
              {idx !== 3 && (
                <div className="absolute left-1.5 top-5 w-0.5 h-20 bg-gray-300"></div>
              )}
              <p className="font-semibold text-gray-800">{item.title}</p>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
