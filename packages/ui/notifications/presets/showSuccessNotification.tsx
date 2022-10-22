import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";

type SuccessNotificationArgs = {
    message: string;
    title?: string;
};

export const showSuccessNotification = ({
    message,
    title = "Success",
}: SuccessNotificationArgs) => {
    showNotification({
        autoClose: 2000,
        title: title,
        color: "green",
        icon: <IconCheck />,
        message: message,
    });
};

export default showSuccessNotification;
