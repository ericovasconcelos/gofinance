import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react';

import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { CLIENT_ID } = process.env;
const { RESPONSE_URI } = process.env;


interface AuthProviderProps {
    children: React.ReactNode;
}

export interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData {
    user: User;
    signOut(): void;
    signInWithGoogle(): Promise<void>;
    signInWithApple(): Promise<void>;
}

interface AuthorizationResponse {
    params: {
        access_token: string;
    },
    type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const [userStorageLoading, setUserStorageLoading] = useState(true);
    const userStorageKey = '@gofinances:user';

    async function signInWithGoogle() {
        try {
            const RESPONSE_TYPE = "token";
            const SCOPE = encodeURI("profile email");
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&redirect_uri=${RESPONSE_URI}`;

            const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

            if (type === 'success') {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userData = await response.json();
                const userLogged = ({
                    id: userData.id,
                    email: userData.email,
                    name: userData.given_name,
                    photo: userData.picture
                });
                setUser(userLogged);
                AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
            }


        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function signInWithApple() {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ]
            });

            if (credential) {
                const name = credential.fullName!.givenName!;
                const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;
                const userLogged = {
                    id: String(credential.user),
                    email: credential.email,
                    name,
                    photo
                };
                setUser(userLogged as User);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
            }

        } catch (error: any) {
            throw new Error(error);
        }
    }

    function signOut(){
        setUser({} as User);
        AsyncStorage.removeItem(userStorageKey);
    }

    useEffect(() => {
        async function loadUserStorageData(){
            const userStoraged = await AsyncStorage.getItem(userStorageKey);

            const userLogged = userStoraged ? JSON.parse(userStoraged) : {} as User;
            setUser(userLogged);

            setUserStorageLoading(false);
        }

        loadUserStorageData();
    },[]);




    return (
        <AuthContext.Provider value={{
            user,
            signOut,
            signInWithGoogle,
            signInWithApple
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthContext, AuthProvider, useAuth };