import Layout from "@/components/layout/layout";
import TransactionsComponent from "@/components/transactions/Transactions";
import { useSelector } from "react-redux";

const Transactions = () => {
  // const userData = useSelector(({ dashboard }) => dashboard?.data);
  return (
    <Layout>
      <TransactionsComponent />
    </Layout>
  );
};
export default Transactions;
