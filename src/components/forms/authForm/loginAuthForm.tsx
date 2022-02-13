import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Space, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { firebaseAuth } from "@services/firebase";
import { useRouter } from "next/router";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const LoginAuthForm: React.FC = () => {
    const [signInWithEmailAndPassword, user, loading, error] =
        useSignInWithEmailAndPassword(firebaseAuth);

    const router = useRouter();

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },

        validationRules: {
            email: (value) => /^\S+@\S+$/.test(value),
        },
    });

    const onSubmitForm = async (values: {
        email: string;
        password: string;
    }) => {
        await signInWithEmailAndPassword(values.email, values.password);

        if (user) {
            router.push("/dashboard");
        }
    };

    return (
        <form onSubmit={form.onSubmit((values) => onSubmitForm(values))}>
            <TextInput
                icon={<FontAwesomeIcon icon={"envelope"} />}
                placeholder="example@example.com"
                label="Email"
                required
                {...form.getInputProps("email")}
            />
            <TextInput
                icon={<FontAwesomeIcon icon={"key"} />}
                placeholder="Your Password"
                label="Password"
                type="password"
                required
                {...form.getInputProps("password")}
            />
            <Space h={"md"} />
            <Button type="submit" fullWidth loading={loading}>
                Login
            </Button>
            {user && !loading && (
                <Text color="green">You have successfully logged in!</Text>
            )}
            <Text color="red">{error?.message}</Text>
        </form>
    );
};

export default LoginAuthForm;
