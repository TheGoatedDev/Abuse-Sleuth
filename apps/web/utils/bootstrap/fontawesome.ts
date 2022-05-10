import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
    faBug,
    faCalendar,
    faCircleCheck,
    faCircleXmark,
    faCog,
    faDungeon,
    faEarth,
    faFile,
    faFlag,
    faHome,
    faLock,
    faMoneyCheck,
    faMoon,
    faSearch,
    faSearchPlus,
    faSignOut,
    faSun,
    faTableColumns,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

// Adds all required Font-Awesome Icons to library
export const initializeFontAwesome = () => {
    library.add(
        faSun,
        faMoon,
        faCircleXmark,
        faCircleCheck,
        faSignOut,
        faCog,
        faTableColumns,
        faMoneyCheck,
        faGoogle,
        faGithub,
        faUser,
        faSearch,
        faSearchPlus,
        faFile,
        faDungeon,
        faEarth,
        faBug,
        faHome,
        faFlag,
        faCalendar,
        faLock
    );
};

export default initializeFontAwesome;
