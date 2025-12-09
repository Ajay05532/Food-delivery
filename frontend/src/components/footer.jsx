import React from "react";
import './footer.css';



const FooterLink = ({ title, links }) => (
    <div className="sb_footer-link-div">
        <h4>{title}</h4>
        {links.map((link, index) => (
            <a key={index} href={link.url || '#'}><p>{link.text}</p></a>
        ))}
    </div>
);

const Footer = () => {
    
    const legalLinks = [
        { text: "Terms and conditions" },
        { text: "Privacy" },
        { text: "Cookies" },
        { text: "Modern Slavery Statement" }
    ];

    const importantLinks = [
        { text: "Get help" },
        { text: "Add your restaurant" },
        { text: "Sign up to deliver" },
        { text: "Create a business account" }
    ];

    const bottomLinks = [
        { text: "Privacy Policy" },
        { text: "Terms" },
        { text: "Pricing" },
        { text: "Do not sell or share my personal information" }
    ];

    return (
        <div className="footer">
            <div className="sb_footer section_padding">
                <div className="sb_footer-links_container">
                    
                    <div className="sb_footer-link-div company-info">
                        <div className="logo">
                            
                            <h1>Logo </h1>
                        </div>
                        
                        <p className="registration-info">Company # 490039-445, Registered companies.</p>
                    </div>

                 
                    <div className="sb_footer-link-div deals-subscription">
                        <h4>Get Exclusive Deals in your Inbox</h4>
                        <div className="subscription-form">
                            <input type="email" placeholder="youremail@gmail.com" />
                            <button>Subscribe</button>
                        </div>
                        <p className="privacy-policy-link">we wont spam, read our <a href="#">email policy</a></p>
                        <div className="socialmedia">
                           
                            <a href="#"><p>Facebook</p></a> 
                            <a href="#"><p>Instagram</p></a>   
                        </div>
                    </div>

                
                    <FooterLink title="Legal Pages" links={legalLinks} />
                    
                    
                    <FooterLink title="Important Links" links={importantLinks} />
                </div>

                <hr />

        
                <div className="sb_footer-below">
                    <div className="sb_footer-copyright">
                        <p>Copyright 2025. All Rights Reserved.</p>
                    </div>
                    <div className="sb_footer-below-links">
                        {bottomLinks.map((link, index) => (
                            <a key={index} href="#"><p>{link.text}</p></a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;