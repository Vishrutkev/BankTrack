import React, { useEffect, useState } from 'react';
import { Transaction, TransactionsData } from '../../state/plaid/types/transaction';
import { fetchIncome } from '../../fetch/plaid/generateIncome';
import fetchTransactions from '../../fetch/plaid/generateTransactions';
import useAuth from '../../hooks/useAuth';

const GenerateTransactions = () => {
    const [transData, setTransData] = useState<Transaction[]>([]);
    const [income, setIncome] = useState<any>();
    const { user } = useAuth();

    const formatCurrency = (number: number | null | undefined, code: string | null | undefined): string => {
        if (number != null && number !== undefined) {
            return `${parseFloat(number.toFixed(2)).toLocaleString("en")} ${code ?? ''}`.trim();
        }
        return "no data";
    };

    const getTransactions = async () => {
        try {
            const token = user.token;
            //const token = sessionStorage.getItem('token')!;
            const data: TransactionsData = await fetchTransactions(token);
            setTransData(data.latest_transactions);
            console.log(JSON.stringify(data));
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    useEffect(() => {
        const incomeTransactions = transData.filter(transaction =>
            transaction.category.includes('Income') // Adjust this to match your income category or type
        );
        setIncome(incomeTransactions);
        const totalIncome = incomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

        console.log(totalIncome)
    }, [transData]);

    return (
        <div >
            <button onClick={getTransactions}>Get Transactions</button>
            <ul>
                {transData.map((transaction, index) => (
                    <li key={index}>
                        {transaction.category}: {transaction.name} - {formatCurrency(transaction.amount, 'USD')} - {transaction.date}
                    </li>
                ))}


            </ul>
            <ul>
                {income}
            </ul>

        </div>
    );
};

export default GenerateTransactions;
