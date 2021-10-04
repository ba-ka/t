export function isAuth() {
    if (localStorage.getItem('auth')) {
        return true;
    }
    return false;
}

export function logout() {
    localStorage.removeItem('auth');
    localStorage.removeItem('user_id');
}

export function getUserId() {
    return localStorage.getItem('user_id');
}