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
import { useAuth } from '../../hooks/auth';

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

function getLastTransaction(collection: DataListProps[], type?: string|undefined): Date|number{
    if(collection.length === 0) {
        return 0;
    }
    const filteredCollection = (type) ? collection.filter(transaction => transaction.type === type) : collection;
    if(filteredCollection.length === 0) {
        return 0;
    }
    const lastTransactionDate = filteredCollection
        .sort((b, a) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .pop();

    return (lastTransactionDate) ? new Date(lastTransactionDate.date) : new Date(); 
}

function getFirstTransaction(collection: DataListProps[]): Date|number {
    if(collection.length === 0) {
        return 0;
    }
    return new Date(collection
        .sort((b, a) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .shift()!
        .date!);
}

export function Dashboard() {
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
    const [isLoading, setIsLoading] = useState(true);
    const theme = useTheme();
    const { signOut, user } = useAuth();

    async function loadTransactions() {
        const dataKey = `@gofinance:transactions_user:${user.id}`;
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
        const firstTransactionString = (typeof lastTransactionDate == 'number' || typeof firstTransactionDate == 'number') ? 'Não há transações de todos os tipos' : (lastTransactionDate.getMonth() === firstTransactionDate.getMonth()) ? firstTransactionDate.getDate() : `${firstTransactionDate.getDate()} de ${firstTransactionDate.toLocaleString('pt-BR', { month: 'long' })}`;

        setHighlightData({
            income: {
                amount: totalIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                lastTransactionDate: 
                    (typeof incomeLastTransactionDate == 'number') 
                        ? 'Não há transações registradas' 
                        : `Última transação em ${incomeLastTransactionDate.getDate()} de ${incomeLastTransactionDate.toLocaleString('pt-BR', { month: 'long' })}`
            },
            outcome: {
                amount: totalOutcome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                lastTransactionDate: 
                    (typeof outcomeLastTransactionDate == 'number') 
                        ?  'Não há transações registradas' 
                        : `Última transação em ${outcomeLastTransactionDate.getDate()} de ${outcomeLastTransactionDate.toLocaleString('pt-BR', { month: 'long' })}`
            },
            total: {
                amount: (totalIncome - totalOutcome).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                lastTransactionDate: 
                    (typeof incomeLastTransactionDate == 'number' || typeof outcomeLastTransactionDate == 'number' || typeof lastTransactionDate== 'number') 
                        ? 'Não há transações de entrada e saída' 
                        :`${firstTransactionString} à ${lastTransactionDate.getDate()} de ${lastTransactionDate.toLocaleString('pt-BR', { month: 'long' })}`
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

    function handleLogOut() {
        signOut();
    }

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
                                uri: user.photo
                            }} />
                            <User>
                                <UserGreeting>Olá,</UserGreeting>
                                <UserName>{user.name}</UserName>
                            </User>
                        </UserInfo>
                        <LogoutButton onPress={handleLogOut}>
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

