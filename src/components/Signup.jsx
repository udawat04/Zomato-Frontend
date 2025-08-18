/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = "http://localhost:5000";

const Signup = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "user";

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Common fields
    name: "",
    email: "",
    phone: "",
    password: "",
    agreed: false,
    images: [],

    // Restaurant specific
    restaurantName: "",
    ownerName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    restaurantType: "Mixed",
    open: "",
    close: "",

    // Delivery Boy specific
    vehicleType: "",
    licenseNumber: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, images: Array.from(files) });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const canSubmit = () => {
    if (role === "restaurant") {
      return (
        formData.restaurantName &&
        formData.ownerName &&
        formData.email &&
        formData.phone &&
        formData.password &&
        formData.street &&
        formData.city &&
        formData.state &&
        formData.zip &&
        formData.open &&
        formData.close &&
        formData.agreed
      );
    }
    if (role === "delivery") {
      return (
        formData.name &&
        formData.email &&
        formData.phone &&
        formData.password &&
        formData.vehicleType &&
        formData.licenseNumber &&
        formData.agreed
      );
    }
    return (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.password &&
      formData.agreed
    );
  };

  // Helper: Promise-based geolocation
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by your browser.");
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          reject("Unable to retrieve location. Please allow permission.");
        }
      );
    });
  };

  // --- Submit functions for each role ---
  const submitRestaurant = async () => {
    setLoading(true);
    try {
      const { latitude, longitude } = await getCurrentLocation();
      setCoordinates({ latitude, longitude });

      const form = new FormData();
      form.append("restaurantName", formData.restaurantName);
      form.append("ownerName", formData.ownerName);
      form.append("email", formData.email);
      form.append("password", formData.password);
      form.append("phone", formData.phone);
      form.append("restaurantType", formData.restaurantType);
      form.append("street", formData.street);
      form.append("city", formData.city);
      form.append("state", formData.state);
      form.append("zip", formData.zip);
      form.append("open", formData.open);
      form.append("close", formData.close);
      form.append("latitude", latitude);
      form.append("longitude", longitude);

      formData.images.forEach((file) => form.append("images", file));

      await axios.post(`${baseUrl}/rest/create`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Restaurant account created!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(
        typeof error === "string" ? error : "Error creating restaurant account."
      );
    }
    setLoading(false);
  };

  const submitDeliveryBoy = async () => {
    setLoading(true);
    try {
      const { latitude, longitude } = await getCurrentLocation();
      setCoordinates({ latitude, longitude });

      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("password", formData.password);
      form.append("vehicleType", formData.vehicleType);
      form.append("licenseNumber", formData.licenseNumber);
      form.append("latitude", latitude);
      form.append("longitude", longitude);

      formData.images.forEach((file) => form.append("images", file));

      const result = await axios.post(`${baseUrl}/delivery-boy/create`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result.status === 200) {
        toast.success("Delivery boy account created!");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        typeof error === "string"
          ? error
          : "Error creating delivery boy account."
      );
    }
    setLoading(false);
  };

  const submitUser = async () => {
    setLoading(true);
    try {
      const { latitude, longitude } = await getCurrentLocation();
      setCoordinates({ latitude, longitude });

      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("password", formData.password);
      form.append("latitude", latitude);
      form.append("longitude", longitude);

      formData.images.forEach((file) => form.append("images", file));

      await axios.post(`${baseUrl}/users/create`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("User account created!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(
        typeof error === "string" ? error : "Error creating user account."
      );
    }
    setLoading(false);
  };

  const handleSubmit = () => {
    if (!canSubmit()) return;

    if (role === "restaurant") submitRestaurant();
    else if (role === "delivery") submitDeliveryBoy();
    else submitUser();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-[95%] max-w-3xl max-h-[90vh] overflow-y-auto relative">
          {/* Close Button */}
          <button
            className="absolute top-2 right-3 text-2xl font-bold hover:text-red-500"
            onClick={() => {
              role === "restaurant"
                ? navigate("/restaurant/welcome")
                : navigate("/");
            }}
          >
            ×
          </button>

          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            {role === "restaurant"
              ? "Restaurant Owner Sign Up"
              : role === "delivery"
              ? "Delivery Boy Sign Up"
              : "User Sign Up"}
          </h2>

          <div className="grid gap-4">
            {role === "restaurant" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="restaurantName"
                  placeholder="Restaurant Name"
                  className="p-3 border rounded"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="ownerName"
                  placeholder="Owner Name"
                  className="p-3 border rounded"
                  onChange={handleChange}
                />
              </div>
            )}

            {role !== "restaurant" && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="p-3 border rounded"
                onChange={handleChange}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="p-3 border rounded"
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="p-3 border rounded"
                onChange={handleChange}
              />
            </div>

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-3 border rounded"
              onChange={handleChange}
            />

            {role === "restaurant" && (
              <>
                <h3 className="font-semibold text-lg mt-6">Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="street"
                    placeholder="Street"
                    className="p-3 border rounded"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="p-3 border rounded"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    className="p-3 border rounded"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="Zip Code"
                    className="p-3 border rounded"
                    onChange={handleChange}
                  />
                </div>

                <select
                  name="restaurantType"
                  className="w-full p-3 border rounded"
                  onChange={handleChange}
                >
                  <option value="Mixed">Mixed</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                </select>

                <h3 className="font-semibold text-lg mt-6">Opening Hours</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="open"
                    placeholder="Open (e.g. 9:00 AM)"
                    className="p-3 border rounded"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="close"
                    placeholder="Close (e.g. 10:00 PM)"
                    className="p-3 border rounded"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {role === "delivery" && (
              <>
                <input
                  type="text"
                  name="vehicleType"
                  placeholder="Vehicle Type (Bike/Car)"
                  className="p-3 border rounded"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="licenseNumber"
                  placeholder="License Number"
                  className="p-3 border rounded"
                  onChange={handleChange}
                />
              </>
            )}

            <div>
              <label className="block text-sm font-semibold mb-1">
                Upload Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="w-full p-2 border rounded"
                name="images"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                name="agreed"
                onChange={handleChange}
                className="mt-1 mr-2"
                checked={formData.agreed}
              />
              <p className="text-sm text-gray-600">
                I agree to Zomato’s Terms of Service, Privacy Policy and Content
                Policies
              </p>
            </div>

            <button
              disabled={!canSubmit() || loading}
              onClick={handleSubmit}
              className={`w-full py-3 rounded text-white font-semibold transition ${
                canSubmit() && !loading
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating account...
                </div>
              ) : (
                "Create account"
              )}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
};

export default Signup;

/* eslint-disable no-unused-vars */
// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// const baseUrl = "http://localhost:5000";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     agreed: false,
//   });

//   const navigate = useNavigate();
//   const location = useLocation();
//   const role = location.state?.role || "user"; // default role

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const canSubmit =
//     formData.name &&
//     formData.email &&
//     formData.phone &&
//     formData.password &&
//     formData.agreed;

//   const handleSubmit = async () => {
//     if (!canSubmit) return;

//     console.log("Submitting:", formData, "Role:", role);

//     if (role === "restaurant") {
//       const res = await axios.post(`${baseUrl}/rest/create`, {
//         ...formData,
//       });
//       console.log(res.data, "restaurant signup data");
//       navigate("/login");
//     } else if (role === "delivery") {
//       const res = await axios.post(`${baseUrl}/delivery-boy/create`, {
//         ...formData,
//       });
//       console.log(res.data, "delivery-boy signup data");
//       navigate("/login");
//     } else {
//       const res = await axios.post(`${baseUrl}/users/create`, {
//         ...formData,
//       });
//       console.log(res.data, "User signup data");
//       navigate("/login");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-md shadow-lg w-96 relative">
//         {/* Close Button */}
//         <button
//           className="absolute top-2 right-3 text-xl font-bold"
//           onClick={() => {
//             role === "restaurant"
//               ? navigate("/restaurant/welcome")
//               : navigate("/");
//           }}
//         >
//           ×
//         </button>

//         <h2 className="text-2xl font-semibold mb-4">
//           {role === "restaurant"
//             ? "Restaurant Owner Sign up"
//             : role === "delivery"
//             ? "Delivery Boy Sign up"
//             : "User Sign up"}
//         </h2>

//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           className="w-full p-3 mb-3 border border-gray-300 rounded"
//           onChange={handleChange}
//           value={formData.name}
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="w-full p-3 mb-3 border border-gray-300 rounded"
//           onChange={handleChange}
//           value={formData.email}
//         />

//         <input
//           type="tel"
//           name="phone"
//           placeholder="Phone Number"
//           className="w-full p-3 mb-3 border border-gray-300 rounded"
//           onChange={handleChange}
//           value={formData.phone}
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="w-full p-3 mb-3 border border-gray-300 rounded"
//           onChange={handleChange}
//           value={formData.password}
//         />

//         <div className="flex items-start mb-3">
//           <input
//             type="checkbox"
//             name="agreed"
//             onChange={handleChange}
//             className="mt-1 mr-2"
//             checked={formData.agreed}
//           />
//           <p className="text-sm text-gray-600">
//             I agree to Zomato’s{" "}
//             <span className="text-red-500 font-semibold cursor-pointer">
//               Terms of Service
//             </span>
//             ,{" "}
//             <span className="text-red-500 font-semibold cursor-pointer">
//               Privacy Policy
//             </span>{" "}
//             and{" "}
//             <span className="text-red-500 font-semibold cursor-pointer">
//               Content Policies
//             </span>
//           </p>
//         </div>

//         <button
//           disabled={!canSubmit}
//           onClick={handleSubmit}
//           className={`w-full py-3 rounded text-white ${
//             canSubmit
//               ? "bg-red-500 hover:bg-red-600"
//               : "bg-gray-300 cursor-not-allowed"
//           }`}
//         >
//           Create account
//         </button>

//         <div className="my-3 text-center text-gray-400">or</div>

//         <button className="w-full py-3 border rounded flex items-center justify-center gap-2">
//           <img
//             src="https://developers.google.com/identity/images/g-logo.png"
//             alt="Google"
//             className="w-5 h-5"
//           />
//           Sign in with Google
//         </button>

//         <p className="text-center mt-4 text-sm">
//           Already have an account?{" "}
//           <span
//             className="text-red-500 font-semibold cursor-pointer"
//             onClick={() => navigate("/login")}
//           >
//             Log in
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;
