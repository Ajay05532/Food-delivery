import React from "react";

const FooterLink = ({ title, links }) => (
  <div className="flex flex-col m-4">
    <h4 className="font-bold text-base text-black mb-4">{title}</h4>
    {links.map((link, index) => (
      <a
        key={index}
        href={link.url || "#"}
        className="underline text-gray-600 mt-2"
      >
        {link.text}
      </a>
    ))}
  </div>
);

const Footer = () => {
  const legalLinks = [
    { text: "Terms and conditions" },
    { text: "Privacy" },
    { text: "Cookies" },
    { text: "Modern Slavery Statement" },
  ];

  const importantLinks = [
    { text: "Get help" },
    { text: "Add your restaurant" },
    { text: "Sign up to deliver" },
    { text: "Create a business account" },
  ];

  const bottomLinks = [
    { text: "Privacy Policy" },
    { text: "Terms" },
    { text: "Pricing" },
    { text: "Do not sell or share my personal information" },
  ];

  return (
    <div className="bg-gray-100 text-black">
      <div className="flex flex-col px-24 py-16">
        <div className="flex justify-between flex-wrap items-start">
          
          {/* Company Info */}
          <div className="flex flex-col m-4">
            <h1 className="text-2xl font-bold">Logo</h1>
            <p className="mt-2">
              Company # 490039-445, Registered companies.
            </p>
          </div>

          {/* Subscription */}
          <div className="flex flex-col m-4">
            <h4 className="font-bold text-base mb-4">
              Get Exclusive Deals in your Inbox
            </h4>

            <div className="flex">
              <input
                type="email"
                placeholder="youremail@gmail.com"
                className="px-2 py-2 border border-gray-300 rounded-l bg-gray-200"
              />
              <button className="bg-orange-500 text-white px-4 py-2 rounded-r">
                Subscribe
              </button>
            </div>

            <p className="mt-2 text-sm">
              we wont spam, read our{" "}
              <a href="#" className="underline">
                email policy
              </a>
            </p>

            <div className="flex gap-4 mt-4">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
            </div>
          </div>

          <FooterLink title="Legal Pages" links={legalLinks} />
          <FooterLink title="Important Links" links={importantLinks} />
        </div>

        <hr className="h-px bg-gray-300 border-none mt-8" />

        {/* Bottom Bar */}
        <div className="flex justify-between items-center mt-4 bg-[#00001a] text-white px-24 py-4 w-screen -ml-24">
          <p>Copyright 2025. All Rights Reserved.</p>

          <div className="flex gap-6 text-sm">
            {bottomLinks.map((link, index) => (
              <a key={index} href="#">
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
