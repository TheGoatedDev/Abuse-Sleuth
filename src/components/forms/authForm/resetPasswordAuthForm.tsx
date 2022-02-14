import { EnvelopeIcon } from "@icons";
import { Button, Space, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { firebaseAuth } from "@services/firebase";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";

const ResetPasswordAuthForm: React.FC = () => {
    const [sendPasswordResetEmail, loading, error] =
        useSendPasswordResetEmail(firebaseAuth);

    const form = useForm({
        initialValues: {
            email: "",
        },

        validationRules: {
            email: (value) => /^\S+@\S+$/.test(value),
        },
    });

    const onSubmitForm = async (values: { email: string }) => {
        await sendPasswordResetEmail(values.email);
        alert("Sent Password Reset Email to " + values.email);
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
            <Space h={"md"} />
            <Button type="submit" fullWidth loading={loading}>
                Reset Password
            </Button>
            <Text color="red">{error?.message}</Text>
        </form>
    );
};

export default ResetPasswordAuthForm;
