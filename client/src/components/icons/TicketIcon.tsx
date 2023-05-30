import React from 'react';

const TicketIcon = ({ stroke }: { stroke: string }) => {
    return (
        <svg
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15 15H2C1.73478 15 1.48043 14.8946 1.29289 14.7071C1.10536 14.5196 1 14.2652 1 14V2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H15M15 15H18C18.2652 15 18.5196 14.8946 18.7071 14.7071C18.8946 14.5196 19 14.2652 19 14V2C19 1.73478 18.8946 1.48043 18.7071 1.29289C18.5196 1.10536 18.2652 1 18 1H15M15 15V14M15 1V2M15 5.001V5M15 8.001V8M15 11.001V11M5 8H11M5 11H8"
                stroke={stroke}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default TicketIcon;
