import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import dayjs from "dayjs";
import { EditOutlined } from "@ant-design/icons";

const Edit = (props) => {
  const {
    title,
    isModalOpen,
    setIsModalOpen,
    setIsClosedModal,
    handleRow,
    editFields,
    description,
    editData,
    onEditFinish,
    EditBtnDisable,
    BtnDisable,
    isDeleting,
    modalType,
    editDataUpload,
    setPdfFile,
    pdfFile,
  } = props;

  const dispatch = useDispatch();
  // Machines associated with the selected area
  const text = title.slice(4);

  //;
  const [checker, setChecker] = React.useState({
    prospect_client_name: true,
    no_of_vehicles: true,
    existing_insurer: true,
    decision_maker: true,
  });
  const isEdit = title.includes("Edit");

  useEffect(() => {
    if (isEdit) {
      reset({
        name: editData?.name,
        company: editData?.company,
        broker: editData?.broker,
        agent: editData?.agent,
        vendor: editData?.vendor,
        category: editData?.category,
        payment: editData?.payment,
      });
    }
  }, [editData]);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const emptyAllState = () => {
    reset();
  };

  const handlePdfUpload = (key, file) => {
    setPdfFile((prev) => ({ ...prev, [key]: file }));
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false);
        setIsClosedModal ? setIsClosedModal(false) : null;
        emptyAllState();
      }}
      className={
        isEdit
          ? `${
              modalType === "prospect" || modalType === "vehicles"
                ? "edit-modal-big relative px-4"
                : "w-10"
            } `
          : "delete-modal"
      }
      width={modalType === "Revenue_Record" ? 1000 : 600}
      footer={[
        <div className="flex justify-between items-center gap-4">
          {isEdit && (
            <Button
            type="btn"
              key="close"
              className="w-40 h-12 rounded-full bg-gray-300 hover:bg-black/60 hover:text-white font-semibold text-black tracking-wider"
              onClick={() => {
                setIsModalOpen(false);
                setIsClosedModal ? setIsClosedModal(false) : null;
                emptyAllState();
              }}
            >
              No, Keep It.
            </Button>
          )}
          <Button
          type="btn"
            key="save"
            className={`${
              isEdit
                ? `${" py-6 rounded-full text-white w-40 h-12 font-semibold tracking-wider"}`
                : "modal-yes-btn"
            } bg-black hover:bg-black/80 duration-200`}
            onClick={
              isEdit
                ? handleSubmit((data) => {
                    const editValues = { ...data, id: editData.id };
                    //console.log(editValues);
                    onEditFinish(editValues);
                    setTimeout(() => {
                      emptyAllState();
                    }, 2000);
                  })
                : handleRow
            }
            disabled={EditBtnDisable || BtnDisable || isDeleting}
          >
            {isEdit ? "Yes, Submit!" : "Yes"}
          </Button>
        </div>,
      ]}
    >
      <div className="w-fit m-[auto] flex flex-col justify-start items-center gap-4">
        <div className="p-3 bg-black/60 rounded-full w-fit">
          <EditOutlined style={{ color: "white", fontSize: "40px" }} />
        </div>
      </div>
        <div className="font-thine text-gray-500 tracking-widest text-2xl">{title}?</div>
      <div className="text-xl font-semibold text-gray-500 tracking-widest">
        Submit the form to Update  <span className="font-thin">{text}!</span>
      </div>
      {isEdit ? (
        <Form
          onFinish={handleSubmit(onEditFinish)}
          layout="vertical"
          className="font-inter px-3"
        >
          <div
            className={`${
              modalType === "prospect"
                ? "pb-2 grid lg:grid-cols-4 sm:grid-cols-3 mid-xs:grid-cols-2 xs:grid-cols-1 gap-4 mt-5 py-2 my-2"
                : modalType === "vehicles"
                  ? "pb-2 grid md:grid-cols-3 sm:grid-cols-3 mid-xs:grid-cols-2 xs:grid-cols-1 gap-4 mt-5 py-2 my-2"
                  : modalType === "payment"
                    ? "pb-2 grid md:grid-cols-2 sm:grid-cols-3 mid-xs:grid-cols-2 xs:grid-cols-1 gap-4 mt-5 py-2 my-2"
                    : modalType === "payment"
                      ? "pb-2 grid md:grid-cols-2 sm:grid-cols-3 mid-xs:grid-cols-2 xs:grid-cols-1 gap-4 mt-5 py-2 my-2"
                      : modalType === "client"
                        ? "pb-2 grid md:grid-cols-1 sm:grid-cols-1 mid-xs:grid-cols-1 xs:grid-cols-1 gap-4 mt-5 py-2 my-2"
                        : "grid lg:grid-cols-2 sm:grid-cols-2 mid-xs:grid-cols-2 xs:grid-cols-2 gap-4 mt-5 p-10"
            }`}
          >
            {editFields.map((item) => (
              <Form.Item
                key={item.key}
                className={`${
                  item.key === "policy_expiry_date"
                    ? "md:col-span-1 mid-xs:col-span-2 col-span-1"
                    : item.key === "is_payment_recieved"
                      ? "md:col-span-2 mid-xs:col-span-2 col-span-1"
                      : item.key === "quote_approved"
                        ? "md:col-span-2 mid-xs:col-span-2 col-span-1"
                        : item.key === "policyPayOutstandingAmount"
                          ? "md:col-span-2 mid-xs:col-span-2 col-span-1"
                          : ""
                }`}
              >
                <div
                  className={`floating-input  ${
                    (item.key === "prospect_client_name" &&
                      checker.prospect_client_name) ||
                    (item.key === "no_of_vehicles" && checker.no_of_vehicles) ||
                    (item.key === "existing_insurer" &&
                      checker.existing_insurer) ||
                    (item.key === "decision_maker" && checker.decision_maker) ||
                    (item.key === "user_type" && checker.user_type)
                      ? "floating-input-active"
                      : ""
                  }`}
                >
                  <Controller
                    name={item.key}
                    control={control}
                    // rules={{ required: true }}
                    render={({ field }) => (
                      <>
                        {/* Text Input */}
                        {(item.type === "text" || item.type === "number") && (
                          <Input
                            {...field}
                            type={item.type === "number" ? "number" : "text"}
                            className="h-[60px] font-inter"
                            placeholder={""}
                            onChange={(e) => {
                              // handleInputField(e);
                              field.onChange(e.target.value);
                              setChecker((pre) => ({
                                ...pre,
                                [item.key]: true,
                              }));
                            }}
                          />
                        )}

                        {/* Select Input */}
                        {item.type === "select" && (
                          <Select
                            {...field}
                            className="h-[60px] font-inter translate-y-1"
                            disabled={item.key === "client_id"}
                            placeholder=""
                            onChange={(value) => {
                              field.onChange(value);
                              // item.key === "line_id" && setSelectedArea(value);
                              setChecker((pre) => ({
                                ...pre,
                                [item.key]: true,
                              }));
                            }}
                          >
                            {item.options.map((item, index) => (
                              <Select.Option
                                value={item?.value}
                                key={index + 1}
                              >
                                {item?.label}
                              </Select.Option>
                            ))}
                          </Select>
                        )}

                        {item.type === "date" && (
                          <DatePicker
                            {...field}
                            disabledDate={
                              item.key === "meeting_date_time"
                                ? (current) =>
                                    current && current < dayjs().startOf("day")
                                : undefined
                            }
                            placeholder={
                              item.key === "meeting_date_time" ? " " : ""
                            }
                            className={
                              item.key === "meeting_date_time"
                                ? "h-[43px] font-inter w-full font-normal"
                                : "h-[50px] grid col-span-1"
                            }
                            showTime={
                              item.key === "meeting_date_time"
                                ? { format: "HH:mm:ss" }
                                : false
                            }
                            format={
                              item.key === "meeting_date_time"
                                ? "YYYY-MM-DD HH:mm:ss"
                                : "YYYY-MM-DD"
                            }
                            value={field.value ? moment(field.value) : null}
                            onChange={(date) => {
                              const formattedDate = date
                                ? date.format(
                                    item.key === "meeting_date_time"
                                      ? "YYYY-MM-DD HH:mm:ss"
                                      : "YYYY-MM-DD"
                                  )
                                : null;
                              field.onChange(formattedDate);

                              setChecker((prev) => ({
                                ...prev,
                                [item.key]: !!date,
                              }));
                            }}
                          />
                        )}

                        {/* Number Input */}
                        {/* {item.type === "number" && (
                            <InputNumber
                              type="number"
                              {...field}
                              className="edit-modal-field font-inter"
                              placeholder=""
                              onChange={(value) => {
                                field.onChange(value);
                              }}
                            />
                          )} */}
                        <label className="font-inter font-medium">
                          {item.type !== "checkbox" && item.title}
                        </label>
                      </>
                    )}
                  />
                </div>
              </Form.Item>
            ))}
            {modalType === "user" && (
              <Controller
                name={"isActive"}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    className="text-xs font-inter font-normal px-1 xs:px-1"
                    checked={field.value === 1}
                    onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
                  >
                    <span>Active?</span>
                  </Checkbox>
                )}
              />
            )}
            {editDataUpload?.map((item, index) => {
              if (item.type !== "upload") return null;
              return (
                <Form.Item key={index}>
                  <Controller
                    key={item.key || index}
                    name={item.key}
                    control={control}
                    // rules={{ required: true }}
                    render={({ field }) => (
                      <Upload
                        {...field}
                        accept={
                          item.key === "payment_doc"
                            ? ".pdf,.jpg,.jpeg,.png"
                            : "application/pdf"
                        }
                        maxCount={1}
                        showUploadList={false}
                        beforeUpload={(file) => {
                          // const maxFileSize = 2 * 1024 * 1024; // 2MB limit
                          const isPdf = file.type === "application/pdf";

                          if (!isPdf) {
                            message.error(
                              "Invalid file type! Only PDFs are allowed."
                            );
                            return Upload.LIST_IGNORE;
                          }

                          // if (file.size > maxFileSize) {
                          //   message.error("File must be smaller than 2 MB!");
                          //   return Upload.LIST_IGNORE;
                          // }

                          message.success("PDF Uploaded successfully!");
                          return true;
                        }}
                        onChange={({ fileList }) => {
                          const uploadedFile =
                            fileList[0]?.originFileObj || null;
                          handlePdfUpload(item.key, uploadedFile);
                          field.onChange(uploadedFile);
                        }}
                      >
                        <Button
                          type={"btn"}
                          className={`${
                            editData?.[item?.key] || pdfFile?.[item?.key]
                              ? "bg-[black] text-white  md:w-[12rem] "
                              : "border bg-gray-300 border-gray-300 text-gray-600"
                          } h-[46px] md:w-[11rem] sm:w-[11rem] w-[14rem] flex justify-center font-inter my-4`}
                          title={item.key}
                        >
                          {editData?.[item?.key] || pdfFile?.[item?.key] ? (
                            <span className="flex items-center justify-center gap-2">
                              {item?.title}
                              <span className="text-xl border-4 border-white rounded-full px-2">
                                &#10003;
                              </span>
                            </span>
                          ) : (
                            <div className="font-semibold">{item?.title}</div>
                          )}
                        </Button>
                      </Upload>
                    )}
                  />
                </Form.Item>
              );
            })}
          </div>
        </Form>
      ) : null}
    </Modal>
  );
};

export default Edit;
