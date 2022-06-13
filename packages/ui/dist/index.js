var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  NavLink: () => NavLink
});
module.exports = __toCommonJS(src_exports);

// src/NavLink.tsx
var import_link = __toESM(require("next/link"));
var import_router = require("next/router");
var import_react = __toESM(require("react"));
var import_core = require("@mantine/core");
var NavLink = ({
  href,
  color = "#FFF",
  children
}) => {
  const router = (0, import_router.useRouter)();
  const isActive = router.pathname === href;
  return /* @__PURE__ */ import_react.default.createElement(import_link.default, {
    href,
    passHref: true
  }, /* @__PURE__ */ import_react.default.createElement(import_core.Text, {
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
__reExport(src_exports, require("@mantine/core"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NavLink
});
