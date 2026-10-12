(function propertiesbuilder(attr) {
    var props = {};

    var auth = attr[connectionHelper.attributeAuthentication];
    if (auth === "auth-user-pass") {
        props["user"] = attr[connectionHelper.attributeUsername];
        props["password"] = attr[connectionHelper.attributePassword];
    }
    else if (auth === "auth-user") {
        // GSSAPI: Principal Name
        props["user"] = attr[connectionHelper.attributeUsername];
    }
    else if (auth === "auth-none") {
        // X509: no user, possible password if PEM is provided
        if (attr[connectionHelper.attributePassword]) {
            props["password"] = attr[connectionHelper.attributePassword];
        }
    }

    props["database"] = attr[connectionHelper.attributeDatabase];
    props["dialect"] = "mongosql";
    props["clientInfo"] = "tableau-connector+0.0.0";

    return props;
})
