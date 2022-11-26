import React from 'react';

const SignatureIcon = () => {
    return (
        <svg
            width="24"
            height="20"
            viewBox="0 0 24 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <rect width="23.2" height="20" fill="url(#pattern0)" />
            <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use
                        xmlnsXlink="#image0_135_470"
                        transform="translate(0.0689655) scale(0.00673491 0.0078125)"
                    />
                </pattern>
                <image
                    id="image0_135_470"
                    width="128"
                    height="128"
                    xmlnsXlink="data:image/png;base64,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"
                />
            </defs>
        </svg>
    );
};

export default SignatureIcon;