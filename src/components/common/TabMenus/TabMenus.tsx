import TabMenuButton from '@/components/common/TabMenus/TabMenuButton';

export type TabList<T extends string> = Array<{ tab: T; name: string }>;

interface TabMenusProps<T extends string> {
  className?: string;
  tabList: TabList<T>;
  selectedTab: T;
  handleChangeTab: (tab: T) => void;
}

export default function TabMenus<T extends string>({
  className,
  selectedTab,
  tabList,
  handleChangeTab
}: TabMenusProps<T>) {
  const handleClick = (tab: T) => {
    if (handleChangeTab) handleChangeTab(tab);
  };

  return (
    <div className={`font-title-4 md:font-title-3 flex items-start gap-5 text-gray-01 md:gap-6 ${className}`}>
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
