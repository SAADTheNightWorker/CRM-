// // import React, { useEffect, useState } from "react";
// // import {
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   CartesianGrid,
// //   ResponsiveContainer,
// //   LabelList,
// //   Line,
// //   LineChart,
// //   Legend,
// //   // Pie,
// //   // PieChart,
// //   // Cell,
// //   AreaChart,
// //   Area,
// // } from "recharts";
// // import { Card, Paper, Typography } from "@mui/material";
// // import { useSelector, useDispatch } from "react-redux";
// // import { PolicyChartApi } from "../../../store/actionApis/policyChartApi";
// // import { DatePicker, Form, notification } from "antd";
// // import { Controller, useForm } from "react-hook-form";
// // // import dayjs from "dayjs";

// // export default function PolicyChart() {
// //   const { RangePicker } = DatePicker;

// //   // Custom Tooltip for Bar Chart
// //   const SimpleTooltip = ({ active, payload }) => {
// //     if (active && payload && payload.length) {
// //       const { agent, policies, month } = payload[0].payload;
// //       return (
// //         <div
// //           style={{
// //             background: "#fff",
// //             border: "1px solid #ccc",
// //             padding: 8,
// //             borderRadius: 4,
// //           }}
// //         >
// //           <p>
// //             <strong style={{ color: "#555" }}>{agent}</strong>
// //           </p>
// //           <p style={{ color: "#777" }}>{`${policies} policies in ${month}`}</p>
// //         </div>
// //       );
// //     }
// //     return null;
// //   };
// //   const dispatch = useDispatch();
// //   const policyChartData = useSelector(
// //     (state) => state?.policyChartData?.policyChartData?.payload
// //   );

// //   // console.log(policyChartData);

// //   const [barData, setBarData] = useState([]);
// //   const [lineData, setLineData] = useState([]);
// //   const [agentNames, setAgentNames] = useState([]);
// //   const [brokerBarData, setBrokerBarData] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   // console.log("try", barData);

// //   const {
// //     control,
// //     formState: { errors },
// //   } = useForm();

// //   useEffect(() => {
// //     dispatch(PolicyChartApi());
// //   }, [dispatch]);

// //   // Pivot Line Chart Data
// //   const pivotLineChartData = (data) => {
// //     const uniqueAgents = new Set();
// //     const result = {};

// //     (data || []).forEach(({ day, agent, policies }) => {
// //       uniqueAgents.add(agent);
// //       if (!result[day]) result[day] = { day };
// //       result[day][agent] = policies;
// //     });

// //     const agentArray = Array.from(uniqueAgents);
// //     setAgentNames(agentArray);

// //     return Object.values(result).map((entry) => {
// //       agentArray.forEach((agent) => {
// //         if (entry[agent] === undefined) {
// //           entry[agent] = 0;
// //         }
// //       });
// //       return entry;
// //     });
// //   };

// //   // Pivot brokerBarData into a format suitable for stacked bar chart
// //   const transformBrokerData = (data) => {
// //     const pivot = {};
// //     const allMonths = new Set();

// //     data.forEach(({ brokerName, month, policies }) => {
// //       if (!pivot[brokerName]) pivot[brokerName] = { brokerName };
// //       pivot[brokerName][month] = (pivot[brokerName][month] || 0) + policies;
// //       allMonths.add(month);
// //     });

// //     return {
// //       data: Object.values(pivot),
// //       months: Array.from(allMonths),
// //     };
// //   };

// //   const { data: brokerChartData, months: uniqueMonths } = transformBrokerData(
// //     policyChartData?.brokerBarData || []
// //   );

// //   // useEffect(() => {
// //   //   if (policyChartData) {
// //   //     setBarData(policyChartData?.barData || []);
// //   //     setBrokerBarData(policyChartData?.brokerBarData || []);
// //   //     setLineData(pivotLineChartData(policyChartData?.lineRawData || []));
// //   //   }
// //   // }, [policyChartData]);
// //   useEffect(() => {
// //     if (policyChartData) {
// //       const transformedBarData = policyChartData.barData.map((item) => ({
// //         agent: item.agent,
// //         policies: item.policies || 0,
// //         month: item.month || "N/A",
// //       }));

// //       setBarData(transformedBarData);
// //       setBrokerBarData(policyChartData?.brokerBarData || []);
// //       setLineData(pivotLineChartData(policyChartData?.lineRawData || []));
// //       setLoading(false); // Data has loaded, set loading to false
// //     }
// //   }, [policyChartData]);

// //   // const aggregatePieData = (data) => {
// //   //   const companyMap = {};

// //   //   data.forEach(({ company, policies }) => {
// //   //     if (!companyMap[company]) {
// //   //       companyMap[company] = { name: company, value: 0 };
// //   //     }
// //   //     companyMap[company].value += policies;
// //   //   });

// //   //   return Object.values(companyMap);
// //   // };
// //   const monthOrder = [
// //     "January",
// //     "February",
// //     "March",
// //     "April",
// //     "May",
// //     "June",
// //     "July",
// //     "August",
// //     "September",
// //     "October",
// //     "November",
// //     "December",
// //   ];

// //   const transformPieDataForAreaChart = (data) => {
// //     const monthMap = {};

// //     data.forEach(({ company, policies, month }) => {
// //       const cleanCompany = company.trim();

// //       if (!monthMap[month]) {
// //         monthMap[month] = { name: month };
// //       }

// //       monthMap[month][cleanCompany] =
// //         (monthMap[month][cleanCompany] || 0) + policies;
// //     });

// //     return Object.values(monthMap).sort(
// //       (a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name)
// //     );
// //   };
// //   const pieData = policyChartData?.pieData || [];

// //   const areaChartData = transformPieDataForAreaChart(pieData);
// //   const uniqueCompanies = [
// //     ...new Set(pieData.map((item) => item.company.trim())),
// //   ];
// //   const CustomTooltip = ({ active, payload, label }) => {
// //     if (active && payload && payload.length) {
// //       return (
// //         <div
// //           style={{
// //             background: "#fff",
// //             border: "1px solid #ccc",
// //             padding: 10,
// //             borderRadius: 6,
// //             fontSize: "14px",
// //             lineHeight: 1.6,
// //           }}
// //         >
// //           <strong>{label}</strong>
// //           <ul style={{ paddingLeft: 10, margin: 0 }}>
// //             {payload.map((entry, index) => (
// //               <li key={index} style={{ color: entry.stroke }}>
// //                 {entry.name}: {entry.value} policies
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       );
// //     }

// //     return null;
// //   };

// //   // const areaChartData = transformPieDataForAreaChart(
// //   //   policyChartData?.pieData || []
// //   // );

// //   // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
// //   return (
// //     <div className="w-full min-h-screen rounded-xl">
// //       {/* Date Filter */}
// //       <div className="mb-6 flex w-full justify-end items-center gap-4 pr-10">
// //         <Form layout="inline">
// //           <Form.Item
// //             name="dateRange"
// //             validateStatus={errors?.dateRange ? "error" : ""}
// //             help={errors?.dateRange && "This field is required"}
// //           >
// //             <Controller
// //               name="dateRange"
// //               control={control}
// //               defaultValue={null}
// //               render={({ field }) => (
// //                 <RangePicker
// //                   {...field}
// //                   // disabledDate={(current) =>
// //                   //   current && current < dayjs().startOf("year")
// //                   // }
// //                   className="p-4"
// //                   format="YYYY-MM-DD"
// //                   value={field.value}
// //                   onChange={(dates) => {
// //                     if (dates && dates.length > 0) {
// //                       dispatch(
// //                         PolicyChartApi({
// //                           startDate: dates[0]?.format("YYYY-MM-DD"),
// //                           endDate: dates[1]?.format("YYYY-MM-DD"),
// //                         })
// //                       );
// //                       notification.success({
// //                         message: "Date Filter Applied",
// //                         description: `Data filtered from ${dates[0]?.format("YYYY-MM-DD")} to ${dates[1]?.format("YYYY-MM-DD")}`,
// //                       });
// //                     } else {
// //                       dispatch(PolicyChartApi());
// //                       notification.info({
// //                         message: "Date Filter Cleared",
// //                         description: "Showing all policy data.",
// //                       });
// //                     }
// //                     field.onChange(dates);
// //                   }}
// //                 />
// //               )}
// //             />
// //           </Form.Item>
// //         </Form>
// //       </div>

