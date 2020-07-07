// This object is used when calling powerbi.embed.
// It includes various settings and other options.
// Find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.

function powerbiApp() {
    const xhr = new XMLHttpRequest();

    powerbiEmbedToken()
        .then(function (result) {
            var REPORT_ID = '';
            var EMBED_URL = 'EMBEDED_URL';
            var EMBED_TOKEN = result;
            //Please use reference of following Powerbi.js file in your html page to get models in below line
            //script(src='https://microsoft.github.io/PowerBI-JavaScript/demo/node_modules/powerbi-client/dist/powerbi.js')
            var MODELS = window['powerbi-client'].models;
            var PERMISSIONS = models.Permissions.All;
            //you can add filter or leave it optional
            var filter1 = {
                $schema: "http://powerbi.com/product/schema#basic",
                target: {},
                operator: '',
                values: ['filter report based on this value']
            };

            var filter2 = {
                $schema: "http://powerbi.com/product/schema#basic",
                target: {},
                operator: '',
                values: ['filter report based on this value']
            };

            //construct configuration object like below
            var config = {
                type: 'report',
                tokenType: MODELS.TokenType.Embed,
                accessToken: EMBED_TOKEN,
                embedUrl: EMBED_URL,
                id: REPORT_ID,
                permissions: PERMISSIONS,
                filters:[filter1, filter2 ],
                settings: {
                    filterPaneEnabled: false,
                    navContentPaneEnabled: true
                }
            };

            var reportContainer = document.getElementsByClassName("some_div")[0];
            // this will display embeded report in div element
            var report = powerbi.embed(reportContainer, config);

        })

    function powerbiEmbedToken() {
        //we are not posting any data from client space, everything will be embeded in HTTP request from server side
        xhr.open('POST', 'URL_PATH_TO_ACCESS_SERVER_API_IN_LIB_DIRECTORY')
        xhr.setRequestHeader('content-type', 'application/json')
        return xhr.send();
    }
    
}
