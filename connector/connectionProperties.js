(function propertiesbuilder(attr) {
    var props = {};
    props["user"] = attr[connectionHelper.attributeUsername];
    props["password"] = attr[connectionHelper.attributePassword];
    props["authSource"] = attr["v-authDatabase"];
    props["database"] = attr[connectionHelper.attributeDatabase];
    props["dialect"] = "mongosql";

    props["LogDir"] = attr["v-log-directory"];
    if (attr["v-loglevel"] == "log-debug") {
        props["LogLevel"] = "DEBUG";
    } else if (attr["v-loglevel"] == "log-error") {
        props["LogLevel"] = "ERROR";
    } else {
        // default to log-info
        props["LogLevel"] = "INFO";
    }

    if (attr[connectionHelper.attributeSSLMode] == "require") {
        props["ssl"] = "true";
        props["sslmode"] = "require";
    }

    return props;
})
