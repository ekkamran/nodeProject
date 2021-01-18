module.exports = {
    recaptcha: {
        client_key: process.env.RECAPTCHA_CLIENT_KEY,
        secret_key: process.env.RECAPTCHA_SECRET_KEY,
        options: { hl:'fa' }
    },
    
    google: {
        client_key: process.env.GOOGLE_KLIENT_KEY,
        secret_key: process.env.GOOGLE_SECRET_KEY,
        callback_url: process.env.GOOGLE_CALLBACK_URL
    }
}