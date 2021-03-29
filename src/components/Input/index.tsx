import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { TextInputProps } from 'react-native';
import { Container, TextInput, Icon } from './styles';
import { useField } from '@unform/core'
interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface InputValueReference {
    value: string;
}

interface InputRef {
    focus(): void
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ name, icon, ...rest }, ref,) => {

    const inputElementRef = useRef<any>(null);
    const { registerField, defaultValue, fieldName, error } = useField(name);
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue })

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, [])

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!inputValueRef.current.value);
    }, [])

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value: string) {
                inputValueRef.current.value = value;
                inputElementRef.current.setNativePros({ text: value })
            },
            clearValue() {
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            }
        });
    }, [])

    useImperativeHandle(ref, () => ({
        focus() {
            inputElementRef.current.focus()
        }
    }))

    return (
        <Container isFocused={isFocused}>
            <Icon name={icon} size={20} color={isFocused || isFilled ? '#ff9000' : '#666360'} />
            <TextInput
                ref={inputElementRef}
                defaultValue={defaultValue}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={(value) => {
                    inputValueRef.current.value = value
                }}
                placeholderTextColor="#666360" {...rest} />
        </Container>
    );
};

export default forwardRef(Input);