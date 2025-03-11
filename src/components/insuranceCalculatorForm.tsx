import {
  Alert,
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Select,
  Skeleton,
} from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchProducts } from "../redux/slice/productsSlice";
import axios from "axios";
import InsuranceTable from "./insurance-table";
import { fetchInsurancePlans } from "../redux/slice/insurancePlansSlice";

type InsuranceCalculatorFormInput = {
  fullName: string;
  genderCd: string;
  planCode: string;
  premiumPerYear: string;
  paymentFrequency: string;
};

const InsuranceCalculatorForm = () => {
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch<AppDispatch>();
  const { plans, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const {
    insurancePlans,
    loading: insurancePlansLoading,
    error: insurancePlansError,
  } = useSelector((state: RootState) => state.insurancePlans);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchInsurancePlans());
  }, [dispatch]);

  const onFinish = async (values: InsuranceCalculatorFormInput) => {
    await messageApi.loading("Please wait...", 2);

    const apiUrl = import.meta.env.VITE_BASE_URL + "/premium-calculation";

    await axios
      .post(apiUrl, values)
      .then(async (response) => {
        if (response?.data) {
          await messageApi.success("Calculated successfully");
          dispatch(fetchInsurancePlans());
          form.resetFields();
        }
      })
      .catch((error) => {
        messageApi.error(error?.message);
      });
  };

  return loading || insurancePlansLoading ? (
    <>
      <Skeleton className="mt-4 p-4" active />
    </>
  ) : (
    <div className=" p-6">
      {contextHolder}
      <h1 className="text-xl font-semibold mb-4">Insurance Calculator</h1>

      <div className="bg-white p-6 shadow rounded-md">
        <Form form={form} layout="vertical" onFinish={onFinish} className="">
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>
          <Form.Item
            name="genderCd"
            label="Gender"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="MALE">Male</Select.Option>
              <Select.Option value="FEMALE">Female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[{ required: true }]}
          >
            <DatePicker
              className="w-full"
              maxDate={dayjs(dayjs(), dateFormat)}
            />
          </Form.Item>

          {error && (
            <div className="mb-4">
              <Alert className="mt-4" message={error} type="error" showIcon />
            </div>
          )}
          <Form.Item
            name="planCode"
            label="Insurance Plan"
            rules={[{ required: true }]}
          >
            <Select
              options={plans.map((plan) => ({
                value: plan.planCode,
                label: `${plan.planCode} ${plan.packageName} (${plan.benefit})`,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="premiumPerYear"
            label="Premium per Year"
            rules={[{ required: true }]}
          >
            <Input type="number" placeholder="Enter premium amount" min={1} />
          </Form.Item>
          <Form.Item
            name="paymentFrequency"
            label="Payment Frequency"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="YEARLY">YEARLY</Select.Option>
              <Select.Option value="HALFYEARLY">HALFYEARLY</Select.Option>
              <Select.Option value="QUARTERLY">QUARTERLY</Select.Option>
              <Select.Option value="MONTHLY">MONTHLY</Select.Option>
            </Select>
          </Form.Item>
          <div className="w-full flex items-center justify-center">
            <Button className="" type="primary" htmlType="submit">
              Calculate
            </Button>
          </div>
        </Form>
      </div>

      {insurancePlansError ? (
        <Alert
          className="mt-4"
          message={insurancePlansError}
          type="error"
          showIcon
        />
      ) : (
        <InsuranceTable
          insurancePlans={insurancePlans}
          loading={insurancePlansLoading}
        />
      )}
    </div>
  );
};

export default InsuranceCalculatorForm;
