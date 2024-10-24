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
        style={{ width: "100%", maxWidth: "600px" }}
      />
    ),
    erkek: (
      <img
        src="/assets/sizetables/erkekust.webp"
        alt="Men's Size Chart"
        style={{ width: "100%", maxWidth: "600px" }}
      />
    ),
    kizcocuk: (
      <img
        src="/assets/sizetables/kızust.webp"
        alt="Girls' Size Chart"
        style={{ width: "100%", maxWidth: "600px" }}
      />
    ),
    erkekcocuk: (
      <img
        src="/assets/sizetables/erkekcocukust.webp"
        alt="Boys' Size Chart"
        style={{ width: "100%", maxWidth: "600px" }}
      />
    ),
    kizerkekbebek: (
      <img
        src="/assets/sizetables/bebek.webp"
        alt="Baby Size Chart"
        style={{ width: "100%", maxWidth: "600px" }}
      />
    ),
    buyukbeden: (
      <img
        src="/assets/sizetables/buyukbeden.webp"
        alt="Plus Size Chart"
        style={{ width: "100%", maxWidth: "600px" }}
      />
    ),
  };
  
  return (
    <>
      <Card
        style={{ width: "100%" }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        onTabChange={onTabChange}
        tabProps={{
          size: "middle",
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
    </>
  );
};

export default SizeTable;
