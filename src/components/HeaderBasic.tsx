import { Button, Group, Header } from "@mantine/core";
import Link from "next/link";

interface PropsType {
    disableButtons?: boolean;
}

const HeaderBasic: React.FC<PropsType> = (props) => {
    return (
        <Header height={80} padding={"xs"}>
            <Group
                style={{
                    height: "100%",
                }}
                position="apart"
            >
                <Group position={"left"}></Group>
                <img
                    height={"100%"}
                    src={"/IPSentinel_Logo.svg"}
                    alt={"Logo"}
                />
                <Group position={"right"}>
                    {(props.disableButtons ?? false) !== true ? (
                        <Link href="/dashboard" passHref>
                            <Button compact>Dashboard</Button>
                        </Link>
                    ) : (
                        ""
                    )}
                </Group>
            </Group>
        </Header>
    );
};

export default HeaderBasic;
