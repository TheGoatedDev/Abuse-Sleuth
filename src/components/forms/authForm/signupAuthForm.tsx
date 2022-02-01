import { faCopy, faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { supabaseClient } from "@services/supabase/supabaseClient";
import { useState } from "react";

const SignupAuthForm: React.FC = () => {
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        const { user, error } = await supabaseClient.auth.signUp({
            email: values.email,
            password: values.password,
        });
        setLoading(false);
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
            <TextInput
                icon={<FontAwesomeIcon icon={faCopy} />}
                placeholder="Confirm Your Password"
                label="Confirm Password"
                type="password"
                {...form.getInputProps("passwordConfirm")}
            />
            <Space h={"md"} />
            <Button type="submit" fullWidth loading={loading}>
                Sign up
            </Button>
        </form>
    );
};

export default SignupAuthForm;
