import React from 'react';

const PrevBtnIcon = ({ stroke }: { stroke: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12.768"
            height="22.828"
            viewBox="0 0 12.768 22.828"
        >
            <g id="go_previous_page_icon_black_01" transform="translate(1 1.414)">
                <path
                    id="go_before_page_icon"
                    d="M10.264.18-.09,10.332,10.264,20.18"
                    transform="translate(0.09 -0.18)"
                    fill="none"
                    stroke={stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                />
            </g>
        </svg>
    );
};

export default PrevBtnIcon;
