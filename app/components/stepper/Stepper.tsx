import React from "react";

const Stepper = () => {
  const step = [
    { title: "Basic info", isComplete: false, isActive: false },
    { title: "Details", isComplete: false, isActive: false },
    { title: "Basic Tickets", isComplete: false, isActive: false },
  ];
  return (
    <section>
      <div className="w-[249px] h-[428px] flex px-7 space-x-5 items-center rounded-lg border-[0.5px] border-gray-500 relative">
        <p className="text-xs text-lightText absolute top-10 right-8">1/3</p>
        <div className="h-[85%] flex flex-col justify-between items-center ">
          {step.map((item, index) => (
            <div key={item.title} className="flex flex-col items-center gap-1">
              <div className="w-9 h-9 text-sm rounded-full grid place-content-center bg-gray-100">
                <p>{index + 1}</p>
              </div>
              {index <= 1 && (
                <div className="w-[2px] h-[118px] rounded-full bg-[#F8F8F8]" />
              )}
            </div>
          ))}
        </div>
        <div className="h-[83%] flex flex-col justify-between items-start">
          {step.map((item, index) => (
            <div key={item.title}>{item.title}</div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Stepper;
