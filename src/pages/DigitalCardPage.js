import React, { useState, useEffect } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const DigitalCardPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        phoneNumber: '',
        email: '',
        jobTitle: '',
    });

    // eslint-disable-next-line
    const [dummyData, setDummyData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        company: 'Banavio',
        phoneNumber: '+1234567890',
        email: 'banavio@example.com',
        jobTitle: 'Product Manager',    
    });

    const [formUpdated, setFormUpdated] = useState(false);

    const location = useLocation();

    // Parse URL parameters and set form data
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const loadedData = {
            firstName: params.get('firstName') || '',
            lastName: params.get('lastName') || '',
            company: params.get('company') || '',
            phoneNumber: params.get('phoneNumber') || '',
            email: params.get('email') || '',
            jobTitle: params.get('jobTitle') || '',
        };
        setFormData(loadedData);
    }, [location.search]);

    // Update URL when form data changes
    useEffect(() => {
        // const query = new URLSearchParams(formData).toString();
        const filteredParams = Object.entries(formData)
            .filter(([key, value]) => value.trim() !== '') // Filter out empty values
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        console.log(filteredParams);
        if (filteredParams) {
            window.history.replaceState(null, '', `?${filteredParams}`);
            setFormUpdated(true);
        }
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDownload = () => {
        const cardElement = document.getElementById('digitalCard');
        toPng(cardElement)
            .then((dataUrl) => {
                saveAs(dataUrl, `dc_${formData.firstName}_${formData.lastName}.png`);
            })
            .catch((err) => {
                console.error('Error generating image', err);
            });
    };

    const generateVCard = () => {
        const { firstName, lastName, company, phoneNumber, email, jobTitle } = formUpdated ? formData : dummyData;
        
        return `BEGIN:VCARD
VERSION:4.0
N:${lastName};${firstName};;;
FN:${firstName} ${lastName}
ORG:${company}
TEL;TYPE=WORK,VOICE:${phoneNumber}
EMAIL;TYPE=WORK:${email}
TITLE:${jobTitle}
URL;TYPE=WEBSITE:https://www.linkedin.com/company/banavio
END:VCARD`;
    };

    return (
        <div className="p-5 shadow-md rounded-lg flex flex-col items-center bg-base-100">
            <div className="w-full max-w-md space-y-4 mb-6">
                <form className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                className="input input-bordered w-full"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                className="input input-bordered w-full"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            className="input input-bordered w-full"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="input input-bordered w-full"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Company</span>
                            </label>
                            <input
                                type="text"
                                name="company"
                                className="input input-bordered w-full"
                                value={formData.company}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Job Title</span>
                            </label>
                            <input
                                type="text"
                                name="jobTitle"
                                className="input input-bordered w-full"
                                value={formData.jobTitle}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </form>
            </div>

            <div
    id="digitalCard"
    className="bg-white shadow-lg rounded-lg p-4 sm:p-6 text-center w-full max-w-xs sm:max-w-md mx-auto"
    style={{
        background: "linear-gradient(to bottom, #f9f9f9, #e2e2e2)",
    }}
>
    <div className="flex flex-col items-center">
        
    {/* Name and Job Title */}
    <h2 className="text-2xl sm:text-3xl font-bold mb-1 text-gray-800">
        {formUpdated ? `${formData.firstName} ${formData.lastName}` : `${dummyData.firstName} ${dummyData.lastName}`}
    </h2>
    <p className="text-md sm:text-lg font-semibold mb-2 text-gray-700">
        {formUpdated ? formData.jobTitle : dummyData.jobTitle}
    </p>

    {/* Company Information */}
    <p className="text-sm sm:text-md text-gray-600">
        {formUpdated ? formData.company : dummyData.company}
    </p>
        <div className="flex flex-col items-center my-4 space-y-2 shadow-md p-1 bg-white rounded-lg">
            <QRCode value={generateVCard()} size={150} qrStyle='dots' />
            {/* <p className="text-sm mt-0 text-gray-800">Say Hi 👋</p> */}
        </div>
        <div className="flex flex-col items-center text-gray-800 space-y-2">
            <p className="flex items-center">
                <FaPhoneAlt className="mr-2 text-primary" /> {formUpdated ? formData.phoneNumber : dummyData.phoneNumber}
            </p>
            <p className="flex items-center">
                <FaEnvelope className="mr-2 text-primary" /> {formUpdated ? formData.email : dummyData.email}
            </p>
        </div>
    </div>
    <div className="text-xs mt-4 text-gray-500">
        Created with Banavio
    </div>
</div>


            <button
                onClick={handleDownload}
                className="btn btn-primary mt-6 w-full sm:w-auto"
            >
                Download Digital Card
            </button>
        </div>
    );
};

export default DigitalCardPage;
