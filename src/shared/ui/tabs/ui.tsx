import { FC, useState } from 'react';

interface TabsProps {
  tabs: string[];
  onChange?: (tab: string) => void;
}

export const Tabs: FC<TabsProps> = ({ tabs, onChange }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleClick = (tab: string) => {
    setActiveTab(tab);
    onChange?.(tab);
  };

  return (
    <div className="flex w-full justify-between border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleClick(tab)}
          className={`
            flex-1 py-2 px-[45px] text-[clamp(12px, 4vw, 18px)]  font-sans  transition whitespace-nowrap text-center
            ${activeTab === tab
            ? 'text-deepBlue border-b-2 border-deepBlue font-medium'
            : 'text-deepBlue font-light'}
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
