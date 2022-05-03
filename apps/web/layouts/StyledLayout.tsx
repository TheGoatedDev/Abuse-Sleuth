import { AppShell, Box } from "@abuse-sleuth/ui";

const StyledLayout: React.FC = (props) => {
    return (
        <Box
            sx={(theme) => ({
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
                ":after": {
                    content: '""',
                    position: "absolute",
                    height: "100%",
                    width: "50vw",
                    top: "0",
                    right: "0",
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 60% 100%)",
                    backgroundColor: theme.colors.primary[2],
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23000000' fill-opacity='0.23' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    zIndex: -1,
                },
            })}>
            {props.children}
        </Box>
    );
};

export default StyledLayout;
