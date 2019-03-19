module.exports = {
    database: {
        url: 'mongodb://username:password@ds259154.mlab.com:59154/projectname'
    },
    session: {
        secret: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
        facebook: {
            app_id: "1381xxx13669366",
            app_secret: "aa73f6c2bxxxxxxx08ba1032e09c859",
            callback_url: "http://localhost:3000/auth/facebook/callback"
        },
        twitter: {
            consumerKey: "nmbk1uqKB0rbWjBxrPv9iksEf",
            consumerSecret: "QeBlJHanPy232ZbOhyPisfI8hLLUVMujXjuI7Sz0Ym4o6m7eGF",
            callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
        },
        google: {
            clientID: "591307876438-4nmmm817vks785u467lo22kss40kqno2.apps.googleusercontent.com",
            clientSecret: "BagENe4LxG_PZ_qz2oFX7Aok",
            callbackURL: "http://127.0.0.1:3000/auth/google/callback"
        }
    }
}