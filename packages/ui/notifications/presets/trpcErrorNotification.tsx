import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";

export const trpcErrorNotification = (message: string) => {
    showNotification({
        autoClose: 2000,
        title: "API Error Occurred!",
        color: "red",
        icon: <IconX />,
        message: message,
    });
};

export default trpcErrorNotification;