// //       {/* Description */}
// //       <Typography variant="subtitle1" gutterBottom>
// //         This chart shows the number of policies claimed by each agent.
// //       </Typography>

// //       {/* Cards */}
// //       <div className="flex gap-14 p-6 justify-evenly flex-wrap rounded-xl">
// //         {policyChartData?.cardData ? (
// //           [
// //             {
// //               key: "totalPolicies",
// //               title: "Total Policies",
// //               value: policyChartData.cardData.totalPolicies,
// //             },
// //             {
// //               key: "totalAgents",
// //               title: "Total Agents",
// //               value: policyChartData.cardData.totalAgents,
// //             },
// //             {
// //               key: "totalClients",
// //               title: "Total Clients",
// //               value: policyChartData.cardData.totalClients,
// //             },
// //             {
// //               key: "totalCreditNotes",
// //               title: "Total Credit Notes",
// //               value: policyChartData.cardData.totalCreditNotes,
// //             },
// //             {
// //               key: "netPolicyAmount",
// //               title: "Net Policy Amount",
// //               value: policyChartData.cardData.netPolicyAmount,
// //             },
// //           ].map((item) => (
// //             <div
// //               key={item.key}
// //               className="w-60 h-40 flex items-center justify-center
// //                hover:scale-105 hover:duration-300 hover:transition-all border rounded-2xl"
// //             >
// //               <div className="flex flex-col items-center gap-4">
// //                 <h1 className="font-medium text-xl textTitle">{item.title}</h1>
// //                 <h1 className="text-3xl font-bold textTitle">{item.value}</h1>
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <Typography variant="body2">No card data available.</Typography>
// //         )}
// //       </div>

// //       {/* Charts */}
// //       <div className="flex flex-wrap gap-8 justify-center items-center mt-10">
// //         {/* Bar Chart */}
// //         <div className="w-[48%] max-xl:w-full">
// //           <div
// //             className="overflow-x-auto"
// //             style={{
// //               scrollbarWidth: "thin",
// //             }}
// //           >
// //             <Typography
// //               variant="h6"
// //               gutterBottom
// //               className="text-center"
// //               sx={{ fontWeight: "bold", color: "#1976d2" }}
// //             >
// //               Team Performance
// //             </Typography>
// //             <ResponsiveContainer minWidth={1500} height={500}>
// //               <BarChart
// //                 data={barData}
// //                 margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
// //               >
// //                 <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
// //                 {/* <XAxis
// //                   dataKey="month"
// //                   interval={0}
// //                   angle={-70}
// //                   textAnchor="end"
// //                   height={80}
// //                   width={200}
// //                 /> */}
// //                 <XAxis
// //                   dataKey="agent"
// //                   interval={0}
// //                   angle={-70}
// //                   textAnchor="end"
// //                   height={120}
// //                 />
// //                 <YAxis
// //                   allowDecimals={false}
// //                   label={{
// //                     value: "Policies",
// //                     angle: -90,
// //                     position: "insideLeft",
// //                     offset: -5,
// //                   }}
// //                 />
// //                 <Tooltip content={<SimpleTooltip />} />
// //                 <Bar
// //                   dataKey="policies"
// //                   fill="#1976d2"
// //                   radius={[8, 8, 0, 0]}
// //                   barSize={50} // Control bar thickness
// //                   maxBarSize={80}
// //                   isAnimationActive={true}
// //                 >
// //                   <LabelList
// //                     dataKey="policies"
// //                     position="top"
// //                     style={{ fill: "#1976d2", fontWeight: "bold" }}
// //                   />
// //                 </Bar>
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>
// //         {/* Line Chart */}
// //         <div className="w-[48%] max-xl:w-full">
// //           <div
// //             className="overflow-x-auto overflow-y-hidden"
// //             style={{
// //               scrollbarWidth: "thin",
// //             }}
// //           >
// //             <Typography
// //               variant="h6"
// //               gutterBottom
// //               className="text-center"
// //               sx={{ fontWeight: "bold", color: "#1976d2" }}
// //             >
// //               Sales Progress Trend
// //             </Typography>
// //             <ResponsiveContainer minWidth={1500} height={500}>
// //               <LineChart
// //                 data={lineData}
// //                 margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
// //               >
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="day" />
// //                 <YAxis
// //                   label={{
// //                     value: "Policies Sold",
// //                     angle: -90,
// //                     position: "insideLeft",
// //                   }}
// //                   allowDecimals={false}
// //                 />
// //                 <Tooltip
// //                   contentStyle={{
// //                     backgroundColor: "#fff",
// //                     borderRadius: "8px",
// //                   }}
// //                   formatter={(value, name) => [`${value} Policies`, `${name}`]}
// //                 />
// //                 <Legend verticalAlign="bottom" height={36} width={"100%"} />
// //                 {agentNames.map((agent, index) => (
// //                   <Line
// //                     key={agent}
// //                     type="monotone" // Smooth line
// //                     dataKey={agent} // agent's own line
// //                     strokeWidth={2}
// //                     stroke={`hsl(${(index * 137.5) % 360}, 70%, 50%)`} // Different color for each agent
// //                     dot={{ r: 3 }}
// //                     activeDot={{ r: 6 }}
// //                     isAnimationActive={true}
// //                   />
// //                 ))}
// //               </LineChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>
// //         {/* Line Area  Chart*/}

// //         <div className="w-[48%] max-xl:w-full overflow">
// //           <div
// //             className="overflow-x-auto"
// //             style={{
// //               scrollbarWidth: "thin",
// //             }}
// //           >
// //             <Typography
// //               variant="h6"
// //               gutterBottom
// //               align="center"
// //               sx={{ fontWeight: "bold", color: "#1976d2" }}
// //             >
// //               Sales Distribution Over Months
// //             </Typography>

// //             <ResponsiveContainer minWidth={1500} height={500}>
// //               <AreaChart
// //                 data={areaChartData}
// //                 margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
// //               >
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="name" />
// //                 <YAxis
// //                   allowDecimals={false}
// //                   label={{
// //                     value: "Company",
// //                     angle: -90,
// //                     position: "insideLeft",
// //                     offset: 10,
// //                     style: { textAnchor: "middle", fill: "#555", fontSize: 14 },
// //                   }}
// //                 />
// //                 <Tooltip content={<CustomTooltip />} />

// //                 {/* Gradients for each company */}
// //                 <defs>
// //                   {uniqueCompanies.map((company, index) => {
// //                     const color = `hsl(${(index * 60) % 360}, 70%, 50%)`;
// //                     return (
// //                       <linearGradient
// //                         key={company}
// //                         id={`gradient-${index}`}
// //                         x1="0"
// //                         y1="0"
// //                         x2="0"
// //                         y2="1"
// //                       >
// //                         <stop offset="5%" stopColor={color} stopOpacity={0.8} />
// //                         <stop offset="95%" stopColor={color} stopOpacity={0} />
// //                       </linearGradient>
// //                     );
// //                   })}
// //                 </defs>

