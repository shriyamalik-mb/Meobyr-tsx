
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface TabItem {
  title: string;
  path: string;
}

interface TabNavigationProps {
  tabs: TabItem[];
}

const TabNavigation = ({ tabs }: TabNavigationProps) => {
  const location = useLocation();

  return (
    <div className="px-6 pt-6">
      <div className="border-b border-brand-light">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                location.pathname === tab.path
                  ? 'border-brand-sage text-brand-sage'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;
