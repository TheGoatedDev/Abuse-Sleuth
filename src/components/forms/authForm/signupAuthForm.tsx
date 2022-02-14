import { CopyIcon, EnvelopeIcon, KeyIcon } from "@icons";
import { Button, Space, TextInput, Text } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { firebaseAuth } from "@services/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

const SignupAuthForm: React.FC = () => {
    const [createUserWithEmailAndPassword, _user, loading, error] =
        useCreateUserWithEmailAndPassword(firebaseAuth);

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
        await createUserWithEmailAndPassword(values.email, values.password);
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
            <Button type="submit" fullWidth loading={loading}>
                Sign up
            </Button>
            <Text color="red">{error?.message}</Text>
        </form>
    );
};

export default SignupAuthForm;
