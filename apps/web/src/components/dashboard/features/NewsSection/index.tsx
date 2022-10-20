import { useState } from "react";

import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import {
    ActionIcon,
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

import { NewsItem } from "./NewsItem";

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
                                <NewsItem
                                    key={i}
                                    title={v.title ?? "Unknown Title"}
                                    date={new Date(v.isoDate as string)}
                                    content={
                                        v.contentSnippet ?? "Unknown Content"
                                    }
                                    link={v.link ?? "#"}
                                />
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
