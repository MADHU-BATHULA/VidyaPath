import { C } from '../../styles/theme';

export const Dot = ({ color = C.green }) => (
    <span style={{
        display: "inline-block", width: 8, height: 8,
        borderRadius: "50%", background: color,
        boxShadow: `0 0 6px ${color}`,
    }} />
);
