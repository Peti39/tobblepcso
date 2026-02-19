import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type Props = {
  nextStep: () => void;
  prevStep: () => void;
  data: {
    name: string;
    email: string;
    password: string;
  };
  modifyData: (
    newData: Partial<{
      name: string;
      email: string;
      password: string;
    }>,
  ) => void;
};

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export function CreateAccount(props: Props) {
  const { nextStep, prevStep, data, modifyData } = props;

  const form = useForm({
    initialValues: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
    validate: {
      name: (value : string) =>
        !value.trim() ? "Name is required" : null,
      email: (value : string) => {
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? "Invalid email address" : null;
      },
      password: (value : string) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
    },
  });

  const handleSubmit = form.onSubmit((values : FormValues) => {
    modifyData(values);
    nextStep();
  });

  return (
    <div>
      <h1>Create Account</h1>
      <p>Step 1 content: Create an account</p>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          placeholder="Enter your name"
          {...form.getInputProps("name")}
          error={form.errors.name}
          withAsterisk
        />
        <TextInput
          label="Email"
          placeholder="Enter your email"
          {...form.getInputProps("email")}
          error={form.errors.email}
          mt="md"
          withAsterisk
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          type="password"
          {...form.getInputProps("password")}
          error={form.errors.password}
          mt="md"
          withAsterisk
        />
        <Group justify="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">Next step</Button>
        </Group>
      </form>
    </div>
  );
}
