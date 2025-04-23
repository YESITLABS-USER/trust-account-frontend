import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import BankStatement from "../pages/user/bankStatement/BankStatement";
import MyProfile from "../pages/user/auth/MyProfile";
import SubscriptionPlan from "../pages/user/subscriptionPlan/SubscriptionPlan";
import ClientTrustEntry from "../pages/user/clientTrust/ClientTrustEntry";
import IndividualClientLedger from "../pages/user/individualClientLedger/IndividualClientLedger";
import NotFoundPage from "../pages/NotFoundPage";
import BankChargesLedgers from "../pages/user/bankChargesLedgers/BankChargesLedgers";
import OutstandingDeposits from "../pages/user/outstandingDeposits/OutstandingDeposits";
import OutstandingDisbursement from "../pages/user/outstandingDeposits/OutstandingDisbursement";
import Reconciliation from "../pages/user/reconciliation/Reconciliation";
import ClientLeaderSummary from "../pages/user/clientLeaderSummary/ClientLeaderSummary";
import LienManagement from "../pages/user/lienManagement/LienManagement";
import AllClients from "../pages/user/allClients/AllClients";
import TrustAccountJournal from "../pages/user/trustAccountJournal/TrustAccountJournal";
import Sidebar from "../components/header/SideBar";

const RoleBasedRoutes = () => {
  return (
    <>
    <Sidebar/>
    <Routes>
      <Route path="/bank-statement" element={
        // <BankStatement />
        <PrivateRoute allowedRoles={["user"]} element={<BankStatement />} />
      } />

      <Route path="/my-profile" element={
        // <MyProfile />
        <PrivateRoute allowedRoles={["user"]} element={<MyProfile />} />
      } />

      <Route path="/subscription-plan" element={
        // <SubscriptionPlan />
        <PrivateRoute allowedRoles={["user"]} element={<SubscriptionPlan />} />
      } />

      <Route path="/client-trust-entry" element={
        // <ClientTrustEntry />
        <PrivateRoute allowedRoles={["user"]} element={<ClientTrustEntry />} />
      } />

      <Route path="/individual-ledger" element={
        // <IndividualClientLedger />
        <PrivateRoute allowedRoles={["user"]} element={<IndividualClientLedger />} />
      } />
      <Route path="/bank-charges-ledgers" element={
        // <BankChargesLedgers />
        <PrivateRoute allowedRoles={["user"]} element={<BankChargesLedgers />} />
      } />

      <Route path="/outstanding-deposits" element={
        // <OutstandingDeposits />
        <PrivateRoute allowedRoles={["user"]} element={<OutstandingDeposits />} />
      } />

      <Route path="/outstanding-disbursement" element={
        // <OutstandingDisbursement />.
        <PrivateRoute allowedRoles={["user"]} element={<OutstandingDisbursement />} />
      } />

      <Route path="/reconciliation" element={
        // <Reconciliation />
        <PrivateRoute allowedRoles={["user"]} element={<Reconciliation />} />
      } />

      <Route path="/client-leader-summary" element={
        // <ClientLeaderSummary />
        <PrivateRoute allowedRoles={["user"]} element={<ClientLeaderSummary />} />
      } />

      <Route path="/lien-management" element={
        // <LienManagement />
        <PrivateRoute allowedRoles={["user"]} element={<LienManagement />} />
      } />
      <Route path="/trust-account-journal" element={
        // <LienManagement />
        <PrivateRoute allowedRoles={["user"]} element={<TrustAccountJournal />} />
      } />
      <Route path="/all-clients" element={
        // <LienManagement />
        <PrivateRoute allowedRoles={["user"]} element={<AllClients />} />
      } />

      <Route path="*" element={
        <NotFoundPage />
      } />

    </Routes></>
  );
};

export default RoleBasedRoutes;
