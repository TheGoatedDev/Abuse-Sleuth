import { EnvelopeIcon, KeyIcon } from "@icons";
import { Button, Space, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { sendAPIAuth } from "@services/api";
import { firebaseAuth } from "@services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

const LoginAuthForm: React.FC = () => {
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
        //TODO: Make a Seperate File for this
        const userCreds = await signInWithEmailAndPassword(
            firebaseAuth,
            values.email,
            values.password
        );

        const token = await userCreds.user.getIdToken();

        console.log(token);

        const res = await sendAPIAuth(token);

        console.log(res);

        // if (user) {
        //     router.push("/dashboard");
        // }
    };

    return (
        <form onSubmit={form.onSubmit((values) => onSubmitForm(values))}>
            <TextInput
                icon={<EnvelopeIcon />}
                placeholder="example@example.com"
                label="Email"
                required
                {...form.getInputProps("email")}
            />
            <TextInput
                icon={<KeyIcon />}
                placeholder="Your Password"
                label="Password"
                type="password"
                required
                {...form.getInputProps("password")}
            />
            <Space h={"md"} />
            <Button type="submit" fullWidth>
                Login
            </Button>
            {/* {user && !loading && (
                <Text color="green">You have successfully logged in!</Text>
            )}
            <Text color="red">{error?.message}</Text> */}
        </form>
    );
};

export default LoginAuthForm;
