(function propertiesbuilder(attr) {
    var props = {};
    props["user"] = attr[connectionHelper.attributeUsername];
    props["password"] = attr[connectionHelper.attributePassword];
    props["database"] = attr[connectionHelper.attributeDatabase];
    props["dialect"] = "mongosql";

    if (attr["v-log-directory"] == null) {
        props["LogDir"] = "console";
    } else {
        props["LogDir"] = attr["v-log-directory"];
    }

    props["LogLevel"] = attr["v-loglevel"];

    return props;
})
