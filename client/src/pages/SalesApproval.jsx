import React, { useEffect, useState } from "react";
import FilterSection from "../components/FilterSection/FilterSection";
import { useDispatch, useSelector } from "react-redux";
import TableSection from "../components/table/TableSection";
import { useColumnSearch } from "../components/table/TablesFilter";
import { Button, Form, Modal, notification, Select, Tooltip } from "antd";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import {
  getFleetManagement,
  updateFleetStatus,
} from "../../store/actionApis/fleetManagementApi";
import approval from "/images/approved.png";
import ApprovalModal from "../components/Modal/ApprovalModal";

const SalesApproval = () => {
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
    (state) => state?.fleetManagement?.fleetManagement?.payload
  );
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sideTableData, setSideTableData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [disabeld, setDisabeld] = useState(false);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getColumnSearchProps } = useColumnSearch(
    setFilteredData,
    ExpenceData
  );
  const dispatch = useDispatch();
  // console.log("CHECK 21", tableData);
  // useEffect(() => {
  //   dispatch(getFleetManagement());
  // }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (ExpenceData?.length > 0) {
        // setTableData(clientData);
        setTableData(ExpenceData);
      }
    };
    fetchData();
  }, [ExpenceData]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getFleetManagement()).unwrap();
        // console.log("Response:", res);
      } catch (error) {
        console.error("Error fetching Fleet Record:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const columns = [
    {
      title: "Approval Modal",
      key: "action",
      width: 200,
      fixed: "right",
      render: (text, record) => (
        <div className="flex gap-4 ">
          <Tooltip title="Approval Modal">
            <button
              className="bg-white transition-all duration-200 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl w-20"
              onClick={() => ApprovalModalOpen(record)}
            >
              <img src={approval} alt="Approval" className="bg-cover" />
            </button>
          </Tooltip>
        </div>
      ),
    },

    // {
    //   title: "Status",
    //   key: "approvedDone",
    //   width: 140,
    //   fixed: "left",
    //   render: (row) => {
    //     const updateStatus = row.status;

    //     return (
    //       <Form>
    //         <Form.Item>
    //           <Select
    //             style={{ width: "110px", color: "#fff" }}
    //             className="h-7 rounded-md border"
    //             placeholder=""
    //             value={`${updateStatus}`}
    //             onChange={(value) => {
    //               handleStatusChange(value, row);
    //               setDisabeld(true);
    //             }}
    //             // Disable if already approved/rejected or if the logged-in user is the creator
    //           >
    //             {updateStatus === 1 ? (
    //               <Select.Option value="1" style={{ height: "25px" }}>
    //                 <p className="text-green-500">Approved</p>
    //               </Select.Option>
    //             ) : updateStatus === 2 ? (
    //               <Select.Option value="2" style={{ height: "25px" }}>
    //                 <p className="text-red-500">Rejected</p>
    //               </Select.Option>
    //             ) : (
    //               <>
    //                 <Select.Option value="1" style={{ height: "25px" }}>
    //                   <p className="text-green-500">Approved</p>
    //                 </Select.Option>
    //                 <Select.Option value="2">
    //                   <p className="text-red-500">Rejected</p>
    //                 </Select.Option>
    //                 <Select.Option value="0">
    //                   <p className="text-blue-600">Pending</p>
    //                 </Select.Option>
    //               </>
    //             )}
    //           </Select>
    //         </Form.Item>
    //       </Form>
    //     );
    //   },
    // },
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
      title: "Client Name",
      key: "clientName",
      dataIndex: "clientName",
      width: 200,
      ...getColumnSearchProps("clientName"),
      sorter: (a, b) => a.clientName.length - b.clientName.length,
    },
    {
      title: "City",
      key: "city",
      dataIndex: "city",
      width: 180,
      ...getColumnSearchProps("city"),
      sorter: (a, b) => a.city.length - b.city.length,
    },
    {
      title: "Manufacture",
      key: "manufacture",
      dataIndex: "manufacture",
      width: 200,
      ...getColumnSearchProps("manufacture"),
      sorter: (a, b) => a.manufacture.length - b.manufacture.length,
    },
    {
      title: "Maker",
      key: "maker",
      dataIndex: "maker",
      width: 180,
      ...getColumnSearchProps("maker"),
      sorter: (a, b) => a.maker.length - b.maker.length,
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      width: 200,
      ...getColumnSearchProps("date"),
      sorter: (a, b) => a.date.length - b.date.length,
      render: (text, record) => (
        <span>{new Date(record.date).toLocaleString()}</span>
      ),
    },
    {
      title: "Previous Quote",
      key: "previous_quote",
      dataIndex: "previous_quote",
      width: 200,
      // ...getColumnSearchProps("texInvoiceDoc"),
      sorter: (a, b) => a.previous_quote - b.previous_quote,
      render: (row, record, index) => (
        <div key={index}>
          {row ? (
            <div>
              <Button
                type="btn"
                className="px-10 font-semibold bg-[black]/90 text-white"
                onClick={() => {
                  if (row !== null && row !== undefined) {
                    handlePdf(row, "previous_quote");
                  }
                }}
              >
                View File
              </Button>
              <Modal
                open={activeModal === `${row}_previous_quote`}
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
    {
      title: "Passing",
      key: "passing",
      dataIndex: "passing",
      width: 200,
      // ...getColumnSearchProps("texInvoiceDoc"),
      sorter: (a, b) => a.passing - b.passing,
      render: (row, record, index) => (
        <div key={index}>
          {row ? (
            <div>
              <Button
                type="btn"
                className="px-10 font-semibold bg-[black]/90 text-white"
                onClick={() => {
                  if (row !== null && row !== undefined) {
                    handlePdf(row, "passing");
                  }
                }}
              >
                View File
              </Button>
              <Modal
                open={activeModal === `${row}_passing`}
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
    {
      title: "Transfer Owner Certificate",
      key: "transfer_owner_certificate",
      dataIndex: "transfer_owner_certificate",
      width: 300,
      // ...getColumnSearchProps("texInvoiceDoc"),
      sorter: (a, b) =>
        a.transfer_owner_certificate - b.transfer_owner_certificate,
      render: (row, record, index) => (
        <div key={index}>
          {row ? (
            <div>
              <Button
                type="btn"
                className="px-10 font-semibold bg-[black]/90 text-white"
                onClick={() => {
                  if (row !== null && row !== undefined) {
                    handlePdf(row, "transfer_owner_certificate");
                  }
                }}
              >
                View File
              </Button>
              <Modal
                open={activeModal === `${row}_transfer_owner_certificate`}
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
    {
      title: "Trade License",
      key: "trade_license",
      dataIndex: "trade_license",
      width: 200,
      // ...getColumnSearchProps("texInvoiceDoc"),
      sorter: (a, b) => a.trade_license - b.trade_license,
      render: (row, record, index) => (
        <div key={index}>
          {row ? (
            <div>
              <Button
                type="btn"
                className="px-10 font-semibold bg-[black]/90 text-white"
                onClick={() => {
                  if (row !== null && row !== undefined) {
                    handlePdf(row, "trade_license");
                  }
                }}
              >
                View File
              </Button>
              <Modal
                open={activeModal === `${row}_trade_license`}
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
    {
      title: "List Of Vehicles",
      key: "list_of_vehicles",
      dataIndex: "list_of_vehicles",
      width: 200,
      // ...getColumnSearchProps("texInvoiceDoc"),
      sorter: (a, b) => a.list_of_vehicles - b.list_of_vehicles,
      render: (row, record, index) => (
        <div key={index}>
          {row ? (
            <div>
              <Button
                type="btn"
                className="px-10 font-semibold bg-[black]/90 text-white"
                onClick={() => {
                  if (row !== null && row !== undefined) {
                    handlePdf(row, "list_of_vehicles");
                  }
                }}
              >
                View File
              </Button>
              <Modal
                open={activeModal === `${row}_list_of_vehicles`}
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
    {
      title: "Existing Quote",
      key: "existing_quote",
      dataIndex: "existing_quote",
      width: 200,
      // ...getColumnSearchProps("texInvoiceDoc"),
      sorter: (a, b) => a.existing_quote - b.existing_quote,
      render: (row, record, index) => (
        <div key={index}>
          {row ? (
            <div>
              <Button
                type="btn"
                className="px-10 font-semibold bg-[black]/90 text-white"
                onClick={() => {
                  if (row !== null && row !== undefined) {
                    handlePdf(row, "existing_quote");
                  }
                }}
              >
                View File
              </Button>
              <Modal
                open={activeModal === `${row}_existing_quote`}
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
    {
      title: "Other Document",
      key: "other_doc",
      dataIndex: "other_doc",
      width: 200,
      // ...getColumnSearchProps("texInvoiceDoc"),
      sorter: (a, b) => a.other_doc - b.other_doc,
      render: (row, record, index) => (
        <div key={index}>
          {row ? (
            <div>
              <Button
                type="btn"
                className="px-10 font-semibold bg-[black]/90 text-white"
                onClick={() => {
                  if (row !== null && row !== undefined) {
                    handlePdf(row, "other_doc");
                  }
                }}
              >
                View File
              </Button>
              <Modal
                open={activeModal === `${row}_other_doc`}
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

  // const handleStatusChange = async (value, row) => {
  //   try {
  //     const formatedData = {
  //       id: row.id,
  //       status: Number(value),
  //       approvedBy: userId,
  //     };
  //     console.log(formatedData);

  //     const res = await dispatch(createApprove(formatedData));
  //     console.log("RES", res);

  //     if (res.payload?.success === true) {
  //       notification.success({
  //         message: "Status updated!",
  //         description:
  //           "Expence Record status successfully updated we sended email notification",
  //         placement: "topRight",
  //         className: "font-inter font-medium",
  //       });
  //       dispatch(getExpenceRecords());
  //     } else {
  //       notification.error({
  //         message: "Status failed to update",
  //         description:
  //           "The Expence Record status could not be updated due to an unexpected error",
  //         placement: "topRight",
  //         className: "font-inter font-medium",
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     notification.error({
  //       message: "Failure",
  //       description: "Error occurred while updating Expence Record data",
  //       placement: "topRight",
  //       className: "font-inter font-medium",
  //     });
  //   } finally {
  //     setDisabeld(false);
  //   }
  // };
  const ApprovalModalOpen = (record) => {
    // console.log(record);

    setOpen(true);
    setEditData(record);
  };

  const handelApproval = async (data) => {
    console.log("DATA", data);

    try {
      const formatedData = {
        id: editData.id,
        updated_by: userId,
        remarks: data.comment,
        status: data.status,
      };
      console.log("FORMDATA", formatedData);

      const responce = await dispatch(updateFleetStatus(formatedData));
      if (responce.payload.success === true) {
        notification.success({
          message: "Status updated!",
          description:
            "Status successfully updated we sended email notification",
          placement: "topRight",
          className: "font-inter font-medium",
          showProgress: true,
        });
        dispatch(getFleetManagement());
      } else {
        notification.error({
          message: "Failed to update status",
          description: "Failed to update status due to an unexpected error",
          placement: "topRight",
          className: "font-inter font-medium",
          showProgress: true,
        });
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Error occurred while updating status",
        description: "Failed to update status due to an unexpected error",
        placement: "topRight",
        className: "font-inter font-medium",
        showProgress: true,
      });
    }
  };

  const onRowClick = (row) => {
    // console.log("ROW", row);
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
              {sideTableData?.ApprovarName || "N/A"}
            </p>
            <p className="font-semibold col-span-3 text-center">
              {sideTableData?.status === 0 ? (
                <span className="bg-primary text-white p-2 rounded-lg">
                  Pending
                </span>
              ) : sideTableData?.status === 1 ? (
                <span className="bg-green-500 text-white p-2 rounded-lg">
                  Approval Completed
                </span>
              ) : sideTableData?.status === 2 ? (
                <span className="bg-red-500 text-white p-2 rounded-lg">
                  Denied
                </span>
              ) : (
                <span></span>
              )}
            </p>
            <p className="font-semibold col-span-2 text-center">
              {sideTableData?.remarks || "N/A"}
            </p>
          </div>
        </motion.div>
      )}
      <ApprovalModal
        setOpen={setOpen}
        open={open}
        editData={editData}
        handelApproval={handelApproval}
      />
    </div>
  );
};

export default SalesApproval;
