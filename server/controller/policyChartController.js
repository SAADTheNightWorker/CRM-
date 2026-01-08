const { performQuery } = require("../config/db");
const tables = require("../config/tables");
const dotenv = require("dotenv");
const logger = require("../Utils/logger");
const RESPONSE = require("../GlobalResponse/RESPONSE");
dotenv.config();

const buildWhereClause = (startDate, endDate) => {
  let clause = "WHERE pr.isDeleted = 0";
  const params = [];

  if (startDate && endDate) {
    clause += " AND pr.dateOfIssue BETWEEN ? AND ?";
    params.push(startDate, endDate);
  }

  return { clause, params };
};

const getPolicyChartData = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const { clause: whereClause, params: queryParams } = buildWhereClause(
      startDate,
      endDate
    );

    const queries = {
      card: `
        SELECT 
          COUNT(*) AS totalPolicies,
          COUNT(DISTINCT pr.agnentNameId) AS totalAgents,
          COUNT(DISTINCT pr.clientId) AS totalClients,
          IFNULL(SUM(pr.creditNoteAmount), 0) AS totalCreditNotes,
          IFNULL(SUM(pr.netPolicyAmount), 0) AS netPolicyAmount
        FROM ${tables.policyRecord} AS pr
        ${whereClause}
      `,
      bar: `
        SELECT 
          a.agent AS agent,
          COUNT(*) AS policies,
          MONTHNAME(pr.dateOfIssue) AS month
        FROM ${tables.policyRecord} AS pr
        LEFT JOIN ${tables.claimWolfAgentName} AS a ON pr.agnentNameId = a.id
        ${whereClause}
        GROUP BY a.agent, MONTH(pr.dateOfIssue)
        ORDER BY policies DESC
      `,
      line: `
        SELECT 
          DAY(pr.dateOfIssue) AS day,
          a.agent AS agent,
          COUNT(*) AS policies
        FROM ${tables.policyRecord} AS pr
        LEFT JOIN ${tables.claimWolfAgentName} AS a ON pr.agnentNameId = a.id 
        ${whereClause}
        GROUP BY a.agent, DAY(pr.dateOfIssue)
        ORDER BY day ASC
      `,
      brokerBar: `
    SELECT 
  pr.scbrokerNameId AS brokerId,
  COUNT(*) AS policies,
  b.broker AS brokerName,
  MONTHNAME(pr.dateOfIssue) AS month
   FROM ${tables.policyRecord} AS pr
    LEFT JOIN ${tables.brokerName} AS b ON pr.scbrokerNameId = b.id
   ${whereClause}
    GROUP BY b.broker, MONTH(pr.dateOfIssue)
   ORDER BY policies DESC

    `,
      pie: `
        SELECT
          c.company AS company,
          COUNT(*) AS policies,
          MONTHNAME(pr.dateOfIssue) AS month
        FROM ${tables.policyRecord} AS pr
        LEFT JOIN ${tables.insuranceCompany} AS c ON pr.scIncCompanyId = c.id
        ${whereClause}
        GROUP BY c.company, MONTH(pr.dateOfIssue)
        ORDER BY policies DESC
      `,
    };

    logger.info("Executing queries...");

    const [
      cardResultRows,
      barResultRows,
      lineResultRows,
      brokerBarResult,
      pieResultData,
    ] = await Promise.all([
      performQuery(queries.card, queryParams),
      performQuery(queries.bar, queryParams),
      performQuery(queries.line, queryParams),
      performQuery(queries.brokerBar, queryParams),
      performQuery(queries.pie, queryParams),
    ]);

    const cardData =
      Array.isArray(cardResultRows) && cardResultRows.length > 0
        ? cardResultRows[0]
        : {};
    const barData = Array.isArray(barResultRows) ? barResultRows : [];
    const brokerBarData = Array.isArray(brokerBarResult) ? brokerBarResult : [];
    const lineRawData = Array.isArray(lineResultRows) ? lineResultRows : [];
    const pieData = Array.isArray(pieResultData) ? pieResultData : [];

    const result = {
      cardData,
      barData,
      lineRawData,
      brokerBarData,
      pieData,
    };

    logger.info("Policy Chart Data fetched successfully");
    return res
      .status(200)
      .json(RESPONSE(true, "Policy Chart Data fetched successfully", result));
  } catch (error) {
    logger.error(`Error fetching Policy Chart Data: ${error.message}`);
    return res
      .status(500)
      .json(
        RESPONSE(false, "Failed to fetch Policy Chart Data", error.message)
      );
  }
};

