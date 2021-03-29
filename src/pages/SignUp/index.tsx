import React, { forwardRef, useCallback, useRef } from 'react';
import { Image, KeyboardAvoidingView, Platform, TextInput } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { Container, Title, BackToSignInButton, BackToSignInButtonText } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();

    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleSignUp = useCallback((data: object) => {
        console.log(data)
    }, [])
    return (
        <>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }} enabled>
                <ScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps="handled">
                    <Container >
                        <Image source={logoImg} />
                        <Title>Crie sua conta</Title>
                        <Form ref={formRef} onSubmit={handleSignUp} style={{ width: '100%' }}>
                            <Input
                                autoCapitalize="words"
                                name="name"
                                icon="user"
                                placeholder="Nome"
                                returnKeyType="next"
                                onSubmitEditing={() => emailInputRef.current?.focus()}
                                 />
                            <Input
                                ref={emailInputRef}
                                returnKeyType="next"
                                onSubmitEditing={() => passwordInputRef.current?.focus()}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                name="email" icon="mail" placeholder="E-mail" />
                            <Input
                                ref={passwordInputRef}
                                secureTextEntry
                                name="password" icon="lock" placeholder="Senha"
                                textContentType="newPassword"
                                returnKeyType="send"
                                onSubmitEditing={() => formRef.current?.submitForm()}
                                />
                            <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <BackToSignInButton onPress={() => { navigation.goBack() }}>
                <Icon name="arrow-left" size={20} color="#fff" />
                <BackToSignInButtonText>Voltar para o login</BackToSignInButtonText>
            </BackToSignInButton>
        </>
    );
};

export default SignUp;