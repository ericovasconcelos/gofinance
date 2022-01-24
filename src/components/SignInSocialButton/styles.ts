import { RectButton } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';


export const Button = styled(RectButton)`
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.shape};
    flex-direction: row;
    margin-bottom: 16px;
    align-items: center;
`;

export const ImageContainer = styled.View`
    padding: 16px;
    width: ${RFValue(56)}px;
    border-right-color: ${({theme}) => theme.colors.background};
    border-right-width: 1px;
`;

export const Text = styled.Text`
    flex: 1;
    text-align: center;

    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.title};
    font-size: ${RFValue(14)}px;
`;
