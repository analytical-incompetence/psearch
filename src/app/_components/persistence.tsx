//Code From 
//https://dev.to/jorensm/how-to-keep-state-between-page-refreshes-in-react-3801#:~:text=This%20sort%20of%20thing%20is,and%20then%20came%20back%20later.
import { type Result } from "@/utils/searchTypes";
import { useEffect, useMemo, useState } from "react";

export default function usePersistState<T>(initial_value: T, id: string): [T, (new_state: T) => void] {
    // Set initial value
const _initial_value = useMemo(() => {
    const local_storage_value_str = sessionStorage.getItem('state:' + id);
    // If there is a value stored in localStorage, use that
    if(local_storage_value_str) {
        return JSON.parse(local_storage_value_str);
    } 
    // Otherwise use initial_value that was passed to the function
    return initial_value;
}, []);

const [state, setState] = useState<Result[]>(_initial_value);


useEffect(() => {
    const state_str = JSON.stringify(state); // Stringified state
    sessionStorage.setItem('state:' + id, state_str) // Set stringified state as item in localStorage
}, [state]);

return [state, setState];
}