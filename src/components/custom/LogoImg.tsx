import React from 'react';
import Image from "next/image";
import { useTheme } from 'next-themes';

const LogoImg: React.FC = () => {
    const { theme } = useTheme();

    return (
        <Image
            fill
            priority
            alt="User Logo"
            className="object-contain"
            src={theme === "dark" ? "/images/user-logo-white.png" : ""}
        />
    );
};

export default LogoImg;