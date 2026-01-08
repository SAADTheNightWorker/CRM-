import React, { useEffect } from "react";
import { Select, notification, DatePicker } from "antd";
import { Accordion, AccordionBody } from "@material-tailwind/react";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import PaymentForm from "../AdminstratorForm/PaymentForm";
// import VehiclesForm from "./createForms/VehiclesForm";
// import ClaimsForm from "./createForms/ClaimsForm";
// import AddButton from "./button/AddButton";
// import ClientsForm from "./createForms/ClientsForm";
// import ProspectsForm from "./createForms/ProspectsForm";
// import UserForm from "./createForms/UserForm";
import ClientsForm from "../AdminstratorForm/ClientForm";
import BrokerForm from "../AdminstratorForm/BrokerForm";
import CompanyForm from "../AdminstratorForm/CompanyForm";
import AgentsForm from "../AdminstratorForm/AgentsForm";
import VendorForm from "../AdminstratorForm/VendorForm";
import CategoryForm from "../AdminstratorForm/CategoryForm";
import UsersForm from "../forms/UsersForm";
import PolicyRecordForm from "../forms/PolicyRecordForm";
import RevenueRecordForm from "../forms/RevenueRecordForm";
import ExpenceRecordForm from "../forms/ExpenceRecordForm";
import FleetManagementForm from "../forms/FleetManagementForm";

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const FilterSection = ({
  title,
  subTitle,
  formType,
  columns,
  data,
  sideTableColumns,
  EditOpen,
  handleEditOpen,
  Client_id,
  prospect_id,
  // for others columns
  selectColumn,
  isDataFiltered,
  setSelectColumn,
  setSelectData,
  //for dates column
  selectDateColumn,
  setSelectDateColumn,
  setSelectDateRange,
  vehiclesData, // passing props to vehicles form
  claim, //passing props to claim form
  payment, //passing props to payment form
}) => {
  const { RangePicker } = DatePicker;
  const [columndata, setColumndata] = React.useState([]);
  const [dateColumn, setDateColumn] = React.useState([]);
  const [dateRangeValue, setDateRangeValue] = React.useState(null);
  const [dataFilter, setDataFilter] = React.useState([]);
  const [checker, setChecker] = React.useState({
    columnField: false,
    searchingField: false,
    dateColumnField: false,
    datePickerField: false,
  });

  // ===========================others column data filter starts===========================================
  const handleSelectColumnChange = (value) => {
    setSelectColumn(value);

    let filteredData;
    // Search Functionality to show searched Data in Table
    if (value === "isActive") {
      // if serach data contain 0 1 status
      filteredData = [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ];
    } else {
      filteredData = [
        ...new Set(
          data
            .filter((item) => item.hasOwnProperty(value) && item[value])
            .map((item) => item[value])
        ),
      ].map((item) => ({ value: item, label: item }));
    }
    //  console.log("filteredData1", filteredData);
    setDataFilter(filteredData);
    setChecker((prev) => ({
      ...prev,
      columnField: true,
      searchingField: false,
    }));
  };
  const handleSelectDataChange = (value) => {
    // const inputValue = value.target.value;
    const inputValue = value;
    setSelectData(inputValue);
    setChecker((prev) => ({
      ...prev,
      columnField: true,
      searchingField: true,
    }));
  };

  const ClearColumnField = () => {
    setDataFilter([]);
    setSelectColumn(null);
    setSelectData(null);
    setChecker((prev) => ({
      ...prev,
      columnField: false,
      searchingField: false,
    }));
  };
  const ClearSearchingField = () => {
    setSelectData(null);
    setChecker((prev) => ({
      ...prev,
      columnField: true,
      searchingField: false,
    }));
  };
  //======================================= others column data filter end====================================

  //======================================= date column filter start=====================================
  const handleSelectDateColumn = (value) => {
    setSelectDateColumn(value);
    setChecker((prev) => ({
      ...prev,
      dateColumnField: true,
    }));
  };

  const onDateRangeSelect = (dates) => {
    if (!selectDateColumn) {
      notification.warning({
        message: "Select Date Column First",
        description: "Please select date column before searching.",
        placement: "topRight",
        className: "font-inter font-medium",
      });
    } else {
      const formattedDates = dates?.map((date) => date.format("YYYY-MM-DD"));
      setSelectDateRange(formattedDates);
      setDateRangeValue(dates);
      setChecker((prev) => ({
        ...prev,
        datePickerField: true,
      }));
    }
  };

  const ClearDateColumnField = () => {
    setDateRangeValue(null);
    setSelectDateColumn(null);
    setSelectDateRange([]);
    setChecker((prev) => ({
      ...prev,
      dateColumnField: false,
      datePickerField: false,
    }));
  };
  const ClearDatePickerField = () => {
    setDateRangeValue(null);
    setSelectDateRange([]);
    setChecker((prev) => ({
      ...prev,
      datePickerField: false,
    }));
  };
  // ========================================date column filter end=======================================
  // console.log(selectColumnColumn)
  useEffect(() => {
    //=============================== for other column ==================================================
    if (columns) {
      const filteredColumndata = columns
        .filter(
          (items) =>
            ![
              "created_at",
              "operations",
              "created_timestamp",
              "last_updated_time",
              "time_elapsed",
            ].includes(items.key)
        )
        .map((items) => ({
          value: items.key,
          label: items.title,
        }));
      let filteredSideColumndata = [];

      // only apply in quality alert and quality defect page
      if (
        (formType === "qualityAlert" ||
          formType === "qualityDefect" ||
          formType === "myTasks" ||
          formType === "lient") &&
        sideTableColumns
      ) {
        // get all sidetable column except below
        const filteredColumndata = sideTableColumns
          .filter(
            (items) =>
              ![
                "rca_target_at",
                "quality_alert_comment",
                "quality_defect_comment",
                "rca_owner",
              ].includes(items.key)
          )
          .map((items) => ({
            value: items.key,
            label: items.title,
          }));
        // stored filter column
        filteredSideColumndata = filteredColumndata;
      }
      // merged both array (table comun and sidetable column)
      const mergedOtherColumns = filteredColumndata.concat(
        filteredSideColumndata
      );
      setColumndata(mergedOtherColumns);

      //========================== for date column  =================================================
      const filteredColumndate = columns
        .filter((items) =>
          ["created_timestamp", "last_updated_time", "created_at"].includes(
            items.key
          )
        )
        .map((items) => ({
          value: items.key,
          label: items.title,
        }));
      let filteredSideColumndate = [];

      // only apply in quality alert and quality defect page
      if (
        (formType === "qualityAlert" ||
          formType === "qualityDefect" ||
          formType === "myTasks" ||
          formType === "lient") &&
        sideTableColumns
      ) {
        // get all sidetable column except below
        const filteredColumndata = sideTableColumns
          .filter((items) => ["rca_target_at"].includes(items.key))
          .map((items) => ({
            value: items.key,
            label: items.title,
          }));
        // stored filter column
        filteredSideColumndate = filteredColumndata;
      }
      // merged both array (table comun and sidetable column)
      const mergedDateColumns = filteredColumndate.concat(
        filteredSideColumndate
      );
      setDateColumn(mergedDateColumns);
    }
  }, [columns]);

  //============================ to open form when button clicked  =======================================
  const [open, setOpen] = React.useState(0);
  const [defectopen, setDefectOpen] = React.useState(0);

  // ==> main form used all pages
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
    // only one form open at a time
    setDefectOpen(0);
  };

  // ==> add defect form used only quality defect
  const handleDefectOpen = (value) => {
    setDefectOpen(defectopen === value ? 0 : value);
    // only one form open at a time
    setOpen(0);
  };

  return (
    <>
      <div
        className={`grid mt-5 pt-2 ${
          ["qualityDefect", "qualityAlert", "prospects"].includes(formType)
            ? "xl:grid-cols-5 sm:grid-cols-1"
            : "sm:grid-cols-5"
        }`}
      >
        {/* title and subtitle */}
        <div
          className={`${
            ["qualityDefect", "qualityAlert", "clien", "myTasks"].includes(
              formType
            )
              ? "col-span-1"
              : "col-span-2"
          }`}
        >
          <div>
            <div className="sm:text-xl md:text-2xl text-[#e23166] lg:text-2xl font-semibold">
              {title}
            </div>
            <div className="text-sm xs:text-xs mt-1 xs:mt-0 xs:mb-2 text-[#e23166]">
              {subTitle}
            </div>
          </div>
        </div>
        {/* if the page is info then hide filter fields, create button */}

        <div
          className={`${
            ["qualityDefect", "qualityAlert", "lient", "myTasks"].includes(
              formType
            )
              ? "col-span-4 sm:mt-2 lg:mt-0"
              : "col-span-3"
          } sm:flex sm:justify-end items-center lg:h-[52px]`}
        >
          {/* apply date filter only pages given in array */}
          {["qualityDefect", "qualityAlert", "lient", "myTasks"].includes(
            formType
          ) ? (
            <>
              {/* select date column */}
              <div className="relative">
                <div>
                  <Select
                    showSearch
                    placeholder=" "
                    optionFilterProp="children"
                    onChange={handleSelectDateColumn}
                    value={selectDateColumn}
                    className="lg:w-[140px] md:w-[140px] sm:w-[120px] w-full h-[45px] font-inter"
                    filterOption={filterOption}
                    options={dateColumn}
                  />
                  <label>Date Column</label>
                </div>
                {checker.dateColumnField ? (
                  <div className="absolute lg:right-2 sm:right-1 xs:right-2 top-[22px] transform -translate-y-1/2 z-10">
                    <span
                      onClick={ClearDateColumnField}
                      className="tracking-extra-wide text-xs py-0 px-2 h-[22px] cursor-pointer"
                    >
                      <XMarkIcon className="w-5 h-5 text-redColor" />
                    </span>
                  </div>
                ) : null}
              </div>
              {/* select date range to filter*/}
              <div
                className={`mr-3 xs:mr-0 xs:mb-3 md:w-[500px] lg:w-[500px] sm:w-[200px]  ${
                  formType === "" ? "md:ml-3 sm:ml-2" : "md:mx-3 sm:mx-2"
                }`}
              >
                <div className="relative w-full sm:mt-0 mt-3">
                  {/* <div className="floating-input"> */}
                  <div
                    className={`floating-input-active ${
                      checker.datePickerField ? "hide-field-symbol" : ""
                    }`}
                  >
                    <RangePicker
                      className="w-full h-[45px] font-inter"
                      onChange={onDateRangeSelect}
                      value={dateRangeValue}
                    />
                    <label>Select Range</label>
                  </div>

                  {checker.datePickerField ? (
                    <div className="absolute lg:right-2 sm:right-1 xs:right-2  top-1/2 transform -translate-y-1/2 z-10">
                      <span
                        onClick={() => {
                          ClearDatePickerField();
                          setSelectDateRange(null);
                        }}
                        className="tracking-extra-wide text-xs py-0 px-2 h-[22px] cursor-pointer"
                      >
                        <XMarkIcon className="w-5 h-5 text-redColor" />
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
          {/* select others column */}
          {formType !== "client"
            ? formType !== "company"
            : formType !== "broker"
              ? formType !== "agent"
              : formType !== "vendor"
                ? formType !== "category"
                : formType !== "payment" && (
                    <div className="relative">
                      <div
                        className={`floating-input ${
                          checker.columnField
                            ? "floating-input-active hide-field-symbol"
                            : ""
                        }`}
                      >
                        <Select
                          showSearch
                          placeholder=" "
                          optionFilterProp="children"
                          onChange={handleSelectColumnChange}
                          // onSearch={onSearch}
                          value={selectColumn}
                          className="lg:w-[140px] md:w-[140px] sm:w-[120px] w-full h-[45px] font-inter"
                          filterOption={filterOption}
                          options={columndata}
                        />
                        <label>
                          {[
                            "qualityDefect",
                            "qualityAlert",
                            "prospects",
                          ].includes(formType)
                            ? "Other Column"
                            : "Search By"}
                        </label>
                      </div>
                      {checker.columnField ? (
                        <div className="absolute lg:right-2 sm:right-1 xs:right-2 top-[22px] transform -translate-y-1/2 z-10">
                          <span
                            onClick={ClearColumnField}
                            className="tracking-extra-wide text-xs py-0 px-2 h-[22px] cursor-pointer"
                          >
                            <XMarkIcon className="w-5 h-5 text-redColor" />
                          </span>
                        </div>
                      ) : null}
                    </div>
                  )}

          {/* select others columns data to filter */}
          <div
            className={`md:w-[500px] lg:w-[500px] sm:w-[200px]  ${
              formType === "XYZ" ? "md:ml-3 sm:ml-2" : "md:mx-3 sm:mx-2"
            }`}
          >
            <div className="relative w-full sm:mt-0 mt-3">
              {formType !== "client"
                ? formType !== "company"
                : formType !== "broker"
                  ? formType !== "agent"
                  : formType !== "vendor"
                    ? formType !== "category"
                    : formType !== "payment" && (
                        <div
                          className={`floating-input ${
                            checker.searchingField
                              ? "floating-input-active hide-field-symbol"
                              : ""
                          }`}
                        >
                          <Select
                            showSearch
                            placeholder=" "
                            optionFilterProp="children"
                            onChange={handleSelectDataChange}
                            // onSearch={onSearch}
                            value={isDataFiltered}
                            className="w-full h-[45px] font-inter"
                            filterOption={filterOption}
                            options={dataFilter}
                          ></Select>
                          <label>Serach</label>
                        </div>
                      )}

              {checker.searchingField ? (
                <div className="absolute lg:right-2 sm:right-1 xs:right-2 top-1/2 transform -translate-y-1/2 z-10">
                  <span
                    onClick={ClearSearchingField}
                    className="tracking-extra-wide text-xs py-0 px-2 h-[22px] cursor-pointer"
                  >
                    <XMarkIcon className="w-5 h-5 text-redColor" />
                  </span>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex justify-evenly">
            {/* Add button */}
            {formType === "client" ||
            formType === "company" ||
            formType === "broker" ||
            formType === "agent" ||
            formType === "vendor" ||
            formType === "cetegory" ||
            formType === "payment" ||
            formType === "policy_records" ||
            formType === "revenue_records" ||
            formType === "user" ||
            formType === "qualityDefect" ||
            formType === "expence_records" ||
            formType === "fleet_record" ||
            formType === "category" ? (
              <div>
                <button
                  onClick={() => handleOpen(1)}
                  className="flex text-sm items-center mt-3 sm:mt-0 sm:mx-0 h-[43px] rounded-full
               xs:px-1 sm:px-2 text-white bg-[black] 
               hover:scale-110 duration-200 shadow-lg shadow-black/30 px-3"
                >
                  {/* bg-gradient-to-br
                   from-[#6EE7B7]  via-[#3B82F6] to-[#9333EA] */}
                  {open === 0 ? (
                    <PlusCircleIcon
                      className={`w-5 h-5
                             ${
                               (formType === "prospects" && "sm:w-7 sm:h-7") ||
                               (formType !== "prospects" &&
                                 "sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-5 lg:h-5")
                             } `}
                    />
                  ) : (
                    <MinusCircleIcon
                      className={`w-5 h-5
                             ${
                               (formType === "prospects" && "sm:w-7 sm:h-7") ||
                               (formType !== "prospects" &&
                                 "sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-5 lg:h-5")
                             } `}
                    />
                  )}
                  <p className={`text-sm xs:text-xs font-semibold px-1`}>
                    {formType === "client" ? "Add Client" : "Add New"}
                  </p>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {/* if the page is info then hide form */}
      {formType === "info" ? null : (
        <div>
          <Accordion open={open === 1} animate={CUSTOM_ANIMATION}>
            <AccordionBody>
              {/* Show Form According to Type condition */}

              {formType === "client" && (
                <ClientsForm
                  handleOpen={handleOpen}
                  open={open}
                  setOpen={setOpen}
                  // Client_id={Client_id}
                  // prospect_id={prospect_id}
                />
              )}
              {/* frequency Form */}
              {formType === "broker" && (
                <BrokerForm
                  handleOpen={handleOpen}
                  open={open}
                  setOpen={setOpen}
                />
              )}
              {formType === "company" && (
                <CompanyForm
                  handleOpen={handleOpen}
                  open={open}
                  setOpen={setOpen}
                />
              )}

              {formType === "payment" && (
                <PaymentForm
                  handleOpen={handleOpen}
                  open={open}
                  setOpen={setOpen}
                />
              )}
              {formType === "agent" && (
                <AgentsForm
                  handleOpen={handleOpen}
                  open={open}
                  setOpen={setOpen}
                />
              )}
              {/* section Form */}
              {formType === "vendor" && (
                <VendorForm
                  handleOpen={handleOpen}
                  open={open}
                  setOpen={setOpen}
                />
              )}
              {/* user Form */}
              {formType === "category" && (
                <CategoryForm
                  handleOpen={handleOpen}
                  open={open}
                  setOpen={setOpen}
                />
              )}
              {formType === "user" && (
                <UsersForm
                  handleOpen={handleOpen}
                  open={open}
                  setOpen={setOpen}
                />
              )}
              {formType === "policy_records" && (
                <PolicyRecordForm
                  handleOpen={handleOpen}
                  open={open}
                  setOpen={setOpen}
                />
              )}
              {formType === "revenue_records" && (
                <RevenueRecordForm
                  handleOpen={handleOpen}
                  open={open}
                  setOpen={setOpen}
                />
              )}
              {formType === "expence_records" && (
                <ExpenceRecordForm
                  handleOpen={handleOpen}
                  open={open}
                  setOpen={setOpen}
                />
              )}
              {formType === "fleet_record" && (
                <FleetManagementForm
                  handleOpen={handleOpen}
                  open={open}
                  setOpen={setOpen}
                />
              )}
            </AccordionBody>
          </Accordion>
        </div>
      )}
    </>
  );
};

export default FilterSection;
