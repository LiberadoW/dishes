import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("This field is required")
    .min(3, "Name must be at least 3 characters"),
  preparation_time: yup
    .string()
    .required("This field is required")
    .matches(
      /(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/,
      "Invalid time format"
    ),
  type: yup.string().required("This field is required"),
  no_of_slices: yup.number().when("type", {
    is: "pizza",
    then: () =>
      yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("This field is required")
        .min(1, "Must be at least 1"),
  }),
  diameter: yup.number().when("type", {
    is: "pizza",
    then: () =>
      yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("This field is required")
        .min(0.1, "Must be at least 0.1"),
  }),
  spiciness_scale: yup.number().when("type", {
    is: "soup",
    then: () =>
      yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("This field is required")
        .min(1, "Must be at least 1")
        .max(10, "Must be less than 10"),
  }),
  slices_of_bread: yup.number().when("type", {
    is: "sandwich",
    then: () =>
      yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("This field is required")
        .min(1, "Must be at least 1"),
  }),
});
