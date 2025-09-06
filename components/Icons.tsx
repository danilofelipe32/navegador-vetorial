import React from 'react';

export const ShipIcon: React.FC = () => (
    <g transform="scale(1.2)">
        <polygon points="-10,10 0,-15 10,10" fill="#0ea5e9" stroke="#93c5fd" strokeWidth="1.5" />
        <polygon points="-5,10 0,5 5,10" fill="#fde047" />
    </g>
);


export const TargetIcon: React.FC = () => (
    <g>
        <circle cx="0" cy="0" r="20" fill="none" stroke="#fde047" strokeWidth="2">
             <animateTransform 
                attributeName="transform" 
                type="rotate" 
                from="0 0 0" 
                to="360 0 0" 
                dur="10s" 
                repeatCount="indefinite"
            />
        </circle>
         <circle cx="0" cy="0" r="10" fill="#fde047" opacity="0.5">
            <animate 
                attributeName="r" 
                values="8; 12; 8" 
                dur="2.5s"
                repeatCount="indefinite"
            />
             <animate 
                attributeName="opacity" 
                values="0.3; 0.8; 0.3" 
                dur="2.5s"
                repeatCount="indefinite"
            />
         </circle>
         <circle cx="0" cy="0" r="5" fill="#fef3c7" />
    </g>
);

export const InfoIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
);

export const RotateCw: React.FC<{ color?: string }> = ({ color = "currentColor" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"></polyline>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
    </svg>
);

export const RotateCcw: React.FC<{ color?: string }> = ({ color = "currentColor" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10"></polyline>
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
    </svg>
);