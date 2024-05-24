"use client";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import React from "react";

type Iprops = {
  isMobileDrawerOpen: boolean;
  totalCost: number;
  totalFees: number;
  setIsMobileDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tickets: [];
};

const MobileDrawer = ({
  isMobileDrawerOpen,
  setIsMobileDrawerOpen,
  tickets,
  totalCost,
  totalFees,
}: Iprops) => {
  return (
    <div>
      <Drawer
        open={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen((prev) => !prev)}
        direction="bottom"
        style={{ height: "100%" }}
      >
        <div className="w-[90%] mx-auto py-10">
          <h3 className="text-base font-medium text-primaryPurple">
            Order summary
          </h3>
          {tickets?.map((item: any) => (
            <div key={item.ticket_id}>
              {item.quantity > 0 && (
                <div className="flex items-center text-sm justify-between text-lightText py-4 border-b">
                  <p className="">{`${item.name} x ${item.quantity} `}</p>
                  <p className="">
                    {item.price ? `₦${item.price * item.quantity}` : "Free"}
                  </p>
                </div>
              )}
            </div>
          ))}
          <div className="">
            <div className="flex items-center font-light justify-between text-sm  py-2 ">
              <p className="">Fees</p>
              <p className="">₦{totalFees}</p>
            </div>
            <div className="flex items-center justify-between text-sm  py-6 ">
              <p className="">Total</p>
              <p className="">₦{totalCost}</p>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default MobileDrawer;
