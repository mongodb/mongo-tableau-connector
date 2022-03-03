(function propertiesbuilder(attr) {
    var props = {};
    props["user"] = attr[connectionHelper.attributeUsername];
    props["password"] = attr[connectionHelper.attributePassword];
    props["database"] = attr[connectionHelper.attributeDatabase];
    props["dialect"] = "mongosql";

    return props;
})
