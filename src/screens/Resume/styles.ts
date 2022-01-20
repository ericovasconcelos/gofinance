import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { GestureHandlerRootView, BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { FlatList } from "react-native";
import { CategoryData } from ".";



interface CategoryProps {
    isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
    padding: 0px 24px;
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(113)}px;

    background-color: ${({ theme }) => theme.colors.primary};

    align-items: center;
    justify-content: flex-end;
    padding-bottom: ${RFValue(19)}px;
`;

export const Title = styled.Text`
    font-family : ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
`;

export const HistoryList =styled(FlatList).attrs({
    showsVerticalScrollIndicator: false,
})`` as unknown as new () => FlatList<CategoryData>;


export const MonthSelect = styled.View`
    width: 100%;
    flex-direction: row;
    margin-top: 24px;
    justify-content: space-between;
    align-items: center;
    
`;

export const MonthSelectButton = styled(BorderlessButton)`

`;

export const MonthSelectIcon = styled(Feather)`
    font-size: ${RFValue(24)}px;
    
`;

export const MonthSelectText = styled.Text`
    font-family : ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
`;