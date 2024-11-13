import React, { useRef, useState } from "react";
import { MegaMenu } from "primereact/megamenu";
import { MenuItem } from "primereact/menuitem";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import "../styles/menu.css";
import "primeicons/primeicons.css";

import { redirect } from "react-router-dom";

interface PrimeMenuProps {
  model: MenuItem[];
}

const PrimeMenu: React.FC<PrimeMenuProps> = ({ model }) => {
  const menuRight = useRef<Menu>(null);
  const toast = useRef<Toast>(null);

  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
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
          label: "Cart",
          icon: "pi pi-shopping-cart",
          command: () => window.location.replace(`/basket`),
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
    <div style={{ display: "flex", justifyContent: "center", width: "100%", marginRight:'2rem' }}>
      <a href="/" style={{ textDecoration: "none" }}>
        <img alt="logo" src="/assets/logo.svg" height="40" className="mr-2" />
      </a>
    </div>
  );

  const end = (
    <div className="flex align-items-center gap-3">
      <a href="/myfavoriteproducts">
        <Button
          icon="pi pi-heart-fill"
          className="p-button-rounded p-button-text"
          style={{ fontSize: "4rem", marginLeft: "2rem",marginRight:"2rem" }}
          aria-label="Favorites"
       
        />
      </a>
      {authToken ? (
        <>
          <Toast ref={toast}></Toast>
          <Menu
            model={items}
            popup
            ref={menuRight}
            id="popup_menu_right"
            popupAlignment="right"
          />
          <Button
            icon="pi pi-user"
            className="mr-2"
            onClick={(event) => menuRight?.current?.toggle(event)}
            aria-controls="popup_menu_right"
            aria-haspopup
          />
        </>
      ) : (
        <>
          <a href="/login">
            <Button
              label="Login"
              icon="pi pi-sign-in"
              className="p-button-rounded p-button-text"
             
            />
          </a>
        </>
      )}
    </div>
  );



  return <MegaMenu model={model} start={start} end={end} />;
};

export default PrimeMenu;
