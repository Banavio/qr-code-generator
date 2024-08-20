import React, { useState, useEffect } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { FaPhoneAlt, FaEnvelope, FaDownload } from 'react-icons/fa';
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

    const [dummyData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        company: 'Banavio',
        phoneNumber: '+1234567890',
        email: 'banavio@example.com',
        jobTitle: 'Product Manager',
    });

    const [formUpdated, setFormUpdated] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(true);

    const location = useLocation();

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

    useEffect(() => {
        const filteredParams = Object.entries(formData)
            .filter(([key, value]) => value.trim() !== '') // Filter out empty values
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
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
        let file_name = 'banavio_dc';
        if (formUpdated) {
            file_name = file_name + `_${formData.firstName}_${formData.lastName}`;
        } else {
            file_name = file_name + `_${dummyData.firstName}_${dummyData.lastName}`;
        }
        file_name = file_name + '.png';

        toPng(cardElement)
            .then((dataUrl) => {
                saveAs(dataUrl, file_name);
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
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-base-200">
            
            <div className="flex flex-col md:flex-row gap-6 bg-base-100 p-4 shadow-lg rounded-lg">
                <div className="w-full md:flex-row">

                <button
                        onClick={() => setIsFormVisible(!isFormVisible)}
                        className="btn btn-primary btn-block mb-4"
                    >
                        {isFormVisible ? 'View Mode' : 'Update Details'}
                    </button>
                </div>
                {/* Form Section */}
                <div className="w-full md:w-1/2">
                    {isFormVisible && (
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
                    )}
                </div>

                {/* Digital Card Section */}
                <div className="w-full md:w-1/2 flex flex-col items-center">
                    <div
                        id="digitalCard"
                        className="bg-white shadow-lg rounded-lg p-6 text-center w-full"
                        style={{
                            background: "linear-gradient(to bottom, #f9f9f9, #e2e2e2)",
                        }}
                    >
                        {/* Transparent Download Button */}
                        <button
                            onClick={handleDownload}
                            className="absolute top-2 right-2 bg-transparent border-none p-2 rounded-full shadow-lg"
                            style={{ backdropFilter: 'blur(8px)' }}
                        >
                            <FaDownload className="text-sm text-gray-500" />
                        </button>

                        <div className="flex flex-col items-center">
                            {/* Name and Job Title */}
                            <h2 className="text-2xl font-bold mb-2 text-gray-800">
                                {formUpdated ? `${formData.firstName} ${formData.lastName}` : `${dummyData.firstName} ${dummyData.lastName}`}
                            </h2>
                            <p className="text-lg font-semibold mb-2 text-gray-700">
                                {formUpdated ? formData.jobTitle : dummyData.jobTitle}
                            </p>

                            {/* Company Information */}
                            <p className="text-sm text-gray-600">
                                {formUpdated ? formData.company : dummyData.company}
                            </p>

                            {/* QR Code */}
                            <div className="my-4">
                                <QRCode value={generateVCard()} size={150} qrStyle='dots' />
                            </div>

                            {/* Contact Information */}
                            <div className="text-gray-800 space-y-2">
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
                </div>
            </div>
        </div>
    );
};

export default DigitalCardPage;
