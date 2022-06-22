import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';
import { startAsync } from 'expo-auth-session';
import { mocked } from 'jest-mock';

jest.mock('expo-auth-session');
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

jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(),
    setItem: jest.fn()
  }))


describe('Auth Hook', () => {
    beforeEach(async () => {
        fetchMock.resetMocks();
        fetchMock.enableMocks();
    })
    it('should be able to sign in with existing Google account', async () => {
        const googleMocked = mocked(startAsync as any);
        await googleMocked.mockReturnValueOnce({
            type: 'success',
            params: {
                access_token: '1234-567',
            }
        });


        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        fetchMock.mockResponse(JSON.stringify(
            {
                id: 'any_id',
                email: 'rodrigo.goncalves@rocketseat.team',
                given_name: 'Rodrigo',
                picture: 'any_photo.png'
            }
        ));
        await act(async () => {
            await result.current.signInWithGoogle();
        });

        expect(result.current.user.email)
            .toBe('rodrigo.goncalves@rocketseat.team');

    })
})
