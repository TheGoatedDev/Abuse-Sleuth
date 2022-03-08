import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Button, useMantineColorScheme } from "@mantine/core";

export const BasicThemeSwitcher: React.FC = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <ActionIcon
            variant="hover"
            color={isDark ? "yellow" : "cyan"}
            onClick={() => toggleColorScheme()}>
            <FontAwesomeIcon icon={isDark ? "sun" : "moon"} />
        </ActionIcon>
    );
};

export default BasicThemeSwitcher;
