import React from 'react';
import { useNavigate } from 'react-router-dom';
import personalImg from '../../img/personal_logo.jpg';
import educationalImg from '../../img/educational_logo.jpg';
import professionalImg from '../../img/professional_logo.jpg';

const Home = () => {
    const navigate = useNavigate();

    const handleOptionClick = (category) => {
        navigate(`/main_page/${category}`);
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
            <main className="text-center w-full max-w-4xl px-6">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome to BizChats</h2>
                <p className="text-lg text-gray-600 mb-8">How will you use BizChats?</p>

                <div className="flex justify-center gap-8">
                    <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-xl shadow-lg p-6 flex flex-col items-center cursor-pointer transform hover:scale-105 transition" onClick={() => handleOptionClick('personal')}>
                        <img src={personalImg} alt="Personal" className="w-44 h-44 rounded-lg object-cover mb-3" />
                        <h3 className="text-2xl font-semibold">Personal</h3>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-xl shadow-lg p-6 flex flex-col items-center cursor-pointer transform hover:scale-105 transition" onClick={() => handleOptionClick('educational')}>
                        <img src={educationalImg} alt="Educational" className="w-44 h-44 rounded-lg object-cover mb-3" />
                        <h3 className="text-2xl font-semibold">Educational</h3>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-xl shadow-lg p-6 flex flex-col items-center cursor-pointer transform hover:scale-105 transition" onClick={() => handleOptionClick('professional')}>
                        <img src={professionalImg} alt="Professional" className="w-44 h-44 rounded-lg object-cover mb-3" />
                        <h3 className="text-2xl font-semibold">Professional</h3>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
