import HeaderBasic from "@components/shared/navigation/HeaderBasic";
import { AppShell } from "@mantine/core";

interface PropsType {
    disableButtons?: boolean;
}

const LayoutStandard: React.FC<PropsType> = (props) => {
    return <AppShell header={<HeaderBasic />}>{props.children}</AppShell>;
};

export default LayoutStandard;
