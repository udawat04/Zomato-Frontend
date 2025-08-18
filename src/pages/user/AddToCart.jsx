import React, { useEffect, useState } from "react";
import CartItem from "../../components/cart/CartItem";
import Suggestions from "../../components/cart/Suggestions";
import CartSummary from "../../components/cart/CartSummary";
import VoucherForm from "../../components/cart/VoucherForm";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = "http://localhost:5000";




const suggestions = [
  {
    id: 1,
    title: "iMac 27”",
    desc: "This generation has some improvements, including a longer continuous battery life.",
    image: {
      light:
        "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
    },
    price: 299,
    priceOld: 399,
  },
  {
    id: 2,
    title: "Playstation 5",
    desc: "This generation has some improvements, including a longer continuous battery life.",
    image: {
      light:
        "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg",
    },
    price: 499,
    priceOld: 799,
  },
  {
    id: 3,
    title: "Apple Watch Series 8",
    desc: "This generation has some improvements, including a longer continuous battery life.",
    image: {
      light:
        "https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg",
    },
    price: 1199,
    priceOld: 1799,
  },
];

export default function AddToCart() {
    const token = localStorage.getItem("token");
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const result = await axios.get(`${baseUrl}/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result.data,"cart items fetch")
      setCart(result.data);
    } catch (error) {
      console.error("Error fetching cart", error);
      // toast.error("Failed to fetch cart");
    }
  };
  useEffect(()=>{
    fetchCart()
  },[])

  // Calculate summary (adjust as needed)
   const cartTotal = cart.reduce(
     (sum, item) => sum + Number(item.itemId.price * item.quantity),
     0
   );

  const originalPrice = cartTotal || 7592; // from your sample
  const savings = 299;
  const pickup = 99;
  const tax = 799;
//   const total = cartTotal - savings + pickup + tax;
const total = cartTotal


  const handleQtyChange = (id, qty) => {
   
    const updateCart = async()=>{
      const result = await axios.put(`${baseUrl}/cart/update-cart`, {
        cartId: id,
        quantity: qty,
      });
      console.log(result.data, "cart update");
       setCart((cart) =>
         cart.map((item) =>
           item._id === id
             ? {
                 ...item,
                 quantity: qty,
                 price: Math.round(item.itemId.price * qty),
                 
               }
             : item
         )
       );
    }
    updateCart()
   
  };
  
  const handleRemove = async(cartId) =>{
    // console.log(cartId)
    // const ctr = cart.filter((ct)=>ct._id!==cartId)
    // console.log(ctr)
    try {
        const result = await axios.delete(`${baseUrl}/cart/remove`, {
         
          data: { cartId }, 
        });
    
        if (result.status === 200) {
            setCart((prev) => prev.filter((ct) => ct._id !== cartId));
          toast.success("Successfully Deleted");
    
          
        }
      } catch (error) {
        console.error("Error deleting from cart", error);
        toast.error("Failed to delete item from cart");
      }
  }

  
  return (
    <>

        <Header/>
        <Navbar/>

      <section className="bg-gray-50 py-10 min-h-screen">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            🛒 Shopping Cart
          </h2>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="lg:flex-1 w-full space-y-6">
              <div className="space-y-6">
                {cart.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    onRemove={handleRemove}
                    onQtyChange={handleQtyChange}
                  />
                ))}
              </div>
              <Suggestions list={suggestions} />
            </div>
            <div className="w-full lg:w-[350px] space-y-6">
              <CartSummary
                original={originalPrice}
                savings={savings}
                pickup={pickup}
                tax={tax}
                total={total}
                cart = {cart}
              />
              <VoucherForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
