import { Table } from "antd";
import { InsurancePlan } from "../types";

type Props = {
  insurancePlans: InsurancePlan[];
  loading: boolean;
};
const InsuranceTable = ({ insurancePlans, loading }: Props) => {
  return (
    <div className="mt-4">
      <Table
        loading={loading}
        dataSource={insurancePlans || []}
        scroll={{ x: "max-content" }}
        columns={[
          { title: "Full Name", dataIndex: "fullName" },
          { title: "Plan Code", dataIndex: "planCode" },
          { title: "Base Sum Assured", dataIndex: "baseSumAssured" },
          { title: "Base Annual Premium", dataIndex: "baseAnnualPremium" },
          { title: "Modal Premium", dataIndex: "modalPremium" },
          { title: "Product Term", dataIndex: "productTerm" },
          { title: "Premium PayingTerm", dataIndex: "premiumPayingTerm" },
          { title: "Payment Frequency Cd", dataIndex: "paymentFrequencyCd" },
        ]}
      />
    </div>
  );
};

export default InsuranceTable;
