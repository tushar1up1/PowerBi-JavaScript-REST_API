var rp = require('request-promise');
var _ = require('underscore');

function powerbiEmbedToken() {
    var scope = {};
    function powerbiOAuthToken() {
        var options = {
            method: 'POST',
            uri: 'https://login.microsoftonline.com/common/oauth2/token',
            json: true,
            form: {
                client_id: AZURE_CLIENT_ID, //ID of the application register at Azure Active Directory
                grant_type: 'password',
                resource: 'https://analysis.windows.net/powerbi/api',
                username: POWERBI_UNAME, //User account having an access to powerbi report, also same accout you have configure under RLS
                password: POWERBI_PASS, // Password for the account
                client_secret: AZURE_CLIENT_SECRET // when you register APP at AAD, you will get this option to generate Client secret, it is valid for some given time
            },
            headers:{
                'content-type' : 'application/x-www-form-urlencoded'
            }
        };

        return rp(options)
            .then(function (result) {
                scope.authToken = 'Bearer ' + result['access_token'];
                return {
                    'Authorization': 'Bearer ' + result['access_token']
                }
            })
    }


    return powerbiOAuthToken()
        .then(function (headers) {
            var options = {
                method: 'POST',
                uri: 'https://api.powerbi.com/v1.0/myorg/GenerateToken',
                headers: headers, //{'content-type' : 'application/json'},
                json: true,
                body :{
                    datasets: [
                        {
                            "id": "This would be dataset ID, you can find from powerBi desktop/dashboard"
                        }
                    ],
                    reports: [
                        {
                            "id": "This would be report id, if you have more reports you can add here"
                        }
                    ]
                }
            };

            return rp(options)
                .then(function(result){
                    return result['token']
                })
        })
}
module.exports.powerbiEmbedToken = powerbiEmbedToken;
