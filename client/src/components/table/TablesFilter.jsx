import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import Highlighter from "react-highlight-words";

export const useColumnSearch = (setFilteredData, originalData) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  // Function to filter data dynamically as user types
  const filterData = (value, dataIndex) => {
    setSearchText(value);
    setSearchedColumn(dataIndex);

    if (!value) {
      setFilteredData(originalData); // Reset data when input is cleared
      return;
    }

    const filtered = originalData.filter((item) =>
      item[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Search Input directly in Column
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: () => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={searchText}
          onChange={(e) => filterData(e.target.value, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
      </div>
    ),
    filterIcon: () => (
      <SearchOutlined style={{ color: searchText ? "#1677ff" : undefined, fontSize: "20px" }} className="animate-pulse text-white hover:rotate-90 duration-200" />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  return { getColumnSearchProps };
};
