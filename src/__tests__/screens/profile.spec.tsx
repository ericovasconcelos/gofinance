import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('Profile Screen', () => {
    it('should have a correct placeholder', () => {
        const { getByPlaceholderText } = render(<Profile />);
        const inputName = getByPlaceholderText('Nome');

        expect(inputName.props.placeholder).toBeTruthy();
    });

    it('should show correct user data', () => {
        const { getByTestId } = render(<Profile />);

        const inputName = getByTestId('input-name');
        const inputSurname = getByTestId('input-surname');

        expect(inputName.props.value).toEqual('Erico');
        expect(inputSurname.props.value).toEqual('Vasconcelos');

    })
    it('should shows if title exists', () => {
        const { getByTestId } = render(<Profile />);

        const textTitle = getByTestId('text-title');

        expect(textTitle.props.children).toContain('Profile');
    })
});