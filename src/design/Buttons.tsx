import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import {useTailwind} from 'tailwind-rn';

interface ButtonProps {
    buttonClasses?: string;
    onPress?: () => void;
    accessibilityLabel?: string;
    contentClasses?: string;
    content: string;
    variant: 'text' | 'contained' | 'outlined';
    color?: 'primary' | 'light' | 'dark'
}

export const Button = ({buttonClasses, onPress, accessibilityLabel, contentClasses, content, variant, color}: ButtonProps) => {
    const tailwind = useTailwind();
    const buttonComputedClasses = {
        primary: `${variant === 'contained' ? 'bg-primary-200' : 'bg-transparent'}`,
        light: `${variant === 'contained' ? 'bg-primary-100' : 'bg-transparent'}`,
        dark: `${variant === 'contained' ? 'bg-primary-300' : 'bg-transparent'}`
    }
    const buttonInitialClasses = `inline-flex items-center px-2.5 py-1.5 border border-transparent rounded ${(variant !== 'text' && color) ? buttonComputedClasses[color] : ''}`
    const contentComputedClasses = {
        primary: `${variant === 'contained' ? 'text-white' : 'text-primary-200'}`,
        light: `${variant === 'contained' ? 'text-white' : 'text-primary-100'}`,
        dark: `${variant === 'contained' ? 'text-white' : 'text-primary-300'}`
    }
    return ( 
        <Pressable style={tailwind(`${buttonInitialClasses} ${buttonClasses || ''}`)} onPress={onPress} accessibilityLabel={accessibilityLabel}>
            <Text style={tailwind(`${color ? contentComputedClasses[color] : ''} ${contentClasses || ''}`)}>{content}</Text>
        </Pressable>
    );
}