import React, { useState } from "react";
import { Button, Modal } from "antd";
import { WarningOutlined } from "@ant-design/icons";
const Delete = ({ open, setOpen, text, handelDelete }) => {
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
    handelDelete();
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };
  return (
    <>
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <div className="flex justify-between my-2 pt-4">
            <Button
              onClick={() => handleCancel()}
              className="rounded-full h-12 w-40 font-semibold tracking-wider bg-gray-300"
            >
              No, Keep It.
            </Button>
            <Button
              onClick={() => handleOk()}
              className="rounded-full h-12 w-40 bg-red-500 text-white font-semibold tracking-wider"
            >
              Yes, Delete!
            </Button>
          </div>
        }
        // okButtonProps={{
        //   disabled: true,
        // }}
        // cancelButtonProps={{
        //   disabled: true,
        // }}
      >
        <div className="flex flex-col justify-center items-center p-4 gap-4">
          <div className="p-3 bg-red-300/20 rounded-full">
            <WarningOutlined style={{ color: "red", fontSize: "40px" }} />
          </div>
          <p className="font-semibold text-2xl">Delete {text}?</p>
          <p className="font-semibold text-lg text-red-600 text-center">
            You're going to delete the {text} <br /> Are You Sure?
          </p>
        </div>
      </Modal>
    </>
  );
};
export default Delete;
