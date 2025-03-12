import {
  Alert,
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Select,
  Skeleton,
} from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchProducts } from "../redux/slice/productsSlice";
import axios from "axios";
import { fetchInsurancePlans } from "../redux/slice/insurancePlansSlice";
import {
  GenderRecord,
  InsuranceCalculatorFormInput,
  PaymentFrequencyRecord,
} from "../types";
import InsuranceCard from "./insurance-card";

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
    const key = "calculate";

    await messageApi.open({
      key,
      type: "loading",
      content: "กำลังคำนวณแผนประกัน...",
    });

    const apiUrl = import.meta.env.VITE_BASE_URL + "/premium-calculation";

    await axios
      .post(apiUrl, values)
      .then(async (response) => {
        if (response?.data) {
          await messageApi.open({
            key,
            type: "success",
            content: "คำนวณสำเร็จ!",
            duration: 2,
          });
          dispatch(fetchInsurancePlans());
          form.resetFields();
        }
      })
      .catch((error) => {
        messageApi.open({
          key,
          type: "error",
          content: error?.message,
          duration: 2,
        });
      });
  };

  return loading || insurancePlansLoading ? (
    <>
      <Skeleton className="mt-4 p-4" active />
    </>
  ) : (
    <div className="p-6 w-full">
      {contextHolder}
      {/* <h1 className="text-xl font-semibold mb-4">Insurance Calculator</h1> */}

      <div className="w-full flex justify-center items-center">
        <div className="bg-white p-6 shadow rounded-l-2xl w-[300px] h-[600px]">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="fullName"
              label="ชื่อ นามสกุล"
              rules={[{ required: true, message: "กรุณากรอกชื่อ นามสกุล" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="genderCd"
              label="เพศ"
              rules={[{ required: true, message: "กรุณากรอกเพศ" }]}
            >
              <Radio.Group
                block
                options={Object.entries(GenderRecord).map(([key, val]) => ({
                  value: key.toString(),
                  label: val,
                }))}
                defaultValue="Apple"
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Form.Item
              name="dob"
              label="วันเกิด"
              rules={[{ required: true, message: "กรุณากรอกวันเกิด" }]}
            >
              <DatePicker
                className="w-full"
                placeholder=""
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
              label="แผนประกัน"
              rules={[{ required: true, message: "กรุณาเลือกแผนประกัน" }]}
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
              label="เบี้ยประกันภัยต่อปี"
              rules={[
                { required: true, message: "กรุณากรอกเบี้ยประกันภัยต่อปี" },
              ]}
            >
              <Input type="number" placeholder="เบี้ยประกันภัยต่อปี" min={1} />
            </Form.Item>
            <Form.Item
              name="paymentFrequency"
              label="แผนการชำระเงิน"
              rules={[{ required: true, message: "กรุณาเลือกแผนการชำระเงิน" }]}
            >
              <Select
                className="font-bold"
                options={Object.entries(PaymentFrequencyRecord).map(
                  ([key, val]) => ({
                    value: key.toString(),
                    label: val,
                  })
                )}
              />
            </Form.Item>
            <div className="w-full flex items-center justify-center ">
              <Button className="w-full" type="primary" htmlType="submit">
                คำนวณเบี้ยประกัน
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
          <div className="p-2 bg-orange-200 h-[600px] w-[350px] rounded-r-2xl  ">
            {/* <InsuranceTable
              insurancePlans={insurancePlans}
              loading={insurancePlansLoading}
            /> */}
            <div className="h-full overflow-y-scroll flex flex-col items-center">
              {insurancePlans.map((insurancePlan) => (
                <InsuranceCard insurancePlan={insurancePlan} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsuranceCalculatorForm;
