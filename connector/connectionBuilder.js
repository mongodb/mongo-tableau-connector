(function dsbuilder(attr) {
    const MONGODB_URL_SCHEME = "mongodb://";
    const MONGODB_SRV_URL_SCHEME = "mongodb+srv://";
    const url = attr["server"];
    if (!url.startsWith(MONGODB_URL_SCHEME) && !url.startsWith(MONGODB_SRV_URL_SCHEME)) {
        return connectionHelper.ThrowTableauException(`Connection String must be a valid mongodb url starting with ${MONGODB_URL_SCHEME} or ${MONGODB_SRV_URL_SCHEME} .`);
    }

    let urlBuilder = "jdbc:" + url;
    return [urlBuilder];
}

)

