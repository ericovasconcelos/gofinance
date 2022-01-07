import React from 'react';
import {
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date
} from './styles';

interface Category {
    name: string;
    icon: string;
}

export interface TransactionCardProps { 
        type: 'income' | 'outcome';
        title: string;
        amount: string;
        category: Category;
        date: string;
}

interface Props {
    transaction: TransactionCardProps;
}

export function TransactionCard({transaction}: Props) {
    return (
        <Container>
            <Title>{transaction.title}</Title>
            <Amount
                type={transaction.type}
            >
                {transaction.type === 'outcome' && '- '}
                {transaction.amount}
                </Amount>

            <Footer>
                <Category>
                    <Icon name={transaction.category.icon} />
                    <CategoryName>{transaction.category.name}</CategoryName>
                </Category>
                <Date>{transaction.date}</Date>
            </Footer>
        </Container>
    );
}