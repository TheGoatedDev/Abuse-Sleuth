// src/NavLink.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Text } from "@mantine/core";
var NavLink = ({
  href,
  color = "#FFF",
  children
}) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  return /* @__PURE__ */ React.createElement(Link, {
    href,
    passHref: true
  }, /* @__PURE__ */ React.createElement(Text, {
    weight: "bold",
    sx: (theme) => ({
      color,
      textDecoration: isActive ? "underline" : "none",
      transition: "color 0.2s ease-in-out",
      "&:hover": {
        color: theme.fn.darken(color, 0.1)
      }
    }),
    component: "a"
  }, children));
};

// src/index.tsx
export * from "@mantine/core";
export {
  NavLink
};
