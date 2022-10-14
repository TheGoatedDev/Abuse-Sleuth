import { useState } from "react";

import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import {
    ActionIcon,
    Anchor,
    Button,
    Group,
    Loader,
    Paper,
    ScrollArea,
    Stack,
    Text,
    Title,
} from "@abuse-sleuth/ui/components/atoms";
import { IconRefresh } from "@abuse-sleuth/ui/icons";

// TODO: It works but dislike the "Load More" functionallity.
export const NewsSection = () => {
    const [limit, setLimit] = useState<number>(3);
    const getHackerNews = trpcClient.news.getHackerNews.useQuery({ limit });

    if (!getHackerNews.isLoading && !getHackerNews.data) {
        <Paper withBorder p={"xs"}>
            <Group align={"center"} grow>
                <Text color={"red"}>
                    Error has occurred getting the current news!
                </Text>
            </Group>
        </Paper>;
    }

    return (
        <>
            {getHackerNews.isLoading && !getHackerNews.data ? (
                <Paper withBorder p={"xs"}>
                    <Group align={"center"} grow>
                        <Loader />
                    </Group>
                </Paper>
            ) : (
                <Paper withBorder p={"xs"}>
                    <Group position="apart">
                        <Title order={2}>
                            News - {getHackerNews.data?.title}
                        </Title>
                        <ActionIcon
                            variant="light"
                            color={"violet"}
                            onClick={() => getHackerNews.refetch()}>
                            <IconRefresh />
                        </ActionIcon>
                    </Group>
                    <Stack mt={"lg"}>
                        <ScrollArea
                            sx={() => ({
                                height: "260px",
                            })}>
                            {getHackerNews.data?.items.map((v, i) => (
                                <Paper pb={"xs"} key={i}>
                                    <Group>
                                        <Title order={4}>{v.title}</Title>
                                        <Text color={"dimmed"} size={"xs"}>
                                            {new Date(
                                                v.isoDate as string
                                            ).toLocaleString()}
                                        </Text>
                                    </Group>
                                    <Text>
                                        {v.contentSnippet}
                                        {"... "}
                                        <Anchor href={v.link}>Read more</Anchor>
                                    </Text>
                                </Paper>
                            ))}
                        </ScrollArea>
                        <Button onClick={() => setLimit((old) => old + 3)}>
                            Load more
                        </Button>
                    </Stack>
                </Paper>
            )}
        </>
    );
};
