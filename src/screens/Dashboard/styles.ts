import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { DataListProps } from '.';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    background-color: ${({ theme }) => theme.colors.primary};
    align-items: center;
`;

export const UserWrapper = styled.View`
    width: 100%;
    padding: 0 24px; /* cima-baixo = 0, esquerda-direita = 24 */
    margin-top: ${getStatusBarHeight() + RFValue(28)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;
export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
`;
export const User = styled.View`
    margin-left: 17px;
    
`;
export const UserGreeting = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape};
`;
export const UserName = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.shape};
`;

export const Icon = styled(Feather)`
    color: ${({ theme }) => theme.colors.secondary} ;
    font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: 24 },
})`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
    padding: 0 24px;
    margin-top: ${RFPercentage(12)}px;
    flex: 1;
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    margin-bottom: ${RFValue(16)}px;
`;

export const TransactionsList = styled.FlatList.attrs({
    showsVerticalScrollIndicator:false,
    contentContainerStyle: { paddingBottom: getBottomSpace() },
})`` as unknown as new () => FlatList<DataListProps>;