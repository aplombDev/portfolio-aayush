import { socialImgs } from "@/constant";

type SocialImg = {
    imgPath: string;
};

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="flex flex-col justify-center">
                </div>
                <div className="socials">
                    {socialImgs.map((socialImg: SocialImg, index: number) => (
                        <div key={index} className="icon">
                            <img src={socialImg.imgPath} alt="social icon" />
                        </div>
                    ))}
                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-center md:text-end">
                        © {new Date().getFullYear()} Aayush Joshi. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
