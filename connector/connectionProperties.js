(function propertiesbuilder(attr) {
    var props = {};
    props["user"] = attr[connectionHelper.attributeUsername];
    props["password"] = attr[connectionHelper.attributePassword];
    props["authSource"] = attr["v-authDatabase"];
    props["database"] = attr[connectionHelper.attributeDatabase];
    props["dialect"] = "mongosql";

    if (attr[connectionHelper.attributeSSLMode] == "require") {
        props["ssl"] = "true";
        props["sslmode"] = "require";
    }

    return props;
})
