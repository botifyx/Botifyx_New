import React from 'react';
import { WhatsAppIcon } from './icons/FeatureIcons';

const Chatbot: React.FC = () => {
    const phoneNumber = '919566443876';
    const message = encodeURIComponent("Hello Botifyx! I'm interested in your services and would like to know more.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 ease-in-out"
            aria-label="Contact us on WhatsApp"
        >
            <WhatsAppIcon className="w-8 h-8" />
        </a>
    );
};

export default Chatbot;
