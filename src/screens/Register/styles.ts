import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const Container = styled(GestureHandlerRootView)`
    background-color: ${({ theme }) => theme.colors.background};
    flex: 1;
`;

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    height: ${RFValue(113)}px;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: ${RFValue(19)}px;
`;
export const Title = styled.Text`
    font-family : ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
`;

export const Form = styled.View`
    width: 100%;
    padding: 24px;
    justify-content: space-between;
    flex:1;
`;


export const Fields = styled.View``;


export const TransactionButtons = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 16px;
`;
