import React, { useState, useEffect } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { FaPhoneAlt, FaEnvelope, FaDownload } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import banavio_banner from '../assets/images/banavio_banner.png';
import logoImage from '../assets/images/banavio-logo.jpeg';

const DigitalCardPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        nickName: '',
        company: '',
        phoneNumber: '',
        email: '',
        jobTitle: '',
    });

    // eslint-disable-next-line
    const [dummyData, setDummyData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        nickName: null,
        company: 'Banavio',
        phoneNumber: '+1234567890',
        email: 'banavio@example.com',
        jobTitle: 'Product Manager',
    });

    const [formUpdated, setFormUpdated] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [isTeam, setIsTeam] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const loadedData = {
            firstName: params.get('firstName') || '',
            lastName: params.get('lastName') || '',
            nickName: params.get('nickName') || '',
            company: params.get('company') || '',
            phoneNumber: params.get('phoneNumber') || '',
            email: params.get('email') || '',
            jobTitle: params.get('jobTitle') || '',
        };
        setFormData(loadedData);
        setIsTeam(params.get('team') === 'true');
    }, [location.search]);

    useEffect(() => {
        if (isTeam) {
            formData.team = 'true';
        }
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
        const cardButton = document.getElementById('downloadButton');
        cardButton.style.display = 'none';
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
                alert('Error generating image. Please try again.');
            });

        setTimeout(() => {
            cardButton.style.display = 'block';
        }, 100);
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
URL;TYPE=WEBSITE:https://banavio.com
END:VCARD`;
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row items-start flex-col-reverse">
                {/* Left Side */}
                <div className="flex-1 p-14 w-full bg-base-200 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-5xl font-bold mb-4">Banavio</h2>
                        <h3 className="text-2xl font-semibold mb-4">The Brand for a Paperless Future</h3>
                        <img src={banavio_banner} alt="Logo" className="w-full h-auto max-w-md mx-auto hidden lg:block"/>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex-1 w-full bg-base-300">
                    <div className="w-11/12 py-6 md:p-14 space-y-4 md:min-h-screen mx-auto">

                        <button
                            onClick={() => setIsFormVisible(!isFormVisible)}
                            className="btn btn-block btn-primary no-animation w-full"
                        >
                            {isFormVisible ? 'View Mode' : 'Create Your Digital Card'}
                        </button>
                        {isFormVisible && (
                            <form className="space-y-2">
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
                        <div className="p-5 w-fit mx-auto" 
                            >
                        <div id="digitalCard"
                            className="bg-white shadow-lg rounded-lg p-4 sm:p-6 text-center mx-auto relative"
                            style={{
                                background: "linear-gradient(to bottom, #f9f9f9, #e2e2e2)",
                                width: '350px',
                            }}
                        >
                            {/* Transparent Download Button */}
                            <button
                                onClick={handleDownload}
                                id="downloadButton"
                                className="absolute top-0 right-1 bg-transparent border-none p-2 rounded-full shadow-lg"
                                style={{ backdropFilter: 'blur(8px)' }}
                            >
                                <FaDownload className="text-sm text-gray-500" />
                            </button>
                            { formData.nickName && (
                            <div style={{
                                width: '180px',
                                height: '30px',
                                fontSize: '50px',
                                position:'absolute',
                                top:210,
                                left:220,
                                rotate: '90deg',
                                textAlign: 'center',

                            }}>{formData.nickName}</div>
                            )}

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
                                    <QRCode value={generateVCard()} size={150} qrStyle='dots' 
                                    {...(isTeam && { logoPadding: 3, logoImage })}
                                    />
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DigitalCardPage;