// //                 {uniqueCompanies.map((company, index) => {
// //                   const color = `hsl(${(index * 60) % 360}, 70%, 50%)`;
// //                   return (
// //                     <Area
// //                       key={company}
// //                       type="monotone"
// //                       dataKey={company}
// //                       stroke={color}
// //                       fillOpacity={1}
// //                       fill={`url(#gradient-${index})`}
// //                     />
// //                   );
// //                 })}
// //               </AreaChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>

// //         {/* Bar Chart Broker (Stacked by Month) */}
// //         <div className="w-[48%] max-xl:w-full overflow">
// //           <div
// //             className="overflow-x-auto"
// //             style={{
// //               scrollbarWidth: "thin",
// //             }}
// //           >
// //             <Typography
// //               variant="h6"
// //               gutterBottom
// //               className="text-center"
// //               sx={{
// //                 fontWeight: "bold",
// //                 color: "#1976d2",
// //                 fontSize: "1.2rem",
// //                 letterSpacing: 1,
// //                 marginBottom: 2,
// //               }}
// //             >
// //               Broker Performance by Month
// //             </Typography>

// //             <ResponsiveContainer minWidth={1500} height={500}>
// //               <BarChart
// //                 data={brokerChartData}
// //                 margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
// //               >
// //                 <CartesianGrid stroke="#e0e0e0" strokeDasharray="4 4" />
// //                 <XAxis
// //                   dataKey="brokerName"
// //                   interval={0}
// //                   angle={-30}
// //                   textAnchor="end"
// //                   height={80}
// //                   tick={{ fontSize: 12 }}
// //                 />
// //                 <YAxis
// //                   allowDecimals={false}
// //                   label={{
// //                     value: "Broker",
// //                     angle: -90,
// //                     position: "insideLeft",
// //                     offset: -5,
// //                     style: { textAnchor: "middle", fill: "#555", fontSize: 14 },
// //                   }}
// //                 />
// //                 <Tooltip
// //                   contentStyle={{
// //                     backgroundColor: "#fff",
// //                     border: "1px solid #ccc",
// //                     borderRadius: "8px",
// //                     fontSize: "14px",
// //                     color: "#333",
// //                   }}
// //                 />
// //                 <Legend verticalAlign="bottom" height={36} />

// //                 {uniqueMonths
// //                   .sort(
// //                     (a, b) => new Date(`1 ${a} 2020`) - new Date(`1 ${b} 2020`)
// //                   )
// //                   .map((month, index) => (
// //                     <Bar
// //                       key={month}
// //                       dataKey={month}
// //                       stackId="a"
// //                       fill={`hsl(${(index * 55) % 360}, 70%, 55%)`}
// //                       radius={[8, 8, 0, 0]}
// //                       barSize={30}
// //                     />
// //                   ))}
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useEffect, useMemo, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   LabelList,
//   Line,
//   LineChart,
//   Legend,
//   AreaChart,
//   Area,
// } from "recharts";
// import {
//   Card,
//   Typography,
//   Box,
//   Tooltip as MuiTooltip,
//   Skeleton,
// } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import { PolicyChartApi } from "../../../store/actionApis/policyChartApi";
// import { DatePicker, Form, notification } from "antd";
// import { Controller, useForm } from "react-hook-form";

// export default function PolicyChart() {
//   const { RangePicker } = DatePicker;

//   // Custom Tooltip for Bar Chart
//   const SimpleTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       const { agent, policies, month } = payload[0].payload;
//       return (
//         <div
//           style={{
//             background: "#fff",
//             border: "1px solid #ccc",
//             padding: 8,
//             borderRadius: 4,
//           }}
//         >
//           <p>
//             <strong style={{ color: "#555" }}>{agent}</strong>
//           </p>
//           <p style={{ color: "#777" }}>{`${policies} policies in ${month}`}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   const dispatch = useDispatch();
//   const policyChartData = useSelector(
//     (state) => state?.policyChartData?.policyChartData?.payload
//   );

//   const [barData, setBarData] = useState([]);
//   const [lineData, setLineData] = useState([]);
//   const [agentNames, setAgentNames] = useState([]);
//   const [brokerBarData, setBrokerBarData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const {
//     control,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     setLoading(true);
//     dispatch(PolicyChartApi());
//   }, [dispatch]);

//   // Pivot Line Chart Data
//   const pivotLineChartData = (data) => {
//     const uniqueAgents = new Set();
//     const result = {};

//     (data || []).forEach(({ day, agent, policies }) => {
//       uniqueAgents.add(agent);
//       if (!result[day]) result[day] = { day };
//       result[day][agent] = policies;
//     });

//     const agentArray = Array.from(uniqueAgents);
//     setAgentNames(agentArray);

//     return Object.values(result).map((entry) => {
//       agentArray.forEach((agent) => {
//         if (entry[agent] === undefined) entry[agent] = 0;
//       });
//       return entry;
//     });
//   };

//   // Pivot brokerBarData into a format suitable for stacked bar chart
//   const transformBrokerData = (data) => {
//     const pivot = {};
//     const allMonths = new Set();

//     data.forEach(({ brokerName, month, policies }) => {
//       if (!pivot[brokerName]) pivot[brokerName] = { brokerName };
//       pivot[brokerName][month] = (pivot[brokerName][month] || 0) + policies;
//       allMonths.add(month);
//     });

//     return { data: Object.values(pivot), months: Array.from(allMonths) };
//   };

//   const { data: brokerChartData, months: uniqueMonths } = transformBrokerData(
//     policyChartData?.brokerBarData || []
//   );

//   useEffect(() => {
//     if (policyChartData) {
//       const transformedBarData = (policyChartData.barData || []).map((item) => ({
//         agent: item.agent,
//         policies: item.policies || 0,
//         month: item.month || "N/A",
//       }));

//       setBarData(transformedBarData);
//       setBrokerBarData(policyChartData?.brokerBarData || []);
//       setLineData(pivotLineChartData(policyChartData?.lineRawData || []));
//       setLoading(false);
//     }
//   }, [policyChartData]);

//   const monthOrder = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const transformPieDataForAreaChart = (data) => {
//     const monthMap = {};
//     (data || []).forEach(({ company, policies, month }) => {
//       const cleanCompany = (company || "").trim();
//       if (!monthMap[month]) monthMap[month] = { name: month };
//       monthMap[month][cleanCompany] =
//         (monthMap[month][cleanCompany] || 0) + (policies || 0);
//     });

//     return Object.values(monthMap).sort(
//       (a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name)
//     );
//   };

//   const pieData = policyChartData?.pieData || [];
//   const areaChartData = transformPieDataForAreaChart(pieData);
//   const uniqueCompanies = [...new Set(pieData.map((i) => (i.company || "").trim()))];

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div
//           style={{
//             background: "#fff",
//             border: "1px solid #ccc",
//             padding: 10,
//             borderRadius: 6,
//             fontSize: "14px",
//             lineHeight: 1.6,
//           }}
//         >
//           <strong>{label}</strong>
//           <ul style={{ paddingLeft: 10, margin: 0 }}>
//             {payload.map((entry, index) => (
//               <li key={index} style={{ color: entry.stroke }}>
//                 {entry.name}: {entry.value} policies
//               </li>
//             ))}
//           </ul>
//         </div>
//       );
//     }
//     return null;
//   };

