import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Tooltip, notification } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { createBroker, getBroker } from "../../../store/actionApis/brokerApi";
import { useDispatch } from "react-redux";
import { Form, Input } from "antd";
import { jwtDecode } from "jwt-decode";

const BrokerForm = ({ handleOpen, open, setOpen }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      broker: "",
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
      broker: data.broker,
      createdby: userId,
    };
    const response = await dispatch(createBroker(newData));

    if (response?.payload?.success === true) {
      notification.success({
        message: "Broker added",
        description: "Broker has been added successfully",
        duration: 2,
        placement: "topRight",
        icon: <CheckCircleFilled style={{ color: "#52c41a" }} />,
        showProgress: true,
      });
      dispatch(getBroker());
      reset(); // Reset form after successful submission
      setOpen(false);
    } else {
      notification.error({
        message: "Error adding broker",
        description: response?.payload?.message || "Something went wrong",
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
        <div className="text-xl font-semibold text-gray-500">Add Broker</div>
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
          label="Broker"
          validateStatus={errors.broker ? "error" : ""}
          help={errors.broker?.message}
        >
          <Controller
            name="broker"
            control={control}
            rules={{ required: "Broker is required" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter Broker"
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

export default BrokerForm;
