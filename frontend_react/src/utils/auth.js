export function isAuthenticated() {
    const authToken = localStorage.getItem('token');
    try {
        if (authToken){
            const base64Url = authToken.split('.')[1];
            const session = JSON.parse(window.atob(base64Url));
            if (!session.id && !session.iat && !session.exp) return false;       
            return true;
        }
        return false;
    } catch (err) {
        console.log(err)
    }
}