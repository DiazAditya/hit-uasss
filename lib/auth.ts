// Simple auth utilities for the frontend mock

export function setAuthSession(role: 'patient' | 'doctor' = 'patient') {
    // Set a cookie that expires in 1 day
    // Using generic document.cookie for client-side simplicity in this mock
    const expires = new Date()
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000))
    document.cookie = `healstream_session=${role}; expires=${expires.toUTCString()}; path=/`
}

export function clearAuthSession() {
    document.cookie = "healstream_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}
