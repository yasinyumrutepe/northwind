import { Card } from "antd";
import React, { useState } from "react";

const SizeTable = () => {
  const [activeTabKey2, setActiveTabKey2] = useState<string>("app");

  const onTabChange = (key: string) => {
    setActiveTabKey2(key);
  };

  const tabListNoTitle = [
    {
      key: "kadin",
      label: "Women",
    },
    {
      key: "erkek",
      label: "Men",
    },
    {
      key: "kizcocuk",
      label: "Girls",
    },
    {
      key: "erkekcocuk",
      label: "Boys",
    },
    {
      key: "kizerkekbebek",
      label: "Baby (Girls/Boys)",
    },
    {
      key: "buyukbeden",
      label: "Plus Size",
    },
  ];

  const contentListNoTitle: Record<string, React.ReactNode> = {
    kadin: (
      <img
        src="/assets/sizetables/kadınust.webp"
        alt="Women's Size Chart"
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "auto",
          margin: "0 auto",
          display: "block",
        }}
      />
    ),
    erkek: (
      <img
        src="/assets/sizetables/erkekust.webp"
        alt="Men's Size Chart"
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "auto",
          margin: "0 auto",
          display: "block",
        }}
      />
    ),
    kizcocuk: (
      <img
        src="/assets/sizetables/kızust.webp"
        alt="Girls' Size Chart"
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "auto",
          margin: "0 auto",
          display: "block",
        }}
      />
    ),
    erkekcocuk: (
      <img
        src="/assets/sizetables/erkekcocukust.webp"
        alt="Boys' Size Chart"
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "auto",
          margin: "0 auto",
          display: "block",
        }}
      />
    ),
    kizerkekbebek: (
      <img
        src="/assets/sizetables/bebek.webp"
        alt="Baby Size Chart"
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "auto",
          margin: "0 auto",
          display: "block",
        }}
      />
    ),
    buyukbeden: (
      <img
        src="/assets/sizetables/buyukbeden.webp"
        alt="Plus Size Chart"
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "auto",
          margin: "0 auto",
          display: "block",
        }}
      />
    ),
  };

  return (
    <Card
      style={{
        width: "100%",
        marginTop: "20px",
        borderRadius: "8px",
      }}
      tabList={tabListNoTitle}
      activeTabKey={activeTabKey2}
      onTabChange={onTabChange}
      tabProps={{
        size: "middle",
        style: {
          overflowX: "auto", // Scrollable tabs for small screens
        },
      }}
    >
      {contentListNoTitle[activeTabKey2]}
    </Card>
  );
};

export default SizeTable;
