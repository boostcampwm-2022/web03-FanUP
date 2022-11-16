import React from 'react';

const ClockIcon = () => {
    return (
        <svg
            data-testid="clockIcon"
            width="26"
            height="29"
            viewBox="0 0 26 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_d_54_42)">
                <path
                    d="M10 2V0H16V2H10ZM12 13H14V7H12V13ZM13 21C11.7667 21 10.604 20.7627 9.512 20.288C8.42067 19.8127 7.46667 19.1667 6.65 18.35C5.83333 17.5333 5.18733 16.5793 4.712 15.488C4.23733 14.396 4 13.2333 4 12C4 10.7667 4.23733 9.604 4.712 8.512C5.18733 7.42067 5.83333 6.46667 6.65 5.65C7.46667 4.83333 8.42067 4.18767 9.512 3.713C10.604 3.23767 11.7667 3 13 3C14.0333 3 15.025 3.16667 15.975 3.5C16.925 3.83333 17.8167 4.31667 18.65 4.95L20.05 3.55L21.45 4.95L20.05 6.35C20.6833 7.18333 21.1667 8.075 21.5 9.025C21.8333 9.975 22 10.9667 22 12C22 13.2333 21.7627 14.396 21.288 15.488C20.8127 16.5793 20.1667 17.5333 19.35 18.35C18.5333 19.1667 17.5793 19.8127 16.488 20.288C15.396 20.7627 14.2333 21 13 21ZM13 19C14.9333 19 16.5833 18.3167 17.95 16.95C19.3167 15.5833 20 13.9333 20 12C20 10.0667 19.3167 8.41667 17.95 7.05C16.5833 5.68333 14.9333 5 13 5C11.0667 5 9.41667 5.68333 8.05 7.05C6.68333 8.41667 6 10.0667 6 12C6 13.9333 6.68333 15.5833 8.05 16.95C9.41667 18.3167 11.0667 19 13 19Z"
                    fill="black"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_54_42"
                    x="0"
                    y="0"
                    width="26"
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
                        result="effect1_dropShadow_54_42"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_54_42"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
};

export default ClockIcon;
