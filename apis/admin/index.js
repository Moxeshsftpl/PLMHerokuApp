
var express = require('express');
var adminRouter = express.Router();

adminRouter.use('/sobject',require('./sobject'));
adminRouter.use('/sobjectfield',require('./sobjectfield'));
adminRouter.use('/sobjectlayout',require('./sobjectlayout'));
adminRouter.use('/sobjectlookup',require('./sobjectlookup'));
adminRouter.use('/tab',require('./tab'));
adminRouter.use('/tabconfig', require('./tabconfig'));
adminRouter.use('/icon',require('./icon'));
adminRouter.use('/language',require('./language'));
adminRouter.use('/component',require('./component'));
adminRouter.use('/setup',require('./setup'));
adminRouter.use('/role',require('./role'));
adminRouter.use('/user',require('./user'));
adminRouter.use('/clientdashboard',require('./clientdashboard'));
adminRouter.use('/mobileconfig',require('./mobileconfig'));
adminRouter.use('/useraction',require('./useraction'));
adminRouter.use('/orgdetails',require('./orgdetails'));
adminRouter.use('/dependentpicklist',require('./dependentpicklist'));
adminRouter.use('/userconfig',require('./userconfig'));
adminRouter.use('/sobjectreport',require('./sobjectreport'));
adminRouter.use('/profile',require('./profile'));
adminRouter.use('/archival',require('./archival'));
adminRouter.use('/mobilesso',require('./mobilesso'));
adminRouter.use('/templateconfig',require('./templateconfig'));
adminRouter.use('/bulkuploadconfig',require('./bulkuploadconfig'));
module.exports = adminRouter;