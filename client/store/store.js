import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./actionReducers/clientReducer.js";
import brokerReducer from "./actionReducers/brokerReducer.js";
import agentReducer from "./actionReducers/agentReducer.js";
import companyReducer from "./actionReducers/companyReducer.js";
import vendorReducer from "./actionReducers/vendorReducer.js";
import categoryReducer from "./actionReducers/categoryReducer.js";
import paymentReducer from "./actionReducers/paymentReducer.js";
import userReducer from "./actionReducers/userReducer.js";
import policyRecordReducer from "./actionReducers/policyRecordReducer.js";
import revenueRecordReducer from "./actionReducers/revenueRecordReducer.js";
import expenceRecordReducer from "./actionReducers/expenceRecordReducer.js";
import fleetManagementReducer from "./actionReducers/FleetManagemntReducer.js";
import policyChartReducer from "./actionReducers/PolicyChartReducer.js";
import notificationsReducer from "./actionReducers/notifcation.Reducer.js";

export const store = configureStore({
  reducer: {
    clients: clientReducer,
    broker: brokerReducer,
    agent: agentReducer,
    company: companyReducer,
    vendor: vendorReducer,
    category: categoryReducer,
    payment: paymentReducer,
    user: userReducer,
    policyRecord: policyRecordReducer,
    revenue: revenueRecordReducer,
    expence: expenceRecordReducer,
    fleetManagement: fleetManagementReducer,
    policyChartData: policyChartReducer,
    notifications: notificationsReducer,
  },
});
