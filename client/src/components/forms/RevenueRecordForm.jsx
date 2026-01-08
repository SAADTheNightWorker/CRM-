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
import {
  createPolicyRecords,
  getPolicyRecords,
} from "../../../store/actionApis/policyRecordApi";
import { getClient } from "../../../store/actionApis/clientApi";
import { getBroker } from "../../../store/actionApis/brokerApi";
import { getCompany } from "../../../store/actionApis/companyApi";
import { getAgent } from "../../../store/actionApis/agentAPi";
import {
  createRevenueRecord,
  getRevenueRecord,
} from "../../../store/actionApis/revenueApi";
import { getPayment } from "../../../store/actionApis/paymentApi";
import { jwtDecode } from "jwt-decode";

const uploadFields = [{ key: "policyPaymentDoc", title: "Policy Payment Doc" }];

const PolicyRecordForm = ({ handleOpen, open, setOpen }) => {
  const dispatch = useDispatch();
  const paymentData = useSelector((state) => state?.payment?.payments?.payload);
  const brokerData = useSelector((state) => state?.broker?.broker?.payload);
  const companyData = useSelector(
    (state) => state?.company?.companyName?.payload
  );
  console.log("STATE", paymentData);

  const topFields = [
    {
      key: "scBrockerNameId",
      title: "SC Broker Name",
      type: "select",
      options: brokerData?.map((item) => {
        return { value: item?.id, label: item?.broker };
      }),
    },
    {
      key: "incCompanyId",
      title: "SC Inc Company",
      type: "select",
      options: companyData?.map((item) => {
        return { value: item?.id, label: item?.company };
      }),
    },
    {
      key: "policyPaymentMethod",
      title: "Policy Payment Method",
      type: "select",
      options: paymentData?.map((item) => {
        return { value: item?.id, label: item?.payment };
      }),
    },
    {
      key: "dateofPolicyIssue",
      title: "Date Of Policy Issue",
      type: "date",
    },

    {
      key: "taxInvoiceNum",
      title: "Tax Invoice Number",
      type: "text",
    },
    {
      key: "creditNoteAmount",
      title: "Credit Note Amount",
      type: "number",
    },

    {
      key: "policyNum",
      title: "Net Policy Amount",
      type: "text",
    },
    {
      key: "claimWolfNetCommission",
      title: "Cliam Wolf Net Commission",
      type: "number",
    },
    {
      key: "policyPayOutstandingAmount",
      title: "Policy Pay Outstanding Amount",
      type: "number",
    },
  ];

  const [checker, setChecker] = React.useState({
    scBrockerNameId: false,
    incCompanyId: false,
    policyPaymentMethod: false,
    dateofPolicyIssue: false,
    taxInvoiceNum: false,
    creditNoteAmount: false,
    policyNum: false,
    policySecheduleDoc: false,
    claimWolfNetCommission: false,
    policyPayOutstandingAmount: false,
  });
  const [loading, setLoading] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [pdfFile, setPdfFile] = useState({});
  const [createdBy, setCreatedBy] = useState();
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
  // react hook form to get the inputs data, that integrate with 3rd party Ui
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      scBrockerNameId: null,
      incCompanyId: null,
      policyPaymentMethod: null,
      dateofPolicyIssue: null,
      taxInvoiceNum: null,
      creditNoteAmount: null,
      policyNum: null,
      policySecheduleDoc: null,
      claimWolfNetCommission: null,
      policyPayOutstandingAmount: null,
    },
  });

  // null all states when needed
  const emptyAllState = () => {
    setChecker({
      scBrockerNameId: false,
      incCompanyId: false,
      policyPaymentMethod: false,
      dateofPolicyIssue: false,
      taxInvoiceNum: false,
      creditNoteAmount: false,
      policyNum: false,
      policySecheduleDoc: false,
      claimWolfNetCommission: false,
      policyPayOutstandingAmount: false,
    });
    setPdfFile({});
  };
  useEffect(() => {
    dispatch(getPayment());
    dispatch(getBroker());
    dispatch(getCompany());
    dispatch(getAgent());
  }, [dispatch]);
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const decoded = jwtDecode(token);
  //   setCreatedBy(decoded.user_id);
  //   console.log(decoded);
  // }, []);

  // function to handle and submit the centerline values
  const handleSub = async (data) => {
    console.log(data);

    // setIsSubmit(true);

    const formData = new FormData();

    // // Append fields
    formData.append("scBrockerNameId", data.scBrockerNameId);
    formData.append("incCompanyId", data.incCompanyId);
    formData.append("policyPaymentMethod", data.policyPaymentMethod);
    formData.append("dateofPolicyIssue", data.dateofPolicyIssue);
    formData.append("taxInvoiceNum", data.taxInvoiceNum);
    formData.append("creditNoteAmount", data.creditNoteAmount);
    formData.append("policyNum", data.policyNum);

    formData.append("claimWolfNetCommission", data.claimWolfNetCommission);
    formData.append(
      "policyPayOutstandingAmount",
      data.policyPayOutstandingAmount
    );
    formData.append("policyPaymentDoc", data.policyPaymentDoc);
    formData.append("createdBy", userId);

    // Log the formData entries
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await dispatch(createRevenueRecord(formData));
    console.log("CHECK", response);
    try {
      if (response) {
        setIsSubmit(false);
        setLoading(false);
        notification.success({
          message: "Revenue Record Added!",
          description: `Revenue Record is added against CRM`,
          placement: "topRight",
        });
        dispatch(getRevenueRecord());
        setOpen(false);
        reset();
        emptyAllState();
      } else {
        setIsSubmit(false);
        notification.error({
          message: "Revenue Record Addition Failed",
          description:
            "The Revenue Record could not be added due to an unexpected error.",
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
              scBrockerNameId: null,
              incCompanyId: null,
              policyPaymentMethod: null,
              dateofPolicyIssue: null,
              taxInvoiceNum: null,
              creditNoteAmount: null,
              policyNum: null,
              policySecheduleDoc: null,
              claimWolfNetCommission: null,
              policyPayOutstandingAmount: null,
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

export default PolicyRecordForm;
