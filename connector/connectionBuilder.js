(function dsbuilder(attr) {
    var MONGODB__URL_SCHEME = "mongodb://";
    var MONGODB_SRV_URL_SCHEME = "mongodb+srv://";
    var url = attr["server"];
    if (!url.startsWith(MONGODB__URL_SCHEME) && !url.startsWith(MONGODB_SRV_URL_SCHEME)) {
        return connectionHelper.ThrowTableauException(`Connection String must be a valid mongodb url starting with ${MONGODB__URL_SCHEME} or ${MONGODB_SRV_URL_SCHEME} .`);
    }

    var urlBuilder = "jdbc:" + url;
    return [urlBuilder];
}

)

