import { useForm, Controller } from "react-hook-form";
import { validationSchema } from "../schemas/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { submitData } from "../api/submitData";
import { FormInput, Response } from "../types/formInput";
import { Box, Grid, TextField, MenuItem, Button } from "@mui/material";
import ModalForm from "./Modal";

export const defaultValues: FormInput = {
  name: "",
  preparation_time: "00:00:00",
  type: "",
};
const Form = () => {
  const {
    register,
    unregister,
    watch,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [response, setResponse] = useState<Response>({
    message: "",
    status: "",
  });
  const type = watch("type");

  useEffect(() => {
    switch (type) {
      case "pizza":
        unregister("spiciness_scale");
        unregister("slices_of_bread");
        register("no_of_slices");
        register("diameter");
        break;
      case "soup":
        unregister("slices_of_bread");
        unregister("no_of_slices");
        unregister("diameter");
        register("spiciness_scale");
        break;
      case "sandwich":
        unregister("no_of_slices");
        unregister("diameter");
        unregister("spiciness_scale");
        register("slices_of_bread");
        break;
    }
  }, [type]);

  const onSubmitHandler = (values: FormInput) => {
    submitData(values, setResponse, handleOpen, reset);
  };
  return (
    <Box
      mt={2}
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
      noValidate
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Dish name"
            fullWidth
            type="text"
            {...register("name")}
            error={!!errors.name?.message}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Preparation time"
            fullWidth
            type="time"
            {...register("preparation_time")}
            error={!!errors.preparation_time?.message}
            helperText={errors.preparation_time?.message}
            inputProps={{
              step: 1,
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="type"
            defaultValue={""}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label="Dish Type"
                error={!!errors.type?.message}
                helperText={errors.type?.message}
                {...field}
              >
                <MenuItem key={"pizza"} value="pizza">
                  Pizza
                </MenuItem>
                <MenuItem key={"soup"} value="soup">
                  Soup
                </MenuItem>
                <MenuItem key={"sandwich"} value="sandwich">
                  Sandwich
                </MenuItem>
              </TextField>
            )}
          />
        </Grid>
        {type === "pizza" && (
          <>
            <Grid item xs={12}>
              <TextField
                label="Number of slices"
                fullWidth
                type="number"
                {...register("no_of_slices")}
                error={!!errors.no_of_slices?.message}
                helperText={errors.no_of_slices?.message}
                inputProps={{
                  min: 1,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Diameter"
                fullWidth
                type="number"
                {...register("diameter")}
                error={!!errors.diameter?.message}
                helperText={errors.diameter?.message}
                inputProps={{
                  min: 0.1,
                  step: 0.1,
                }}
              />
            </Grid>
          </>
        )}
        {type === "soup" && (
          <Grid item xs={12}>
            <TextField
              label="Spiciness scale (from 1 to 10)"
              fullWidth
              type="number"
              {...register("spiciness_scale")}
              error={!!errors.spiciness_scale?.message}
              helperText={errors.spiciness_scale?.message}
              inputProps={{
                min: 1,
                max: 10,
              }}
            />
          </Grid>
        )}
        {type === "sandwich" && (
          <Grid item xs={12}>
            <TextField
              label="Slices of bread"
              fullWidth
              type="number"
              {...register("slices_of_bread")}
              error={!!errors.slices_of_bread?.message}
              helperText={errors.slices_of_bread?.message}
              inputProps={{
                min: 1,
              }}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Button fullWidth variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
      <ModalForm
        open={open}
        handleClose={handleClose}
        response={response}
      ></ModalForm>
    </Box>
  );
};

export default Form;
