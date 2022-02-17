import { EnvelopeIcon, KeyIcon } from "@icons";
import { Button, Space, TextInput, Text } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { sendAPIAuth } from "@services/api";
import { firebaseAuth } from "@services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginAuthForm: React.FC = () => {
    const [error, setError] = useState<any | null>(null);
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

        try {
            const userCreds = await signInWithEmailAndPassword(
                firebaseAuth,
                values.email,
                values.password
            );

            const token = await userCreds.user.getIdToken();

            console.log(token);

            const res = await sendAPIAuth(token);

            router.push("/dashboard");
        } catch (error: any) {
            setError(error);
        }

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
            )} */}
            {error ? <Text color="red">{error.code}</Text> : null}
        </form>
    );
};

export default LoginAuthForm;
