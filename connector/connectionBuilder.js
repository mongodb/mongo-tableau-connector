(function dsbuilder(attr) {

    var urlBuilder = "jdbc:" + attr["v-prefix"] + "://" +
        attr[connectionHelper.attributeServer] + ":" +
        attr[connectionHelper.attributePort] + "/?";
    return [urlBuilder]; })
