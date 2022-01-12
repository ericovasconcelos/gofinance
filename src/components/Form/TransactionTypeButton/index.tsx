import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import {
    Container,
    Button,
    Title,
    Icon
} from './styles';

interface Props extends RectButtonProps {
    type: "income" | "outcome";
    title: string;
    isActive: boolean;
}

const IconType = {
    income: "arrow-up-circle",
    outcome: "arrow-down-circle"
}

export function TransactionTypeButton({ type, title, isActive, ...rest }: Props) {
    return (
        <Container isActive={isActive} type={type}>
            <Button {...rest}>
                <Icon name={IconType[type]} type={type} />
                <Title>{title}</Title>
            </Button>
        </Container>
    );
}