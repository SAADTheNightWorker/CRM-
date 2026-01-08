import React, { useState } from "react";
import { Button, Flex, Form, Input, Modal, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";

const ApprovalModal = ({ editData, setOpen, open, handelApproval }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "",
      comment: "",
    },
  });
  const [stateStatus, setStateStatus] = useState();

  const onSubmit = (data) => {
    const editValues = { ...data, id: editData.id, status: stateStatus };
    handelApproval(editValues);
    setOpen(false);
  };

  const statusOptions = [
    { label: "Pending", value: 0 },
    { label: "Approved", value: 1 },
    { label: "Denied", value: 2 },
  ];

  return (
    <Flex vertical gap="middle" align="flex-start">
      <Modal
        title="Approval Modal"
        centered
        open={open}
        onOk={() => {
          setOpen(false);
          setStateStatus("");
        }}
        onCancel={() => {
          setOpen(false);
          setStateStatus("");
        }}
        footer={[
          <div className="min-w-full flex justify-between items-center my-2 pt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setOpen(false)}
                className="rounded-full h-12 w-40 font-semibold tracking-wider bg-gray-300"
              >
                No, Keep It
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="rounded-full h-12 w-40 bg-green-500 text-white font-semibold tracking-wider ml-28"
                type="primary"
                onClick={handleSubmit(onSubmit)}
              >
                Yes, Done!
              </Button>
            </motion.div>
          </div>,
        ]}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center items-center p-14"
        >
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Form.Item label="Approval status">
              <Select
                name="status"
                className="h-[43px] rounded-md border"
                placeholder={""}
                value={stateStatus ? stateStatus : editData.status}
                disabled={editData?.status === 1 ? true : editData?.status === 2 ? true : false}
                onChange={(data) => setStateStatus(data)}
              >
                {statusOptions.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Comment"
              validateStatus={errors.comment ? "error" : ""}
              help={errors.comment ? errors.comment.message : ""}
            >
              <Controller
                name="comment"
                control={control}
                rules={{ required: "Comment is required" }}
                disabled={editData?.status === 1? true : editData?.status === 2 ? true : false}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter Comment"
                    className="h-[43px]"
                  />
                )}
              />
            </Form.Item>
          </Form>
        </motion.div>
      </Modal>
    </Flex>
  );
};

export default ApprovalModal;
