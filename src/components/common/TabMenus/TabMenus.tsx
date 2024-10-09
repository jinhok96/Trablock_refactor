import { useState } from 'react';

import TabMenuButton from '@/components/common/TabMenus/TabMenuButton';

export type TabList<T extends string> = Array<{ tab: T; name: string }>;

interface TabMenusProps<T extends string> {
  className?: string;
  tabList: TabList<T>;
  handleChangeTab?: (tab: T) => void;
}

export default function TabMenus<T extends string>({ className, tabList, handleChangeTab }: TabMenusProps<T>) {
  const [selectedTab, setSelectedTab] = useState<T>(tabList[0].tab);

  const handleClick = (tab: T) => {
    setSelectedTab(tab);
    if (handleChangeTab) handleChangeTab(tab);
  };

  return (
    <div className={`font-title-3 flex items-start gap-4 text-gray-01 md:gap-6 ${className}`}>
      {tabList.map((item) => (
        <TabMenuButton
          key={item.tab}
          tabName={item.name}
          isSelected={selectedTab === item.tab}
          onClick={() => handleClick(item.tab)}
        />
      ))}
    </div>
  );
}
