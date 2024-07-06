import React from 'react';

export default function AllocationCircle({ size = 22, strokeWidth = 2, percentage = 0 }){
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0  ${size}`}
            className="transform -rotate-90"
        >
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                fill="none"
                className="text-gray-300"
                stroke="currentColor"
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                fill="none"
                className="text-blue-600"
                stroke="currentColor"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.35s' }}
            />
        
        </svg>
    );
};
