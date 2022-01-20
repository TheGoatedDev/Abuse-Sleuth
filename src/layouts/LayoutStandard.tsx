import { AppShell } from "@mantine/core";
import CustomNavbar from "../components/Navbar";
import HeaderBasic from "../components/HeaderBasic";

interface PropsType {
    disableButtons?: boolean;
}

const LayoutStandard: React.FC<PropsType> = (props) => {
    return (
        <AppShell
            header={<HeaderBasic disableButtons={props.disableButtons} />}
        >
            {props.children}
        </AppShell>
    );
};

export default LayoutStandard;
