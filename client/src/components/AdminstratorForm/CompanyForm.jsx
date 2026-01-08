import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import {jwtDecode} from "jwt-decode"
import {
  createCompany,
  getCompany,
} from "../../../store/actionApis/companyApi";
import { CloseCircleFilled } from "@ant-design/icons";
import { Input, notification, Form } from "antd";

const CompanyForm = ({ handleOpen, open, setOpen }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company: "",
    },
  });

  const dispatch = useDispatch();
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const [userId, setUserId] = React.useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);

        setUserId(decoded?.id);
      } catch (error) {
        console.error("Invalid token:", error);
        setUserId(null);
        localStorage.removeItem("token");
      }
    } else {
      setUserType(null);
      setUserName(null);
    }
  }, [token]);
  const onSubmit = async (data) => {
    const newData = {
      company: data.company,
      createdby: userId,
    };
    const response = await dispatch(createCompany(newData));
    console.log("res", response);

    if (response?.payload?.success === true) {
      notification.success({
        message: "Company added",
        description: "Company has been added successfully",
        duration: 2,
        placement: "topRight",
        showProgress: true,
      });
      dispatch(getCompany());
      reset();
      setOpen(false);
    } else {
      notification.error({
        message: "Error adding company",
        description: response?.payload?.message || "An error occurred",
        duration: 2,
        placement: "topRight",
        showProgress: true,
      });
    }
  };

  return (
    <div className="bg-white min-h-[25vh] border border-gray-300 shadow-lg p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold text-gray-500">Add Company</div>
        <Tooltip title="Close Form">
          <CloseCircleFilled
            onClick={() => handleOpen(1)}
            className="hover:scale-125 duration-200 cursor-pointer"
            style={{ fontSize: "20px", color: "red", marginRight: "20px" }}
          />
        </Tooltip>
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Company"
          validateStatus={errors.company ? "error" : ""}
          help={errors.company ? errors.company.message : ""}
        >
          <Controller
            name="company"
            control={control}
            rules={{ required: "Company is required" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter Company"
                className="h-[60px]"
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="p-2 bg-transparent rounded-lg font-semibold px-8 text-[black] border border-[black]"
            >
              Save
            </button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CompanyForm;
