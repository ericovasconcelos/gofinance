import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/theme';
import { Register } from '.';

const Providers: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
);
jest.mock('expo-font');
jest.mock('expo-apple-authentication', () => {
    return {
        signInAsync: () => {
            return {
                fullName: 'success',
                givenName: 'success',
                email: 'test@test'
            }
        }
    }
})
jest.mock('@react-navigation/native', () => {
    return {
      useNavigation: jest.fn(),
    };
  });
describe('Register Screen', () => {
    it('should open category modal when user clicks on buttom', () => {
        const { getByTestId } = render(
            <Register />,
            {
                wrapper: Providers
            }
        )
    });
});