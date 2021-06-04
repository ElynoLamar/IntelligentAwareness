var express = require('express');
var router = express.Router();
var mCommunity = require("../models/communityModel");

router.get('/:communityID', async function(req, res, next) {

    let communityID = req.params.communityID;
    let targets = await mCommunity.getCommunityTargets(communityID);
    res.send(targets);
});

module.exports = router;