//   // ✅ Gauge helpers
//   const formatNumber = (v) => {
//     const n = Number(v);
//     if (!Number.isFinite(n)) return "0";
//     return new Intl.NumberFormat().format(n);
//   };

//   const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

//   // ✅ Targets (replace with backend targets if available)
//   const CARD_CONFIG = useMemo(
//     () => [
//       { key: "totalPolicies", title: "Total Policies", target: 1000 },
//       { key: "totalAgents", title: "Total Agents", target: 100 },
//       { key: "totalClients", title: "Total Clients", target: 2000 },
//       { key: "totalCreditNotes", title: "Total Credit Notes", target: 500 },
//       { key: "netPolicyAmount", title: "Net Policy Amount", target: 1000000 },
//     ],
//     []
//   );

//   /**
//    * ✅ Professional semi-donut gauge (SVG)
//    * - Smooth animation with CSS transition
//    * - Hover tooltip with exact numbers
//    * - Nice “track + gradient progress + glow”
//    * - Badge shows status: On track / At risk / Behind
//    */
//   const GaugeCard = ({ title, value, target }) => {
//     const safeValue = Number.isFinite(Number(value)) ? Number(value) : 0;
//     const safeTarget =
//       Number.isFinite(Number(target)) && Number(target) > 0 ? Number(target) : 1;

//     const rawPct = (safeValue / safeTarget) * 100;
//     const pct = clamp(rawPct, 0, 120); // allow small overachieve
//     const pctForArc = clamp(rawPct, 0, 100);

//     const status =
//       rawPct >= 90 ? "On track" : rawPct >= 60 ? "At risk" : "Behind";

//     // color tokens (kept simple; no other app changes)
//     const statusStyles =
//       status === "On track"
//         ? { bg: "rgba(16,185,129,0.12)", fg: "rgb(16,185,129)" }
//         : status === "At risk"
//         ? { bg: "rgba(245,158,11,0.14)", fg: "rgb(245,158,11)" }
//         : { bg: "rgba(239,68,68,0.12)", fg: "rgb(239,68,68)" };

//     // SVG arc math (semi circle)
//     const size = 170;
//     const stroke = 14;
//     const r = 68;
//     const cx = size / 2;
//     const cy = 92; // slightly lower to give top padding
//     const startAngle = 180;
//     const endAngle = 0;

//     const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
//       const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
//       return {
//         x: centerX + radius * Math.cos(angleInRadians),
//         y: centerY + radius * Math.sin(angleInRadians),
//       };
//     };

//     const describeArc = (x, y, radius, start, end) => {
//       const startPt = polarToCartesian(x, y, radius, end);
//       const endPt = polarToCartesian(x, y, radius, start);
//       const largeArcFlag = end - start <= 180 ? "0" : "1";
//       return [
//         "M",
//         startPt.x,
//         startPt.y,
//         "A",
//         radius,
//         radius,
//         0,
//         largeArcFlag,
//         0,
//         endPt.x,
//         endPt.y,
//       ].join(" ");
//     };

//     const progressEnd = startAngle - (pctForArc / 100) * 180;
//     const trackPath = describeArc(cx, cy, r, startAngle, endAngle);
//     const progPath = describeArc(cx, cy, r, startAngle, progressEnd);

//     const tooltipTitle = `${title}\nValue: ${formatNumber(
//       safeValue
//     )}\nTarget: ${formatNumber(safeTarget)}\nProgress: ${Math.round(rawPct)}%`;

//     return (
//       <MuiTooltip title={<span style={{ whiteSpace: "pre-line" }}>{tooltipTitle}</span>} arrow>
//         <Card
//           elevation={0}
//           className="w-72 h-44 border rounded-2xl hover:scale-[1.02] hover:duration-300 hover:transition-all"
//           sx={{
//             position: "relative",
//             overflow: "hidden",
//             background:
//               "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,250,252,0.96))",
//           }}
//         >
//           {/* subtle top glow */}
//           <Box
//             sx={{
//               position: "absolute",
//               inset: 0,
//               background:
//                 "radial-gradient(600px 140px at 50% -20%, rgba(99,102,241,0.14), transparent 55%)",
//               pointerEvents: "none",
//             }}
//           />

//           <div className="h-full w-full flex items-center gap-3 px-4">
//             {/* Left: Gauge */}
//             <div className="relative">
//               <svg width={size} height={120} viewBox={`0 0 ${size} 120`}>
//                 <defs>
//                   <linearGradient id={`g-${title}`} x1="0%" y1="0%" x2="100%" y2="0%">
//                     <stop offset="0%" stopColor="rgb(99,102,241)" />
//                     <stop offset="60%" stopColor="rgb(59,130,246)" />
//                     <stop offset="100%" stopColor="rgb(16,185,129)" />
//                   </linearGradient>
//                   <filter id={`glow-${title}`} x="-50%" y="-50%" width="200%" height="200%">
//                     <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
//                     <feMerge>
//                       <feMergeNode in="coloredBlur" />
//                       <feMergeNode in="SourceGraphic" />
//                     </feMerge>
//                   </filter>
//                 </defs>

//                 {/* Track */}
//                 <path
//                   d={trackPath}
//                   fill="none"
//                   stroke="rgba(148,163,184,0.35)"
//                   strokeWidth={stroke}
//                   strokeLinecap="round"
//                 />

//                 {/* Progress */}
//                 <path
//                   d={progPath}
//                   fill="none"
//                   stroke={`url(#g-${title})`}
//                   strokeWidth={stroke}
//                   strokeLinecap="round"
//                   filter={`url(#glow-${title})`}
//                   style={{
//                     transition: "d 800ms ease",
//                   }}
//                 />

//                 {/* needle dot */}
//                 <circle
//                   cx={polarToCartesian(cx, cy, r, progressEnd).x}
//                   cy={polarToCartesian(cx, cy, r, progressEnd).y}
//                   r="4.5"
//                   fill="white"
//                   stroke="rgba(0,0,0,0.15)"
//                 />
//               </svg>

//               {/* Center stats */}
//               <div className="absolute left-1/2 top-[58px] -translate-x-1/2 -translate-y-1/2 text-center">
//                 <Typography sx={{ fontWeight: 900, fontSize: 22, lineHeight: 1 }}>
//                   {Math.round(rawPct)}%
//                 </Typography>
//                 <Typography variant="caption" sx={{ opacity: 0.75 }}>
//                   {formatNumber(safeValue)} / {formatNumber(safeTarget)}
//                 </Typography>
//               </div>
//             </div>

//             {/* Right: Title + status */}
//             <div className="flex-1 min-w-0">
//               <Typography
//                 sx={{ fontWeight: 800, fontSize: 14, letterSpacing: 0.2 }}
//                 className="textTitle"
//                 noWrap
//                 title={title}
//               >
//                 {title}
//               </Typography>

//               <div className="mt-2 flex items-center gap-2">
//                 <span
//                   style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     padding: "6px 10px",
//                     borderRadius: 999,
//                     background: statusStyles.bg,
//                     color: statusStyles.fg,
//                     fontWeight: 700,
//                     fontSize: 12,
//                   }}
//                 >
//                   {status}
//                 </span>

//                 <Typography variant="caption" sx={{ opacity: 0.75 }}>
//                   {pct > 100 ? `+${Math.round(pct - 100)}% over` : ""}
//                 </Typography>
//               </div>

//               <Typography variant="caption" sx={{ opacity: 0.7 }} className="mt-2 block">
//                 Hover to see details
//               </Typography>
//             </div>
//           </div>
//         </Card>
//       </MuiTooltip>
//     );
//   };

