import { FC } from "react";

import {
    Anchor,
    Group,
    Paper,
    Text,
    Title,
} from "@abuse-sleuth/ui/components/atoms";

type NewsItemProps = {
    title: string;
    date: Date;
    content: string;
    link: string;
};

export const NewsItem: FC<NewsItemProps> = ({ title, date, content, link }) => {
    return (
        <Paper pb={"xs"}>
            <Group>
                <Title order={5}>{title}</Title>
                <Text color={"dimmed"} size={"xs"}>
                    {date.toLocaleString()}
                </Text>
            </Group>
            <Text>
                {content}
                {"... "}
                <Anchor href={link}>Read more</Anchor>
            </Text>
        </Paper>
    );
};
