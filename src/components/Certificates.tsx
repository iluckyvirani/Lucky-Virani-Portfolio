import { BadgeCheck, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Certificates = () => {
    const [visibleCertificates, setVisibleCertificates] = useState(4);

    const certificates = [
        {
            title: "React.js Essentials Bootcamp",
            issuer: "LetsUpgrade (NSDC Certified)",
            date: "March 2023",
             view: false,
            description: "Completed 5-day intensive bootcamp on React.js fundamentals",
            credentialUrl: "https://www.letsupgrade.in/verify",
            skills: ["React.js", "Frontend Development", "JavaScript"],
            verification: "Certificate No: LUERJSFEB123601"
        },
        {
            title: "JavaScript & Node.js Bootcamp",
            issuer: "LetsUpgrade (NSDC Certified)",
            date: "September 2022",
            view: false,
            description: "Completed 4-day intensive bootcamp on JavaScript and Node.js essentials",
            credentialUrl: "https://www.letsupgrade.in/verify",
            skills: ["JavaScript", "Node.js", "Backend Development"],
            verification: "Certificate No: LUENJSSEP122761"
        },
        {
            title: "Backend Web Development Bootcamp",
            issuer: "DevTown & Microsoft Learn Student Ambassador",
            date: "April 2023",
            view: false,
            description: "Successfully completed 7-day intensive bootcamp on backend development using JavaScript, Node.js and Express.js",
            credentialUrl: "https://www.cert.devtown.in/verify/kpFma", // Add actual verification URL if available
            skills: ["Node.js", "Express.js", "JavaScript", "Backend Development"],
            verification: "QR code verification available"
        },
        {
            title: "Backend Development Bootcamp",
            issuer: "GDSC KIIT Chapter & DevTown",
            date: "2023",
            view: false,
            description: "Completed 7-day bootcamp on backend web development with JavaScript technologies",
            credentialUrl: "https://www.cert.devtown.in/verify/1YRFk8", // Add actual verification URL if available
            skills: ["Node.js", "Express.js", "REST APIs", "Backend Architecture"],
            verification: "QR code verification available"
        },
        {
            title: "Microsoft Learn Student Ambassador Program",
            issuer: "Microsoft",
            date: "2023",
            view: false,
            description: "Recognized for attendance and completion of the Backend Development Bootcamp",
            credentialUrl: "https://www.cert.devtown.in/verify/kpFma", // Add actual verification URL if available
            skills: ["Microsoft Technologies", "Cloud Concepts", "Developer Advocacy"],
            verification: "Microsoft verification available"
        },
        {
            title: "Certificate of Appreciation",
            issuer: "DevTown",
            date: "2023",
            view: false,
            description: "Recognized for continuing support to help grow the developer community",
            credentialUrl: "https://www.cert.devtown.in/verify/1wmzhu",
            skills: ["Community Building", "Mentorship", "Technical Leadership"]
        },
        {
            title: "Blockchain Overview",
            issuer: "LearnTube by CareerNinja",
            date: "September 2022",
            description: "Successfully completed Overview of Blockchain course",
            view: true,
            credentialUrl: "https://drive.google.com/file/d/1sfWMP90jvcEXHd-cCF_fbKO93-dF85e7/view?usp=sharing",
            skills: ["Blockchain Fundamentals", "Cryptocurrency Basics"],
            verification: "Certificate ID: Ove9002022198830"
        },
        {
            title: "Solana HackDay Delhi Participant",
            issuer: "Solana Foundation",
            date: "November 2022",
            view: true,
            description: "Participated in Solana blockchain hackathon event",
            credentialUrl: "https://drive.google.com/file/d/1W8uMy-nTyoDQIuL3R9rpoCIYUdE78vER/view?usp=sharing",
            skills: ["Solana", "Blockchain", "Smart Contracts", "Hackathon"]
        },
        {
            title: "Open Source & Web3 Community Contributor",
            issuer: "Open Source & Web3 Community Day",
            date: "2022",
            view: true,
            description: "Recognized as Core Team Member for outstanding contributions to organizing the Open Source & Web3 Community Day event",
            credentialUrl: "https://drive.google.com/file/d/1zibpCKocMbfJd4wL-RxpnX6oJF4dcfeB/view?usp=sharing", // Add PDF URL if hosted online
            skills: ["Community Leadership", "Event Organization", "Web3", "Open Source"],
            verification: "Signed by organizers: Arshad Khan, Shivam Goswami, Shivam Garg",
            pdfUrl: "https://drive.google.com/file/d/1zibpCKocMbfJd4wL-RxpnX6oJF4dcfeB/view?usp=sharing" // Path to PDF file
        },
        {
            title: "Flipkart GRiD 4.0 Participant",
            issuer: "Flipkart",
            date: "2022",
            view: true,
            description: "Participated in Level 1: E-Commerce & Tech Quiz of Flipkart GRiD 4.0 Software Development Challenge",
            credentialUrl: "https://drive.google.com/file/d/19l4eg8gHO0kybWGLvdmuw1RTxA460opg/view?usp=sharing",
            skills: ["E-Commerce", "Technical Quiz", "Software Development"]
        },

    ];

    const loadMoreCertificates = () => {
        setVisibleCertificates(prev => prev + 4);
    };

    return (
        <section id="certificates" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Certifications</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Validations of my technical expertise and commitment to continuous learning.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    {certificates.slice(0, visibleCertificates).map((certificate, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
                        >
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-start mb-4">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <BadgeCheck className="text-blue-600" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                            {certificate.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {certificate.issuer} • {certificate.date}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex-grow mb-6">
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                        {certificate.description}
                                    </p>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                                            Skills Covered:
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {certificate.skills.map((skill, skillIndex) => (
                                                <span
                                                    key={skillIndex}
                                                    className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {certificate.verification && (
                                        <div className="mt-2 text-sm text-gray-500">
                                            <span className="font-medium">Verification:</span> {certificate.verification}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-auto pt-4">
                                    <a
                                        href={certificate.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all duration-200 w-full transform hover:scale-[1.02]"
                                    >
                                        <span>{certificate.view  ? "View Certificate" : "Verify Credential"}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {visibleCertificates < certificates.length && (
                    <div className="text-center mt-10">
                        <button
                            onClick={loadMoreCertificates}
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            View More Certificates
                            <ChevronDown className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Certificates;