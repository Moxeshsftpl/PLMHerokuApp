module.exports = function (sequelize, DataTypes) {
    var SObjectReport = sequelize.define("SObjectReport", {
        created: {
            type: DataTypes.BOOLEAN,
            defaultValue: function () {
                return false;
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: function () {
                return false;
            }
        },
        whereClause: {
            type: DataTypes.TEXT,
            defaultValue: function () {
                return undefined;
            }
        }
    }, {
            classMethods: {
                associate: function (models) {
                    SObjectReport.belongsTo(models.SObject);

                    SObjectReport.hasMany(models.SObjectReportField, {
                        onDelete: 'CASCADE',
                        hooks: true
                    });
                }
            }
        });

    return SObjectReport;
};