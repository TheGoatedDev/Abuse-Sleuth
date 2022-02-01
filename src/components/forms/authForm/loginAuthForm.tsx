import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { supabaseClient } from "@services/supabase/supabaseClient";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginAuthForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
        setLoading(true);
        const { user, error } = await supabaseClient.auth.signIn({
            email: values.email,
            password: values.password,
        });
        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        if (user) {
            router.push("/dashboard");
        }

        console.log(user, error);
    };

    return (
        <form onSubmit={form.onSubmit((values) => onSubmitForm(values))}>
            <TextInput
                icon={<FontAwesomeIcon icon={faEnvelope} />}
                placeholder="example@example.com"
                label="Email"
                {...form.getInputProps("email")}
            />
            <TextInput
                icon={<FontAwesomeIcon icon={faKey} />}
                placeholder="Your Password"
                label="Password"
                type="password"
                {...form.getInputProps("password")}
            />
            <Space h={"md"} />
            <Button type="submit" fullWidth loading={loading}>
                Sign up
            </Button>
        </form>
    );
};

export default LoginAuthForm;
