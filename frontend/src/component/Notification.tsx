// Notification.tsx

import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface NotificationProps {
    open: boolean;
    message: string;
    severity: 'error' | 'warning' | 'info' | 'success';
    duration?: number;
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ open, message, severity, duration = 2000, onClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
