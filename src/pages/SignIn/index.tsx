import React, { useCallback, useRef } from 'react';
import { Image, KeyboardAvoidingView, Platform, TextInput } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const passwordInputRef = useRef<TextInput>(null)
    const navigation = useNavigation();

    const handleSign = useCallback((data: object) => {
        console.log(data)
    }, []);

    return (
        <>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }} enabled>
                <ScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps="handled">
                    <Container >
                        <Image source={logoImg} />
                        <Title>Faça seu login</Title>
                        <Form ref={formRef} onSubmit={handleSign} style={{ width: '100%' }}>
                            <Input
                                autoCorrect={false}
                                autoCapitalize="none"
                                returnKeyType="next"
                                onSubmitEditing={() => passwordInputRef.current?.focus()}
                                keyboardType="email-address"
                                name="email" icon="mail"
                                placeholder="E-mail" />

                            <Input                            
                                ref={passwordInputRef}
                                secureTextEntry
                                returnKeyType="send"
                                onSubmitEditing={() => formRef.current?.submitForm()}
                                name="password"
                                icon="lock"
                                placeholder="Senha" />
                            <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
                        </Form>
                        <ForgotPassword>
                            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <CreateAccountButton onPress={() => { navigation.navigate('SignUp') }}>
                <Icon name="log-in" size={20} color="#ff9000" />
                <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
            </CreateAccountButton>
        </>
    );
};

export default SignIn;