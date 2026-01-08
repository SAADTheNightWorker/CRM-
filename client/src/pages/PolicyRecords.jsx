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
import Edit from "../components/Modal/Edit";
import { TrashIcon } from "@heroicons/react/24/solid";
import { EditFilled } from "@ant-design/icons";

const editDataUpload = [
  { key: "policyPaymentDoc", title: "Policy Payment Doc", type: "upload" },
];

const PolicyRecord = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [pdfFile, setPdfFile] = useState();
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
    (state) => state?.policyRecord?.policyRecord?.payload
  );
  // const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { getColumnSearchProps } = useColumnSearch(setFilteredData, PolicyData);
  const [editData, setEditData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const editfields = [
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
        const res = await dispatch(getPolicyRecords()).unwrap();
        console.log("Response:", res);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getPolicyRecords());
  // }, [dispatch]);

  const DeleteModal = (record) => {
    setId(record?.id);
    setOpen(true);
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

  const EditModal = (record) => {
    setId(record?.id);
    setIsEditModalOpen(true);
    setEditData(record);
  };

  const EditFinish = async (data) => {
    console.log(data);

    // setIsSubmit(true);

    const formData = new FormData();

    // // Append fields
    formData.append("id", Id);
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
    formData.append("policyPaymentDoc", pdfFile?.policyPaymentDoc);
    formData.append("createdBy", 187);

    // Log the formData entries
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await dispatch(updateRevenueRecord(formData));
    console.log("CHECK", response);
    try {
      if (response?.payload?.success === true) {
        setIsSubmit(false);
        setLoading(false);
        notification.success({
          message: "Revenue Record Updated!",
          description: `Revenue Record is added against Revenue Record`,
          placement: "topRight",
          showProgress: true,
        });
        dispatch(getRevenueRecord());
        setOpen(false);
        // reset();
        // emptyAllState();
      } else {
        setIsSubmit(false);
        notification.error({
          message: "Revenue Record Failed to Update",
          description:
            "The Revenue Record could not be Updated due to an unexpected error.",
          placement: "topRight",
          showProgress: true,
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
      setIsEditModalOpen(false);
      // setLoading(false);
    }
  };

  const columns = [
    {
      title: "Client Name",
      key: "clientName",
      dataIndex: "clientName",
      width: 260,
      ...getColumnSearchProps("clientName"),
      sorter: (a, b) => a.clientName.length - b.clientName.length,
    },
    {
      title: "SC Broker Name",
      key: "brokerName",
      dataIndex: "brokerName",
      width: 180,
      ...getColumnSearchProps("brokerName"),
      sorter: (a, b) => a.brokerName.length - b.brokerName.length,
    },
    {
      title: "SC company Name",
      key: "companyName",
      dataIndex: "companyName",
      width: 180,
      ...getColumnSearchProps("companyName"),
      sorter: (a, b) => a.companyName.length - b.companyName.length,
    },
    {
      title: "Claim Wolf Agent Name",
      key: "agentName",
      dataIndex: "agentName",
      width: 220,
      ...getColumnSearchProps("agentName"),
      sorter: (a, b) => a.agentName.length - b.agentName.length,
    },
    {
      title: "Invoice Number",
      key: "chassisNumber",
      dataIndex: "chassisNumber",
      width: 140,
      ...getColumnSearchProps("chassisNumber"),
      sorter: (a, b) => a.chassisNumber.length - b.chassisNumber.length,
    },
    {
      title: "Issue Date",
      key: "dateOfIssue",
      dataIndex: "dateOfIssue",
      width: 180,
      ...getColumnSearchProps("dateOfIssue"),
      sorter: (a, b) => a.dateOfIssue - b.dateOfIssue,
      render: (text, record) => (
        <span>{new Date(record.dateOfIssue).toLocaleString()}</span>
      ),
    },
    {
      title: "Tax Invoice Amount",
      key: "netPolicyAmount",
      dataIndex: "netPolicyAmount",
      width: 180,
      ...getColumnSearchProps("netPolicyAmount"),
      sorter: (a, b) => a.netPolicyAmount - b.netPolicyAmount,
    },
    {
      title: "Emirate",
      key: "creditNoteAmount",
      dataIndex: "creditNoteAmount",
      width: 140,
      ...getColumnSearchProps("creditNoteAmount"),
      sorter: (a, b) => a.creditNoteAmount - b.creditNoteAmount,
    },
    {
      title: "Tex Invoice Doc",
      key: "texInvoiceDoc",
      dataIndex: "texInvoiceDoc",
      width: 140,
      // ...getColumnSearchProps("texInvoiceDoc"),
      sorter: (a, b) => a.texInvoiceDoc - b.texInvoiceDoc,
      render: (row, record, index) => (
        <div key={index}>
          {row ? (
            <div>
              <Button
                type="btn"
                className="px-10 font-semibold bg-[black]/90 text-white"
                onClick={() => {
                  if (row !== null && row !== undefined) {
                    handlePdf(row, "texInvoiceDoc");
                  }
                }}
              >
                View File
              </Button>
              <Modal
                open={activeModal === `${row}_texInvoiceDoc`}
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
    // {
    //   title: "Policy Sechedule Doc",
    //   key: "policySecheduleDoc",
    //   dataIndex: "policySecheduleDoc",
    //   width: 140,
    //   // ...getColumnSearchProps("texInvoiceDoc"),
    //   sorter: (a, b) => a.policySecheduleDoc - b.policySecheduleDoc,
    //   render: (row, record, index) => (
    //     <div key={index}>
    //       {row ? (
    //         <div>
    //           <Button
    //             type="btn"
    //             className="px-10 font-semibold bg-[black]/90 text-white"
    //             onClick={() => {
    //               if (row !== null && row !== undefined) {
    //                 handlePdf(row, "policySecheduleDoc");
    //               }
    //             }}
    //           >
    //             View File
    //           </Button>
    //           <Modal
    //             open={activeModal === `${row}_policySecheduleDoc`}
    //             onOk={handleOk}
    //             onCancel={handleCancel}
    //             width={1000}
    //             style={{
    //               height: "80vh",
    //               overflowY: "hidden",
    //               top: "5vh",
    //               backgroundColor: "#ffffff", // Ensure white background
    //               borderRadius: "8px",
    //               overflow: "hidden",
    //               boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    //             }}
    //             bodyStyle={{
    //               height: "100%",
    //               padding: "10px",
    //               backgroundColor: "#ffffff",
    //               borderRadius: "8px",
    //               overflow: "hidden",
    //               boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    //             }}
    //           >
    //             <div
    //               style={{
    //                 width: "100%",
    //                 height: "calc(80vh - 50px)", // Auto-adjust height
    //                 overflow: "hidden",
    //                 backgroundColor: "#ffffff",
    //                 display: "flex",
    //                 justifyContent: "center",
    //                 alignItems: "center",
    //               }}
    //             >
    //               <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
    //                 {fileUrl ? (
    //                   <div
    //                     style={{
    //                       width: "95%",
    //                       height: "100%",
    //                       borderRadius: "8px",
    //                       overflow: "hidden",
    //                       boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    //                       backgroundColor: "#f8f8f8",
    //                       padding: "10px",
    //                     }}
    //                   >
    //                     <Viewer
    //                       fileUrl={fileUrl}
    //                       plugins={[defaultLayoutPluginInstance]}
    //                       style={{
    //                         width: "100%",
    //                         height: "100%",
    //                       }}
    //                     />
    //                   </div>
    //                 ) : (
    //                   <p className="text-center text-gray-500 mt-4">
    //                     No PDF associated with this question.
    //                   </p>
    //                 )}
    //               </Worker>
    //             </div>
    //           </Modal>
    //         </div>
    //       ) : (
    //         <Button
    //           type="default"
    //           className="px-11 bg-gray-300 text-gray-600 font-semibold"
    //           disabled
    //         >
    //           No File
    //         </Button>
    //       )}
    //     </div>
    //   ),
    // },
    // {
    //   title: "Credit Note Doc",
    //   key: "creditNoteDoc",
    //   dataIndex: "creditNoteDoc",
    //   width: 140,
    //   // ...getColumnSearchProps("texInvoiceDoc"),
    //   sorter: (a, b) => a.creditNoteDoc - b.creditNoteDoc,
    //   render: (row, record, index) => (
    //     <div key={index}>
    //       {row ? (
    //         <div>
    //           <Button
    //             type="btn"
    //             className="px-10 font-semibold bg-[black]/90 text-white"
    //             onClick={() => {
    //               if (row !== null && row !== undefined) {
    //                 handlePdf(row, "creditNoteDoc");
    //               }
    //             }}
    //           >
    //             View File
    //           </Button>
    //           <Modal
    //             open={activeModal === `${row}_creditNoteDoc`}
    //             onOk={handleOk}
    //             onCancel={handleCancel}
    //             width={1000}
    //             style={{
    //               height: "80vh",
    //               overflowY: "hidden",
    //               top: "5vh",
    //               backgroundColor: "#ffffff", // Ensure white background
    //               borderRadius: "8px",
    //               overflow: "hidden",
    //               boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    //             }}
    //             bodyStyle={{
    //               height: "100%",
    //               padding: "10px",
    //               backgroundColor: "#ffffff",
    //               borderRadius: "8px",
    //               overflow: "hidden",
    //               boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    //             }}
    //           >
    //             <div
    //               style={{
    //                 width: "100%",
    //                 height: "calc(80vh - 50px)", // Auto-adjust height
    //                 overflow: "hidden",
    //                 backgroundColor: "#ffffff",
    //                 display: "flex",
    //                 justifyContent: "center",
    //                 alignItems: "center",
    //               }}
    //             >
    //               <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
    //                 {fileUrl ? (
    //                   <div
    //                     style={{
    //                       width: "95%",
    //                       height: "100%",
    //                       borderRadius: "8px",
    //                       overflow: "hidden",
    //                       boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    //                       backgroundColor: "#f8f8f8",
    //                       padding: "10px",
    //                     }}
    //                   >
    //                     <Viewer
    //                       fileUrl={fileUrl}
    //                       plugins={[defaultLayoutPluginInstance]}
    //                       style={{
    //                         width: "100%",
    //                         height: "100%",
    //                       }}
    //                     />
    //                   </div>
    //                 ) : (
    //                   <p className="text-center text-gray-500 mt-4">
    //                     No PDF associated with this question.
    //                   </p>
    //                 )}
    //               </Worker>
    //             </div>
    //           </Modal>
    //         </div>
    //       ) : (
    //         <Button
    //           type="default"
    //           className="px-11 bg-gray-300 text-gray-600 font-semibold"
    //           disabled
    //         >
    //           No File
    //         </Button>
    //       )}
    //     </div>
    //   ),
    // },

    // Add other columns here
    {
      title: "Action",
      key: "action",
      width: 100,
      fixed: "right",
      render: (text, record) => (
        <div className="flex gap-10 mr-10">
          <button
            className="text-red-600 font-bold rounded-full w-6"
            onClick={() => DeleteModal(record)}
          >
            <TrashIcon style={{ fontSize: "20px" }} />
          </button>
          <button
            className="text-black font-bold  rounded-full"
            onClick={() => EditModal(record)}
          >
            <EditFilled style={{ fontSize: "20px" }} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="relative">
      <div className="m-4">
        <div className="pr-10 max-sm:pr-3">
          <FilterSection formType="policy_records" />
        </div>

        <TableSection
          columns={columns}
          dataSource={filteredData}
          loading={loading}
        />
      </div>
      <Delete
        open={open}
        setOpen={setOpen}
        text={"Policy Record"}
        handelDelete={handelDelete}
      />

      <Edit
        title={"Edit Policy Record"}
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        editFields={editfields}
        editData={editData}
        onEditFinish={EditFinish}
        modalType={"Revenue_Record"}
        editDataUpload={editDataUpload}
        setPdfFile={setPdfFile}
        pdfFile={pdfFile}
      />
    </div>
  );
};

export default PolicyRecord;
