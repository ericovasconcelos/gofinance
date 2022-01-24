import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';
import {
    Container,
    Header,
    Title,
    HistoryList,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    MonthSelectText,
    Content,
    LoadContainer
} from './styles';
import { TransactionCardProps } from '../../components/TransactionCard';
import { useFocusEffect } from '@react-navigation/native';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { ActivityIndicator } from 'react-native';
import { useAuth } from '../../hooks/auth';

interface DataListProps extends TransactionCardProps {
    id: string;
}

export interface CategoryData {
    name: string;
    formattedTotal: string;
    total: number;
    color: string;
    key: string;
    percent: string;
}

export function Resume() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [categoriesList, setCategoriesList] = useState<CategoryData[]>([]);
    const theme = useTheme();
    const { user } = useAuth();

    function handleDateChange(action: 'next' | 'previous'): void {
        
        if (action === 'next') {
            setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)));
        } else {
            setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)));
        }
    }

    async function loadData() {
        setIsLoading(true);
        const currentMonth = selectedDate.getMonth();
        const dataKey = `@gofinance:transactions_user:${user.id}`;
        const response = await AsyncStorage.getItem(dataKey);
        const data = response ? JSON.parse(response) : [];
        const formattedResponse = data.filter((transaction: DataListProps) => {
            return new Date(transaction.date).getUTCMonth() === new Date(selectedDate).getUTCMonth() &&
                new Date(transaction.date).getUTCFullYear() === new Date(selectedDate).getUTCFullYear();
        });

        const totalExpenses = formattedResponse.filter((transaction: DataListProps) => transaction.type === 'outcome').reduce((acc: number, transaction: DataListProps) => acc + transaction.amount, 0);

        const totalByCategory = new Array<CategoryData>();
        categories.forEach(category => {
            const filtered = formattedResponse.filter((transaction: DataListProps) => transaction.category === category.key && transaction.type === 'outcome');
            const total = filtered.reduce((acc: number, transaction: DataListProps) => acc + transaction.amount, 0);
            const percent = `${(total / totalExpenses * 100).toFixed(1)}%`;
            if (total > 0) {
                totalByCategory.push({
                    name: category.name,
                    formattedTotal: total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                    total,
                    color: category.color,
                    key: category.key,
                    percent
                })
            };
        });

        setCategoriesList(totalByCategory);
        setIsLoading(false);
    }

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [selectedDate])
    );

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            {isLoading ?
                <LoadContainer>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                </LoadContainer>
                :
                <Content>
                    <MonthSelect>
                        <MonthSelectButton
                            onPress={() => handleDateChange('previous')}
                        >
                            <MonthSelectIcon name="chevron-left" />
                        </MonthSelectButton>
                        <MonthSelectText>{selectedDate.toLocaleString('pt-BR', { month: 'long', "year": 'numeric' })}</MonthSelectText>
                        <MonthSelectButton
                            onPress={() => handleDateChange('next')}
                        >
                            <MonthSelectIcon name="chevron-right" />
                        </MonthSelectButton>
                    </MonthSelect>

                    <VictoryPie
                        data={categoriesList}
                        colorScale={categoriesList.map(category => category.color)}
                        style={{
                            labels: {
                                fontSize: RFValue(18),
                                fontWeight: 'bold',
                                fill: theme.colors.shape,
                            }
                        }}
                        labelRadius={70}
                        x="percent"
                        y="total"
                    />

                    <HistoryList
                        style={{
                            height: RFValue(165)
                        }}
                        data={categoriesList}
                        keyExtractor={(item: CategoryData) => item.key}
                        renderItem={({ item }: { item: CategoryData }) => <HistoryCard title={item.name} amount={item.formattedTotal} color={item.color} />}
                    />
                </Content>
            }
        </Container>
    );
}