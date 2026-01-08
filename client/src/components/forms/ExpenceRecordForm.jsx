import React, { useEffect, useState } from "react";
import {
  Select,
  Form,
  Input,
  notification,
  DatePicker,
  Upload,
  message,
  InputNumber,
  Button,
  Space,
} from "antd";
import { Controller, useForm } from "react-hook-form";
// import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// import Sekeleton from "../skeleton/Sekeleton";
// import Loader from "../Loader";
import dayjs from "dayjs";
import { XMarkIcon } from "@heroicons/react/24/solid";
// import { handleSanitizeInput } from "../../utils/SanitizeInput";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";
import Skliton from "../skliton/Skliton";
import { getAgent } from "../../../store/actionApis/agentAPi";
import { getVendor } from "../../../store/actionApis/vendorApi";
import { getCategory } from "../../../store/actionApis/categoryApi";
import {
  createExpenceRecords,
  getExpenceRecords,
} from "../../../store/actionApis/expenceRecordApi";
import { jwtDecode } from "jwt-decode";

const uploadFields = [{ key: "paymentDoc", title: "Payment Doc" }];

const ExpenceRecordForm = ({ handleOpen, open, setOpen }) => {
  const dispatch = useDispatch();
  const vendorData = useSelector((state) => state?.vendor?.vendors?.payload);
  const serviceOwnerData = useSelector(
    (state) => state?.agent?.agents?.payload
  );
  const categoryData = useSelector(
    (state) => state?.category?.categories?.payload
  );

  const topFields = [
    {
      key: "vendorNameId",
      title: "Vendor Name",
      type: "select",
      options: vendorData?.map((item) => {
        return { value: item?.id, label: item?.vendor };
      }),
    },
    {
      key: "serviceOwnerId",
      title: "Service Owner",
      type: "select",
      options: serviceOwnerData?.map((item) => {
        return { value: item?.id, label: item?.agent };
      }),
    },
    {
      key: "categoryId",
      title: "Category",
      type: "select",
      options: categoryData?.map((item) => {
        return { value: item?.id, label: item?.category };
      }),
    },
    {
      key: "serviceDec",
      title: "Service Des",
      type: "text",
    },

    {
      key: "amount",
      title: "Amount",
      type: "number",
    },
    {
      key: "currency",
      title: "Currency",
      type: "select",
      options: [
        {
          value: "USD",
          label: "USD",
        },
        {
          value: "PKR",
          label: "PKR",
        },
        {
          value: "AED",
          label: "AED",
        },
      ],
    },

    {
      key: "dueDate",
      title: "Due Date",
      type: "date",
    },
    {
      key: "dateOfPayment",
      title: "Date Of Payment",
      type: "date",
    },
    {
      key: "duration",
      title: "Duration",
      type: "text",
    },
    {
      key: "vat",
      title: "vat",
      type: "number",
    },
  ];

  const [checker, setChecker] = React.useState({
    vendorNameId: false,
    serviceOwnerId: false,
    categoryId: false,
    serviceDec: false,
    amount: false,
    currency: false,
    dueDate: false,
    dateOfPayment: false,
    duration: false,
    vat: false,
  });
  const [loading, setLoading] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [pdfFile, setPdfFile] = useState({});
  const [createdBy, setCreatedBy] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // react hook form to get the inputs data, that integrate with 3rd party Ui
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      vendorNameId: null,
      serviceOwnerId: null,
      categoryId: null,
      serviceDec: null,
      amount: null,
      currency: null,
      dueDate: null,
      dateOfPayment: null,
      duration: null,
      vat: null,
    },
  });

  // null all states when needed
  const emptyAllState = () => {
    setChecker({
      vendorNameId: false,
      serviceOwnerId: false,
      categoryId: false,
      serviceDec: false,
      amount: false,
      currency: false,
      dueDate: false,
      dateOfPayment: false,
      duration: false,
      vat: false,
    });
    setPdfFile({});
  };
  useEffect(() => {
    dispatch(getVendor());
    dispatch(getCategory());
    dispatch(getAgent());
  }, [dispatch]);
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const decoded = jwtDecode(token);
  //   setCreatedBy(decoded.user_id);
  //   console.log(decoded);
  // }, []);

  // function to handle and submit the centerline values

  // Effect to decode token and update user state
  useEffect(() => {
    const decoded = jwtDecode(token);
    setUserId(decoded?.id);
    setUserRole(decoded?.role);
    console.log(decoded);
  }, [token]);

  const handleSub = async (data) => {
    console.log(data);
    // setIsSubmit(true);
    const formData = new FormData();

    // // Append fields
    formData.append("vendorNameId", data.vendorNameId);
    formData.append("serviceOwnerId", data.serviceOwnerId);
    formData.append("categoryId", data.categoryId);
    formData.append("serviceDec", data.serviceDec);
    formData.append("amount", data.amount);
    formData.append("currency", data.currency);
    formData.append("dueDate", data.dueDate);

    formData.append("dateOfPayment", data.dateOfPayment);
    formData.append("duration", data.duration);
    formData.append("vat", data.vat);
    formData.append("paymentDoc", data.paymentDoc);
    formData.append("createdBy", userId);

    // Log the formData entries
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await dispatch(createExpenceRecords(formData));
    console.log("CHECK", response);
    try {
      if (response) {
        setIsSubmit(false);
        setLoading(false);
        notification.success({
          message: "Eexpence Record Added!",
          description: `Eexpence Record is added against CRM`,
          placement: "topRight",
          className: "font-inter font-medium",
        });
        dispatch(getExpenceRecords());
        setOpen(false);
        reset();
        emptyAllState();
      } else {
        setIsSubmit(false);
        notification.error({
          message: "Eexpence Record Addition Failed",
          description:
            "The Eexpence Record could not be added due to an unexpected error.",
          placement: "topRight",
        });
      }
    } catch (error) {
      setIsSubmit(false);
      notification.error({
        message: "Error",
        description: error.message,
        placement: "topRight",
      });
    } finally {
      setPdfFile({});
      // setLoading(false);
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // VALIDATION IS EMPLECTED
  // sanitize input to check special characters
  //   const handleInputField = (e) => {
  //     const isDataSafe = handleSanitizeInput(e.target.value);

  //     if (e.target.name === "prospect_client_name") {
  //       setIsName(isDataSafe);
  //     } else if (e.target.name === "existing_insurer") {
  //       setIsInsurance(isDataSafe);
  //     } else if (e.target.name === "decision_maker") {
  //       setIsDecision_maker(isDataSafe);
  //     } else if (e.target.name === "quote_no") {
  //       setIsQuote_num(isDataSafe);
  //     }
  //   };

  const handlePdfUpload = (key, file) => {
    setPdfFile((prev) => ({ ...prev, [key]: file }));
  };
  console.log(pdfFile);

  return (
    <div className="bg-white rounded-lg font-inter h-[420px] max-xl:overflow-y-hidden max-lg:overflow-scroll border shadow-lg ">
      <div className="flex justify-between items-center px-6 pt-6 pb-3 sticky top-0 bg-white z-10">
        <div className="text-xl font-bold text-black">Create New</div>
        <button
          className="flex items-center font-normal text-[13px] text-redColor"
          onClick={() => {
            handleOpen(1);
            reset({
              vendorNameId: null,
              serviceOwnerId: null,
              categoryId: null,
              serviceDec: null,
              amount: null,
              currency: null,
              dueDate: null,
              dateOfPayment: null,
              duration: null,
              vat: null,
            });
            emptyAllState();
          }}
        >
          Close
          <XMarkIcon className="w-4 h-4 text-redColor" />
        </button>
      </div>
      {!loading && !isSubmit ? (
        <Form
          onFinish={handleSubmit(handleSub)}
          layout="vertical"
          className="font-inter px-4 mt-1"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {topFields.map(({ key, title, type, options }) => (
              <Form.Item
                className={`${
                  key === "is_quote_issued"
                    ? "grid col-span-1 mx-2"
                    : key === "decision_maker_phone"
                      ? "col-span-1"
                      : ""
                } `}
                key={key}
                validateStatus={errors[key] ? "error" : ""}
                help={errors[key] ? `${title} is required` : ""}
              >
                <div
                  className={`floating-input ${
                    checker[key] ? "floating-input-active" : ""
                  }`}
                >
                  <Controller
                    name={key}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <>
                        {type.includes("text") && (
                          <Input
                            {...field}
                            placeholder=" "
                            className="h-[43px] w-full"
                            onChange={(value) => {
                              field.onChange(value);
                              //   handleInputField(value);
                              setChecker((prev) => {
                                return {
                                  ...prev,
                                  [key]: true,
                                };
                              });
                            }}
                          />
                        )}
                        {type.includes("number") && (
                          <InputNumber
                            {...field}
                            placeholder=" "
                            type="number"
                            className="h-[43px] w-full pt-3"
                            onChange={(value) => {
                              field.onChange(value);
                              // handleInputField(value, index);
                              setChecker((prev) => {
                                return {
                                  ...prev,
                                  [key]: true,
                                };
                              });
                            }}
                          />
                        )}
                        {type.includes("select") && (
                          <Select
                            {...field}
                            placeholder=" "
                            className="h-[50px] w-full"
                            onChange={(value) => {
                              field.onChange(value);
                              setChecker((prev) => ({
                                ...prev,
                                [key]: true,
                              }));
                            }}
                          >
                            {options?.map((option) => (
                              <Select.Option
                                key={option?.value}
                                value={option?.value}
                              >
                                {option?.label}
                              </Select.Option>
                            ))}
                          </Select>
                        )}

                        {type.includes("date") && (
                          <DatePicker
                            {...field}
                            // disabledDate={(current) =>
                            //   current && current < dayjs().startOf("day")
                            // }
                            placeholder=" "
                            className="h-[50px] font-inter w-full font-normal"
                            format="YYYY-MM-DD"
                            value={field.value ? moment(field.value) : null}
                            onChange={(dateTime) => {
                              field.onChange(
                                dateTime ? dateTime.format("YYYY-MM-DD") : null
                              );
                              setChecker((prev) => ({
                                ...prev,
                                [key]: true,
                              }));
                            }}
                          />
                        )}

                        <label className="font-inter font-medium">
                          {title}
                        </label>
                      </>
                    )}
                  />
                </div>
              </Form.Item>
            ))}
          </div>
          <div className="font-inter font-bold text-lg flex justify-start my-4">
            Upload Doc's
          </div>
          {/* WE USED FLEX IN UPLOAD SECTION GRID IN NOT SO GOOD WORKING IN MULTIPLE UPLOAD*/}
          <div className="w-full flex md:justify-start justify-center items-center gap-x-2 flex-wrap">
            {uploadFields.map(({ key, title }) => (
              <Form.Item
                className={`mx-2 flex flex-col justify-center items-center`}
                key={key}
                validateStatus={errors[key] ? "error" : ""}
                help={errors[key] && "This field is required"}
              >
                <Controller
                  name={key}
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <div>
                      {/*  className="flex flex-col items-center justify-center space-y-4" */}
                      <Upload
                        {...field}
                        accept="application/pdf"
                        maxCount={1}
                        showUploadList={false}
                        beforeUpload={(file) => {
                          //IN FUTURE WE HIDE THE FILE SIZE WE DONT KNOW WHAT THE FILE SIZE IS
                          // const maxFileSize = 2 * 1024 * 1024; // 2MB
                          const isPdf = file.type === "application/pdf";

                          // if (file.size > maxFileSize) {
                          //   message.error("File must be smaller than 2 MB!");
                          //   return Upload.LIST_IGNORE;
                          // }
                          if (!isPdf) {
                            message.error(
                              "Invalid file type! Only PDFs are allowed."
                            );
                            return Upload.LIST_IGNORE;
                          }
                          message.success("PDF Uploaded");
                          return true;
                        }}
                        onChange={({ file, fileList }) => {
                          handlePdfUpload(
                            key,
                            fileList[0]?.originFileObj || null
                          );
                          field.onChange(fileList[0]?.originFileObj || null);
                        }}
                      >
                        <Button
                          type={"btn"}
                          className={`${
                            pdfFile[key]
                              ? "bg-[black] text-white md:w-[12rem]"
                              : "border bg-gray-300 border-gray-300 text-gray-600"
                          } h-[46px] md:w-[11rem] sm:w-[11rem] w-[14rem] flex justify-center font-inter my-4`}
                          title={key}
                        >
                          {pdfFile[key] ? (
                            <span className="flex items-center justify-center gap-2">
                              {title}{" "}
                              <span
                                className={`text-xl ${
                                  pdfFile[key] ? "mx-0" : "mx-2"
                                } border-4  rounded-full px-2`}
                              >
                                &#10003;
                              </span>
                            </span>
                          ) : (
                            <span className="font-semibold">{title}</span>
                          )}
                        </Button>
                      </Upload>
                    </div>
                  )}
                />
              </Form.Item>
            ))}
          </div>

          <div className="flex justify-end mb-3 xl:-translate-y-4">
            <button
              type="submit"
              className="p-2 bg-transparent rounded-lg font-semibold px-8 text-[black] border border-[black]"
            >
              Save
            </button>
          </div>
        </Form>
      ) : isSubmit ? (
        <>{/* after create button hit */}</>
      ) : (
        <>
          {/* after form open */}
          <Skliton />
        </>
      )}
    </div>
  );
};

export default ExpenceRecordForm;
