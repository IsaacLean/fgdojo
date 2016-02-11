// Serialize an object into a list of parameters
module.exports = {
    parameterize: function (dataObj) {
        var params = '';

        for (var key in dataObj) {
            if (params !== '') {
                params += '&';
            }

            params += (key + '=' + encodeURIComponent(dataObj[key]));
        }

        return params;
    }
};
