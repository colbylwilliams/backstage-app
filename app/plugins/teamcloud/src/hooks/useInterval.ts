// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useEffect, useRef } from 'react';

export const useInterval = (callback: () => void, delay?: number) => {

    const savedCallback = useRef(callback);

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    // eslint-disable-next-line consistent-return
    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        }
        if (delay !== undefined) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
