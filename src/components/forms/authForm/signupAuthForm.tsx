import { CopyIcon, EnvelopeIcon, KeyIcon } from "@icons";
import Logger from "@libs/utils/Logger";
import { Button, Space, TextInput, Text } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { firebaseAuth } from "@services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

const SignupAuthForm: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const form = useForm({
        initialValues: {
            email: "",
            password: "",
            passwordConfirm: "",
        },

        validationRules: {
            email: (value) => /^\S+@\S+$/.test(value),
            password: (value) => value.length >= 8,
            passwordConfirm: (value, values) => value === values?.password,
        },
    });

    const onSubmitForm = async (values: {
        email: string;
        password: string;
    }) => {
        try {
            const cred = await createUserWithEmailAndPassword(
                firebaseAuth,
                values.email,
                values.password
            );

            if (cred.user.uid) {
                alert("User created successfully, check your email!");
                router.reload();
            }
        } catch (error: any) {
            Logger.error(error);
            setError(error.code);
        }
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
            <TextInput
                icon={<CopyIcon />}
                placeholder="Confirm Your Password"
                label="Confirm Password"
                type="password"
                required
                {...form.getInputProps("passwordConfirm")}
            />
            <Space h={"md"} />
            <Button type="submit" fullWidth>
                Sign up
            </Button>
            <Text mt="xs" align="center" color="red">
                {error}
            </Text>
        </form>
    );
};

export default SignupAuthForm;
