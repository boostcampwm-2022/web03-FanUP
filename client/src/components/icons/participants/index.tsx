import React from 'react';

const ParticipantsIcon = () => {
    return (
        <svg
            data-testid="participantsIcon"
            width="35"
            height="29"
            viewBox="0 0 35 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_d_52_252)">
                <path
                    d="M15.8125 21C15.8125 21 14.125 21 14.125 19.25C14.125 17.5 15.8125 12.25 22.5625 12.25C29.3125 12.25 31 17.5 31 19.25C31 21 29.3125 21 29.3125 21H15.8125ZM22.5625 10.5C23.9052 10.5 25.1928 9.94688 26.1422 8.96231C27.0916 7.97774 27.625 6.64239 27.625 5.25C27.625 3.85761 27.0916 2.52226 26.1422 1.53769C25.1928 0.553124 23.9052 0 22.5625 0C21.2198 0 19.9322 0.553124 18.9828 1.53769C18.0334 2.52226 17.5 3.85761 17.5 5.25C17.5 6.64239 18.0334 7.97774 18.9828 8.96231C19.9322 9.94688 21.2198 10.5 22.5625 10.5Z"
                    fill="black"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.802 21C12.5518 20.4537 12.4271 19.8547 12.4375 19.25C12.4375 16.8788 13.585 14.4375 15.7045 12.74C14.6466 12.402 13.5444 12.2367 12.4375 12.25C5.6875 12.25 4 17.5 4 19.25C4 21 5.6875 21 5.6875 21H12.802Z"
                    fill="black"
                />
                <path
                    d="M11.5938 10.4998C12.7126 10.4998 13.7857 10.0388 14.5769 9.21835C15.368 8.39788 15.8125 7.28508 15.8125 6.12476C15.8125 4.96443 15.368 3.85164 14.5769 3.03116C13.7857 2.21069 12.7126 1.74976 11.5938 1.74976C10.4749 1.74976 9.40181 2.21069 8.61064 3.03116C7.81947 3.85164 7.375 4.96443 7.375 6.12476C7.375 7.28508 7.81947 8.39788 8.61064 9.21835C9.40181 10.0388 10.4749 10.4998 11.5938 10.4998Z"
                    fill="black"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_52_252"
                    x="0"
                    y="0"
                    width="35"
                    height="29"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_52_252"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_52_252"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
};

export default ParticipantsIcon;
