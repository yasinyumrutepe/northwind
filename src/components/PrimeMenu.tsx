import React, { useRef, useState, useEffect } from "react";
import { MegaMenu } from "primereact/megamenu";
import { MenuItem } from "primereact/menuitem";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import "../styles/menu.css";
import "primeicons/primeicons.css";

interface PrimeMenuProps {
  model: MenuItem[];
}

const PrimeMenu: React.FC<PrimeMenuProps> = ({ model }) => {
  const menuRight = useRef<Menu>(null);
  const toast = useRef<Toast>(null);

  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle screen resize for mobile/desktop toggle
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(true); // Always show menu on desktop
      } else {
        setIsMenuOpen(false); // Hide menu by default on mobile
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Menu items for the profile dropdown
  const items: MenuItem[] = [
    {
      items: [
        {
          label: "Profile",
          icon: "pi pi-user",
          command: () => window.location.replace(`/profile`),
        },
        {
          label: "Orders",
          icon: "pi pi-shopping-cart",
          command: () => window.location.replace(`/orders`),
        },
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          command: () => {
            localStorage.removeItem("authToken");
            setAuthToken(null);
            window.location.replace("/");
          },
        },
      ],
    },
  ];

  const start = (
    <div
      style={{
        display: "flex",
        justifyContent: isMobile ? "flex-start" : "center",
        width: "100%",
        marginRight: isMobile ? "0.5rem" : "2rem",
      }}
    >
      <a href="/" style={{ textDecoration: "none" }}>
        <img
          alt="logo"
          src="/assets/logo.svg"
          height={isMobile ? "30" : "40"}
          className="mr-2"
        />
      </a>
    </div>
  );

  // End section with buttons
  const end = (
    <div className="flex align-items-center gap-2">
      <a href="/basket">
        <Button
          icon="pi pi-shopping-cart"
          className="p-button-rounded p-button-text"
          style={{ fontSize: isMobile ? "1.5rem" : "2rem", margin: "0 0.5rem" }}
          aria-label="Cart"
        />
      </a>
      {authToken ? (
        <>
          <a href="/myfavoriteproducts">
            <Button
              icon="pi pi-heart-fill"
              className="p-button-rounded p-button-text"
              style={{
                fontSize: isMobile ? "1.5rem" : "2rem",
                margin: "0 0.5rem",
              }}
              aria-label="Favorites"
            />
          </a>
          <Toast ref={toast}></Toast>
          <Menu model={items} popup ref={menuRight} id="popup_menu_right" />
          <Button
            icon="pi pi-user"
            className="p-button-rounded p-button-text"
            style={{ fontSize: isMobile ? "1.5rem" : "2rem" }}
            onClick={(event) => menuRight?.current?.toggle(event)}
            aria-controls="popup_menu_right"
            aria-haspopup
          />
        </>
      ) : (
        <>
        
        <a href="/login">
          <Button
            label={isMobile ? "" : "Login"}
            icon="pi pi-sign-in"
            className="p-button-rounded p-button-text"
            style={{ fontSize: isMobile ? "1rem" : "1rem" }}
          />
        </a>
        <a href="/register">
          <Button
            label={isMobile ? "" : "Register"}
            icon="pi pi-sign-in"
            className="p-button-rounded p-button-text"
            style={{ fontSize: isMobile ? "1rem" : "1rem" }}
          />
        </a>
        
        </>
        
        
      )}

      {/* Mobile Hamburger Button */}
      {isMobile && (
        <Button
          icon="pi pi-bars"
          className="p-button-rounded p-button-text"
          style={{
            fontSize: "2rem",
            margin: "0 0.5rem",
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        />
      )}
    </div>
  );

  return (
    <>
      <MegaMenu
        model={model}
        start={start}
        end={end}
        orientation={isMobile ? "vertical" : "horizontal"}
        style={{
          width: "100%",
          display: isMobile ? (isMenuOpen ? "block" : "none") : "flex", // Toggle menu on mobile
          justifyContent: "space-between",
          transition: "all 0.3s ease", // Add smooth transition for mobile menu
        }}
      />
    </>
  );
};

export default PrimeMenu;
