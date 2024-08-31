import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import heroImage from '../assets/images/hero-image.png';
import heroBackground from '../assets/images/hero-background.png';
import logo from '../assets/images/logo.png';
import section2 from '../assets/images/section2.png';
import section3 from '../assets/images/section3.png';

const HomePage = () => {

  const navigate = useNavigate();

  const handleScroll = (event, targetId) => {
    event.preventDefault();
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    company: '',
    jobTitle: '',
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(formData).toString();
    navigate(`/qr-code-generator/digital-card?${params}`);
  };

  return (
    <div data-theme="homepage">
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="text-xl font-bold">Coming Soon!</h2>
              <p className="mt-2">We are working hard to bring you this feature. Stay tuned!</p>
              <div className="modal-action">
                <button
                  onClick={handleClose}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <header className="bg-base py-5 shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <img src={logo} alt="Banavio" className='w-10 h-10 filter invert' />
          </div>
          <ul className="flex items-center space-x-6">
            <li><a href="#about" onClick={(event) => handleScroll(event, 'about')} className="text-gray-600 hover:text-black">About</a></li>
            <li><a href="#createYourCard" onClick={(event) => handleScroll(event, 'createYourCard')} className="text-gray-600 hover:text-black">Free D-Card</a></li>
            <li><a href="#" onClick={handleOpen} className="btn btn-warning">Explore Beta</a></li>
          </ul>
        </nav>
      </header>
      <section className='py-10' style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
      }}>
        <div className="container flex flex-col lg:flex-row w-full mx-auto">
          <div className="flex-1 flex items-center justify-center">
            <div>
              <b className='text-gray-700'>CONNECT SMARTER, STAND DIGITALLY.</b>
              <h1 className="text-5xl text-black font-bold mb-4">Networking, Reimagined.</h1>
              <p className="text-lg text-gray-600 mb-8">Say goodbye to outdated paper business cards and hello to Banavio's sleek, digital alternatives. Our customizable connection.</p>
              <a href='#createYourCard' onClick={(event) => handleScroll(event, 'createYourCard')} className="btn btn-primary btn-lg">Create Free D-Card</a>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img src={heroImage} alt="Digital Card" />
          </div>
        </div>

      </section>

      <section className="py-20">
  <div className="container mx-auto w-fit text-center">
    <h2 className="text-4xl font-bold mb-8">Elevate Your Networking</h2>
    <p className="text-lg text-gray-600 mb-12">
      Say goodbye to outdated paper business cards and hello to Banavio's sleek, digital alternatives.<br/> 
      Our customizable digital cards.
    </p>
  </div>
  
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row items-start space-x-20 justify-center">
      <div className="flex flex-col mb-8 lg:mb-0 hidden md:block">
        <img src={section2} alt="Banavio" className="w-full h-80 max-w-md lg:max-w-full" />
      </div>
      
      <div className="flex flex-col">
        <div className="mb-6">
          <h3 className="font-bold">Customizable Designs</h3>
          <p className="text-gray-600">Reflect your unique brand with personalized digital cards.</p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold">Instant Sharing</h3>
          <p className="text-gray-600">Seamlessly share your details with just a scan.</p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold">Eco-Friendly</h3>
          <p className="text-gray-600">Reduce paper waste and embrace a sustainable future.</p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold">Professional Impact</h3>
          <p className="text-gray-600">Make a memorable first impression that lasts.</p>
        </div>
      </div>
    </div>
  </div>
</section>

      <section className="bg-accent lg:h-screen" id="createYourCard">
        <div className="container flex flex-col lg:flex-row text-center">
          <div className="flex-1 flex h-fit w-screen h-screen">
            <img src={section3} alt="Digital Card" className='w-full' />
          </div>
          <div className="flex-1 flex items-center py-10 justify-center w-screen lg:bg-accent bg-base-100">
            <div className='form'>
              <h2 className="text-4xl font-bold mb-4 text-black">Create Free Digital Card</h2>
              <p className="text-md text-gray-700 mb-8">Fill the following information and get your free digital card.</p>
              <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} className="input w-full" required/>
                  <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} className="input w-full" required/>
                  <input type="text" placeholder="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="input w-full" required/>
                  <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} className="input w-full" required/>
                  <input type="text" placeholder="Company" name="company" value={formData.company} onChange={handleChange} className="input w-full" />
                  <input type="text" placeholder="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="input w-full" />
                </div>
                <div className="mt-4 text-left">
                  <label className="flex items-center space-x-2">
                    <input id="termsConditions" type="checkbox" className="checkbox checkbox-primary" required/>
                    <span for="termsConditions">Click on checkbox to agree on Term & Conditions</span>
                  </label>
                </div>
                <button className="btn btn-primary w-full mt-4">Create D-Card</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-black text-white py-20" id="about">
        <div className="container mx-auto px-4 text-center">
          <img src={logo} alt="Banavio" className='w-10 h-10 mx-auto mb-8' />
          <div className="flex justify-center space-x-4 my-4">
            <a href="https://discord.gg/V39CGZ3w" className="text-[#5865F2] text-3xl"><i className="fab fa-discord"></i></a>
            <a href="https://www.youtube.com/@banavio" className="text-[#FD3832] text-3xl"><i className="fab fa-youtube"></i></a>
            <a href="https://www.linkedin.com/company/banavio" className="text-[#007EBB] text-3xl"><i className="fab fa-linkedin"></i></a>
            <a href="https://www.facebook.com/profile.php?id=61565175390764" className="text-[#0064bb] text-3xl"><i className="fab fa-facebook"></i></a>
            <a href="https://github.com/Banavio/" className="text-[#3ea4c3] text-3xl"><i className="fab fa-github"></i></a>
          </div>
          <p>&copy; 2024 BANAVIO. All rights reserved. Created with love by BANAVIO</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
