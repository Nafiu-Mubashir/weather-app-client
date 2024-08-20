// src/Notification.tsx

import React, { useEffect, useState } from 'react';

const Notification: React.FC<{ message: string }> = ({ message }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShow(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    return (
        <div className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded shadow">
            {message}
        </div>
    );
};

export default Notification;
