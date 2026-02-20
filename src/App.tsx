import { useEffect, useState } from "react";
import "./App.css";
import {
  Stepper,
  Button,
  Group,
  Flex,
  Modal,
} from "@mantine/core";
import { CreateAccount } from "./steps/createAccount";
import { CreateProfile } from "./steps/createProfile";
import { CreatePreference } from "./steps/createPreference";
import { NewsEmail } from "./comps/newsEamil";

interface Data {
  name: string;
  email: string;
  password: string;

  username: string;
  age: number;
  gender: string;
  bio: string;

  ageRange: [number, number];
  preferredGender: string[];

  isRegisteredToNewsletter: boolean;
  newsEmail: string;
}

function App() {
  

  const [data, setData] = useState<Data>({
    name: "",
    email: "",
    password: "",
    username: "",
    age: 0,
    gender: "",
    bio: "",
    ageRange: [13, 120],
    preferredGender: [],
    isRegisteredToNewsletter: false,
    newsEmail: "",
  });

  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const modifyData = (newData: Partial<Data>) => {
    setData((current) => ({ ...current, ...newData }));
  };
  function printData() {
    console.log("Current data:", data);
    return null;
  }
  
  useEffect(() => {
    if (active === 3) {
      printData();
    }
  }, [data, active]);

  return (
    <>
      <div>
        <Flex
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Stepper active={active}>
            <Stepper.Step label="First step" description="Create an account">
              <CreateAccount
                nextStep={nextStep}
                prevStep={prevStep}
                data={data}
                modifyData={modifyData}
              />
            </Stepper.Step>
            <Stepper.Step label="Second step" description="Create a profile">
              <CreateProfile
                nextStep={nextStep}
                prevStep={prevStep}
                data={data}
                modifyData={modifyData}
              />
            </Stepper.Step>
            <Stepper.Step label="Final step" description="Set up prefrences">
              <CreatePreference
                nextStep={nextStep}
                prevStep={prevStep}
                data={data}
                modifyData={modifyData}
              />
            </Stepper.Step>
            <Stepper.Completed>
              Completed, click back button to get to previous step
              <p></p>
              <Group justify="center" mt="xl">
                <Button variant="default" onClick={prevStep}>
                  Back
                </Button>
              
              </Group>
            </Stepper.Completed>
          </Stepper>
        </Flex>
          {active !== 3 && (
            <NewsEmail
              data={data}
              modifyData={modifyData}
            />
          )}
      </div>
    </>
  );
}

export default App;
