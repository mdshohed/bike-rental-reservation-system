import { useGetAllCouponQuery } from "@/redux/features/coupon/couponApi";
import { TCoupon } from "@/types/coupon";
import { ArrowRightOutlined } from "@ant-design/icons";
import { List } from "antd";
import React, { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import Swal from "sweetalert2";

type TSelectType = {
  option: string;
  couponCode: string;
};

const CouponsAndDiscounts = () => {
  const { data: coupons, isLoading } = useGetAllCouponQuery(null);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showCoupon, setShowCoupon] = useState(false);
  const [data, setCoupons] = useState<TSelectType[]>([
    { option: "10% OFF", couponCode: "SAVE10" },
  ]);


  useEffect(() => {
    if (coupons?.data && coupons) {
      console.log("data", coupons?.data);
  
      const transformCoupons = coupons?.data.reduce(
        (acc: any[], item: TCoupon) => {
          acc.push({
            option: item.percentage + "%",
            couponCode: item.couponCode,
          });
          return acc; 
        },
        []
      );
      setCoupons(transformCoupons);
    }
  }, [coupons]);
  

  // Array of coupon codes or discounts
  // const data = [
  //   { option: "10% OFF", couponCode: "SAVE10" },
  //   { option: "20% OFF", couponCode: "SAVE20" },
  //   { option: "No-Discount", couponCode: "FREESHIP" },
  //   { option: "30% OFF", couponCode: "SAVE30" },
  //   { option: "5% OFF", couponCode: "SAVE5" },
  // ];

  const handleSpinClick = async () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setShowCoupon(false);
  };
  const handleShowCouponCode = async (code: string) => {
    const res = await Swal.fire({
      title: "Congratulations!",
      html: `
        <div style="margin-top: 20px; padding: 15px; background-color: #f0fdf4; border: 1px solid #86efac; border-radius: 8px;">
          <h3 style="font-size: 18px;">You won:</h3>
          <p style="font-size: 24px; font-weight: bold;">${code}</p>
          <p>Use coupon code: <span style="font-weight: bold;">${code}</span></p>
          <button id="copyButton" style="background-color: #4ade80; color: white; border: none; padding: 5px 10px; border-radius: 5px;">Copy</button>
        </div>
      `,
      showCancelButton: false,
      showConfirmButton: false,
      didOpen: () => {
        const copyButton = Swal.getPopup()?.querySelector("#copyButton");
        copyButton?.addEventListener("click", () => {
          navigator.clipboard.writeText(code);
          Swal.fire("Copied!", "Coupon code copied to clipboard", "success");
        });
      },
    });
  };

  return (
    <>
      {/* {isLoading && <GlobalLoader></GlobalLoader>} */}
      <div className="max-w-7xl px-[5%] mx-auto my-10">
        <div className="text-center">
          <h2 className="text-xl md:text-3xl ">Coupons & Discounts</h2>
          <p className="text-lg mt-3">
            To use the coupon, apply the code at checkout on the payment page.
          </p>
        </div>
        <div className=" flex flex-col md:flex-row justify-around items-center py-5">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            backgroundColors={["#3e3e3e", "#df3428"]}
            textColors={["#ffffff"]}
            fontSize={18}
            outerBorderWidth={10}
            radiusLineWidth={3}
            innerRadius={10}
            perpendicularText
            onStopSpinning={() => {
              setMustSpin(false);
              setShowCoupon(true);
              handleShowCouponCode(data[prizeNumber].couponCode);
            }}
          />

          <div>
            <h1 className="text-lg font-medium">
              How to Apply Your Coupon Code:
            </h1>
            <List
              itemLayout="horizontal"
              dataSource={[
                { title: "Copy the Coupon Code" },
                { title: "Proceed to Checkout" },
                { title: "Enter the Coupon Code" },
                { title: "Apply the Discount Code" },
                { title: "Complete Your Booking" },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    className="text-lg font-medium"
                    avatar={<ArrowRightOutlined />}
                    title={item?.title}
                    // description={item?.example}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
        <div id="spin" className="flex justify-center items-center">
          <button
            className="mt-4 px-4 py-2  bg-gray-500 text-white rounded"
            onClick={handleSpinClick}
            disabled={mustSpin}
          >
            Spin to Get Discount Code
          </button>
        </div>
      </div>
    </>
  );
};

export default CouponsAndDiscounts;
