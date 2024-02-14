"use client";
import React from "react";
import Faq from "react-faq-component";

const styles = {
  // bgColor: 'white',
  //   titleTextColor: "blue",
  //   rowTitleColor: "blue",
  rowContentColor: "grey",
  // arrowColor: "red",
};

const config = {
  animate: true,
  // arrowIcon: "V",
  // tabFocus: true
  expandIcon: "+",
  collapseIcon: "-",
};

const FaqComponent = ({ data }) => {
  return (
    <div>
      <Faq data={data} styles={styles} config={config} />
    </div>
  );
};

export default FaqComponent;
