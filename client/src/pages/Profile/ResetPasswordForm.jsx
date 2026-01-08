import {
  Button,
  Form,
  Input,
  notification,
} from "antd";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PasswordStrengthBar from "react-password-strength-bar";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { userRestPassword } from "../../../store/actionApis/userApi";

const ResetPasswordForm = ({ userData }) => {
  const dispatch = useDispatch();

  const [isEnable, setIsEnable] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);
  const [saveBtn, setSaveBtn] = useState({ label: "Save", disabled: false });
  const [passwordVisible, setPasswordVisible] = useState([false, false, false]);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const columns = [
    {
      key: "currentPass",
      label: "Current password",
    },
    {
      key: "newPass",
      label: "New Password",
    },
    {
      key: "confirmPass",
      label: "Confirm New Password",
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      currentPass: "",
      newPass: "",
      confirmPass: "",
    },
  });

  // form submition function
  const handleAddData = async (data) => {
    setSaveBtn({ label: "Updating... ", disabled: true });
    console.log("userData > ", userData);
    console.log("data > ", data);
    console.log("password Score > ", passwordScore);
    if (
      data?.newPass !== data?.confirmPass ||
      passwordScore < 3 ||
      data?.newPass === data?.currentPass
    ) {
      notification.error({
        message: "Error",
        description:
          data?.newPass !== data?.confirmPass
            ? "Confirm Password doesnot match with New Password"
            : passwordScore < 3
              ? "Please Enter Strong Password"
              : "Current and New Password are Same",
        placement: "topRight",
      });
    } else {
      const updatedUserData = {
        email: userData?.email,
        currentPassword: data.currentPass,
        newPassword: data.newPass,
      };

      console.log("updatedUserData > ", updatedUserData);

      const res = await dispatch(userRestPassword(updatedUserData));
      console.log("res > ", res);
      if (res?.payload?.success) {
        notification.success({
          message: "Updated",
          description: "Password Updated Successfully",
          placement: "topRight",
        });
        // handleOpen();
      } else {
        notification.error({
          message: "!! Error",
          description: res?.payload?.message || "Something went wrong",
          placement: "topRight",
        });
      }
    }
    setSaveBtn({ label: "Save", disabled: false });
  };

  const handlePassStrength = (column, score, feedback) => {
    console.log("column: ", column);
    console.log("score: ", score);
    console.log("feedback: ", feedback);

    if (column === "newPass") setPasswordScore(score);
  };

  return (
    <div className=" rounded-lg w-full h-full font-inter flex justify-center items-center">
      <div
        //   className={`w-full bg-[#fff] m-auto mt-1 rounded-lg overflow-y-auto relative ${
        className={`w-full m-auto mt-1 rounded-lg relative`}
      >
        {/* User info Form section */}
        <section className="w-full">
          <Form
            onFinish={handleSubmit(handleAddData)}
            layout="vertical"
            // validateMessages={validateMessages}
            className="grid grid-cols-1 gap-3 m-auto w-full px-4 pt-2 pb-4"
          >
            {columns.map(
              (item, index) => (
                console.log(item),
                console.log(index),
                (
                  <>
                    <Form.Item
                      validateStatus={errors[item.key] ? "error" : ""}
                      help={errors[item.key] && "This field is required"}
                      key={item.key} // Added key prop for each Form.Item
                      className="w-full"
                    >
                      <div
                        className={
                          // "floating-input-active"
                          "floating-input"
                        }
                      >
                        <Controller
                          name={item.key}
                          key={item.key}
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <Input
                                {...field}
                                placeholder=" " // Empty placeholder to activate floating label
                                type={passwordVisible ? "text" : "password"}
                                className="h-[53px] w-full bg-[#68b3d8]/30 border border-gray-400"
                                // autoComplete="off"
                              />
                              <label className="font-inter text-xs">
                                {item.label}
                              </label>
                              {/* Toggle button to show/hide password */}
                              <Button
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-2 bg-transparent border-none cursor-pointer"
                                icon={
                                  passwordVisible ? (
                                    <EyeTwoTone />
                                  ) : (
                                    <EyeInvisibleOutlined />
                                  )
                                }
                              />
                              {item.key !== "currentPass" ? (
                                <PasswordStrengthBar
                                  className="mt-4"
                                  password={field.value}
                                  onChangeScore={(score, feedback) =>
                                    handlePassStrength(
                                      item.key,
                                      score,
                                      feedback
                                    )
                                  }
                                />
                              ) : null}
                            </>
                          )}
                        />
                      </div>
                    </Form.Item>
                  </>
                )
              )
            )}
            <div className="w-full flex justify-end mt-3">
              <button
                type="submit"
                disabled={saveBtn?.disabled}
                className="p-2 bg-white rounded-lg font-semibold px-8 text-[black] border border-[black] hover:bg-[black] hover:text-white duration-200"
              >
                {saveBtn?.label}
              </button>
            </div>
          </Form>
        </section>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
