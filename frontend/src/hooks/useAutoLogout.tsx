import { useEffect, useRef, useState } from "react";
import { useIdleTimer } from "react-idle-timer";

const useAutoLogout = (timeoutDuration: number, onLogout: () => void) => {
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);

    const handleOnIdle = () => {
        onLogout();
    };

    const handleOnAction = () => {
        setOpen(false);
    };

    const { getRemainingTime } = useIdleTimer({ timeout: timeoutDuration, onIdle: handleOnIdle, onAction: handleOnAction });

    useEffect(() => {
        setRemainingTime(getRemainingTime());

        const interval = setInterval(() => {
            setRemainingTime(getRemainingTime());
        }, 60000);

        return () => clearInterval(interval);
    }, [getRemainingTime]);

    useEffect(() => {
        if (remainingTime < 300000 && remainingTime > 0) {
            setOpen(true);
        }
    }, [remainingTime]);

    return { open, remainingTime, setOpen };
};

export default useAutoLogout;
