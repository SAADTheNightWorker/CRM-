import React, { useEffect, useState } from "react";
import FilterSection from "../../../components/FilterSection/FilterSection";
import { useDispatch, useSelector } from "react-redux";
import TableSection from "../../../components/table/TableSection";
import { useColumnSearch } from "../../../components/table/TablesFilter";
import {
  DeleteCategory,
  getCategory,
  updateCategory,
} from "../../../../store/actionApis/categoryApi";
import { notification } from "antd";
import Edit from "../../../components/Modal/Edit";
import Delete from "../../../components/Modal/Delete";

const editfields = [
  {
    title: "Category",
    key: "category",
    type: "text",
  },
];

const Category = () => {
  const categorytData = useSelector(
    (state) => state?.category?.categories?.payload
  );
  // const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { getColumnSearchProps } = useColumnSearch(
    setFilteredData,
    categorytData
  );
  const dispatch = useDispatch();
  const [editData, setEditData] = useState({});
  const [open, setOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [Id, setId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (categorytData?.length > 0) {
        // setTableData(clientData);
        setFilteredData(categorytData);
      }
    };
    fetchData();
  }, [categorytData]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getCategory()).unwrap();
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
  //   dispatch(getCategory());
  // }, [dispatch]);

  const EditModal = (record) => {
    setId(record?.id);
    setIsEditModalOpen(true);
    setEditData(record);
  };

  const EditFinish = async (data) => {
    const formatedData = {
      category: data?.category,
      id: Id,
    };

    try {
      const res = await dispatch(updateCategory(formatedData));
      if (res.payload.success === true) {
        notification.success({
          message: "Updated",
          description: "Category has been updated successfully",
          placement: "topRight",
          showProgress: true,
        });
        dispatch(getCategory());
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
      const res = await dispatch(DeleteCategory(formatedData));

      if (res.payload.success === true) {
        notification.success({
          message: "Deleted",
          description: "Category has been deleted successfully",
          placement: "topRight",
          showProgress: true,
        });
        dispatch(getCategory());
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
      title: "Category",
      key: "category",
      dataIndex: "category",
      width: "90%",
      ...getColumnSearchProps("category"),
      sorter: (a, b) => a.category.length - b.category.length,
    },
    // Add other columns here
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
          <FilterSection formType="category" />
        </div>

        <TableSection columns={columns} dataSource={filteredData} loading={loading}/>
      </div>
      <Delete
        open={open}
        setOpen={setOpen}
        text={"Category"}
        handelDelete={handelDelete}
      />
      <Edit
        title={"Edit Category"}
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

export default Category;
