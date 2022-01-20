import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    LogoutButton,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionsList,
    LoadContainer,
} from './styles';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightDataProps {
    amount: string;
    lastTransactionDate: string;
}

interface HighlightData {
    income: HighlightDataProps;
    outcome: HighlightDataProps;
    total: HighlightDataProps;
}

function getLastTransaction(collection: DataListProps[], type?: string|undefined): Date {
    const filteredCollection = (type) ? collection.filter(transaction => transaction.type === type) : collection;
    const lastTransactionDate = filteredCollection
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .pop();

    return new Date(lastTransactionDate!.date!);

}

function getFirstTransaction(collection: DataListProps[]): Date {
    return new Date(collection
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .shift()!
        .date!);
}

export function Dashboard() {
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
    const [isLoading, setIsLoading] = useState(true);
    const theme = useTheme();

    async function loadTransactions() {
        const dataKey = '@gofinance:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const storedTransactions = response ? JSON.parse(response) : [];
        let totalIncome = 0;
        let totalOutcome = 0;
        const formattedTransactions: DataListProps[] = storedTransactions.map((item: DataListProps) => {
            if (item.type === 'income') {
                totalIncome += Number(item.amount);
            } else {
                totalOutcome += Number(item.amount);
            }
            const amount = Number(item.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            return {
                ...item,
                title: item.title,
                amount,
                date: new Date(item.date).toLocaleDateString('pt-BR')
            }
        });
        setTransactions(formattedTransactions);

        const incomeLastTransactionDate = getLastTransaction(storedTransactions, 'income');
        const outcomeLastTransactionDate = getLastTransaction(storedTransactions, 'outcome');
        const lastTransactionDate = getLastTransaction(storedTransactions);
        const firstTransactionDate = getFirstTransaction(storedTransactions)
        const firstTransactionString = (lastTransactionDate.getMonth() === firstTransactionDate.getMonth()) ? firstTransactionDate.getDate() : `${firstTransactionDate.getDate()} de ${firstTransactionDate.toLocaleString('pt-BR', { month: 'long' })}`;

        setHighlightData({
            income: {
                amount: totalIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                lastTransactionDate: `Última transação em ${incomeLastTransactionDate.getDate()} de ${incomeLastTransactionDate.toLocaleString('pt-BR', { month: 'long' })}`
            },
            outcome: {
                amount: totalOutcome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                lastTransactionDate: `Última transação em ${outcomeLastTransactionDate.getDate()} de ${outcomeLastTransactionDate.toLocaleString('pt-BR', { month: 'long' })}`
            },
            total: {
                amount: (totalIncome - totalOutcome).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                lastTransactionDate: `${firstTransactionString} à ${lastTransactionDate.getDate()} de ${lastTransactionDate.toLocaleString('pt-BR', { month: 'long' })}`
            }
        });
        setIsLoading(false);

    }

    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));


    return (
        <Container>
            { isLoading ? 
            <LoadContainer>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </LoadContainer> : 
            <>
                <Header>
                    <UserWrapper>
                        <UserInfo>
                            <Photo source={{
                                uri: 'https://avatars.githubusercontent.com/u/1271407?v=4'
                            }} />
                            <User>
                                <UserGreeting>Olá,</UserGreeting>
                                <UserName>Érico</UserName>
                            </User>
                        </UserInfo>
                        <LogoutButton onPress={() => { }}>
                            <Icon name="power" />
                        </LogoutButton>
                    </UserWrapper>
                </Header>
                <HighlightCards>
                    <HighlightCard
                        type="up"
                        title="Entradas"
                        amount={highlightData.income.amount}
                        lastTransaction={highlightData.income.lastTransactionDate}
                    />
                    <HighlightCard
                        type="down"
                        title="Saídas"
                        amount={highlightData.outcome.amount}
                        lastTransaction={highlightData.outcome.lastTransactionDate}
                    />
                    <HighlightCard
                        type="total"
                        title="Total"
                        amount={highlightData.total.amount}
                        lastTransaction={highlightData.total.lastTransactionDate}  
                    />
                </HighlightCards>

                <Transactions>
                    <Title>Listagem</Title>
                    <TransactionsList
                        data={transactions}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <TransactionCard transaction={item} />}
                    />
                </Transactions>
            </>}
        </Container>
    );
}

