import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface TransactionType {
    type: 'income' | 'outcome';
}

export const Container = styled.View`
    border-radius: 5px;    
    padding: 17px 24px;
    background-color: ${({ theme}) => theme.colors.shape};
    margin-bottom: 16px;
`;


export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;
export const Amount = styled.Text<TransactionType>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
    margin-top: ${RFValue(2)}px;
    color: ${({ type, theme }) => (type === 'outcome' ? theme.colors.attention : theme.colors.success)};

`;
export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${RFValue(20)}px;
`;
export const Category = styled.View`
    flex-direction: row;
    align-items: center;
`;
export const Icon = styled(Feather)`
    color: ${({ theme }) => theme.colors.text} ;
    font-size: ${RFValue(20)}px;
`;
export const CategoryName = styled.Text`
    color: ${({ theme }) => theme.colors.text} ;
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    margin-left: ${RFValue(17)}px;
`;
export const Date = styled.Text`
    color: ${({ theme }) => theme.colors.text} ;
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;