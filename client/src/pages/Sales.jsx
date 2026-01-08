import React, { useEffect, useState } from "react";
import FilterSection from "../components/FilterSection/FilterSection";
import { useDispatch, useSelector } from "react-redux";
import TableSection from "../components/table/TableSection";
import { useColumnSearch } from "../components/table/TablesFilter";
import {
  DeletePolicyRecord,
  getPolicyRecords,
} from "../../store/actionApis/policyRecordApi";
import { Button, Modal, notification } from "antd";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Delete from "../components/Modal/Delete";
import { getFleetManagement } from "../../store/actionApis/fleetManagementApi";
import { motion } from "framer-motion";

const Sales = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [loading, setLoading] = useState(true);

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
  const PolicyData = useSelector(
    (state) => state?.fleetManagement?.fleetManagement?.payload
  );
  // const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { getColumnSearchProps } = useColumnSearch(setFilteredData, PolicyData);
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState(null);
  const [sideTableData, setSideTableData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  console.log("CHECK", PolicyData);

  useEffect(() => {
    const fetchData = async () => {
      if (PolicyData?.length > 0) {
        // setTableData(clientData);
        setFilteredData(PolicyData);
      }
    };
    fetchData();
  }, [PolicyData]);

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

  // useEffect(() => {
  //   dispatch(getFleetManagement());
  // }, [dispatch]);

  const DeleteModal = (record) => {
    setId(record?.id);
    setOpen(true);
  };

  const onRowClick = (row) => {
    // console.log("ROW", row);
    setIsOpen(true);
    setSideTableData(row);
  };

  const handelDelete = async () => {
    const formatedData = { id: Id };
    try {
      const res = await dispatch(DeletePolicyRecord(formatedData));

      if (res.payload.success === true) {
        notification.success({
          message: "Deleted",
          description: "Policy Record has been deleted successfully",
          placement: "topRight",
          showProgress: true,
        });
        dispatch(getPolicyRecords());
      } else {
        notification.error({
          message: "Error",
          description: res?.payload?.message || "Something went wrong",
          placement: "topRight",
          showProgress: true,
        });
      }
    } catch (err) {
      notification.error({
        message: "Error while deleting",
        description: err.message || "Error while deleting Policy Record",
        placement: "topRight",
        showProgress: true,
      });
    }
  };

  const columns = [
    {
      title: "Client Name",
      key: "clientName",
      dataIndex: "clientName",
      width: 500,
      ...getColumnSearchProps("clientName"),
      sorter: (a, b) => a.clientName.length - b.clientName.length,
    },
    {
      title: "City",
      key: "city",
      dataIndex: "city",
      width: 280,
      ...getColumnSearchProps("city"),
      sorter: (a, b) => a.city.length - b.city.length,
    },
    {
      title: "Manufacture",
      key: "manufacture",
      dataIndex: "manufacture",
      width: 240,
      ...getColumnSearchProps("manufacture"),
      sorter: (a, b) => a.manufacture.length - b.manufacture.length,
    },
    {
      title: "Maker",
      key: "maker",
      dataIndex: "maker",
      width: 220,
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
      width: 120,
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
      width: 120,
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
      width: 120,
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
      width: 120,
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
      width: 120,
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
      width: 120,
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
      width: 120,
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

    // Add other columns here
    {
      title: "Action",
      key: "action",
      width: 10,
      fixed: "right",
      render: (text, record) => (
        <div className="flex gap-4 mr-10">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-20"
            onClick={() => DeleteModal(record)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-[100vh] relative">
      <div className="m-4">
        <div className="pr-10 max-sm:pr-3">
          <FilterSection formType="fleet_record" />
        </div>
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
          dataSource={filteredData}
          onRowClick={onRowClick}
          loading={loading}
        />
      </div>
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
      <Delete
        open={open}
        setOpen={setOpen}
        text={"Fleet Record"}
        handelDelete={handelDelete}
      />
    </div>
  );
};

export default Sales;
