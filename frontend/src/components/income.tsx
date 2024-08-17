import React from 'react';

interface IncomeProps {
    transactions: any;
}

const Income: React.FC<IncomeProps> = ({ transactions }) => {
    const incomeTransactions = transactions.filter((tx: { category: string; }) => tx.category === 'income');

    return (
        <div>
            <h2>Income</h2>
            <ul>
                {incomeTransactions.map((tx: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; amount: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; date: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                    <li key={tx.id}>
                        {tx.name} - ${tx.amount} on {tx.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Income;
