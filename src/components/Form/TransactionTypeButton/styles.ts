import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

interface IconType {
    type: "income" | "outcome";
}

interface ContainerProps {
    isActive: Boolean;
    type: "income" | "outcome";
}

export const Container = styled.View<ContainerProps>`
    width: 48%;
    border-width: ${({ isActive }) => isActive ? 0 : 1.5}px;
    border-style: solid;
    border-color: red; 
    border-color: ${({ theme }) => theme.colors.text};
    border-radius: ${RFValue(5)}px;
    
    background-color: ${({ theme }) => theme.colors.background};

    ${({ isActive, type }) => isActive && type === "income" && css`
        background-color: ${({ theme }) => theme.colors.success_light};
    `};

    ${({ isActive, type }) => isActive && type === 'outcome' && css`
        background-color: ${({ theme }) => theme.colors.attention_light};
    `};


`;

export const Button = styled(RectButton)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: ${RFValue(16)}px;
`;


export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(Feather) <IconType>`
    font-size: ${RFValue(24)}px;
    margin-right: 14px;
    color: ${({ theme, type }) => type === 'income' ? theme.colors.success : theme.colors.attention};
`;