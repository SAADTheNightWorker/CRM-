import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Tooltip, notification, Form, Input } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { createAgent, getAgent } from "../../../store/actionApis/agentAPi";
import { jwtDecode } from "jwt-decode";

const AgentsForm = ({ handleOpen, open, setOpen }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      agent: "",
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
      agent: data.agent,
      createdby: userId,
    };

    const response = await dispatch(createAgent(newData));

    if (response?.payload?.success === true) {
      notification.success({
        message: "Agent added",
        description: "Agent has been added successfully",
        duration: 2,
        placement: "topRight",
        icon: <CheckCircleFilled style={{ color: "#52c41a" }} />,
        showProgress: true,
      });

      dispatch(getAgent());
      reset(); // Reset form after successful submission
      setTimeout(() => {
        setOpen(false);
      }, 1000); // Delay closing for better user experience
    } else {
      notification.error({
        message: "Error adding Agent",
        description: response?.payload?.message || "An error occurred",
        duration: 2,
        placement: "topRight",
        icon: <CloseCircleFilled style={{ color: "red" }} />,
        showProgress: true,
      });
    }
  };

  return (
    <div className="bg-white min-h-[25vh] border border-gray-300 shadow-lg p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold text-gray-500">Add Agent</div>
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
          label="Agent"
          validateStatus={errors.agent ? "error" : ""}
          help={errors.agent?.message}
        >
          <Controller
            name="agent"
            control={control}
            rules={{ required: "Agent is required" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter Agent"
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

export default AgentsForm;
