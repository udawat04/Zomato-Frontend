import React from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'

const OfferPage = () => {
  return (
    <div className="font-sans">
      <Header />
      <Navbar />

      <main className="py-5 px-4 md:px-8 bg-[#f8f8f8] min-h-screen">
        <h1>Offer Comming Soon</h1>
      </main>
    </div>
  );
}

export default OfferPage