import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";

type ErrorNotificationArgs = {
    message: string;
    title?: string;
};

export const showErrorNotification = ({
    message,
    title = "Error",
}: ErrorNotificationArgs) => {
    showNotification({
        autoClose: 2000,
        title: title,
        color: "red",
        icon: <IconX />,
        message: message,
    });
};

export default showErrorNotification;
