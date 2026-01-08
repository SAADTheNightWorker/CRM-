import React, { useEffect, useState } from "react";
import FilterSection from "../../../components/FilterSection/FilterSection";
import { useDispatch, useSelector } from "react-redux";
import TableSection from "../../../components/table/TableSection";
import { useColumnSearch } from "../../../components/table/TablesFilter";
import { getPayment } from "../../../../store/actionApis/paymentApi";
import { getUser } from "../../../../store/actionApis/userApi";

const User = () => {
  const userData = useSelector((state) => state?.user?.user?.payload);
  // const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getColumnSearchProps } = useColumnSearch(setFilteredData, userData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (userData?.length > 0) {
        // setTableData(clientData);
        setFilteredData(userData);
      }
    };
    fetchData();
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getUser()).unwrap();
        // console.log("Response:", res);
      } catch (error) {
        console.error("Error fetching User Record:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getUser());
  // }, [dispatch]);

  const columns = [
    {
      title: "Users",
      key: "name",
      dataIndex: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      width: "30%",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "User Type",
      key: "role",
      dataIndex: "role",
      width: "30%",
      ...getColumnSearchProps("role"),
      sorter: (a, b) => a.role.length - b.role.length,
      render: (text, record) => (
        <span>
          {record.role === 1
            ? "Admin"
            : record.role === 0
              ? "User"
              : "Approver"}
        </span>
      ),
    },
    // Add other columns here
  ];

  return (
    <div className=" relative">
      <div className="m-4">
        <div className="pr-10 max-sm:pr-3">
          <FilterSection formType="user" />
        </div>

        <TableSection
          columns={columns}
          dataSource={filteredData}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default User;
