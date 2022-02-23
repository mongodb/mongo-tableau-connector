(function dsbuilder(attr) {
    var urlBuilder = "jdbc:mongodb://" + attr[connectionHelper.attributeServer] + ":" + attr[connectionHelper.attributePort] + "/admin?";

    return [urlBuilder];
})
