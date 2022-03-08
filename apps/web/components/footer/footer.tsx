import NavLink from "@components/nav/navlink";
import BasicThemeSwitcher from "@components/themeSwitcher/basicThemeSwitcher";
import Link from "next/link";

export const Footer: React.FC = () => {
    return (
        <>
            <div className="flex justify-between py-4 flex-col sm:flex-row border-t-2 border-black dark:border-white">
                <div className="flex grow flex-col sm:flex-row gap-6 sm:gap-10 justify-between px-8">
                    <ul className="w-1/3">
                        <h4>Navigation</h4>
                        <li>OOF</li>
                        <li>OOF</li>
                        <li>OOF</li>
                        <li>OOF</li>
                        <li>OOF</li>
                    </ul>
                    <ul className="w-1/3 text-center">
                        <li>OOF</li>
                        <li>OOF</li>
                        <li>OOF</li>
                        <li>OOF</li>
                        <li>OOF</li>
                    </ul>
                    <ul className="w-1/3 text-right">
                        <li>OOF</li>
                        <li>OOF</li>
                        <li>OOF</li>
                        <li>OOF</li>
                        <li>OOF</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Footer;
