import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Tooltip, Form, Input, notification } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { createVendor, getVendor } from "../../../store/actionApis/vendorApi";
import { jwtDecode } from "jwt-decode";

const VendorForm = ({ handleOpen, open, setOpen }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      vendor: "",
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
      vendor: data.vendor,
      createdby: userId,
    };
    const response = await dispatch(createVendor(newData));

    if (response?.payload?.success === true) {
      notification.success({
        message: "Vendor added",
        description: "Vendor has been added successfully",
        duration: 2,
        placement: "topRight",
        icon: <CheckCircleFilled style={{ color: "#52c41a" }} />,
        showProgress: true,
      });
      dispatch(getVendor());
      reset();
      setOpen(false);
    } else {
      notification.error({
        message: "Error adding vendor",
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
        <div className="text-xl font-semibold text-gray-500">Add Vendor</div>
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
          label="Vendor"
          validateStatus={errors.vendor ? "error" : ""}
          help={errors.vendor?.message}
        >
          <Controller
            name="vendor"
            control={control}
            rules={{ required: "Vendor is required" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter Vendor"
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

export default VendorForm;
