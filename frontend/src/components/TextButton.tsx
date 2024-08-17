import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const CustomButton = styled(Button)(({ theme }) => ({
    background: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
    borderRadius: 50,
    border: 0,
    color: theme.palette.getContrastText(theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main),
    height: 48,
    padding: '0 30px',
    boxShadow: theme.palette.mode === 'dark'
        ? '0px 4px 8px rgba(255, 255, 255, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1)'
        : '0px 4px 8px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1)',
    fontSize: '1.2rem',
    transition: 'transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        background: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.dark,
        transform: 'scale(1.05)',
        boxShadow: theme.palette.mode === 'dark'
            ? '0px 8px 12px rgba(255, 255, 255, 0.2), 0px 4px 6px rgba(0, 0, 0, 0.2)'
            : '0px 8px 12px rgba(0, 0, 0, 0.2), 0px 4px 6px rgba(0, 0, 0, 0.2)',
    },
    '&:disabled': {
        background: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400],
        color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[700],
        boxShadow: 'none',
        cursor: 'not-allowed',
    },
}));

interface CoolButtonProps {
    onClick: () => void;
    disabled: boolean;
    label: string;
}

const TextButton: React.FC<CoolButtonProps> = ({ onClick, disabled, label }) => (
    <CustomButton type="button" onClick={onClick} disabled={disabled}>
        {label}
    </CustomButton>
);

export default TextButton;
