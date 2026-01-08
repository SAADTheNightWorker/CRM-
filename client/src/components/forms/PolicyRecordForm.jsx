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
import { jwtDecode } from "jwt-decode";

const uploadFields = [
  { key: "texInvoiceDoc", title: "Tex Invoice Doc" },
  // { key: "policySecheduleDoc", title: "Policy Sechedule Doc" },
  // { key: "creditNoteDoc", title: "Credit Note Doc" },
];

const PolicyRecordForm = ({ handleOpen, open, setOpen }) => {
  const dispatch = useDispatch();
  const clientData = useSelector((state) => state?.clients?.clients?.payload);
  const brokerData = useSelector((state) => state?.broker?.broker?.payload);
  const companyData = useSelector(
    (state) => state?.company?.companyName?.payload
  );
  const agentData = useSelector((state) => state?.agent?.agents?.payload);
  // console.log("STATE", agentData);

  const topFields = [
    {
      key: "clientId",
      title: "Client Name",
      type: "select",
      options: clientData?.map((item) => {
        return { value: item?.id, label: item?.name };
      }),
    },
    {
      key: "scbrokerNameId",
      title: "SC Broker Name",
      type: "select",
      options: brokerData?.map((item) => {
        return { value: item?.id, label: item?.broker };
      }),
    },
    {
      key: "scIncCompanyId",
      title: "SC Inc Company",
      type: "select",
      options: companyData?.map((item) => {
        return { value: item?.id, label: item?.company };
      }),
    },
    {
      key: "agnentNameId",
      title: "Agnent Name",
      type: "select",
      options: agentData?.map((item) => {
        return { value: item?.id, label: item?.agent };
      }),
    },
    {
      key: "chassisNumber",
      title: "Invoice Number",
      type: "text",
    },

    {
      key: "dateOfIssue",
      title: "Date Of Issue",
      type: "date",
    },
    {
      key: "netPolicyAmount",
      title: "Tax Invoice Amount",
      type: "number",
    },
    {
      key: "creditNoteAmount",
      title: "Emirate",
      type: "text",
    },
  ];

  const [checker, setChecker] = React.useState({
    clientId: false,
    scbrokerNameId: false,
    scIncCompanyId: false,
    agnentNameId: false,
    chassisNumber: false,
    dateOfIssue: false,
    netPolicyAmount: false,
    creditNoteAmount: false,
    texInvoiceDoc: false,
    // policySecheduleDoc: false,
    // creditNoteDoc: false,
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
      clientId: null,
      scbrokerNameId: null,
      scIncCompanyId: null,
      agnentNameId: null,
      chassisNumber: null,
      dateOfIssue: null,
      netPolicyAmount: null,
      creditNoteAmount: null,
      texInvoiceDoc: null,
      // policySecheduleDoc: null,
      // creditNoteDoc: null,
    },
  });

  // null all states when needed
  const emptyAllState = () => {
    setChecker({
      clientId: false,
      scbrokerNameId: false,
      scIncCompanyId: false,
      agnentNameId: false,
      chassisNumber: false,
      dateOfIssue: false,
      netPolicyAmount: false,
      creditNoteAmount: false,
      texInvoiceDoc: false,
      // policySecheduleDoc: false,
      // creditNoteDoc: false,
    });
    setPdfFile({});
  };
  useEffect(() => {
    dispatch(getClient());
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
    formData.append("clientId", data.clientId);
    formData.append("scbrokerNameId", data.scbrokerNameId);
    formData.append("scIncCompanyId", data.scIncCompanyId);
    formData.append("agnentNameId", data.agnentNameId);
    formData.append("chassisNumber", data.chassisNumber);
    formData.append("dateOfIssue", data.dateOfIssue);
    formData.append("netPolicyAmount", data.netPolicyAmount);
    formData.append("creditNoteAmount", data.creditNoteAmount);

    formData.append("texInvoiceDoc", data.texInvoiceDoc);
    // formData.append("policySecheduleDoc", data.policySecheduleDoc);
    // formData.append("creditNoteDoc", data.creditNoteDoc);
    formData.append("created_by", userId);

    // Log the formData entries
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await dispatch(createPolicyRecords(formData));
    console.log("CHECK", response);
    try {
      if (response) {
        setIsSubmit(false);
        setLoading(false);
        notification.success({
          message: "Policy Record Added!",
          description: `Policy Record is added against CRM`,
          placement: "topRight",
        });
        dispatch(getPolicyRecords());
        setOpen(false);
        reset();
        emptyAllState();
      } else {
        setIsSubmit(false);
        notification.error({
          message: "Policy Record Addition Failed",
          description:
            "The Policy Record could not be added due to an unexpected error.",
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
  // console.log(pdfFile);

  return (
    <div className="bg-white rounded-lg font-inter h-[400px] max-xl:overflow-y-hidden max-lg:overflow-scroll border shadow-lg ">
      <div className="flex justify-between items-center px-6 pt-6 pb-3 sticky top-0 bg-white z-10">
        <div className="text-xl font-bold text-black">Create New</div>
        <button
          className="flex items-center font-normal text-[13px] text-redColor"
          onClick={() => {
            handleOpen(1);
            reset({
              clientId: "",
              scbrokerNameId: "",
              scIncCompanyId: "",
              agnentNameId: "",
              chassisNumber: "",
              dateOfIssue: "",
              netPolicyAmount: "",
              creditNoteAmount: "",
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
                            className="h-[50px] w-full flex translate-y-1"
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

                        {/* {type === "space-compact" && (
                          <Space.Compact className="w-full">
                            {/* Country Code Select */}
                        {/* <Controller
                              name="decision_maker_phone"
                              control={control}
                              defaultValue={countryCodes[0]?.value || "+1"} // Ensure a valid default value
                              rules={{ required: "Country code is required" }} // Validation rule
                              render={({ field, fieldState: { error } }) => (
                                <>
                                  <Select
                                    {...field}
                                    showSearch
                                    options={countryCodes}
                                    className={`w-full h-[43px] ${
                                      error ? "ant-select-error" : ""
                                    }`}
                                    style={{ width: "50%" }}
                                    placeholder="Country Code"
                                    onChange={(value, countryValue) => {
                                      field.onChange(value, countryValue);
                                      handlePhoneChange(
                                        "countryDetails",
                                        countryValue
                                      );
                                    }}
                                    filterOption={(input, option) =>
                                      option.label
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                    }
                                  />
                                </>
                              )}
                            /> */}

                        {/* Phone Number Input */}
                        {/* <Controller
                              name="phoneNumber"
                              control={control}
                              // defaultValue="XX XXX XXXX" // Ensure a valid default value
                              rules={{
                                required: "Phone number is required",
                                pattern: {
                                  value: /^[0-9]{7,15}$/, // Only digits, 7 to 15 characters
                                  message: "Enter a valid phone number",
                                },
                              }}
                              render={({ field, fieldState: { error } }) => (
                                <>
                                  <Input
                                    {...field}
                                    // placeholder="phone number"
                                    placeholder="XX XXX XXXX"
                                    className={`w-full h-[43px] ${
                                      error ? "ant-input-error" : ""
                                    }`}
                                    onChange={(e) => {
                                      const formattedNumber =
                                        e.target.value.replace(/\D/g, "");
                                      field.onChange(formattedNumber);
                                      handlePhoneChange(
                                        "number",
                                        formattedNumber
                                      );
                                    }}
                                  />
                                  {error && (
                                    <p className="text-red-500 text-sm">
                                      <div>{error.message}</div>
                                    </p>
                                  )}
                                </>
                              )}
                            /> */}
                        {/* </Space.Compact>
                        )} */}

                        {type.includes("date") && (
                          <DatePicker
                            {...field}
                            // disabledDate={(current) =>
                            //   current && current < dayjs().startOf("day")
                            // }
                            placeholder=" "
                            className="h-[43px] font-inter w-full font-normal"
                            showTime={{ format: "HH:mm:ss" }}
                            format="YYYY-MM-DD HH:mm:ss"
                            value={field.value ? moment(field.value) : null}
                            onChange={(dateTime) => {
                              field.onChange(
                                dateTime
                                  ? dateTime.format("YYYY-MM-DD HH:mm:ss")
                                  : null
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
              className="p-2 bg-transparent flex justify-center items-center rounded-full font-semibold text-sm hover:bg-black hover:text-white duration-200 px-8 text-[black] border border-[black]"
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

// {uploadFields.map(({ key, title }) => (
//     <Form.Item
//       className="mx-2 flex flex-col justify-center items-center"
//       key={key}
//       validateStatus={errors[key] ? "error" : ""}
//       help={errors[key] && "This field is required"}
//     >
//       <Controller
//         name={key}
//         control={control}
//         defaultValue={[]} // Use an array for fileList
//         render={({ field: { onChange, value } }) => (
//           <div>
//             <Upload
//               accept="application/pdf"
//               maxCount={1}
//               showUploadList={false}
//               beforeUpload={(file) => {
//                 const isPdf = file.type === "application/pdf";
//                 if (!isPdf) {
//                   message.error(
//                     "Invalid file type! Only PDFs are allowed."
//                   );
//                   return Upload.LIST_IGNORE;
//                 }
//                 message.success("PDF Uploaded");
//                 return false; // Prevent default upload behavior
//               }}
//               fileList={value} // Set fileList properly
//               onChange={({ fileList }) => {
//                 const file =
//                   fileList.length > 0
//                     ? fileList[0].originFileObj
//                     : null;
//                 handlePdfUpload(key, file);
//                 onChange(file ? [file] : []); // Update fileList
//               }}
//             >
//               <Button
//                 type="button"
//                 className={`${
//                   pdfFile[key]
//                     ? "bg-[black] text-white md:w-[12rem]"
//                     : "border bg-gray-300 border-gray-300 text-gray-600"
//                 } h-[46px] md:w-[11rem] sm:w-[11rem] w-[14rem] flex justify-center font-inter my-4`}
//                 title={key}
//               >
//                 {pdfFile[key] ? (
//                   <span className="flex items-center justify-center gap-2">
//                     {title}{" "}
//                     <span className="text-xl border-4 rounded-full px-2">
//                       &#10003;
//                     </span>
//                   </span>
//                 ) : (
//                   <span className="font-semibold">{title}</span>
//                 )}
//               </Button>
//             </Upload>
//           </div>
//         )}
//       />
//     </Form.Item>
//   ))}