//   return (
//     <div className="w-full min-h-screen rounded-xl">
//       {/* Date Filter */}
//       <div className="mb-6 flex w-full justify-end items-center gap-4 pr-10">
//         <Form layout="inline">
//           <Form.Item
//             name="dateRange"
//             validateStatus={errors?.dateRange ? "error" : ""}
//             help={errors?.dateRange && "This field is required"}
//           >
//             <Controller
//               name="dateRange"
//               control={control}
//               defaultValue={null}
//               render={({ field }) => (
//                 <RangePicker
//                   {...field}
//                   className="p-4"
//                   format="YYYY-MM-DD"
//                   value={field.value}
//                   onChange={(dates) => {
//                     if (dates && dates.length > 0) {
//                       setLoading(true);
//                       dispatch(
//                         PolicyChartApi({
//                           startDate: dates[0]?.format("YYYY-MM-DD"),
//                           endDate: dates[1]?.format("YYYY-MM-DD"),
//                         })
//                       );
//                       notification.success({
//                         message: "Date Filter Applied",
//                         description: `Data filtered from ${dates[0]?.format(
//                           "YYYY-MM-DD"
//                         )} to ${dates[1]?.format("YYYY-MM-DD")}`,
//                       });
//                     } else {
//                       setLoading(true);
//                       dispatch(PolicyChartApi());
//                       notification.info({
//                         message: "Date Filter Cleared",
//                         description: "Showing all policy data.",
//                       });
//                     }
//                     field.onChange(dates);
//                   }}
//                 />
//               )}
//             />
//           </Form.Item>
//         </Form>
//       </div>

//       {/* Description */}
//       <Typography variant="subtitle1" gutterBottom>
//         This chart shows the number of policies claimed by each agent.
//       </Typography>

//       {/* ✅ Gauge Cards (professional UI) */}
//       <div className="flex gap-14 p-6 justify-evenly flex-wrap rounded-xl">
//         {loading ? (
//           CARD_CONFIG.map((c) => (
//             <div key={c.key} className="w-72">
//               <Skeleton variant="rounded" height={176} />
//             </div>
//           ))
//         ) : policyChartData?.cardData ? (
//           CARD_CONFIG.map((cfg) => (
//             <GaugeCard
//               key={cfg.key}
//               title={cfg.title}
//               value={policyChartData.cardData?.[cfg.key]}
//               target={cfg.target}
//             />
//           ))
//         ) : (
//           <Typography variant="body2">No card data available.</Typography>
//         )}
//       </div>

//       {/* Charts */}
//       <div className="flex flex-wrap gap-8 justify-center items-center mt-10">
//         {/* Bar Chart */}
//         <div className="w-[48%] max-xl:w-full">
//           <div className="overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
//             <Typography
//               variant="h6"
//               gutterBottom
//               className="text-center"
//               sx={{ fontWeight: "bold", color: "#1976d2" }}
//             >
//               Team Performance
//             </Typography>
//             <ResponsiveContainer minWidth={1500} height={500}>
//               <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                 <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
//                 <XAxis dataKey="agent" interval={0} angle={-70} textAnchor="end" height={120} />
//                 <YAxis
//                   allowDecimals={false}
//                   label={{ value: "Policies", angle: -90, position: "insideLeft", offset: -5 }}
//                 />
//                 <Tooltip content={<SimpleTooltip />} />
//                 <Bar
//                   dataKey="policies"
//                   fill="#1976d2"
//                   radius={[8, 8, 0, 0]}
//                   barSize={50}
//                   maxBarSize={80}
//                   isAnimationActive={true}
//                 >
//                   <LabelList dataKey="policies" position="top" style={{ fill: "#1976d2", fontWeight: "bold" }} />
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Line Chart */}
//         <div className="w-[48%] max-xl:w-full">
//           <div className="overflow-x-auto overflow-y-hidden" style={{ scrollbarWidth: "thin" }}>
//             <Typography
//               variant="h6"
//               gutterBottom
//               className="text-center"
//               sx={{ fontWeight: "bold", color: "#1976d2" }}
//             >
//               Sales Progress Trend
//             </Typography>
//             <ResponsiveContainer minWidth={1500} height={500}>
//               <LineChart data={lineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="day" />
//                 <YAxis
//                   label={{ value: "Policies Sold", angle: -90, position: "insideLeft" }}
//                   allowDecimals={false}
//                 />
//                 <Tooltip
//                   contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }}
//                   formatter={(value, name) => [`${value} Policies`, `${name}`]}
//                 />
//                 <Legend verticalAlign="bottom" height={36} width={"100%"} />
//                 {agentNames.map((agent, index) => (
//                   <Line
//                     key={agent}
//                     type="monotone"
//                     dataKey={agent}
//                     strokeWidth={2}
//                     stroke={`hsl(${(index * 137.5) % 360}, 70%, 50%)`}
//                     dot={{ r: 3 }}
//                     activeDot={{ r: 6 }}
//                     isAnimationActive={true}
//                   />
//                 ))}
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Area Chart */}
//         <div className="w-[48%] max-xl:w-full overflow">
//           <div className="overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
//             <Typography
//               variant="h6"
//               gutterBottom
//               align="center"
//               sx={{ fontWeight: "bold", color: "#1976d2" }}
//             >
//               Sales Distribution Over Months
//             </Typography>

//             <ResponsiveContainer minWidth={1500} height={500}>
//               <AreaChart data={areaChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis
//                   allowDecimals={false}
//                   label={{
//                     value: "Company",
//                     angle: -90,
//                     position: "insideLeft",
//                     offset: 10,
//                     style: { textAnchor: "middle", fill: "#555", fontSize: 14 },
//                   }}
//                 />
//                 <Tooltip content={CustomTooltip} />

//                 <defs>
//                   {uniqueCompanies.map((company, index) => {
//                     const color = `hsl(${(index * 60) % 360}, 70%, 50%)`;
//                     return (
//                       <linearGradient
//                         key={company}
//                         id={`gradient-${index}`}
//                         x1="0"
//                         y1="0"
//                         x2="0"
//                         y2="1"
//                       >
//                         <stop offset="5%" stopColor={color} stopOpacity={0.8} />
//                         <stop offset="95%" stopColor={color} stopOpacity={0} />
//                       </linearGradient>
//                     );
//                   })}
//                 </defs>

//                 {uniqueCompanies.map((company, index) => {
//                   const color = `hsl(${(index * 60) % 360}, 70%, 50%)`;
//                   return (
//                     <Area
//                       key={company}
//                       type="monotone"
//                       dataKey={company}
//                       stroke={color}
//                       fillOpacity={1}
//                       fill={`url(#gradient-${index})`}
//                     />
//                   );
//                 })}
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Broker stacked bars */}
//         <div className="w-[48%] max-xl:w-full overflow">
//           <div className="overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
//             <Typography
//               variant="h6"
//               gutterBottom
//               className="text-center"
//               sx={{
//                 fontWeight: "bold",
//                 color: "#1976d2",
//                 fontSize: "1.2rem",
//                 letterSpacing: 1,
//                 marginBottom: 2,
//               }}
//             >
//               Broker Performance by Month
//             </Typography>

