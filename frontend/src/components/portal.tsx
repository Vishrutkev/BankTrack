import React from 'react';
import Overview from './overView';
import Income from './income';
import Expenses from './expenses';

interface PortalProps {
  view: string;
  transactions: Array<{
    id: string;
    category: string;
    name: string;
    amount: number;
    date: string;
  }>;
  drawerWidth: number;
  isSmallScreen: boolean;
}

const Portal: React.FC<PortalProps> = ({ view, transactions, drawerWidth, isSmallScreen }) => {
  const renderContent = () => {
    switch (view) {
      case 'Income':
        return <Income transactions={transactions} />;
      case 'Expenses':
        return <Expenses transactions={transactions} />;
      default:
        return <Overview />;
    }
  };

  return (
    <main
      style={{
        flexGrow: 1,
        padding: '20px',
        marginLeft: isSmallScreen ? 0 : `${drawerWidth}px`,
        marginTop: '64px',
      }}
    >
      {renderContent()}
    </main>
  );
};

export default Portal;
