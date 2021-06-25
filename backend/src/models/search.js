module.exports = (sequelize, Sequelize) => {
    const Search = sequelize.define("search_result", {
        offset: {
            type: Sequelize.STRING
        },
        size: {
            type: Sequelize.STRING
        }
    });
    return Search;
}