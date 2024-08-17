import React from 'react';

interface ExpenseProps {
    transactions: any;
}

const Expenses: React.FC<ExpenseProps> = ({ transactions }) => {
    const expenseTransactions = transactions.filter((tx: { category: string; }) => tx.category === 'expense');

    return (
        <div>
            <h2>Expenses</h2>
            <ul>
                {expenseTransactions.map((tx: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; amount: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; date: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                    <li key={tx.id}>
                        {tx.name} - ${tx.amount} on {tx.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Expenses;
