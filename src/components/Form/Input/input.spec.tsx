import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { Input } from '.';
import theme from '../../../global/theme';

describe('Input Component', () => {

    it('must have specific border color when active', () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme} >
                <Input
                    testID="input-email"
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCorrect={false}
                    active={true}
                />
            </ThemeProvider>
        )
        const inputComponent = getByTestId('input-email');

        expect(inputComponent.props.style[0].borderColor).toEqual('#E83F5B');
        expect(inputComponent.props.style[0].borderWidth).toEqual(3);
    });


});