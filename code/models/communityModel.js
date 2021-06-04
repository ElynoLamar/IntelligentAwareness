var pool = require("./connection");

module.exports.getCommunityTargets = async function(communityID) {
    try {
        var query = "select name_community, Target.id_target, name_user, age_user from Community, Target, User where Community.id_community = ? and Community.id_community = Target.id_community and Target.id_target = User.id_user";
        const members = await pool.query(query, [communityID]);
        console.log(query);
        return members;
    } catch (err) {
        console.log(err);
        return err;
    }
}