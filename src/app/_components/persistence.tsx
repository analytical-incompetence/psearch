// Code modified from https://dev.to/jorensm/how-to-keep-state-between-page-refreshes-in-react-3801

import {useEffect, useMemo, useState} from "react";

export default function useSessionStorage<T>(initialValue: T, id: string): [T, (new_state: T) => void] {
    const memoInitialValue = useMemo<T>(() => {
        const localStateString = sessionStorage.getItem('state:' + id);

        if (localStateString) {
            return JSON.parse(localStateString) as T;
        }

        return initialValue;
    }, [id, initialValue]);

    const [state, setState] = useState<T>(memoInitialValue);

    useEffect(() => {
        const stateStr = JSON.stringify(state);
        sessionStorage.setItem('state:' + id, stateStr)
    }, [id, state]);

    return [state, setState];
}