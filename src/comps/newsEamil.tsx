/*
const [opened, { open, close }] = useDisclosure(false);
<Modal
          opened={opened}
          onClose={close}
          title="Authentication"
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
        >
          {
            <Button variant="default" onClick={close}>
              Close modal
            </Button>
          }
        </Modal>
          <br />
          <Group justify="center" mt="xl">  </Group>
        <Button variant="default" onClick={open}>
          Open modal
        </Button>
*/

import { Modal, Button, Group, TextInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

type Props = {
  data: {
    isRegisteredToNewsletter: boolean;
    newsEmail: string;
  };
  modifyData: (
    newData: Partial<{
      isRegisteredToNewsletter: boolean;
      newsEmail: string;
    }>,
  ) => void;
};

export function NewsEmail(props: Props) {
  const { data, modifyData } = props;
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      isRegisteredToNewsletter: data.isRegisteredToNewsletter,
      newsEmail: data.newsEmail,
    },
    validate: {
      newsEmail: (value, values) => {
        if (values.isRegisteredToNewsletter && !value) {
          return "Email is required if registered to newsletter";
        }
        if (value && !/^\S+@\S+$/.test(value)) {
          return "Invalid email format";
        }
        return null;
      },
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    modifyData({ ...values, isRegisteredToNewsletter: true } as typeof data);
    close();
  });

  const handleUnregister = () => {
    modifyData({
      isRegisteredToNewsletter: false,
      newsEmail: "",
    } as typeof data);
    close();
  };

  const handleOpenModal = () => {
    form.setValues({
      isRegisteredToNewsletter: data.isRegisteredToNewsletter,
      newsEmail: data.newsEmail,
    });
    open();
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title="Newsletter Registration"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        {
          <div>
            <form onSubmit={handleSubmit}>
              <Text size="sm" mb="xs">
                {data.isRegisteredToNewsletter
                  ? "You are currently registered to the newsletter. You can unregister."
                  : "You are not registered to the newsletter. Enter your email to register."}
              </Text>
              <TextInput
                label="Email"
                placeholder="Enter your email"
                {...form.getInputProps("newsEmail")}
                error={form.errors.newsEmail}
                mt="md"
                withAsterisk
                disabled={data.isRegisteredToNewsletter}
              />
              <Button
                variant="outline"
                type={data.isRegisteredToNewsletter ? "button" : "submit"}
                onClick={(e) => {
                  if (data.isRegisteredToNewsletter) {
                    e.preventDefault();
                    handleUnregister();
                  }
                }}
                mt="md"
              >
                {data.isRegisteredToNewsletter
                  ? "Unregister from Newsletter"
                  : "Register to Newsletter"}
              </Button>
              <Button variant="default" onClick={close} mt="md">
                Close
              </Button>
            </form>
          </div>
        }
      </Modal>
      <br />
      <Group justify="center" mt="xl">
        <Button variant="default" onClick={handleOpenModal}>

          {data.isRegisteredToNewsletter
                  ? "Unregister from Newsletter"
                  : "Register to Newsletter"}
        </Button>
      </Group>
    </div>
  );
}
