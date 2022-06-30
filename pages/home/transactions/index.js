import { getLayout } from "@/components/layout/DashboardLayout";
import TransactionsComponent from "@/components/transactions/Transactions";

const Transactions = () => {
  return <TransactionsComponent />;
};

Transactions.getLayout = getLayout;

export default Transactions;
