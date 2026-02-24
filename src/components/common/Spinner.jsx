import { C } from '../../styles/theme';

export const Spinner = () => (
    <span style={{
        display: "inline-block", width: 16, height: 16,
        border: `2px solid ${C.border}`, borderTopColor: C.accent,
        borderRadius: "50%", animation: "spin 0.7s linear infinite"
    }} />
);
