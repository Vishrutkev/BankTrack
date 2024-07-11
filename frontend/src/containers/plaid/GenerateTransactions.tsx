import React, { useState } from 'react';
import { getTransactions as fetchTransactions } from '../../fetch/plaid/getTransactions';
import { Transaction, TransactionsData } from '../../state/plaid/types/transaction';

const GenerateTransactions = () => {
    const [transData, setTransData] = useState<Transaction[]>([]);

    const formatCurrency = (number: number | null | undefined, code: string | null | undefined): string => {
        if (number != null && number !== undefined) {
            return `${parseFloat(number.toFixed(2)).toLocaleString("en")} ${code ?? ''}`.trim();
        }
        return "no data";
    };

    const getTransactions = async () => {
        try {
            const data: TransactionsData = await fetchTransactions();
            setTransData(data.latest_transactions);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    return (
        <>
            <button onClick={getTransactions}>Get Transactions</button>
            <ul>
                {transData.map((transaction, index) => (
                    <li key={index}>
                        {transaction.name} - {formatCurrency(transaction.amount, 'USD')} - {transaction.date}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default GenerateTransactions;
