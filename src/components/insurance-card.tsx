import { Card } from "antd";
import { InsurancePlan, PaymentFrequencyRecord } from "../types";

type Props = {
  insurancePlan: InsurancePlan;
};
const InsuranceCard = ({ insurancePlan }: Props) => {
  return (
    <div className="mt-2">
      <Card
        className="border border-amber-500 p-4 rounded-lg shadow-sm"
        variant="borderless"
        style={{ width: 300 }}
      >
        {/* Header */}
        <p className="text-xl mb-2">
          <span className="font-bold">แผนประกัน: </span>
          {insurancePlan.planCode}
        </p>
        <p className="mb-2">
          <span className="font-bold">ชื่อผู้เอาประกัน: </span>
          {insurancePlan.fullName}
        </p>

        <div className="border-t border-gray-300 my-4"></div>

        <p className="text-base font-medium mb-2">รายระเอียดความคุ้มครอง</p>
        <p className="mb-1">
          <span className="font-bold">จำนวนเงินคุ้มครอง: </span>
          {insurancePlan.baseSumAssured.toLocaleString()} บาท
        </p>
        <p className="mb-1">
          <span className="font-bold">เบี้ยประกันพื้นฐาน: </span>
          {insurancePlan.baseAnnualPremium.toLocaleString()} บาท/ปี
        </p>
        <p className="mb-1">
          <span className="font-bold">เบี้ยประกัน (Modal): </span>
          {insurancePlan.modalPremium.toLocaleString()} บาท
        </p>
        <p className="mb-1">
          <span className="font-bold">ระยะเวลาผลิตภัณฑ์: </span>
          {insurancePlan.productTerm} ปี
        </p>
        <p className="mb-1">
          <span className="font-bold">ระยะเวลาชำระเบี้ย: </span>
          {insurancePlan.premiumPayingTerm} ปี
        </p>
        <p className="mb-1">
          <span className="font-bold">ความถี่การชำระ: </span>
          {PaymentFrequencyRecord[insurancePlan.paymentFrequencyCd]}
        </p>
      </Card>
    </div>
  );
};

export default InsuranceCard;