//             <ResponsiveContainer minWidth={1500} height={500}>
//               <BarChart data={brokerChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
//                 <CartesianGrid stroke="#e0e0e0" strokeDasharray="4 4" />
//                 <XAxis
//                   dataKey="brokerName"
//                   interval={0}
//                   angle={-30}
//                   textAnchor="end"
//                   height={80}
//                   tick={{ fontSize: 12 }}
//                 />
//                 <YAxis
//                   allowDecimals={false}
//                   label={{
//                     value: "Broker",
//                     angle: -90,
//                     position: "insideLeft",
//                     offset: -5,
//                     style: { textAnchor: "middle", fill: "#555", fontSize: 14 },
//                   }}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#fff",
//                     border: "1px solid #ccc",
//                     borderRadius: "8px",
//                     fontSize: "14px",
//                     color: "#333",
//                   }}
//                 />
//                 <Legend verticalAlign="bottom" height={36} />
//                 {uniqueMonths
//                   .sort((a, b) => new Date(`1 ${a} 2020`) - new Date(`1 ${b} 2020`))
//                   .map((month, index) => (
//                     <Bar
//                       key={month}
//                       dataKey={month}
//                       stackId="a"
//                       fill={`hsl(${(index * 55) % 360}, 70%, 55%)`}
//                       radius={[8, 8, 0, 0]}
//                       barSize={30}
//                     />
//                   ))}
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
  Line,
  LineChart,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  Card,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  Button,
  TextField,
  Chip,
  Divider,
  LinearProgress,
  Skeleton,
  Tooltip as MuiTooltip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import { useSelector, useDispatch } from "react-redux";
import { PolicyChartApi } from "../../../store/actionApis/policyChartApi";
import { DatePicker, Form, notification } from "antd";
import { Controller, useForm } from "react-hook-form";

