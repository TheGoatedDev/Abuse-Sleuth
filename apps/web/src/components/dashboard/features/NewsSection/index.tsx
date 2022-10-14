import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import {
    Anchor,
    Group,
    Loader,
    Paper,
    Stack,
    Text,
    Title,
} from "@abuse-sleuth/ui/components/atoms";

export const NewsSection = () => {
    const getHackerNews = trpcClient.news.getHackerNews.useQuery();

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
            {getHackerNews.isLoading ? (
                <Paper withBorder p={"xs"}>
                    <Group align={"center"} grow>
                        <Loader />
                    </Group>
                </Paper>
            ) : (
                <Paper withBorder p={"xs"}>
                    <Title order={2}>News - {getHackerNews.data?.title}</Title>
                    <Stack mt={"lg"}>
                        {getHackerNews.data?.items.map((v, i) => (
                            <Paper pb={"xs"} key={i}>
                                <Group>
                                    <Title order={3}>{v.title}</Title>
                                    <Text color={"dimmed"} size={"xs"}>
                                        {new Date(
                                            v.isoDate as string
                                        ).toLocaleString()}
                                    </Text>
                                </Group>
                                <Text>
                                    {v.contentSnippet}{" "}
                                    <Anchor href={v.link}>Read more.</Anchor>
                                </Text>
                            </Paper>
                        ))}
                    </Stack>
                </Paper>
            )}
        </>
    );
};
