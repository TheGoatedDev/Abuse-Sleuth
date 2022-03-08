import Footer from "@components/footer/footer";
import Header from "@components/nav/header";
import { AppShell } from "@mantine/core";

const DefaultLayout: React.FC = (props) => {
    return (
        <AppShell
            sx={(theme) => ({
                height: "100vh",
            })}
            padding={0}
            header={<Header />}>
            {props.children}
        </AppShell>
    );
};

export default DefaultLayout;
