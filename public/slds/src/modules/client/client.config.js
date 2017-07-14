'use strict';

client.config(function($stateProvider) {
    
    $stateProvider
        .state('client', {
            parent: 'app',
            templateUrl: 'slds/views/app.client.html',
            controller: 'ClientController',
        })
        .state('client.profile.manage', {
            templateUrl: 'slds/views/client/profile/manage.html',
            controller: 'ClientProfileManageController',
            title: 'Manage Profile'
        })
        .state('client.profile.changepassword', {
            templateUrl: 'slds/views/client/profile/changepassword.html',
            controller: 'ClientProfileChangePasswordController',
            title: 'Change Password'
        })
        .state('client.profile.other', {
            templateUrl: 'slds/views/client/profile/other.html',
            controller: 'ClientProfileOtherController',
            title: 'Other Settings'
        })
        .state('client.reports', {
            templateUrl: 'slds/views/client/report/index.html',
            controller: 'ClientReportsController',
            title: 'Reports'
        });
});