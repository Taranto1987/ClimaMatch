export const startLogin = () => { window.location.href = `/api/auth/login?redirect=${encodeURIComponent(window.location.href)}`; };
