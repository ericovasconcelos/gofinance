import React from 'react';

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
    TransactionsList
} from './styles';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const transactions: DataListProps[] = [
        {
            id: '1',
            type: 'income',
            title: "Desenvolvimento de site",
            amount: "R$ 12.000,00",
            category: {
                name: 'Vendas',
                icon: 'dollar-sign'
            },
            date: '13/04/2020'
        },
        {
            id: '2',
            type: 'outcome',
            title: "Hamburgueria Pizzy",
            amount: "R$ 59,00",
            category: {
                name: 'Alimentação',
                icon: 'dollar-sign'
            },
            date: '10/04/2020'
        },
        {
            id: '3',
            type: 'outcome',
            title: "Aluguel do apartamento",
            amount: "R$ 1.200,00",
            category: {
                name: 'Casa',
                icon: 'dollar-sign'
            },
            date: '27/03/2020'
        }
    ];
    return (
        <Container>
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
                    <LogoutButton onPress={()=>{}}>
                        <Icon name="power" />
                    </LogoutButton>
                </UserWrapper>
            </Header>
            <HighlightCards>
                <HighlightCard
                    type="up"
                    title="Entradas"
                    amount="R$ 17.400,00"
                    lastTransaction="Última entrada dia 13 de abril"
                />
                <HighlightCard
                    type="down"
                    title="Saídas"
                    amount="R$ 1.259,00"
                    lastTransaction="Última saída dia 03 de abril"
                />
                <HighlightCard
                    type="total"
                    title="Total"
                    amount="R$ 16.141,00"
                    lastTransaction="01 à 16 de abril"
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
        </Container>
    );
}

