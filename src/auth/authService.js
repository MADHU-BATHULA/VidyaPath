import { USERS } from "./users";

const KEY = "vidyapath_user";

export function login(username, password, role) {
    const user = USERS.find(
        (u) =>
            u.username === username &&
            u.password === password &&
            u.role === role
    );

    if (!user) return null;

    localStorage.setItem(KEY, JSON.stringify(user));
    return user;
}

export function logout() {
    localStorage.removeItem(KEY);
}

export function getCurrentUser() {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : null;
}
