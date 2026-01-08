import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Tooltip } from "@mui/material";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Form, Input, notification } from "antd";
import { useDispatch } from "react-redux";
import { createClient, getClient } from "../../../store/actionApis/clientApi";
import {
  CheckCircleOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";

const ClientForm = ({ handleOpen, open, setOpen }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      client: "",
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
      name: data.client,
      createdby: userId,
    };
    const response = await dispatch(createClient(newData));

    if (response?.payload?.success === true) {
      notification.success({
        message: "Client added",
        description: "Client has been added successfully",
        duration: 2,
        placement: "topRight",
        icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
        showProgress: true,
      });
      dispatch(getClient());
      reset();
      setOpen(false);
    } else {
      notification.error({
        message: "Error adding client",
        description: response.payload.message,
        duration: 2,
        placement: "topRight",
        icon: <CloseCircleOutlined style={{ color: "red" }} />,
      });
    }
  };

  return (
    <div
      style={{ margin: "auto" }}
      className="bg-white min-h-[25vh] border border-gray-300 shadow-lg p-4 rounded-lg"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold text-gray-500">Add Client</div>
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
          label="Client"
          validateStatus={errors.client ? "error" : ""}
          help={errors.client ? errors.client.message : ""}
        >
          <Controller
            name="client"
            control={control}
            rules={{ required: "Client is required" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter client name"
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

export default ClientForm;