module.exports = { getPolicyChartData };

// // Helper function to pivot LineChart data
// function pivotLineChartData(data) {
//   if (!Array.isArray(data)) {
//     return [];
//   }

//   const result = {};

//   data.forEach((row) => {
//     const day = row.day;
//     if (!result[day]) {
//       result[day] = { day };
//     }
//     result[day][row.agent] = row.policies;
//   });

//   return Object.values(result);
// }

// module.exports = {
//   getPolicyChartData,
// };

// const { performQuery } = require("../config/db");
// const tables = require("../config/tables");
// const dotenv = require("dotenv");
// const logger = require("../Utils/logger");
// const RESPONSE = require("../GlobalResponse/RESPONSE");
// dotenv.config();

// const getPolicyChartData = async (req, res) => {
//   try {
//     const { filter = "all" } = req.query;

//     let whereClause = "WHERE pr.isDeleted = 0";

//     switch (filter) {
//       case "year":
//         whereClause += ` AND pr.dateOfIssue >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)`;
//         break;
//       case "month":
//         whereClause += ` AND pr.dateOfIssue >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)`;
//         break;
//       case "6days":
//         whereClause += ` AND pr.dateOfIssue >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)`;
//         break;
//       case "all":
//       default:
//         break;
//     }

//     // Card Query
//     const cardQuery = `
//       SELECT
//         COUNT(*) AS totalPolicies,
//         COUNT(DISTINCT pr.agnentNameId) AS totalAgents,
//         COUNT(DISTINCT pr.clientId) AS totalClients,
//         IFNULL(SUM(pr.creditNoteAmount), 0) AS totalCreditNotes,
//         IFNULL(SUM(pr.netPolicyAmount), 0) AS netPolicyAmount
//       FROM ${tables.policyRecord} AS pr
//       ${whereClause}
//     `;

//     // Bar Chart Query (JOIN)
//     const barChartQuery = `
//       SELECT
//         a.agent AS agent,
//         COUNT(*) AS policies,
//         MONTHNAME(pr.dateOfIssue) AS month
//       FROM ${tables.policyRecord} AS pr
//       LEFT JOIN ${tables.claimWolfAgentName} AS a ON pr.agnentNameId = a.id
//       ${whereClause}
//       GROUP BY a.agent, MONTHNAME(pr.dateOfIssue)
//       ORDER BY policies DESC
//     `;

//     // Line Chart Query (JOIN)
//     const lineChartQuery = `
//       SELECT
//         DAY(pr.dateOfIssue) AS day,
//         a.agent AS agent,
//         COUNT(*) AS policies
//       FROM ${tables.policyRecord} AS pr
//       LEFT JOIN ${tables.claimWolfAgentName} AS a ON pr.agnentNameId = a.id
//       ${whereClause}
//       GROUP BY a.agent, DAY(pr.dateOfIssue)
//       ORDER BY day ASC
//     `;

//     // Execute Queries
//     logger.info("Executing Card Query...");
//     const cardResult = await performQuery(cardQuery);
//     const cardData = cardResult[0][0];  // single object

//     logger.info("Executing Bar Chart Query...");
//     const barResult = await performQuery(barChartQuery);
//     const barData = barResult[0];       // array

//     logger.info("Executing Line Chart Query...");
//     const lineResult = await performQuery(lineChartQuery);
//     const lineRawData = lineResult[0];  // array
//     const lineData = pivotLineChartData(lineRawData);

//     const result = {
//       cardData,
//       barData,
//       lineData
//     };

//     logger.info("Policy Chart Data fetched successfully");
//     return res.status(200).json(RESPONSE(true, "Policy Chart Data fetched successfully", result));
//   } catch (error) {
//     logger.error(`Error fetching Policy Chart Data: ${error.message}`);
//     return res.status(500).json(RESPONSE(false, "Failed to fetch Policy Chart Data", error.message));
//   }
// };

// // Helper function to pivot line chart
// function pivotLineChartData(data) {
//   if (!Array.isArray(data)) {
//     return [];
//   }

//   const result = {};

//   data.forEach((row) => {
//     const day = row.day;
//     if (!result[day]) {
//       result[day] = { day };
//     }
//     result[day][row.agent] = row.policies;
//   });

//   return Object.values(result);
// }

// module.exports = {
//   getPolicyChartData,
// };
