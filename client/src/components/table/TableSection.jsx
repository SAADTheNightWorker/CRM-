import React, { useState } from "react";
import { Empty, Pagination, Spin, Table } from "antd";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";

const TableSection = ({
  columns,
  dataSource,
  onRowClick,
  tableType,
  loading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(tableType === "approve" ? 4 : 8); // Default 8 items per page
  const totalItems = dataSource.length;

  const paginatedData = dataSource.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-10 bg-white w-full rounded-lg overflow-auto thick-scrollbar shadow-xl shadow-black/40"
    >
      <Table
        rowKey={(record) => record.key}
        columns={columns}
        // scroll={{ x: 900, y: 800 }}
        scroll={{ x: "max-content" }} // Ensures responsiveness
        dataSource={paginatedData}
        pagination={false} // Disabling Ant Design's internal pagination
        className="bg-white min-w-full"
        onRow={(record, key) => ({
          onClick: () => onRowClick(record, key), // Correct way to capture row click
        })}
        locale={{
          emptyText: loading ? (
            <div className="flex justify-center items-center min-h-[20vh]">
              <div className="flex flex-col gap-4">
                <CircularProgress color="text-black" size={60} />
                Loading...
              </div>
            </div>
          ) : (
            <Empty description="No Data Available" />
          ),
        }}
      />

      <Pagination
        className="bg-white p-6"
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={["5", "8", "10", "15"]}
      />
    </motion.div>
  );
};

export default TableSection;

// import React, { useState } from "react";
// import { Pagination, Table } from "antd";
// import { motion } from "framer-motion";

// const TableSection = ({ columns, dataSource, onRowClick, tableType }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(tableType === "approve" ? 4 : 8); // Default 8 items per page
//   const totalItems = dataSource.length;

//   const paginatedData = dataSource.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   const handlePageChange = (page, size) => {
//     setCurrentPage(page);
//     setPageSize(size);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.4 }}
//       className="mt-16 bg-white w-full overflow-scroll"
//     >
//       <Table
//         rowKey={(record) => record.key}
//         columns={columns}
//         dataSource={paginatedData}
//         pagination={false} // Disabling Ant Design's internal pagination
//         className="bg-white w-full"
//         onRow={(record, key) => ({
//           onClick: () => onRowClick(record, key), // Correct way to capture row click
//         })}
//       />

//       <Pagination
//         className="bg-white p-4 "
//         current={currentPage}
//         pageSize={pageSize}
//         total={totalItems}
//         onChange={handlePageChange}
//         showSizeChanger
//         pageSizeOptions={["8", "10", "15"]}
//       />
//     </motion.div>
//   );
// };

// export default TableSection;
