import hello from 'hellojs';

hello.init({
    // facebook: '305124550191948',
    facebook: '580083452481693',
    google: '317197480030-koonj7uuutmp9tprmmp2ur7jcl7n95ch.apps.googleusercontent.com'
}, {redirect_uri: '/redirect.html'});

export default(function(){
    return{
        facebook: () => {
            return new Promise(
                (resolve, reject) => {
                    hello.login('facebook', {scope: 'email'}).then(
                        auth => resolve(auth.authResponse.access_token),
                        e => reject(e)
                    )
                }
            )
        },
        google: () => {
            return new Promise(
                (resolve, reject) => {
                    hello.login('google', {scope: 'email'}).then(
                        auth => resolve(auth.authResponse.access_token),
                        e => reject(e)
                    )
                }
            )
        }
    }
})();