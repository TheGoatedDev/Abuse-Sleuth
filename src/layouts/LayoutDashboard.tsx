import { AppShell } from "@mantine/core";
import CustomNavbar from "../components/Navbar";

const LayoutDashboard: React.FC = (props) => {
    return (
        <AppShell navbar={<CustomNavbar />} fixed>
            {props.children}
        </AppShell>
    );
};

export default LayoutDashboard;
