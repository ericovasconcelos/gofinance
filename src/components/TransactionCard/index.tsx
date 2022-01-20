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
import { categories } from '../../utils/categories';

interface Category {
    name: string;
    icon: string;
}

export interface TransactionCardProps {
    type: 'income' | 'outcome';
    title: string;
    amount: string;
    category: string;
    date: string;
}

interface Props {
    transaction: TransactionCardProps;
}

export function TransactionCard({ transaction }: Props) {
    const category = categories.find(category => category.key == transaction.category)!;
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
                    <Icon name={category.icon} />
                    <CategoryName>{category.name}</CategoryName>
                </Category>
                <Date>{transaction.date}</Date>
            </Footer>
        </Container>
    );
}