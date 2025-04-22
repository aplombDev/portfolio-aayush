import { socialImgs } from "@/constant";

type SocialImg = {
    imgPath: string;
    socialLink: string;
};

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container flex flex-col items-center">
                <div className="socials flex gap-4 mb-2">
                    {socialImgs.map((socialImg: SocialImg, index: number) => (
                        <div key={index} className="icon">
                            {socialImg.socialLink ? (
                                <a href={socialImg.socialLink} target="_blank" rel="noopener noreferrer">
                                    <img src={socialImg.imgPath} alt={`Social icon ${index}`} className="w-6 h-6" />
                                </a>
                            ) : (
                                <img src={socialImg.imgPath} alt={`Social icon ${index}`} className="w-6 h-6" />
                            )}
                        </div>
                    ))}
                </div>
                <p className="text-center text-sm py-10">
                    © {new Date().getFullYear()} Aayush Joshi. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
