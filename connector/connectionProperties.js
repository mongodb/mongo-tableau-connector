(function propertiesbuilder(attr) {
    var props = {};
    props["user"] = attr[connectionHelper.attributeUsername];
    props["password"] = attr[connectionHelper.attributePassword];
    props["database"] = attr[connectionHelper.attributeDatabase];
    props["dialect"] = "mongosql";

    props["LogDir"] = "console";
    if (attr["v-log-directory"] != null && attr["v-log-directory"] != "") {
        props["LogDir"] = attr["v-log-directory"];
    }

    props["LogLevel"] = "OFF";
    if(attr["v-loglevel"] != null && attr["v-loglevel"] != "") {
        props["LogLevel"] = attr["v-loglevel"];
    }

    return props;
})
