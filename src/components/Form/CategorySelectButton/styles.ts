import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    background-color: ${({ theme }) => theme.colors.shape};
    flex-direction: row;
    border-radius: 5px;
    align-items: center;
    justify-content: space-between;
    padding: 18px 16px;
`;

export const Category = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.text};
`;