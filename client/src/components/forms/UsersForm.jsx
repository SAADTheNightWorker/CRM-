import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Tooltip, MenuItem } from "@mui/material";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getUser, createUser } from "../../../store/actionApis/userApi";
import { notification } from "antd";

const UsersForm = ({ handleOpen, setOpen }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const newData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      //   createdby: 1,
    };

    const response = await dispatch(createUser(newData));

    if (response?.payload?.success === true) {
      notification.success({
        message: "User added",
        description: "User has been added successfully",
        duration: 2,
        placement: "top-center",
        icon: <CheckCircleFilled style={{ color: "#52c41a" }} />,
      });

      dispatch(getUser());
      reset(); // Reset form after success
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    } else {
      notification.error({
        message: "Error adding Agent",
        description: response?.payload?.message || "An error occurred",
        duration: 2,
        placement: "top-right",
        icon: <CloseCircleFilled style={{ color: "red" }} />,
      });
    }
  };

  const SelectedOption = [
    { label: "Admin", value: 1 },
    { label: "User", value: 0 },
    { label: "Approver", value: 2 },
  ];

  return (
    <div className="bg-white min-h-[25vh] border border-gray-300 shadow-lg p-4 rounded-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold text-gray-500">
          Add <span className="font-bold">User</span>
        </div>

        <Tooltip title="Close Form">
          <CloseCircleFilled
            onClick={() => handleOpen(1)}
            className="hover:scale-125 duration-200 cursor-pointer"
            style={{ fontSize: "20px", color: "red", marginRight: "20px" }}
          />
        </Tooltip>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-2"
      >
        {/* User Name Field */}
        <Controller
          name="name"
          control={control}
          rules={{ required: "User name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="User Name"
              variant="outlined"
              className="w-full"
              margin="dense"
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
            />
          )}
        />

        {/* Email Field */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              className="w-full"
              margin="dense"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          )}
        />

        {/* Password Field */}
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value: /^(?=.*[!@#$%^&*])/,
              message: "Password must contain at least one special character",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label="Password"
              variant="outlined"
              className="w-full"
              margin="dense"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
          )}
        />
        <div className="grid col-span-1">
          <Controller
            name="role"
            control={control}
            rules={{ required: "Role is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Role"
                variant="outlined"
                className="w-full"
                margin="dense"
                select
                error={!!errors.role}
                helperText={errors.role ? errors.role.message : ""}
              >
                {SelectedOption?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 col-span-2 pr-2">
          <Tooltip title="Submit Form">
            <button
              type="submit"
              className="p-2 bg-transparent flex justify-center items-center rounded-full font-semibold text-sm hover:bg-black hover:text-white duration-200 px-8 text-[black] border border-[black]"
              // variant="outlined"
              // style={{
              //   backgroundColor: "white",
              //   color: "black",
              //   border: "1px solid black",
              // }}
            >
              Submit
            </button>
          </Tooltip>
        </div>
      </form>
    </div>
  );
};

export default UsersForm;
