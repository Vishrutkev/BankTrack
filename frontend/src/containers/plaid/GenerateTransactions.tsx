import React, { useState } from 'react';
import { Transaction, TransactionsData } from '../../state/plaid/types/transaction';
import { fetchIncome } from '../../fetch/plaid/generateIncome';
import fetchTransactions from '../../fetch/plaid/generateTransactions';

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
            const token = sessionStorage.getItem('token')!;
            const data: TransactionsData = await fetchTransactions(token);
            setTransData(data.latest_transactions);
            console.log(JSON.stringify(data));
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
                        {transaction.category}: {transaction.name} - {formatCurrency(transaction.amount, 'USD')} - {transaction.date}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default GenerateTransactions;