export default function PolicyChart() {
  const { RangePicker } = DatePicker;

  const dispatch = useDispatch();
  const policyChartData = useSelector(
    (state) => state?.policyChartData?.policyChartData?.payload
  );

  const [barData, setBarData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [agentNames, setAgentNames] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Upper KPI controls
  const [selectedKpi, setSelectedKpi] = useState(null);
  const [kpiSearch, setKpiSearch] = useState("");
  const [kpiSort, setKpiSort] = useState("default"); // default | valueDesc | progressDesc

  const {
    control,
    reset,
    formState: { errors },
  } = useForm();

  // ---------------------------
  // Helpers (safe formatting)
  // ---------------------------
  const formatNumber = (v) => {
    const n = Number(v);
    if (!Number.isFinite(n)) return "0";
    return new Intl.NumberFormat().format(n);
  };

  const formatCurrency = (v) => {
    const n = Number(v);
    if (!Number.isFinite(n)) return "0";
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "SAR", // change if needed
      maximumFractionDigits: 0,
    }).format(n);
  };

  const clampPercent = (value, target) => {
    const v = Number(value);
    const t = Number(target);
    if (!Number.isFinite(v) || !Number.isFinite(t) || t <= 0) return 0;
    return Math.max(0, Math.min(100, (v / t) * 100));
  };

  // ✅ KPI Config (professional + hints + formatting)
  const CARD_CONFIG = useMemo(
    () => [
      {
        key: "totalPolicies",
        title: "Total Policies",
        target: 1000,
        formatter: formatNumber,
        hint: "Total number of policies in the selected period.",
      },
      {
        key: "totalAgents",
        title: "Total Agents",
        target: 100,
        formatter: formatNumber,
        hint: "Number of active agents contributing to sales.",
      },
      {
        key: "totalClients",
        title: "Total Clients",
        target: 2000,
        formatter: formatNumber,
        hint: "Unique clients served in the selected period.",
      },
      {
        key: "totalCreditNotes",
        title: "Total Credit Notes",
        target: 500,
        formatter: formatNumber,
        hint: "Credit notes issued in the selected period.",
      },
      {
        key: "netPolicyAmount",
        title: "Net Policy Amount",
        target: 1000000,
        formatter: formatCurrency,
        hint: "Net amount for policies (after adjustments).",
      },
    ],
    [] // stable
  );

  // Optional delta support if API provides: cardData.previous[key]
  const showDeltaIfAvailable = useCallback((cardData, key) => {
    const prev = cardData?.previous?.[key];
    const cur = cardData?.[key];
    if (!Number.isFinite(Number(prev)) || !Number.isFinite(Number(cur)))
      return null;

    const diff = Number(cur) - Number(prev);
    const pct = Number(prev) === 0 ? null : (diff / Number(prev)) * 100;
    if (diff === 0) return null;
    return { diff, pct };
  }, []);

  // ---------------------------
  // CSV Export for KPI cards
  // ---------------------------
  const downloadCSV = (rows, filename = "kpi_summary.csv") => {
    const headers = ["KPI", "Value", "Target", "Progress%"];
    const csv = [
      headers.join(","),
      ...rows.map((r) =>
        [
          `"${r.title}"`,
          `"${r.value}"`,
          `"${r.target}"`,
          `"${Math.round(r.percent)}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ---------------------------
  // Custom Tooltip (Bar)
  // ---------------------------
  const SimpleTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { agent, policies, month } = payload[0].payload;
      return (
        <div
          style={{
            background: "#fff",
            border: "1px solid #ccc",
            padding: 10,
            borderRadius: 8,
            fontSize: 13,
          }}
        >
          <p style={{ margin: 0 }}>
            <strong style={{ color: "#333" }}>{agent}</strong>
          </p>
          <p style={{ margin: "6px 0 0", color: "#666" }}>
            {`${policies} policies in ${month}`}
          </p>
        </div>
      );
    }
    return null;
  };

  // ---------------------------
  // Pivot Line Chart Data
  // ---------------------------
  const pivotLineChartData = useCallback((data) => {
    const uniqueAgents = new Set();
    const result = {};

    (data || []).forEach(({ day, agent, policies }) => {
      uniqueAgents.add(agent);
      if (!result[day]) result[day] = { day };
      result[day][agent] = policies;
    });

    const agentArray = Array.from(uniqueAgents);
    setAgentNames(agentArray);

    return Object.values(result).map((entry) => {
      agentArray.forEach((agent) => {
        if (entry[agent] === undefined) entry[agent] = 0;
      });
      return entry;
    });
  }, []);

  // ---------------------------
  // Broker stacked bar transform
  // ---------------------------
  const transformBrokerData = useCallback((data) => {
    const pivot = {};
    const allMonths = new Set();

    (data || []).forEach(({ brokerName, month, policies }) => {
      if (!pivot[brokerName]) pivot[brokerName] = { brokerName };
      pivot[brokerName][month] = (pivot[brokerName][month] || 0) + policies;
      allMonths.add(month);
    });

    return { data: Object.values(pivot), months: Array.from(allMonths) };
  }, []);

  const { data: brokerChartData, months: uniqueMonths } = useMemo(() => {
    return transformBrokerData(policyChartData?.brokerBarData || []);
  }, [policyChartData?.brokerBarData, transformBrokerData]);

  // ---------------------------
  // Area chart transform
  // ---------------------------
  const monthOrder = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );

  const transformPieDataForAreaChart = useCallback(
    (data) => {
      const monthMap = {};
      (data || []).forEach(({ company, policies, month }) => {
        const cleanCompany = (company || "").trim();
        if (!monthMap[month]) monthMap[month] = { name: month };
        monthMap[month][cleanCompany] =
          (monthMap[month][cleanCompany] || 0) + (policies || 0);
      });

      return Object.values(monthMap).sort(
        (a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name)
      );
    },
    [monthOrder]
  );

  const pieData = policyChartData?.pieData || [];
  const areaChartData = useMemo(
    () => transformPieDataForAreaChart(pieData),
    [pieData, transformPieDataForAreaChart]
  );

  const uniqueCompanies = useMemo(() => {
    return [...new Set((pieData || []).map((item) => (item.company || "").trim()))]
      .filter(Boolean);
  }, [pieData]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "#fff",
            border: "1px solid #ccc",
            padding: 10,
            borderRadius: 8,
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          <strong>{label}</strong>
          <ul style={{ paddingLeft: 14, margin: "6px 0 0" }}>
            {payload.map((entry, index) => (
              <li key={index} style={{ color: entry.stroke }}>
                {entry.name}: {entry.value} policies
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  // ---------------------------
  // Fetch on mount
  // ---------------------------
  useEffect(() => {
    setLoading(true);
    dispatch(PolicyChartApi());
  }, [dispatch]);

  // ---------------------------
  // Hydrate charts data
  // ---------------------------
  useEffect(() => {
    if (policyChartData) {
      const transformedBarData = (policyChartData.barData || []).map((item) => ({
        agent: item.agent,
        policies: item.policies || 0,
        month: item.month || "N/A",
      }));

      setBarData(transformedBarData);
      setLineData(pivotLineChartData(policyChartData?.lineRawData || []));
      setLoading(false);
    }
  }, [policyChartData, pivotLineChartData]);

  // ---------------------------
  // Actions
  // ---------------------------
  const handleRefresh = () => {
    setLoading(true);
    dispatch(PolicyChartApi());
    notification.success({
      message: "Refreshed",
      description: "Dashboard data updated.",
    });
  };

  const handleResetFilter = () => {
    reset({ dateRange: null });
    setLoading(true);
    dispatch(PolicyChartApi());
    notification.info({
      message: "Reset",
      description: "Showing all policy data.",
    });
  };

  // ---------------------------
  // KPI Card (professional)
  // ---------------------------
  const KpiCard = ({
    title,
    value,
    target,
    formatter,
    hint,
    selected,
    onSelect,
    delta,
  }) => {
    const percent = clampPercent(value, target);
    const showDelta = !!delta;
    const up = delta?.diff > 0;
    const down = delta?.diff < 0;

    return (
      <Card
        elevation={0}
        onClick={onSelect}
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === "Enter" || e.key === " " ? onSelect() : null
        }
        sx={{
          p: 2,
          borderRadius: 3,
          border: "1px solid",
          borderColor: selected ? "primary.main" : "divider",
          cursor: "pointer",
          transition: "transform 120ms ease, box-shadow 120ms ease, border 120ms ease",
          "&:hover": { transform: "translateY(-2px)", boxShadow: 2 },
          outline: "none",
        }}
        aria-label={`${title} KPI card`}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={1}
        >
          <Box minWidth={0}>
            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
              <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                {title}
              </Typography>
              {selected ? (
                <Chip size="small" color="primary" label="Focused" />
              ) : null}
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 900, mt: 0.5 }}>
              {formatter ? formatter(value) : formatNumber(value)}
            </Typography>

            <Box mt={0.75} display="flex" gap={1} flexWrap="wrap">
              <Typography variant="caption" sx={{ opacity: 0.75 }}>
                Target: {formatter ? formatter(target) : formatNumber(target)}
              </Typography>

              {showDelta ? (
                <Chip
                  size="small"
                  variant="outlined"
                  icon={up ? <TrendingUpIcon /> : down ? <TrendingDownIcon /> : undefined}
                  color={up ? "success" : down ? "error" : "default"}
                  label={
                    delta?.pct == null
                      ? `${up ? "+" : ""}${formatNumber(delta.diff)}`
                      : `${up ? "+" : ""}${delta.pct.toFixed(1)}%`
                  }
                />
              ) : null}
            </Box>
          </Box>

          <MuiTooltip title={hint || ""} placement="top" arrow>
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress
                variant="determinate"
                value={percent}
                size={58}
                thickness={5}
              />
              <Box
                sx={{
                  inset: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 900 }}>
                  {Math.round(percent)}%
                </Typography>
              </Box>
            </Box>
          </MuiTooltip>
        </Box>

        <Box mt={2}>
          <LinearProgress variant="determinate" value={percent} />
        </Box>
      </Card>
    );
  };

  // ---------------------------
  // KPI rows computed (filter + sort)
  // ---------------------------
  const kpiRows = useMemo(() => {
    const cardData = policyChartData?.cardData;
    if (!cardData) return [];

    const base = CARD_CONFIG.map((cfg) => {
      const value = cardData?.[cfg.key];
      const percent = clampPercent(value, cfg.target);
      const delta = showDeltaIfAvailable(cardData, cfg.key);
      return { ...cfg, value, percent, delta };
    });

    const filtered = base.filter((x) =>
      x.title.toLowerCase().includes(kpiSearch.toLowerCase().trim())
    );

    if (kpiSort === "valueDesc") {
      return [...filtered].sort(
        (a, b) => Number(b.value || 0) - Number(a.value || 0)
      );
    }
    if (kpiSort === "progressDesc") {
      return [...filtered].sort(
        (a, b) => Number(b.percent || 0) - Number(a.percent || 0)
      );
    }
    return filtered;
  }, [policyChartData?.cardData, CARD_CONFIG, kpiSearch, kpiSort, showDeltaIfAvailable]);

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <div className="w-full min-h-screen rounded-xl">
      {/* Date Filter */}
      <div className="mb-6 flex w-full justify-end items-center gap-4 pr-10">
        <Form layout="inline">
          <Form.Item
            name="dateRange"
            validateStatus={errors?.dateRange ? "error" : ""}
            help={errors?.dateRange && "This field is required"}
          >
            <Controller
              name="dateRange"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <RangePicker
                  {...field}
                  className="p-4"
                  format="YYYY-MM-DD"
                  value={field.value}
                  onChange={(dates) => {
                    field.onChange(dates);

                    if (dates && dates.length === 2) {
                      setLoading(true);
                      dispatch(
                        PolicyChartApi({
                          startDate: dates[0]?.format("YYYY-MM-DD"),
                          endDate: dates[1]?.format("YYYY-MM-DD"),
                        })
                      );
                      notification.success({
                        message: "Date Filter Applied",
                        description: `Data filtered from ${dates[0]?.format(
                          "YYYY-MM-DD"
                        )} to ${dates[1]?.format("YYYY-MM-DD")}`,
                      });
                    } else {
                      setLoading(true);
                      dispatch(PolicyChartApi());
                      notification.info({
                        message: "Date Filter Cleared",
                        description: "Showing all policy data.",
                      });
                    }
                  }}
                />
              )}
            />
          </Form.Item>
        </Form>
      </div>

      {/* Description */}
      <Typography variant="subtitle1" gutterBottom sx={{ px: 2 }}>
        This dashboard shows policies claimed by agents, trends by day, and distribution by companies and brokers.
      </Typography>

      {/* ✅ Professional KPI Panel (Complete) */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          p: 2,
          mx: 2,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          flexDirection={{ xs: "column", md: "row" }}
          gap={2}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              Policy Dashboard Overview
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.75 }}>
              Quick KPIs for the selected date range. Click a KPI to focus it.
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
            <TextField
              size="small"
              label="Search KPI"
              value={kpiSearch}
              onChange={(e) => setKpiSearch(e.target.value)}
            />

            <TextField
              size="small"
              select
              label="Sort"
              SelectProps={{ native: true }}
              value={kpiSort}
              onChange={(e) => setKpiSort(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="valueDesc">Value (High → Low)</option>
              <option value="progressDesc">Progress (High → Low)</option>
            </TextField>

            <MuiTooltip title="Refresh data" arrow>
              <IconButton onClick={handleRefresh}>
                <RefreshIcon />
              </IconButton>
            </MuiTooltip>

            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={handleResetFilter}
            >
              Reset
            </Button>

            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={() => {
                const rows = (policyChartData?.cardData ? CARD_CONFIG : []).map((cfg) => {
                  const val = policyChartData?.cardData?.[cfg.key];
                  const percent = clampPercent(val, cfg.target);
                  return {
                    title: cfg.title,
                    value: cfg.formatter ? cfg.formatter(val) : formatNumber(val),
                    target: cfg.formatter
                      ? cfg.formatter(cfg.target)
                      : formatNumber(cfg.target),
                    percent,
                  };
                });

                downloadCSV(rows, "kpi_summary.csv");
                notification.success({
                  message: "Exported",
                  description: "KPI summary downloaded as CSV.",
                });
              }}
            >
              Export
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "1fr 1fr",
            lg: "1fr 1fr 1fr",
            xl: "1fr 1fr 1fr 1fr 1fr",
          }}
          gap={2}
        >
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Card
                key={i}
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Skeleton variant="text" width="55%" />
                <Skeleton variant="text" width="70%" height={40} />
                <Skeleton
                  variant="rectangular"
                  height={50}
                  sx={{ borderRadius: 2, mt: 2 }}
                />
              </Card>
            ))
          ) : policyChartData?.cardData ? (
            kpiRows.length ? (
              kpiRows.map((cfg) => (
                <KpiCard
                  key={cfg.key}
                  title={cfg.title}
                  value={cfg.value}
                  target={cfg.target}
                  formatter={cfg.formatter}
                  hint={cfg.hint}
                  selected={selectedKpi === cfg.key}
                  onSelect={() => setSelectedKpi(cfg.key)}
                  delta={cfg.delta}
                />
              ))
            ) : (
              <Typography variant="body2" sx={{ opacity: 0.8, p: 1 }}>
                No KPIs match your search.
              </Typography>
            )
          ) : (
            <Typography variant="body2" sx={{ opacity: 0.8, p: 1 }}>
              No KPI data available.
            </Typography>
          )}
        </Box>

        {selectedKpi ? (
          <Box
            mt={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            flexWrap="wrap"
          >
            <Chip
              color="primary"
              label={`Focused KPI: ${
                CARD_CONFIG.find((x) => x.key === selectedKpi)?.title || selectedKpi
              }`}
            />
            <Button size="small" onClick={() => setSelectedKpi(null)}>
              Clear Focus
            </Button>
          </Box>
        ) : null}
      </Card>

      {/* Charts */}
      <div className="flex flex-wrap gap-8 justify-center items-center mt-10">
        {/* Bar Chart */}
        <div className="w-[48%] max-xl:w-full">
          <div className="overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
            <Typography
              variant="h6"
              gutterBottom
              className="text-center"
              sx={{ fontWeight: "bold", color: "#1976d2" }}
            >
              Team Performance
            </Typography>

            <ResponsiveContainer minWidth={1500} height={500}>
              <BarChart
                data={barData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis
                  dataKey="agent"
                  interval={0}
                  angle={-70}
                  textAnchor="end"
                  height={120}
                />
                <YAxis
                  allowDecimals={false}
                  label={{
                    value: "Policies",
                    angle: -90,
                    position: "insideLeft",
                    offset: -5,
                  }}
                />
                <Tooltip content={<SimpleTooltip />} />
                <Bar
                  dataKey="policies"
                  fill="#1976d2"
                  radius={[8, 8, 0, 0]}
                  barSize={50}
                  maxBarSize={80}
                  isAnimationActive={true}
                >
                  <LabelList
                    dataKey="policies"
                    position="top"
                    style={{ fill: "#1976d2", fontWeight: "bold" }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="w-[48%] max-xl:w-full">
          <div
            className="overflow-x-auto overflow-y-hidden"
            style={{ scrollbarWidth: "thin" }}
          >
            <Typography
              variant="h6"
              gutterBottom
              className="text-center"
              sx={{ fontWeight: "bold", color: "#1976d2" }}
            >
              Sales Progress Trend
            </Typography>

            <ResponsiveContainer minWidth={1500} height={500}>
              <LineChart
                data={lineData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis
                  label={{
                    value: "Policies Sold",
                    angle: -90,
                    position: "insideLeft",
                  }}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                  }}
                  formatter={(value, name) => [`${value} Policies`, `${name}`]}
                />
                <Legend verticalAlign="bottom" height={36} width={"100%"} />

                {agentNames.map((agent, index) => (
                  <Line
                    key={agent}
                    type="monotone"
                    dataKey={agent}
                    strokeWidth={2}
                    stroke={`hsl(${(index * 137.5) % 360}, 70%, 50%)`}
                    dot={{ r: 3 }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={true}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area Chart */}
        <div className="w-[48%] max-xl:w-full overflow">
          <div className="overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
            <Typography
              variant="h6"
              gutterBottom
              align="center"
              sx={{ fontWeight: "bold", color: "#1976d2" }}
            >
              Sales Distribution Over Months
            </Typography>

            <ResponsiveContainer minWidth={1500} height={500}>
              <AreaChart
                data={areaChartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  allowDecimals={false}
                  label={{
                    value: "Company",
                    angle: -90,
                    position: "insideLeft",
                    offset: 10,
                    style: {
                      textAnchor: "middle",
                      fill: "#555",
                      fontSize: 14,
                    },
                  }}
                />
                <Tooltip content={<CustomTooltip />} />

                <defs>
                  {uniqueCompanies.map((company, index) => {
                    const color = `hsl(${(index * 60) % 360}, 70%, 50%)`;
                    return (
                      <linearGradient
                        key={company}
                        id={`gradient-${index}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                      </linearGradient>
                    );
                  })}
                </defs>

                {uniqueCompanies.map((company, index) => {
                  const color = `hsl(${(index * 60) % 360}, 70%, 50%)`;
                  return (
                    <Area
                      key={company}
                      type="monotone"
                      dataKey={company}
                      stroke={color}
                      fillOpacity={1}
                      fill={`url(#gradient-${index})`}
                    />
                  );
                })}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Broker Stacked Bar */}
        <div className="w-[48%] max-xl:w-full overflow">
          <div className="overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
            <Typography
              variant="h6"
              gutterBottom
              className="text-center"
              sx={{
                fontWeight: "bold",
                color: "#1976d2",
                fontSize: "1.2rem",
                letterSpacing: 1,
                marginBottom: 2,
              }}
            >
              Broker Performance by Month
            </Typography>

            <ResponsiveContainer minWidth={1500} height={500}>
              <BarChart
                data={brokerChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid stroke="#e0e0e0" strokeDasharray="4 4" />
                <XAxis
                  dataKey="brokerName"
                  interval={0}
                  angle={-30}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  allowDecimals={false}
                  label={{
                    value: "Broker",
                    angle: -90,
                    position: "insideLeft",
                    offset: -5,
                    style: {
                      textAnchor: "middle",
                      fill: "#555",
                      fontSize: 14,
                    },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "14px",
                    color: "#333",
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />

                {uniqueMonths
                  .sort(
                    (a, b) =>
                      new Date(`1 ${a} 2020`) - new Date(`1 ${b} 2020`)
                  )
                  .map((month, index) => (
                    <Bar
                      key={month}
                      dataKey={month}
                      stackId="a"
                      fill={`hsl(${(index * 55) % 360}, 70%, 55%)`}
                      radius={[8, 8, 0, 0]}
                      barSize={30}
                    />
                  ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
