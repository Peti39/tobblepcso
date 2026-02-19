import { Button, Group, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type Props = {
  nextStep: () => void;
  prevStep: () => void;
  data: {
    username: string;
    age: number;
    gender: string;
    bio: string;
  };
  modifyData: (
    newData: Partial<{
      username: string;
      age: number;
      gender: string;
      bio: string;
    }>,
  ) => void;
};

export function CreateProfile(props: Props) {
  const { nextStep, prevStep, data, modifyData } = props;

  const form = useForm({
    initialValues: {
      username: data.username,
      age: data.age,
      gender: data.gender,
      bio: data.bio,
    },
    validate: {
      username: (value) => (!value.trim() ? "Username is required" : null),
      age: (value) => {
        if (!value) return "Age is required";
        if (isNaN(value)) return "Age must be a number";
        if (value < 13) return "You must be at least 13 years old";
        if (value > 120) return "Invalid age";
        return null;
      },
      gender: (value) => (!value.trim() ? "Gender is required" : null),
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    modifyData(values as typeof data);
    nextStep();
  });

  const handleBack = () => {
    modifyData(form.values as typeof data);
    prevStep();
  };

  return (
    <div>
      <h1>Create Profile</h1>
      <p>Step 2 content: Create a profile</p>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Username"
          placeholder="Enter your username"
          {...form.getInputProps("username")}
          error={form.errors.username}
          withAsterisk
        />
        <TextInput
          label="Age"
          placeholder="Enter your age"
          type="number"
          {...form.getInputProps("age")}
          error={form.errors.age}
          mt="md"
          withAsterisk
        />

        <Select
          label="Gender"
          placeholder="Select your gender"
          data={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
          {...form.getInputProps("gender")}
          error={form.errors.gender}
          mt="md"
          withAsterisk
        />

        <TextInput
          label="Bio"
          placeholder="Enter your bio"
          {...form.getInputProps("bio")}
          error={form.errors.bio}
          mt="md"
        />
        <Group justify="center" mt="xl">
          <Button variant="default" onClick={handleBack}>
            Back
          </Button>
          <Button type="submit">Next step</Button>
        </Group>
      </form>
    </div>
  );
}

/*
<TextInput
          label="Gender"
          placeholder="Enter your gender"
          {...form.getInputProps("gender")}
          error={form.errors.gender}
          mt="md"
          withAsterisk
        />*/
