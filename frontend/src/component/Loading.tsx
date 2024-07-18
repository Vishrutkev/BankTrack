// Loading.tsx

import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Loading = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: 'background.default',
                color: 'text.primary',
            }}
        >
            <CircularProgress size={60} thickness={4.5} />
            <Typography variant="h6" sx={{ mt: 2 }}>
                Loading ...
            </Typography>
        </Box>
    );
};

export default Loading;
