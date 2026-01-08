import React, { useEffect, useState } from "react";
import FilterSection from "../../../components/FilterSection/FilterSection";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteClient,
  getClient,
  updateClient,
} from "../../../../store/actionApis/clientApi";
import TableSection from "../../../components/table/TableSection";
import { useColumnSearch } from "../../../components/table/TablesFilter";
import BackButton from "../../../components/Backbutton/BackButton";
import Delete from "../../../components/Modal/Delete";
import { notification } from "antd";
import Edit from "../../../components/Modal/Edit";

const editfields = [
  {
    title: "Client",
    key: "name",
    type: "text",
  },
];

const Clients = () => {
  const clientData = useSelector((state) => state?.clients?.clients?.payload);
  const [filteredData, setFilteredData] = useState([]);
  const [editData, setEditData] = useState({});
  const { getColumnSearchProps } = useColumnSearch(setFilteredData, clientData);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [Id, setId] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (clientData?.length > 0) {
      setFilteredData(clientData);
    }
  }, [clientData]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getClient()).unwrap();
        console.log("Response:", res);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const EditModal = (record) => {
    setId(record?.id);
    setIsEditModalOpen(true);
    setEditData(record);
  };

  const EditFinish = async (data) => {
    const formatedData = {
      name: data?.name,
      id: Id,
    };

    try {
      const res = await dispatch(updateClient(formatedData));
      if (res.payload.success === true) {
        notification.success({
          message: "Updated",
          description: "Client has been updated successfully",
          placement: "topRight",
          showProgress: true,
        });
        dispatch(getClient());
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message || "Something went wrong",
        placement: "topRight",
      });
    } finally {
      setIsEditModalOpen(false);
    }
  };

  const DeleteModal = (record) => {
    setId(record?.id);
    setOpen(true);
  };

  const handelDelete = async () => {
    const formatedData = { id: Id };
    try {
      const res = await dispatch(DeleteClient(formatedData));

      if (res.payload.success === true) {
        notification.success({
          message: "Deleted",
          description: "Client has been deleted successfully",
          placement: "topRight",
          showProgress: true,
        });
        dispatch(getClient());
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
        description: err.message || "Error while deleting client",
        placement: "topRight",
        showProgress: true,
      });
    }
  };

  const columns = [
    {
      title: "Clients",
      key: "name",
      dataIndex: "name",
      width: "90%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Action",
      key: "action",
      width: "90%",
      fixed: "right",
      render: (text, record) => (
        <div className="flex gap-4 mr-10">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-20"
            onClick={() => EditModal(record)}
          >
            Edit
          </button>
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
          <FilterSection formType="client" />
        </div>
        <TableSection columns={columns} dataSource={filteredData} loading={loading}/>
      </div>
      <Delete
        open={open}
        setOpen={setOpen}
        text={"Client"}
        handelDelete={handelDelete}
      />
      <Edit
        title={"Edit Client"}
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        editFields={editfields}
        editData={editData}
        onEditFinish={EditFinish}
        modalType={"client"}
      />
    </div>
  );
};

export default Clients;
