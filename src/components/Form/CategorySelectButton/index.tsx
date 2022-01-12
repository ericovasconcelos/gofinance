import React   from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { 
    Container,
    Category,
    Icon
} from './styles';

interface Props extends RectButtonProps {
    title: string;
}

export function CategorySelectButton({title, ...rest}: Props){
    return (
        <Container onPress={rest.onPress}>
           <Category>{title}</Category>
           <Icon name="chevron-down" />
        </Container>
    );
}