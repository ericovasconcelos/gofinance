import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgProps } from 'react-native-svg';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { Button } from '../../components/Form/Button';
import { SignInSocialButton } from '../../components/SignInSocialButton';

import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';


import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  SignInWrapper
} from './styles';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithApple, signInWithGoogle, user } = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google")
    } finally {
      
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      await signInWithApple();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google")
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <SignInWrapper>
          <SignInSocialButton title={'Entrar com Google'}
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle} />
         
          {
            Platform.OS === 'ios' &&
            <SignInSocialButton title={'Entrar com Apple'}
            svg={AppleSvg}
            onPress={handleSignInWithApple} />}

        </SignInWrapper>

        {isLoading && <ActivityIndicator
          size="large"
          color={theme.colors.shape}
          style={{
            marginTop: RFValue(20)
          }} />}
      </Footer>

    </Container>
  );
}

