import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faCopy,
    faEnvelope,
    faFile,
    faKey,
    faSignOut,
    faUser,
    faUserPlus,
    faSearch,
    faBug,
    faLaptop,
    faFileUpload,
} from "@fortawesome/free-solid-svg-icons";

export const BootstrapFontAwesome = () => {
    library.add(
        // Solid
        faUser, // "user"
        faUserPlus, // "user-plus"
        faEnvelope, // "envelope"
        faKey, // "key"
        faCopy, // "copy"
        faSignOut, // "sign-out"
        faSearch, // "search"
        faFile, // "file"
        faBug, // "bug"
        faLaptop, // "laptop"
        faFileUpload // "file-upload"
    );
};
