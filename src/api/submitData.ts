import { FormInput } from "../types/formInput";
import { defaultValues } from "../components/Form";
import { UseFormReset } from "react-hook-form";
import { Response } from "../types/formInput";

export const submitData = async (
  values: FormInput,
  setResponse: React.Dispatch<React.SetStateAction<Response>>,
  handleOpen: () => void,
  reset: UseFormReset<FormInput>
) => {
  try {
    const response = await fetch(
      "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const result = await response.json();
    setResponse({
      message: JSON.stringify(result, null, 2),
      status: "Success",
    });
    reset(defaultValues);
  } catch (error) {
    setResponse({
      message: "Something went wrong. Try again",
      status: "Error",
    });
  }
  handleOpen();
};
