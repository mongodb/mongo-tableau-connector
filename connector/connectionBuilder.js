(function dsbuilder(attr) {

    var urlBuilder = "jdbc:" + attr["v-protocol"] + "://" +
        attr[connectionHelper.attributeServer] + ":" +
        attr[connectionHelper.attributePort] + "/?";
    return [urlBuilder]; })
