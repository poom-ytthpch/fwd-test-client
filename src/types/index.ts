export enum Gender {
  MALE,
  FEMALE,
}

export type Plan = {
  id?: string;
  planCode: string;
  packageName: string;
  benefit: string;
};

export type InsurancePlan = {
  id?: string;
  fullName: string;
  planCode: string;
  baseSumAssured: number;
  baseAnnualPremium: number;
  modalPremium: number;
  productTerm: number;
  premiumPayingTerm: number;
  paymentFrequencyCd: PaymentFrequencyType;
  createdAt: Date;
  updatedAt: Date;
};

export type PremiumCalculationRequest = {
  genderCd: Gender;
  dob: string;
  planCode: string;
  premiumPerYear: number;
  paymentFrequency: PaymentFrequencyType;
};

export type PremiumCalculationResponse = {
  insurancePlan?: InsurancePlan;
  status: number;
  message: string;
};

export type getProductsResponse = {
  plans?: Plan[];
  status: number;
  message: string;
};

export type InsuranceCalculatorFormInput = {
  fullName: string;
  genderCd: string;
  planCode: string;
  premiumPerYear: string;
  paymentFrequency: string;
};

export type GenderType = "MALE" | "FEMALE";

export const GenderRecord: Record<GenderType, string> = {
  MALE: "ชาย",
  FEMALE: "หญิง",
};

export type PaymentFrequencyType = "YEARLY" | "HALFYEARLY" | "QUARTERLY" | "MONTHLY";

export const PaymentFrequencyRecord: Record<PaymentFrequencyType, string> = {
  YEARLY: "รายปี",
  HALFYEARLY: "ราย 6 เดือน",
  QUARTERLY: "ราย 3 เดือน",
  MONTHLY: "รายเดือน",
};