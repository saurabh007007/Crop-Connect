import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { SiSellfy } from "react-icons/si";
import { notify } from "../../utils/helper/notification";
import Cart from "../../pages/cart";
import { useCookies } from "react-cookie";

function Navbar() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies([
    "user_access_token",
    "seller_access_token",
    "brandName",
  ]);

  const userDropdownRef = useRef();
  const sellerDropdownRef = useRef();

  const [openCart, setOpenCart] = useState(false);

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSellerDropdown, setShowSellerDropdown] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false);
      }

      if (
        sellerDropdownRef.current &&
        !sellerDropdownRef.current.contains(event.target)
      ) {
        setShowSellerDropdown(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 shadow-md backdrop-blur text-white">
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 md:px-12 h-14">
        <a href="/" className="flex items-center">
          <span className="text-xl md:text-3xl font-semibold whitespace-nowrap tracking-wide">
            <span className="text-red-200 font-bold">C</span>rop
            <span className="text-red-200 font-bold">C</span>onnect
          </span>
        </a>
        <div className="flex flex-row gap-4 md:gap-8 text-2xl md:text-3xl items-center">
          {/* User */}
          <div
            ref={userDropdownRef}
            className="relative flex items-center gap-1 text-white cursor-pointer hover:scale-105 transition-transform"
            onMouseEnter={() => {
              setShowUserDropdown(true);
              setShowSellerDropdown(false);
            }}
            onClick={() => {
              if (!cookies.user_access_token) navigate("/account/user");
            }}
          >
            <FaUserCircle />
            <span className="text-sm font-medium hidden md:block">User</span>
            {cookies.user_access_token && (
              <div
                className={`absolute ${
                  showUserDropdown ? "block" : "hidden"
                } top-10 right-0 z-10 font-medium bg-white text-gray-800 rounded-lg shadow-lg py-2 w-40`}
              >
                <ul className="flex flex-col text-sm gap-2 px-4">
                  <li
                    onClick={() => {
                      setCookie("user_access_token", "", {
                        expires: new Date(0),
                      });
                      notify("User Logged Out", "info");
                      navigate("/");
                    }}
                    className="hover:text-blue-600 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Seller */}
          <div
            ref={sellerDropdownRef}
            className="relative flex items-center gap-1 text-white cursor-pointer hover:scale-105 transition-transform"
            onMouseEnter={() => {
              setShowSellerDropdown(true);
              setShowUserDropdown(false);
            }}
            onClick={() => {
              if (!cookies.seller_access_token) navigate("/account/seller");
            }}
          >
            <SiSellfy />
            <span className="text-sm font-medium hidden md:block">Seller</span>
            {cookies.seller_access_token && (
              <div
                className={`absolute ${
                  showSellerDropdown ? "block" : "hidden"
                } top-10 right-0 z-10 font-medium bg-white text-gray-800 rounded-lg shadow-lg py-2 w-48`}
              >
                <ul className="flex flex-col text-sm gap-2 px-4">
                  <li
                    onClick={() => navigate("/sellerdashboard")}
                    className="hover:text-green-600 cursor-pointer"
                  >
                    Dashboard
                  </li>
                  <li
                    onClick={() => {
                      setCookie("seller_access_token", "", {
                        expires: new Date(0),
                      });
                      setCookie("brandName", "", { expires: new Date(0) });
                      notify("Seller Logged Out", "info");
                      navigate("/");
                    }}
                    className="hover:text-green-600 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Cart */}
          <div
            className="flex items-center gap-1 text-white cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setOpenCart(true)}
          >
            <AiOutlineShoppingCart />
            <span className="text-sm font-medium hidden md:block">Cart</span>
          </div>

          {openCart && <Cart setOpenCart={setOpenCart} />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
