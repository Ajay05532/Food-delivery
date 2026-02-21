import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Utensils,
  MapPin,
  Phone,
  Mail,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  ArrowRight,
  Shield,
  Zap,
  Star,
} from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  const colLinks = {
    Company: ["About Us", "Careers", "Blog", "Press Kit"],
    Discover: ["Restaurants", "Top Picks", "Offers", "New Arrivals"],
    Partner: [
      "Add Restaurant",
      "Become a Rider",
      "Business Account",
      "Partner Portal",
    ],
    Legal: [
      "Privacy Policy",
      "Terms of Service",
      "Cookie Policy",
      "Refund Policy",
    ],
  };

  const socials = [
    { Icon: Twitter, label: "Twitter", value: "https://x.com/AjaySin04609312" },
    {
      Icon: Instagram,
      label: "Instagram",
      value: "https://www.instagram.com/mad_boyyz/",
    },
    {
      Icon: Facebook,
      label: "Facebook",
      value: "https://www.facebook.com/profile.php?id=100069848404921",
    },
    {
      Icon: Youtube,
      label: "YouTube",
      value: "https://www.youtube.com/@ajCodes",
    },
  ];

  const badges = [
    { Icon: Shield, text: "100% Secure" },
    { Icon: Zap, text: "Fast Delivery" },
    { Icon: Star, text: "4.8★ Rated" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800/50">
      {/* Gradient accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-8">
        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-12">
          {/* Brand */}
          <div className="lg:w-1/3 space-y-5">
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 cursor-pointer group w-fit"
            >
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-orange-500/25"
              >
                <Utensils className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h2 className="text-xl font-extrabold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  FoodHub
                </h2>
                <p className="text-[11px] text-gray-500 tracking-wide">
                  Fast &amp; Fresh
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Order from the best local restaurants and get it delivered hot to
              your door — in minutes.
            </p>

            <div className="space-y-2 text-sm text-gray-400">
              {[
                { Icon: MapPin, t: "123 Food Street, Greater noida" },
                { Icon: Phone, t: "+91 9162384894" },
                { Icon: Mail, t: "support@foodhub.in" },
              ].map(({ Icon, t }) => (
                <div key={t} className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-2 pt-1">
              {socials.map(({ Icon, label, value }) => (
                <motion.a
                  key={label}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(value, "_blank", "noopener,noreferrer");
                  }}
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-gradient-to-br hover:from-orange-500 hover:to-pink-500 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-300 shadow-sm cursor-pointer"
                >
                  <Icon className="w-4 h-4 pointer-events-none" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(colLinks).map(([title, items]) => (
              <div key={title}>
                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
                  {title}
                </h4>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item}>
                      <button className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center gap-1 group text-left">
                        <span>{item}</span>
                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-purple-600/10 border border-white/5 p-6 mb-10">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-center gap-4 justify-between">
            <div>
              <h3 className="text-white font-bold text-lg">
                Get exclusive deals 🎉
              </h3>
              <p className="text-gray-400 text-sm mt-0.5">
                Subscribe and never miss a promo.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 sm:w-60 px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-pink-600 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 text-sm whitespace-nowrap hover:scale-105 active:scale-95">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-800/60 pt-6">
          <p className="text-xs text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} FoodHub Technologies Pvt. Ltd. All
            rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2">
            {badges.map(({ Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-1.5 text-xs text-gray-500"
              >
                <Icon className="w-3.5 h-3.5 text-orange-400" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
