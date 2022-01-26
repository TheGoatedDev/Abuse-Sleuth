import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { faBug, faFile } from "@fortawesome/free-solid-svg-icons";
import { Center, Divider, Group, Navbar, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import NavbarButton from "@components/shared/buttons/NavbarButton";

const CustomNavbar: React.FC = () => {
    const [cacheCount, setCacheCount] = useState(0);

    useEffect(() => {
        axios.get("/api/stats/cached").then((value) => {
            setCacheCount(value.data.count);
        });
    }, []);

    return (
        <Navbar padding={"md"} width={{ base: 300 }}>
            <Navbar.Section>
                <Center>
                    <img
                        src={"/IPSentinel_Logo.svg"}
                        alt={"IP Sentinel Logo"}
                        width={"30%"}
                    />
                </Center>
            </Navbar.Section>
            <Divider my="md" />
            <Navbar.Section grow>
                <NavbarButton
                    icon={faSearchengin}
                    color={"blue"}
                    href="/dashboard/scan"
                >
                    Check IP
                </NavbarButton>
                <NavbarButton
                    icon={faSearchengin}
                    color={"green"}
                    href="/dashboard/scanlog"
                >
                    Scan Logs
                </NavbarButton>
                <NavbarButton
                    icon={faFile}
                    color={"orange"}
                    href="/dashboard/reports"
                >
                    View Reports
                </NavbarButton>
                {/* <NavbarButton
                    
                    icon={faServer}
                    color={"grape"}
                    href="/dashboard/cache"
                >
                    View Cache
                </NavbarButton> */}
            </Navbar.Section>
            <Navbar.Section>
                <NavbarButton
                    icon={faBug}
                    color={"red"}
                    href="/dashboard/developer"
                >
                    Dev Menu
                </NavbarButton>
            </Navbar.Section>
            <Divider mb="sm" />
            <Navbar.Section mb="sm">
                <Text align="center">Stats</Text>
                <Group>
                    <div>
                        <Text size="sm">Cached: {cacheCount}</Text>
                        <Text size="sm">Avg Conf: TODO</Text>
                    </div>
                    <div>
                        <Text size="sm">Reports: TODO</Text>
                        <Text size="sm">Processed: TODO</Text>
                    </div>
                </Group>
            </Navbar.Section>
        </Navbar>
    );
};

export default CustomNavbar;
