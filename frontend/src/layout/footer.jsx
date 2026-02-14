import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const FooterLink = ({ title, links }) => (
  <div className="flex flex-col">
    <h4 className="font-bold text-lg text-gray-900 mb-4">{title}</h4>
    {links.map((link, index) => (
      <a
        key={index}
        href={link.url || "#"}
        className="text-gray-600 hover:text-orange-500 transition-colors duration-200 mb-2 text-sm"
      >
        {link.text}
      </a>
    ))}
  </div>
);

const Footer = () => {
  const companyLinks = [
    { text: "About Us", url: "#" },
    { text: "Careers", url: "#" },
    { text: "Contact", url: "#" },
    { text: "Blog", url: "#" },
  ];

  const partnerLinks = [
    { text: "Add Restaurant", url: "#" },
    { text: "Become a Rider", url: "#" },
    { text: "Business Account", url: "#" },
    { text: "Partner Portal", url: "#" },
  ];

  const legalLinks = [
    { text: "Terms & Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
    { text: "Cookie Policy", url: "#" },
    { text: "Refund Policy", url: "#" },
  ];

  const helpLinks = [
    { text: "FAQ", url: "#" },
    { text: "Order Status", url: "#" },
    { text: "Payment Options", url: "#" },
    { text: "Delivery Info", url: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info - Spans 2 columns on large screens */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-orange-500 mb-4">
              Food<span className="text-white">Delivery</span>
            </h2>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Your favorite food delivered fast, fresh, and hassle-free. Order
              from the best restaurants in your area and enjoy delicious meals
              at your doorstep.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin size={16} className="text-orange-500" />
                <span>Delhi, India</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone size={16} className="text-orange-500" />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail size={16} className="text-orange-500" />
                <span>support@fooddelivery.com</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-orange-500 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-orange-500 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-orange-500 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-orange-500 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <FooterLink title="Company" links={companyLinks} />
          <FooterLink title="Partner With Us" links={partnerLinks} />
          <FooterLink title="Legal" links={legalLinks} />
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="font-bold text-xl mb-2">
                Subscribe to our Newsletter
              </h4>
              <p className="text-gray-400 text-sm">
                Get exclusive deals and updates delivered to your inbox
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-500"
              />
              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 FoodDelivery. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-orange-500 transition-colors">
              Help Center
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Accessibility
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
