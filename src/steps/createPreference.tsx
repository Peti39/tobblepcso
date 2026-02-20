import {
  Button,
  Group,
  Modal,
  MultiSelect,
  RangeSlider,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

type Props = {
  nextStep: () => void;
  prevStep: () => void;
  data: {
    ageRange: [number, number];
    preferredGender: string[];
  };
  modifyData: (
    newData: Partial<{
      ageRange: [number, number];
      preferredGender: string[];
    }>,
  ) => void;
};

export function CreatePreference(props: Props) {
  const { nextStep, prevStep, data, modifyData } = props;
  

  const form = useForm({
    initialValues: {
      ageRange: data.ageRange,
      preferredGender: data.preferredGender || [],
    },
    validate: {
      ageRange: (value) => {
        if (!value) return "Age range is required";
        if (value[0] < 0 || value[1] > 120) return "Invalid age range";
        return null;
      },
      preferredGender: (value) =>
        !value || (Array.isArray(value) && value.length === 0)
          ? "Preferred gender is required"
          : null,
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
      <h1>Create Preference</h1>
      <p>Step 3 content: Set up preferences</p>
      <form onSubmit={handleSubmit}>
        <Text>Preferred Age Range</Text>
        <RangeSlider
          minRange={5}
          min={13}
          max={120}
          step={1}
          defaultValue={[13,120]}
          value={form.values.ageRange}
          onChange={(value) =>
            form.setFieldValue("ageRange", value as [number, number])
          }
          mt="md"
        />
        {form.errors.ageRange && (
          <Text color="red" size="sm" mt="xs">
            {form.errors.ageRange}
          </Text>
        )}

        <MultiSelect
          label="Preferred Genders"
          placeholder="Select preferred genders"
          data={["male", "female", "other"]}
          {...form.getInputProps("preferredGender")}
          mt="sm"
        />
        
        <Group justify="center" mt="xl">
          <Button variant="default" onClick={handleBack}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </Group>
      </form>
    </div>
  );
}
