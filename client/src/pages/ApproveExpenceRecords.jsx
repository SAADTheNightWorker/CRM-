import React, { useEffect, useState } from "react";
import FilterSection from "../components/FilterSection/FilterSection";
import { useDispatch, useSelector } from "react-redux";
import TableSection from "../components/table/TableSection";
import { useColumnSearch } from "../components/table/TablesFilter";
import { Button, Form, Modal, notification, Select } from "antd";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import {
  createApprove,
  getExpenceRecords,
} from "../../store/actionApis/expenceRecordApi";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

const ApproveExpenceRecords = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(null);

  // Effect to decode token and update user state
  useEffect(() => {
    const decoded = jwtDecode(token);
    setUserId(decoded?.id);
    console.log(decoded);
  }, [token]);

  const handleOk = () => {
    setActiveModal(null);
  };
  const handleCancel = () => {
    setActiveModal(null);
  };

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handlePdf = (pdf_file, key) => {
    console.log(pdf_file);
    const modalKey = `${pdf_file}_${key}`;
    setActiveModal(modalKey);

    if (pdf_file) {
      setFileUrl(pdf_file);
    } else {
      notification.warning({
        message: "No PDF Available",
        description: "No PDF associated with this task.",
        placement: "topRight",
      });
    }
  };

  const ExpenceData = useSelector(
    (state) => state?.expence?.expenceRecord?.payload
  );
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sideTableData, setSideTableData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [disabeld, setDisabeld] = useState(false);
  const [loading, setLoading] = useState(true);
  const { getColumnSearchProps } = useColumnSearch(
    setFilteredData,
    ExpenceData
  );
  const dispatch = useDispatch();
  // console.log("CHECK 21", tableData);

  useEffect(() => {
    const fetchData = async () => {
      if (ExpenceData?.length > 0) {
        // setTableData(clientData);
        setTableData(ExpenceData);
      }
    };
    fetchData();
  }, [ExpenceData]);

  // useEffect(() => {
  //   dispatch(getExpenceRecords());
  // }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getExpenceRecords()).unwrap();
        // console.log("Response:", res);
      } catch (error) {
        console.error("Error fetching Expence Record:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const columns = [
    {
      title: "Status",
      key: "approvedDone",
      width: 140,
      fixed: "left",
      render: (row) => {
        const updateStatus = row.approvedDone;

        return (
          <Form>
            <Form.Item>
              <Select
                style={{ width: "110px", color: "#fff" }}
                className="h-7 rounded-md border"
                placeholder=""
                value={`${updateStatus ? updateStatus : 0}`}
                onChange={(value) => {
                  handleStatusChange(value, row);
                  setDisabeld(true);
                }}
                // Disable if already approved/rejected or if the logged-in user is the creator
                disabled={
                  row.approvedDone !== 0 ||
                  +row.approvedBy === userId ||
                  disabeld
                }
              >
                {updateStatus === 1 ? (
                  <Select.Option value="1" style={{ height: "25px" }}>
                    <p className="text-green-500">Approved</p>
                  </Select.Option>
                ) : updateStatus === 2 ? (
                  <Select.Option value="2" style={{ height: "25px" }}>
                    <p className="text-red-500">Rejected</p>
                  </Select.Option>
                ) : (
                  <>
                    <Select.Option value="1" style={{ height: "25px" }}>
                      <p className="text-green-500">Approved</p>
                    </Select.Option>
                    <Select.Option value="2">
                      <p className="text-red-500">Rejected</p>
                    </Select.Option>
                    <Select.Option value="0">
                      <p className="text-blue-600">Pending</p>
                    </Select.Option>
                  </>
                )}
              </Select>
            </Form.Item>
          </Form>
        );
      },
    },
    // {
    //   title: "Status",
    //   key: "approvedDone",
    //   width: 140,
    //   fixed: "left",
    //   render: (row) => {
    //     // console.log("row > ", row);
    //     const updateStatus = row.approvedDone;
    //     // const row = row;
    //     console.log(updateStatus);
    //     return (
    //       <Form>
    //         <Form.Item>
    //           <Select
    //             style={{ width: "110px", color: "#fff" }}
    //             className="h-7 rounded-md border"
    //             placeholder=""
    //             value={`${updateStatus ? updateStatus : 0}`}
    //             onChange={(value) => handleStatusChange(value, row)}
    //           >
    //             {row.approvedDone == 1 ? (
    //               <Option value="1" style={{ height: "25px" }}>
    //                 <p className="text-green-500">Approved</p>
    //               </Option>
    //             ) : row.approvedDone == 0 ? (
    //               <>
    //                 <Option value="1" style={{ height: "25px" }}>
    //                   <p className="text-green-500">Approved</p>
    //                 </Option>
    //                 <Option value="2">
    //                   <p className="text-red-500">Rejected</p>
    //                 </Option>
    //                 <Option value="0">
    //                   <p className="text-blue-600">Pending</p>
    //                 </Option>
    //               </>
    //             ) : row.approvedDone == 2 ? (
    //               <>
    //                 <Option value="2">
    //                   <p className="text-red-500">Rejected</p>
    //                 </Option>
    //               </>
    //             ) : row.approvedDone == 0 ? (
    //               <>
    //                 <Option value="1" style={{ height: "25px" }}>
    //                   <p className="text-green-500">Approved</p>
    //                 </Option>
    //                 <Option value="2">
    //                   <p className="text-red-500">Rejected</p>
    //                 </Option>
    //                 <Option value="0">
    //                   <p className="text-blue-600">Pending</p>
    //                 </Option>
    //               </>
    //             ) : null}
    //           </Select>
    //         </Form.Item>
    //       </Form>
    //     );
    //   },
    // },
    {
      title: "Vendor Name",
      key: "vendorName",
      dataIndex: "vendorName",
      width: 120,
      ...getColumnSearchProps("vendorName"),
      sorter: (a, b) => a.vendorName.length - b.vendorName.length,
    },
    {
      title: "Service Owner",
      key: "serviceOwnerName",
      dataIndex: "serviceOwnerName",
      width: 120,
      ...getColumnSearchProps("serviceOwnerName"),
      sorter: (a, b) => a.serviceOwnerName.length - b.serviceOwnerName.length,
    },
    {
      title: "Category",
      key: "categoryName",
      dataIndex: "categoryName",
      width: 120,
      ...getColumnSearchProps("categoryName"),
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
    },
    {
      title: "Service Des",
      key: "serviceDec",
      dataIndex: "serviceDec",
      width: 120,
      ...getColumnSearchProps("serviceDec"),
      sorter: (a, b) => a.serviceDec.length - b.serviceDec.length,
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
      width: 120,
      ...getColumnSearchProps("amount"),
      sorter: (a, b) => a.amount - b.amount,
      render: (text, record) => (
        <>
          {console.log("CH", record)}
          <span>
            <span className="text-green-600 font-semibold">
              {record?.currency}
            </span>
            :{record?.amount}
          </span>
        </>
      ),
    },
    {
      title: "DueDate",
      key: "dueDate",
      dataIndex: "dueDate",
      width: 120,
      ...getColumnSearchProps("dueDate"),
      sorter: (a, b) => a.dueDate - b.dueDate,
      render: (text, record) => (
        <span>{new Date(record.dueDate).toLocaleString()}</span>
      ),
    },
    {
      title: "Date Of Payment",
      key: "dateOfPayment",
      dataIndex: "dateOfPayment",
      width: 120,
      ...getColumnSearchProps("dateOfPayment"),
      sorter: (a, b) => a.dateOfPayment - b.dateOfPayment,
      render: (text, record) => (
        <span>{new Date(record.dateOfPayment).toLocaleString()}</span>
      ),
    },
    {
      title: "Duration",
      key: "duration",
      dataIndex: "duration",
      width: 120,
      ...getColumnSearchProps("duration"),
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: "VAT",
      key: "vat",
      dataIndex: "vat",
      width: 120,
      ...getColumnSearchProps("vat"),
      sorter: (a, b) => a.vat - b.vat,
    },

    {
      title: "Payment Doc",
      key: "paymentDoc",
      dataIndex: "paymentDoc",
      width: 120,
      // ...getColumnSearchProps("texInvoiceDoc"),
      sorter: (a, b) => a.paymentDoc - b.paymentDoc,
      render: (row, record, index) => (
        <div key={index}>
          {row ? (
            <div>
              <Button
                type="btn"
                className="px-10 font-semibold bg-[black]/90 text-white"
                onClick={() => {
                  if (row !== null && row !== undefined) {
                    handlePdf(row, "paymentDoc");
                  }
                }}
              >
                View File
              </Button>
              <Modal
                open={activeModal === `${row}_paymentDoc`}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                style={{
                  height: "80vh",
                  overflowY: "hidden",
                  top: "5vh",
                  backgroundColor: "#ffffff", // Ensure white background
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                }}
                bodyStyle={{
                  height: "100%",
                  padding: "10px",
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "calc(80vh - 50px)", // Auto-adjust height
                    overflow: "hidden",
                    backgroundColor: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
                    {fileUrl ? (
                      <div
                        style={{
                          width: "95%",
                          height: "100%",
                          borderRadius: "8px",
                          overflow: "hidden",
                          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                          backgroundColor: "#f8f8f8",
                          padding: "10px",
                        }}
                      >
                        <Viewer
                          fileUrl={fileUrl}
                          plugins={[defaultLayoutPluginInstance]}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>
                    ) : (
                      <p className="text-center text-gray-500 mt-4">
                        No PDF associated with this question.
                      </p>
                    )}
                  </Worker>
                </div>
              </Modal>
            </div>
          ) : (
            <Button
              type="default"
              className="px-11 bg-gray-300 text-gray-600 font-semibold"
              disabled
            >
              No File
            </Button>
          )}
        </div>
      ),
    },
  ];

  const handleStatusChange = async (value, row) => {
    try {
      const formatedData = {
        id: row.id,
        status: Number(value),
        approvedBy: userId,
      };
      console.log(formatedData);

      const res = await dispatch(createApprove(formatedData));
      console.log("RES", res);

      if (res.payload?.success === true) {
        notification.success({
          message: "Status updated!",
          description:
            "Expence Record status successfully updated we sended email notification",
          placement: "topRight",
          className: "font-inter font-medium",
        });
        dispatch(getExpenceRecords());
      } else {
        notification.error({
          message: "Status failed to update",
          description:
            "The Expence Record status could not be updated due to an unexpected error",
          placement: "topRight",
          className: "font-inter font-medium",
        });
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Failure",
        description: "Error occurred while updating Expence Record data",
        placement: "topRight",
        className: "font-inter font-medium",
      });
    } finally {
      setDisabeld(false);
    }
  };

  const onRowClick = (row) => {
    console.log("ROW", row);
    setIsOpen(true);
    setSideTableData(row);
  };

  return (
    <div className="min-h-[100vh] p-4">
      <motion.h1
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="text-gray-500 font-semibold border-b border-gray-400 w-fit animate-pulse"
      >
        Click on Row to Show More Details
      </motion.h1>
      <TableSection
        columns={columns}
        dataSource={tableData}
        onRowClick={onRowClick}
        tableType="approve"
        loading={loading}
      />

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          whileInView={{ scale: 0.8 }}
          whileHover={{ scale: 0.9 }}
          className="w-full min-h-[20vh] shadow-lg bg-white border rounded-lg mt-6"
        >
          <div className="bg-[black] grid grid-cols-9 p-5 text-white rounded-t-lg">
            <p className="font-semibold col-span-3 text-center">Approved By</p>
            <p className="font-semibold col-span-3 text-center">
              Approval Status
            </p>
            <p className="font-semibold col-span-2 text-center">
              Service Description
            </p>
          </div>

          <div className="grid grid-cols-9 p-6 bg-gray-200 border my-4">
            <p className="font-semibold col-span-3 text-center">
              {Array.isArray(sideTableData?.approvedByDetails) &&
              sideTableData?.approvedByDetails?.length > 0 ? (
                sideTableData?.approvedByDetails?.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-400 p-3 rounded-full m-2 bg-white"
                  >
                    {index + 1} :{" "}
                    <span className="text-green-500">{item?.name}</span>
                  </div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 1.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-gray-500"
                >
                  No Approval
                </motion.div>
              )}
            </p>
            <p className="font-semibold col-span-3 text-center">
              {sideTableData?.approvedDone === 0 ? (
                <span className="bg-primary text-white p-2 rounded-lg">
                  Pending
                </span>
              ) : sideTableData?.approvedDone === 1 ? (
                <span className="bg-green-500 text-white p-2 rounded-lg">
                  Approval Completed
                </span>
              ) : sideTableData?.approvedDone === 2 ? (
                <span className="bg-red-500 text-white p-2 rounded-lg">
                  Rejected
                </span>
              ) : (
                <span></span>
              )}
            </p>
            <p className="font-semibold col-span-2 text-center">
              {sideTableData?.serviceDec || "N/A"}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ApproveExpenceRecords;
