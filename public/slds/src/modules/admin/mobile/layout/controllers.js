'use strict';
admin.controller('AdminMobileLayoutsController',['$scope','$rootScope','$state',function($scope,$rootScope,$state){
    $scope.$on('$stateChangeStart',function(event,toState,toParams,fromState,fromParams,options){
        if(toState.name === 'admin.mobile.layout' && fromState !== 'admin.mobile.layout.list'){
            event.preventDefault();
            $state.go('admin.mobile.layout.list');
        }
    });
    $scope.init = function(){
        console.log('AdminMobileLayoutsController loaded!');
        $state.go('admin.mobile.layout.list');
    };
    $scope.init();
}]);
admin.controller('AdminMobileLayoutsListController',[
            '$scope','$state','mobileLayoutService','blockUI','$dialog','$timeout','$adminLookups',
    function($scope , $state , mobileLayoutService , blockUI , $dialog , $timeout , $adminLookups){
        
        // $scope.openSObjectLayoutsLookup = function(){
        //     var data = {
        //         criteria: {
        //             where: {
        //                 created: false
        //             }
        //         }
        //     };
        //     $adminLookups.sObjectLayout(data,function(sObjectLayout){
        //         console.log(sObjectLayout);
        //         $scope.sObjectLayout = sObjectLayout;
                
        //         if(!$scope.blockUI.loadLayouts.state().blocking){
        //             $scope.blockUI.loadLayouts.start('Creating '+ sObjectLayout.type +' layout for '+ sObjectLayout.SObject.label +'...');
        //             mobileLayoutService.createLayout(sObjectLayout)
        //             .success(function(response){
        //                 $scope.blockUI.loadLayouts.stop();
        //                 if(response.success){
        //                     $scope.loadLayouts();
        //                 }else{
        //                     $dialog.alert(response.message,'Error','pficon pficon-error-circle-o');
        //                 }
        //             })
        //             .error(function(response) {
        //                 $dialog.alert('Error occured while creating layout.','Error','pficon pficon-error-circle-o');
        //                 $scope.blockUI.loadLayouts.stop();
        //             });
        //         }
        //     });
        // };
        
        $scope.loadLayouts = function(){
            if(!$scope.blockUI.loadLayouts.state().blocking){
                $scope.blockUI.loadLayouts.start('Loading layouts...');
                mobileLayoutService.loadLayouts({
                    criteria: {
                        where: {
                            created: true,
                            type: 'Mobile',
                            mobileSubtype: { $or: ['MEdit', null] }
                        }
                    }
                })
                .success(function(response){
                    if(response.success){
                        $scope.layouts = response.data.layouts;
                    }else{
                        $dialog.alert(response.message,'Error','pficon pficon-error-circle-o');
                    }
                    $scope.blockUI.loadLayouts.stop();
                })
                .error(function(response){
                    $dialog.alert('Error occured while loading layouts.','Error','pficon pficon-error-circle-o');
                    $scope.blockUI.loadLayouts.stop();
                });
            }
        };
        // $scope.markAsDefault = function(layout){
           
        //     if(!(layout.type === 'Details' || layout.type === 'Edit') && !$scope.blockUI.loadLayouts.state().blocking){
        //         layout.default=!layout.default;
        //         $scope.blockUI.loadLayouts.start('Marking '+ layout.SObject.label + ' ' + layout.type +' layout as default...');
        //         mobileLayoutService.markAsDefault(layout)
        //         .success(function(response){
        //             $scope.blockUI.loadLayouts.stop();
        //             if(response.success){
        //                 $scope.loadLayouts();
        //             }else{
        //                 $dialog.alert('Error occured while marking default layout.','Error','pficon pficon-error-circle-o');
        //             }
        //         })
        //         .error(function(response){
        //             $dialog.alert('Error occured while marking default layout.','Error','pficon pficon-error-circle-o');
        //             $scope.blockUI.loadLayouts.stop();
        //         });
        //     }
        // };
        // $scope.deleteLayout = function(layout){
        //     $dialog.confirm({
        //         title: 'Confirm delete ?',
        //         yes: 'Yes, Delete', no: 'Cancel',
        //         message: 'Are you sure to delete '+ layout.type +' layout of '+ layout.SObject.label +' ?',
        //         class:'danger'
        //     },function(confirm){
        //         if(confirm){
        //             // DELETE LAYOUT
        //             $scope.blockUI.loadLayouts.start('Deleting "'+layout.SObject.label + ' ' + layout.type +'" layout...');
        //             mobileLayoutService.deleteLayout(layout)
        //                 .success(function(response){
        //                     $scope.blockUI.loadLayouts.stop();
        //                     if(response.success){
        //                         $scope.loadLayouts();
        //                     }else{
        //                         $dialog.alert(response.message,'Error','pficon pficon-error-circle-o');
        //                     }
        //                 })
        //                 .error(function (response) {
        //                     $scope.blockUI.loadLayouts.stop();
        //                     $dialog.alert('Error occured while deleting layout.','Error','pficon pficon-error-circle-o');
        //                 });
        //         }
        //     });
        // };
        $scope.changeActive = function(layout){
            // $dialog.alert('changing from ' + !layout.active + ' to ' + layout.active + '.');
            var message = (layout.active) ? 'Activating' : 'Deactivating';
            $scope.blockUI.loadLayouts.start(message +' "'+layout.SObject.label + ' ' + layout.type +'" layout...');
            mobileLayoutService.changeActive(layout)
                .success(function(response){
                    if(!response.success){
                        layout.active = !layout.active;
                    }
                    $scope.blockUI.loadLayouts.stop();
                })
                .error(function (response) {
                    $scope.blockUI.loadLayouts.stop();
                    $dialog.alert('Error occured while '+ message.toLowerCase() +' layout.','Error','pficon pficon-error-circle-o');
                });
        };
        
        $scope.search = function(layout){
            layout.tempType='List';
            $state.go('admin.mobile.layout.edit',{layout: layout});
        };
        $scope.createLayout = function (layout) {
            layout.tempType = 'Create';
            $state.go('admin.mobile.layout.create', { layout: layout });
        };
        $scope.edit = function(layout){
            layout.tempType='Edit';
            $state.go('admin.mobile.layout.edit',{layout: layout});
        };
        $scope.initBlockUiBlocks = function(){
            $scope.blockUI = {
                loadLayouts: blockUI.instances.get('loadLayouts')
            };
        };
        $scope.init = function(){
            console.log('AdminMobileLayoutsListController loaded!');
            $scope.initBlockUiBlocks();
            $scope.loadLayouts();
        };
        $scope.init();
    }
]);

admin.controller('AdminMobileLayoutsEditController',[
            '$scope','$state','$stateParams','$controller','mobileLayoutService','sobjectService','blockUI','$dialog','$timeout','$adminLookups','genericComponentService','staticComponentService','$filter',
    function($scope , $state , $stateParams , $controller , mobileLayoutService , sobjectService , blockUI , $dialog , $timeout , $adminLookups , genericComponentService , staticComponentService,$filter){
        var thisCtrl = this;
        $scope.loadSObjectFields = function(){
            if(!$scope.blockUI.sObjectFields.state().blocking && $scope.layout.SObject != null){
                $scope.blockUI.sObjectFields.start('Loading ...');
                sobjectService.loadSObjectFields($scope.layout.SObject)
                    .success(function(response){
                        if(response.success){
                            $scope.layout.SObject.fields = []; // = response.data.sObjectFields;
                            $scope.refSObjects = response.data.refSObjects;
                            response.data.sObjectFields=$filter('filter')(response.data.sObjectFields, {forMobile:true});
                            angular.forEach(response.data.sObjectFields,function(field){
                                var ControllerSObjectField = undefined;
                                if(field.controllerName && (field.type === 'picklist' || field.type === 'multipicklist')){
                                    angular.forEach(response.data.sObjectFields, function(ctrlField){
                                        if(ctrlField.name === field.controllerName){
                                            ControllerSObjectField = ctrlField;
                                        }
                                    });
                                }
                                var SObjectLayoutField = {
                                    SObjectField: field,
                                    ControllerSObjectField: ControllerSObjectField,
                                    label: field.label,
                                    type: null,
                                    hidden: false,
                                    deleted: false,
                                    recordid: field.type === 'id',
                                    SObjectLayoutId: $scope.layout.id
                                };
                                $scope.layout.SObject.fields.push(SObjectLayoutField);
                            });
                        }else{
                            $dialog.alert(response.message,'Error','pficon pficon-error-circle-o');
                        }
                        $scope.blockUI.sObjectFields.stop();
                    })
                    .error(function(response){
                        $dialog.alert('Error occured while loading sobject fields.','Error','pficon pficon-error-circle-o');
                        $scope.blockUI.sObjectFields.stop();
                    });
            }
        };
        $scope.loadChildSObjects = function(){
            if(($scope.layout.tempType === 'Edit' || $scope.layout.tempType === 'Details') && !$scope.blockUI.childSObjects.state().blocking && $scope.layout.SObject != null){
                $scope.blockUI.childSObjects.start('Loading ...');
                $scope.layout.SObject.mobile = true;
                sobjectService.loadChildSObjects($scope.layout.SObject)
                    .success(function(response){
                        if(response.success){
                            $scope.layoutRelatedLists = [];
                            angular.forEach(response.data.sObjectFields,function(sObjectField){
                                $scope.layoutRelatedLists.push({
                                    SObject: sObjectField.SObject,
                                    title: sObjectField.SObject.labelPlural,
                                    active: true,
                                    deleted: false,
                                    readonly: false
                                });
                            });
                        }else{
                            $dialog.alert(response.message,'Error','pficon pficon-error-circle-o');
                        }
                        $scope.blockUI.childSObjects.stop();
                    })
                    .error(function(response){
                        $dialog.alert('Error occured while loading sobject fields.','Error','pficon pficon-error-circle-o');
                        $scope.blockUI.childSObjects.stop();
                    });
            }
        };
        $scope.components = function () {
            if($scope.layout.tempType !== 'List' && $scope.componentsValues === undefined){
                $scope.componentsValues = [{
                            title: 'Layout Section',
                            deleted: false,
                            readonly: false,
                            active: true,
                            isComponent: false,
                            SObjectLayoutId: undefined,
                            columns: [
                                []
                            ]
                        }];
            }
            return $scope.componentsValues;
        };
        $scope.returnToList = function(){
            if($scope.showSideBar){
                $scope.backToLayoutConfig()
            }
            else{
                $state.go('admin.mobile.layout.list');  
            }
        };

        $scope.removeSectionFieldsStore = function (section) {
            section.deleted = true;
            if (section.id != undefined) {
                if ($scope.deletedSections == undefined) {
                    $scope.deletedSections = [];
                }
                $scope.deletedSections.push(section);
            }
        };
        $scope.removeRelatedListFieldsStore = function (relatedlist) {
            relatedlist.deleted = true;
            if (relatedlist.id != undefined) {
                if ($scope.deletedRelatedList == undefined) {
                    $scope.deletedRelatedList = [];
                }
                $scope.deletedRelatedList.push(relatedlist);
            }
        };
        $scope.removeAndReorder = function(items,item,index){
            item.deleted = true;
            items.splice(index,1);

            var itemIndex = 0;
            angular.forEach(items,function(i, _index){
                if(!i.deleted){
                    i.order = itemIndex;
                    itemIndex++;
                }
            });

            if(item.columns!==undefined && angular.isArray(item.columns)){
                angular.forEach(item.columns,function(fields){
                    angular.forEach(fields,function(field,fieldIndex){
                        field.deleted = true;
                    });
                });
            }
        };

        $scope.removeFieldsStoreAndReorder = function (section, items, item, index) {
            $scope.removeFieldsStore(section, item);
            item.deleted = true;
            if (item.id === undefined || item.type == "Layout-Section-Field") {
                items.splice(index, 1);
            }

            var itemIndex = 0;
            angular.forEach(items, function (i, _index) {
                if (!i.deleted) {
                    i.order = itemIndex;
                    itemIndex++;
                }
            });

            if (item.columns !== undefined && angular.isArray(item.columns)) {
                angular.forEach(item.columns, function (fields) {
                    angular.forEach(fields, function (field, fieldIndex) {
                        field.deleted = true;
                    });
                });
            }
        };

        $scope.removeFieldsStore = function (section, item) {
            item.deleted = true;
            if (section.deletedFields == undefined) {
                section.deletedFields = [];
            }
            section.deletedFields.push(item);
        };
        
        $scope.initBlockUiBlocks = function(){
            $scope.blockUI = {
                editLayout: blockUI.instances.get('editLayout'),
                sObjectFields: blockUI.instances.get('sObjectFields'),
                childSObjects: blockUI.instances.get('childSObjects'),
            };
        };
        $scope.init = function(){
            console.log('AdminMobileLayoutsEditController loaded!');
            $scope.initBlockUiBlocks();
            $scope.layout = $stateParams.layout;
            $timeout(function(){
                if($scope.layout.tempType === 'List'){
                    $scope.loadSObjectFields();
                    $scope.loadChildSObjects();
                    $scope.templateUrl = 'slds/views/admin/mobile/layout/edit.list.html';
                    $scope.controller = 'AdminMobileLayoutsEditListController';
                    angular.extend(thisCtrl, $controller($scope.controller,{ $scope: $scope}));
                }
                else{
                    $scope.templateUrl = 'slds/views/admin/mobile/layout/edit.edit.html';
                    $scope.controller = 'AdminMobileLayoutsEditEditController';
                    $scope.showSideBar = $scope.showSideBar ? $scope.showSideBar : false;
                    angular.extend(thisCtrl, $controller($scope.controller,{ $scope: $scope}));
                }
            },0);
        };
        $scope.init();
    }
]);

admin.controller('AdminMobileLayoutsEditListController',[
            '$scope','$state','$stateParams','mobileLayoutService','sobjectService','blockUI','$dialog','$timeout','$adminLookups','$adminModals',
    function($scope , $state , $stateParams , mobileLayoutService , sobjectService , blockUI , $dialog , $timeout , $adminLookups,$adminModals ){
        $scope.searchCriteriaFieldsDropCallBack = function(event, index, item, external, type, allowedType){
            if($scope.isDuplicate($scope.searchCriteriaFields,item)){
                return false;
            }
            item.type = 'Search-Criteria-Field';
            var rangeAllowedDataTypes = ['date','datetime','double','int','currency'];
            if(rangeAllowedDataTypes.indexOf(item.SObjectField.type) > -1){
                if(!angular.isDefined(item.tofield) && !angular.isDefined(item.fromfield)){
                    $dialog.confirm({
                        title: 'Allow to search range?',
                        yes: 'Yes', no: 'No',
                        message: 'Selected field is of type ' + item.SObjectField.type + '. Do you want this field to allow to search in range?\nIf you agree, it will generate to and from field for you.',
                        class:'primary'
                    },function(confirm){
                        if(confirm){
                            var itemTo = angular.copy(item);
                            if(!itemTo.toField){
                                itemTo.label = itemTo.label + ' to';
                                itemTo.tofield = true;
                                $scope.searchCriteriaFields.splice(index + 1, 0, itemTo);
                            }
                            item.fromfield = true;
                            item.label = item.label + ' from';
                        }
                    });
                }
            }
            return item;
        };    
        $scope.searchResultFieldsDropCallBack = function(event, index, item, external, type, allowedType){
            if (item.SObjectField.type !== 'reference' && $scope.isDuplicate($scope.searchResultFields, item)) {
                return false;
            }
            item.type = 'Search-Result-Field';
            return item;
        };
        $scope.isDuplicate = function(fields,item){
            var duplicate = false;
            angular.forEach(fields,function(field,index){
                if(!duplicate){
                    if(field.SObjectField.id === item.SObjectField.id && item.type === null && !field.deleted){
                        duplicate = true;
                    }
                }
            });
            return duplicate;
        };
        $scope.loadListLayoutFields = function(){
            if(!$scope.blockUI.editListLayout.state().blocking && $scope.layout.SObject != null){
                $scope.blockUI.editListLayout.start('Loading ...');
                mobileLayoutService.loadListLayoutFields($scope.layout)
                    .success(function(response){
                        if(response.success){
                            $scope.searchCriteriaFields = [];
                            $scope.searchResultFields = [];
                            $scope.searchCriteriaDeletedFields = [];
                            $scope.searchResultDeletedFields = [];
                            angular.forEach(response.data.sObjectLayoutFields,function(field){
                                if(field.type === 'Search-Criteria-Field'){
                                    $scope.searchCriteriaFields.push(field);
                                }else{
                                    $scope.searchResultFields.push(field);
                                }
                            });
                        }else{
                            $dialog.alert('Error occured while loading layout fields.','Error','pficon pficon-error-circle-o');
                        }
                        $scope.blockUI.editListLayout.stop();
                    })
                    .error(function(response){
                        $dialog.alert('Server error occured while loading layout fields.','Error','pficon pficon-error-circle-o');
                        $scope.blockUI.editListLayout.stop();
                    });
            }
        };
        $scope.openActionButtonCriteriaModal = function(actionButton){
            $adminModals.criteriaModal({
                title: 'Action Button Criteria | ' + actionButton.title,
                fields: $scope.$parent.$parent.layout.SObject.fields,
                criteria: actionButton.criteria ? actionButton.criteria : null
            },function(criteria){
                actionButton.criteria = criteria;
            });
        };
        $scope.removeFieldsAndStoreAndReorder = function (type, items, item, index) {
            $scope.removeFieldsAndStore(type, item);
            item.deleted = true;
            if (item.id === undefined || item.type == "Search-Criteria-Field" || item.type == "Search-Result-Field") {
                items.splice(index, 1);
            }

            var itemIndex = 0;
            angular.forEach(items, function (i, _index) {
                if (!i.deleted) {
                    i.order = itemIndex;
                    itemIndex++;
                }
            });

            if (item.columns !== undefined && angular.isArray(item.columns)) {
                angular.forEach(item.columns, function (fields) {
                    angular.forEach(fields, function (field, fieldIndex) {
                        field.deleted = true;
                    });
                });
            }
        }
        $scope.removeFieldsAndStore = function (type, item) {
            if (item.id !== undefined) {
                item.deleted = true;
                if (type == "CriteriaField") {
                    if ($scope.searchCriteriaDeletedFields == undefined) {
                        $scope.searchCriteriaDeletedFields = [];
                    }
                    $scope.searchCriteriaDeletedFields.push(item);
                }
                if (type == "ResultField") {
                    if ($scope.searchResultDeletedFields == undefined) {
                        $scope.searchResultDeletedFields = [];
                    }
                    $scope.searchResultDeletedFields.push(item);
                }
            }
        }
        $scope.saveLayout = function(){
            if(!$scope.blockUI.editListLayout.state().blocking  && $scope.layout.SObject != null){
                var duplicate = false;
                angular.forEach($scope.searchResultFields, function (field, index) {
                    if (field.SObjectField.type === 'reference' && !field.deleted) {
                        angular.forEach($scope.searchResultFields, function (_field, _index) {
                            if (_field.SObjectField.type === 'reference' && !_field.deleted) {
                                if (!duplicate) {
                                    if (_field.reference && field.reference && _index !== index && _field.SObjectField.id === field.SObjectField.id && _field.reference === field.reference) {
                                        duplicate = true;
                                    }
                                    if (_field.referenceRemoved && field.referenceRemoved && _field.referenceRemoved === true && field.referenceRemoved === true && _index !== index && _field.SObjectField.id === field.SObjectField.id) {
                                        duplicate = true;
                                    }
                                }
                            }
                        });
                    }
                });
                if (duplicate === true) {
                    $dialog.alert('Duplicate field found in reference.', 'Error', 'pficon pficon-error-circle-o');
                    return;
                }
                $scope.blockUI.editListLayout.start('Saving ...');
                mobileLayoutService.saveListLayout($scope.layout.id,$scope.searchCriteriaFields,$scope.searchResultFields,$scope.actionButtonCriteria,$scope.layout.whereClause,$scope.searchCriteriaDeletedFields,$scope.searchResultDeletedFields)
                    .success(function(response){
                        $scope.blockUI.editListLayout.stop();
                        if(response.success === true){
                            $scope.loadListLayoutFields();
                        }else{
                            $dialog.alert('Error occured while saving layout.','Error','pficon pficon-error-circle-o');
                        }
                    })
                    .error(function(response){
                        $scope.blockUI.editListLayout.stop();
                        $dialog.alert('Server error occured while saving layout.','Error','pficon pficon-error-circle-o');
                    });
            }
        };
        $scope.initListLayoutBlockUiBlocks = function(){
            $scope.blockUI.editListLayout = blockUI.instances.get('editListLayout');
        };
        $scope.loadActionButtonCriteria = function(){
            $scope.actionButtonCriteria=[];
            $scope.editActionButton={
                title : 'Edit',
                keyName : 'Edit'
            };
            $scope.actionButtonCriteria.push($scope.editActionButton);
            $scope.detailActionButton={
                title : 'Details',
                keyName : 'Details'
            };
            $scope.actionButtonCriteria.push($scope.detailActionButton);

            angular.forEach($scope.layout.btnCriteria,function(btnCriteria){
                if(btnCriteria.keyName==="Edit"){
                    $scope.editActionButton.criteria=btnCriteria.criteria;
                }
                else if(btnCriteria.keyName==="Details"){
                    $scope.detailActionButton.criteria=btnCriteria.criteria;
                }
            });
        };
        $scope.init = function(){
            console.log('AdminMobileLayoutsEditListController loaded!');
            $scope.initListLayoutBlockUiBlocks();
            $scope.loadListLayoutFields();
            $scope.loadActionButtonCriteria();
        };
        $scope.init();
    }
]);

admin.controller('AdminMobileLayoutsEditEditController',[
            '$scope','$state','$stateParams','mobileLayoutService','sobjectService','blockUI','$dialog','$timeout','$adminLookups','$adminModals',
    function($scope , $state , $stateParams , mobileLayoutService , sobjectService , blockUI , $dialog , $timeout , $adminLookups , $adminModals){
        $scope.loadGoverningFields = function(){
            if(!$scope.blockUI.editEditLayout.state().blocking  && $scope.layout.SObject != null){
                $scope.blockUI.editEditLayout.start('Loading governing fields...');
                mobileLayoutService.loadgoverningfields($scope.layout)
                    .success(function(response){
                        $scope.blockUI.editEditLayout.stop();
                        if(response.success){
                            $scope.governingFields = response.data.governingFields;
                            $scope.fieldAPIName = [];
                            $scope.governingFields.forEach(function(field){
                                $scope.fieldAPIName.push(field.name);
                            });
                        }
                        else{
                            $dialog.alert(response.message,'Error','pficon pficon-error-circle-o');
                        }
                        $scope.blockUI.editEditLayout.stop();
                    })
                    .error(function(){
                        $dialog.alert('Server error occured while loading governing field lists.','Error','pficon pficon-error-circle-o');
                        $scope.blockUI.editEditLayout.stop();        
                    });
            }
        };
        $scope.loadMobileEditLayoutConfig = function(){
            if(!$scope.blockUI.editMobileLayoutConfig.state().blocking  && $scope.layout.SObject != null){
                $scope.blockUI.editMobileLayoutConfig.start('Loading configured mobile layouts fields...');
                mobileLayoutService.loadmobileeditlayoutconfig($scope.layout)
                    .success(function(response){
                        $scope.blockUI.editMobileLayoutConfig.stop();
                        if(response.success){
                            $scope.mobileEditLayoutConfigs = response.data.mobileEditLayoutConfigs;
                        }
                        else{
                            $dialog.alert(response.message,'Error','pficon pficon-error-circle-o');
                        }
                        $scope.blockUI.editMobileLayoutConfig.stop();
                    })
                    .error(function(){
                        $dialog.alert('Server error occured while loading configred layout lists.','Error','pficon pficon-error-circle-o');
                        $scope.blockUI.editMobileLayoutConfig.stop();        
                    });
            }
        };
        $scope.getDisplayText = function(govFieldValue){
            var displayValue = "";
            Object.keys(govFieldValue).sort().forEach(function(key, index){
                displayValue += govFieldValue[key];
                if(index < Object.keys(govFieldValue).length - 1)
                    displayValue += " + ";
            });
            return displayValue;
        };
        $scope.changeMobileEditLayoutConfigActive = function(mobileEditLayoutConfig){
            var message = (mobileEditLayoutConfig.active) ? 'Activating' : 'Deactivating';
            $scope.blockUI.editMobileLayoutConfig.start(message +'" configuration...');
            mobileLayoutService.changemobileeditlayoutconfigactive(mobileEditLayoutConfig)
                .success(function(response){
                    if(!response.success){
                        mobileEditLayoutConfig.active = !mobileEditLayoutConfig.active;
                    }
                    $scope.blockUI.editMobileLayoutConfig.stop();
                })
                .error(function(response){
                    $scope.blockUI.editMobileLayoutConfig.stop();
                    $dialog.alert('Server error occured while ' + message.toLowerCase() + ' configred layout lists','Error','pficon pficon-error-circle-o');
                });
        };
        $scope.editGoverningValue = function(mobileEditLayoutConfig){
            $scope.mobileEditLayoutConfig = mobileEditLayoutConfig;
        };
        $scope.deleteMobileEditLayoutConfig = function(mobileEditLayoutConfig){
            $dialog.confirm({
                title: 'Confirm delete ?',
                yes: 'Yes, Delete', no: 'Cancel',
                message: 'All information related configuration for layout for this combination will be deleted. \nAre you sure ?',
                class: 'danger'
            },function (confirm){
                if (confirm) {
                    if (!$scope.blockUI.editMobileLayoutConfig.state().blocking) {
                        $scope.blockUI.editMobileLayoutConfig.start('Deleting User Action...');
                        mobileLayoutService.deletemobileeditlayoutconfig({ id: mobileEditLayoutConfig.id })
                            .success(function(response){
                                if (response.success) {
                                    $dialog.alert("Mobile layout configuration Deleted successfully", '', '');
                                } else {
                                    $dialog.alert(response.message, 'Error', 'pficon pficon-error-circle-o');
                                }
                                $scope.blockUI.editMobileLayoutConfig.stop();
                                $scope.loadMobileEditLayoutConfig();
                            })
                            .error(function(response){
                                $dialog.alert('Error occured while deleting configuration.', 'Error', 'pficon pficon-error-circle-o');
                                $scope.blockUI.editMobileLayoutConfig.stop();
                            });
                    }
                }
            });
        };
        $scope.cancelMobileEditLayoutConfig = function(){
            $scope.mobileEditLayoutConfig = {};
            $scope.mobileEditLayoutConfig.governingFieldValue = {};
        };
        $scope.saveMobileEditLayoutConfig = function(){
            if(Object.keys($scope.mobileEditLayoutConfig.governingFieldValue).length < $scope.governingFields.length){
                $dialog.alert('Value for all the governing fields is mandatory.', 'Error', 'pficon pficon-error-circle-o');
                return;
            }
            var newGoverningFieldValue = {};
            var fieldAPIName = [];
            $scope.fieldAPIName.sort().forEach(function(field){
                newGoverningFieldValue[field] = $scope.mobileEditLayoutConfig.governingFieldValue[field];
            });
            delete $scope.mobileEditLayoutConfig.governingFieldValue; 
            $scope.mobileEditLayoutConfig.governingFieldValue = angular.copy(newGoverningFieldValue);
            $scope.mobileEditLayoutConfig.SObjectLayoutId = $scope.layout.id;
            mobileLayoutService.savemobileeditlayoutconfig($scope.mobileEditLayoutConfig)
                .success(function(response){
                    if (response.success) {
                        $scope.cancelMobileEditLayoutConfig();
                        $scope.loadMobileEditLayoutConfig();
                    } else {
                        $scope.loadMobileEditLayoutConfig();
                        $dialog.alert(response.message, 'Error', 'pficon pficon-error-circle-o');
                    }
                    $scope.blockUI.editMobileLayoutConfig.stop();
                })
                .error(function(){
                    $dialog.alert('Error occured while saving configuration.', 'Error', 'pficon pficon-error-circle-o');
                    $scope.blockUI.editMobileLayoutConfig.stop();
                });
        };
        $scope.isLayoutValidOrNot = function(mobileEditLayoutConfig){
            var isLayoutInvalid = false;
            if(Object.keys(mobileEditLayoutConfig.governingFieldValue).length < $scope.governingFields.length){
                isLayoutInvalid = true;
            }
            else if(Object.keys(mobileEditLayoutConfig.governingFieldValue).length > $scope.governingFields.length){
                isLayoutInvalid = true;
            }
            else{
                Object.keys(mobileEditLayoutConfig.governingFieldValue).sort().forEach(function(key){
                    isLayoutInvalid = $scope.governingFields.filter(function(field){
                        return field.name === key;
                    }).length > 0 ? false : true; 
                });
            }
            return isLayoutInvalid;
        };
        $scope.manageLayout = function(mobileEditLayoutConfiguration){
            $scope.mobileEditLayoutConfig = mobileEditLayoutConfiguration;
            $scope.loadChildSObjects();
            $scope.showSideBar = true;
            $scope.loadEditLayoutContents();
            $scope.initEditLayoutBlockUiBlocks();
            $scope.loadSObjectFields();
        };
        $scope.openSectionPropertiesModal = function(section,index){
            $adminModals.layoutSectionProperties({
                layout: angular.copy($scope.layout),
                section: angular.copy(section)
            },function(newSection){
                $scope.layoutSections[index] = newSection;
            });
        };
        $scope.openRelatedListPropertiesModal = function(relatedList,index){
            if (relatedList.SObject && relatedList.SObject.name.indexOf("Invoice_Line_Item__c") > -1) {
                if (!$scope.blockUI.editEditLayout.state().blocking && $scope.layout.SObject != null) {
                    $scope.blockUI.editEditLayout.start('Loading ...');
                    sobjectService.loadSObjectFields($scope.layout.SObject)
                        .success(function (response) {
                            if (response.success) {
                                relatedList.parentSObjectAmountFields = [];
                                if (relatedList.relatedListAmtFields === undefined || relatedList.relatedListAmtFields === null) {
                                    relatedList.relatedListAmtFields = [];
                                }
                                angular.forEach(response.data.sObjectFields, function (field, fieldOrder) {
                                    if (field.SObjectField == undefined) {
                                        field.SObjectField = angular.copy(field);
                                    }
                                    if (field.type == "currency" || field.type == "double") {
                                        relatedList.parentSObjectAmountFields.push(field);
                                    }
                                });

                                $scope.blockUI.editEditLayout.stop();
                                $adminModals.relatedListProperties({
                                    layout: angular.copy($scope.layout),
                                    relatedList: angular.copy(relatedList)
                                }, function (newRelatedList) {
                                    $scope.relatedLists[index] = newRelatedList;
                                });
                            }
                        });
                }
            }
            else {
                $adminModals.relatedListProperties({
                    layout: angular.copy($scope.layout),
                    relatedList: angular.copy(relatedList)
                },function(newRelatedList){
                    $scope.relatedLists[index] = newRelatedList;
                });
            }
        };
        $scope.openFieldPropertiesModal = function(section,sectionIndex,columnIndex,field,fieldIndex){
            $adminModals.layoutFieldProperties({
                layout: angular.copy($scope.layout),
                section: angular.copy(section),
                field: angular.copy(field),
                refSObjects: angular.copy($scope.refSObjects)
            },function(newField){
                $scope.layoutSections[sectionIndex].columns[columnIndex][fieldIndex] = newField;
            });
        };
        $scope.sectionsDropCallBack = function(event, index, item, external, type){
            item.order = index;
            if(item.SObjectLayoutId === undefined){
                item.SObjectLayoutId = $scope.layout.id;
                $scope.openSectionPropertiesModal(item,index);
            }
            return item;
        };
        $scope.relatedListsDropCallBack = function(event, index, item, external, type,dispaySection){
            item.order = index;
            item.dispaySection=dispaySection;
            if(item.SObjectLayoutId === undefined){
                item.SObjectLayoutId = $scope.layout.id;
                item.SObjectLayoutFields = [];
                angular.forEach(item.SObject.SObjectFields,function(field, fieldIndex){
                    if(field.name === 'Name' || field.name === 'CreatedDate' || field.name === 'CreatedById' || field.name === 'LastModifiedDate' || field.name === 'LastModifiedById'){
                        item.SObjectLayoutFields.push({
                            SObjectField: field,
                            label: field.label,
                            type: 'Related-List-Field',
                            hidden: false,
                            deleted: false,
                        });
                    }
                });
                var itemIndex = 0;
                var newRLists=[];
                
                angular.forEach($scope.relatedLists,function(i, _index){
                    if(i.dispaySection == dispaySection){
                        if(itemIndex===index){
                            itemIndex++;
                        }
                        i.order = itemIndex;
                        itemIndex++;
                        newRLists.push(i);
                    }
                });
                angular.forEach($scope.relatedLists,function(i, _index){
                    if(i.dispaySection != dispaySection){
                        if(itemIndex===index){
                            itemIndex++;
                        }
                        i.order = itemIndex;
                        itemIndex++;
                        newRLists.push(i);
                    }
                });
                $scope['relatedLists']=newRLists;
                $scope.openRelatedListPropertiesModal(item,index);
            }
            return item;
        };
        $scope.fieldsDropCallBack = function(event, index, item, external, type, section, columnNumber){
            var sectionFields = section.columns[0];
            if(section.columns.length === 2){
                sectionFields = section.columns[0].concat(section.columns[1]);
            }
            if($scope.isDuplicate(sectionFields,item)){
                return false;
            }
            item.type = 'Layout-Section-Field';
            item.column = columnNumber;
            item.order = index;
            item.readonly = (section.readonly !== undefined) ? section.readonly : false;
            item.active = (item.active !== undefined) ? item.active : true;
            item.enable = (item.enable !== undefined) ? item.enable : true;
            
            angular.forEach(section.columns,function(fields){
                var fieldIndex = 0;
                angular.forEach(fields,function(field,fieldOrder){
                    if (!field.deleted) {
                        field.order = fieldIndex;
                        fieldIndex++;
                    }
                });
            });
            // angular.forEach(section.columns[columnNumber-1],function(field,fieldIndex){
            //     field.order = fieldIndex;
            // });
            
            return item;
        };
        $scope.isDuplicate = function(fields,item){
            var duplicate = false;
            for (var index = 0; index < fields.length; index++) {
                if(!duplicate){
                    if (fields[index].SObjectField.id === item.SObjectField.id && !fields[index].deleted) {
                        if (item.type === null) {
                            duplicate = true;
                        }
                        else {
                            fields[index].deleted = true;
                            fields.splice(index, 1);
                            index--;
                        }
                    }
                }
            }
            return duplicate;
        };
        $scope.loadEditLayoutContents = function(){
            if(!$scope.blockUI.editEditLayoutWithSideBar.state().blocking  && $scope.layout.SObject != null){
                $scope.blockUI.editEditLayoutWithSideBar.start('Loading ...');
                $scope.layout.MobileEditLayoutConfigId = $scope.mobileEditLayoutConfig.id;
                mobileLayoutService.loadEditLayoutContents($scope.layout)
                    .success(function(response){
                        if(response.success === true){
                            $scope.layoutSections = response.data.sObjectLayoutSections;
                            mobileLayoutService.loadLayoutRelatedLists($scope.layout)
                                .success(function(response2){
                                    if(response2.success === true){
                                        $scope.relatedLists = response2.data.sObjectLayoutRelatedLists;
                                        angular.forEach($scope.relatedLists, function (relatedlist, index) {
                                            if (relatedlist.SObject && relatedlist.SObject.name.indexOf("Invoice_Line_Item__c") > -1
                                                && relatedlist.amountCriteriaConfig !== undefined && relatedlist.amountCriteriaConfig !== null) {
                                                relatedlist.relatedListAmtFields = relatedlist.amountCriteriaConfig.relatedListAmtFields;
                                            }
                                            delete relatedlist.amountCriteriaConfig;
                                        });
                                    }else{
                                        $dialog.alert('Error occured while loading layout related lists.','Error','pficon pficon-error-circle-o');
                                    }
                                    $scope.blockUI.editEditLayoutWithSideBar.stop();
                                })
                                .error(function(response2){
                                    $dialog.alert('Server error occured while loading layout related lists.','Error','pficon pficon-error-circle-o');
                                    $scope.blockUI.editEditLayoutWithSideBar.stop();        
                                });
                        }else{
                            $dialog.alert('Error occured while loading layout contents.','Error','pficon pficon-error-circle-o');
                            $scope.blockUI.editEditLayout.stop();
                        }
                    })
                    .error(function(response){
                        $dialog.alert('Server error occured while loading layout contents.','Error','pficon pficon-error-circle-o');
                        $scope.blockUI.editEditLayout.stop();
                    });
            }
        };
        $scope.isValidRelatedLists = function () {
            var titleTooLong = false;
            angular.forEach($scope.relatedLists, function (relatedList) {
                if (!relatedList.deleted) {
                    if (relatedList.title.length > 255) {
                        titleTooLong = true;
                    }
                }
                else {
                    if (relatedList.title.length > 255) {
                        relatedList.title = "Deleted Related List";
                    }
                }
            });
            if (titleTooLong) {
                $dialog.alert('Related List Title is too long. No more than 255 characters allowed.');
                return false;
            }
            else {
                return true;
            }
        };
        $scope.saveLayoutRelatedLists = function(){
            if(!$scope.blockUI.editEditLayout.state().blocking  && $scope.layout.SObject != null){
                if (($scope.relatedLists !== undefined && $scope.relatedLists.length > 0)
                    || ($scope.deletedRelatedList !== undefined && $scope.deletedRelatedList.length > 0)) {
                    if ($scope.isValidRelatedLists()) {
                        $scope.deletedRelatedList ? $scope.relatedLists = $scope.relatedLists.concat($scope.deletedRelatedList) : $scope.relatedLists;
                        $scope.blockUI.editEditLayout.start('Saving layout related lists...');
                        mobileLayoutService.saveLayoutRelatedLists({ 
                            relatedLists: $scope.relatedLists,
                            type: $scope.layout.type,
                            id: $scope.layout.id,
                            MobileEditLayoutConfigId: $scope.mobileEditLayoutConfig.id
                        })
                        .success(function(response){
                            $scope.blockUI.editEditLayout.stop();
                            if(response.success === true){
                                $scope.loadEditLayoutContents();
                            }else{
                                $dialog.alert('Error occured while saving layout related lists.','Error','pficon pficon-error-circle-o');
                            }
                        })
                        .error(function(response){
                            $scope.blockUI.editEditLayout.stop();
                            $dialog.alert('Server error occured while saving layout related lists.','Error','pficon pficon-error-circle-o');
                        });
                    }
                }else{
                    $scope.loadEditLayoutContents();
                }
            }
        };
        $scope.isValidLayout = function(){
            if ($scope.layoutSections.length == 0) {
                $dialog.alert('Please add atleast one layout section with atleast one field.', 'Error', 'pficon pficon-error-circle-o');
                return false;
            }
            else {
                var deleted = true;
                angular.forEach($scope.layoutSections, function (section) {
                    if (!section.deleted) {
                        deleted = false;
                    }
                });
                if (deleted) {
                    $dialog.alert('Please add atleast one layout section with atleast one field.', 'Error', 'pficon pficon-error-circle-o');
                    return false;
                }
            }

            var atleastOneEmptyLayout = false;
            angular.forEach($scope.layoutSections, function (section) {
                if (!section.deleted && !section.isComponent) {
                    var fdeleted = true;
                    angular.forEach(section.columns, function (fields) {
                        if (fdeleted) {
                            angular.forEach(fields, function (field) {
                                if (fdeleted && !field.deleted) {
                                    fdeleted = false;
                                }
                            });
                        }
                    });
                    if (fdeleted) {
                        atleastOneEmptyLayout = true;
                    }
                }
            });
            if (atleastOneEmptyLayout) {
                $dialog.alert('Please add atleast one field in each layout section.', 'Error', 'pficon pficon-error-circle-o');
                return false;
            }

            var titleTooLong = false;
            angular.forEach($scope.layoutSections, function (section) {
                if (!section.deleted) {
                    if (section.title.length > 255) {
                        titleTooLong = true;
                    }
                }
                else {
                    if (section.title.length > 255) {
                        section.title = "Deleted Section";
                    }
                }
            });
            if (titleTooLong) {
                $dialog.alert('Section Title is too long. No more than 255 characters allowed.');
                return false;
            }

            var errorCount = 0;
            angular.forEach($scope.layoutSections, function(section){
                if(!section.isComponent){
                    angular.forEach(section.columns, function(fields){
                        angular.forEach(fields, function(field){
                            if((field.SObjectField.type === 'picklist' || field.SObjectField.type === 'multipicklist') && field.SObjectField.controllerName){
                                var controllerField = $scope.controllerField(field.SObjectField.controllerName);
                                if(controllerField === undefined){
                                    field.error = 'Parent field is missing!';
                                    errorCount++;
                                }else{
                                    delete field.error;
                                }
                            }
                        });
                    });
                }
            });
            return errorCount === 0;
        };
        $scope.controllerField = function(name){
            var controllerField = undefined;
            angular.forEach($scope.layoutSections, function(section){
                angular.forEach(section.columns, function(fields){
                    angular.forEach(fields, function(field){
                         if(field.SObjectField.name === name && !field.deleted && controllerField === undefined){
                             controllerField = field;
                             return controllerField;
                         }
                    });
                });
            }); 
            return controllerField;
        };
        $scope.saveLayout = function(){
            if(!$scope.isValidLayout()){
                return;
            }
            if(!$scope.blockUI.editEditLayoutWithSideBar.state().blocking  && $scope.layout.SObject != null){
                $scope.deletedSections ? $scope.layoutSections = $scope.layoutSections.concat($scope.deletedSections) : $scope.layoutSections;
                $scope.blockUI.editEditLayoutWithSideBar.start('Saving layout...');
                mobileLayoutService.saveEditLayout({ 
                    layoutSections: $scope.layoutSections,
                    type: $scope.layout.type,
                    id: $scope.layout.id,
                    MobileEditLayoutConfigId: $scope.mobileEditLayoutConfig.id
                })
                .success(function(response){
                    $scope.blockUI.editEditLayoutWithSideBar.stop();
                    if(response.success === true){
                        $scope.saveLayoutRelatedLists();
                    }else{
                        $dialog.alert('Error occured while saving layout.','Error','pficon pficon-error-circle-o');
                    }
                })
                .error(function(response){
                    $scope.blockUI.editEditLayoutWithSideBar.stop();
                    $dialog.alert('Server error occured while saving layout.','Error','pficon pficon-error-circle-o');
                });
            }
        };
        $scope.initEditLayoutBlockUiBlocks = function(){
            $scope.blockUI.editEditLayoutWithSideBar = blockUI.instances.get('editEditLayoutWithSideBar');
            $scope.blockUI.editEditLayout = blockUI.instances.get('editEditLayout');
            $scope.blockUI.editMobileLayoutConfig = blockUI.instances.get('EditMobileLayoutConfigBlockUI');
            $scope.blockUI.sObjectFields = blockUI.instances.get('sObjectFields');
        };
        $scope.backToLayoutConfig = function(){
            $scope.cancelMobileEditLayoutConfig();
            $scope.showSideBar = false;
        };
        $scope.init = function(){
            console.log('AdminMobileLayoutsEditEditController loaded!');
            $scope.layoutSections = [];
            $scope.initEditLayoutBlockUiBlocks();
            $scope.cancelMobileEditLayoutConfig();
            $scope.loadGoverningFields();
            $scope.loadMobileEditLayoutConfig();
        };
        $scope.init();
    }
]);

admin.controller('AdminMobileLayoutsCreateController', [
    '$scope', '$state', '$stateParams', '$controller', 'mobileLayoutService', 'sobjectService', 'blockUI', '$dialog', '$adminModals', '$filter',
    function ($scope, $state, $stateParams, $controller, mobileLayoutService, sobjectService, blockUI, $dialog, $adminModals, $filter) {
        var thisCtrl = this;
        $scope.loadSObjectFields = function () {
            if (!$scope.blockUI.sObjectFields.state().blocking && $scope.layout.SObject != null) {
                $scope.blockUI.sObjectFields.start('Loading ...');
                sobjectService.loadSObjectFields($scope.layout.SObject)
                    .success(function (response) {
                        if (response.success) {
                            $scope.layout.SObject.fields = []; // = response.data.sObjectFields;
                            $scope.refSObjects = response.data.refSObjects;
                            response.data.sObjectFields = $filter('filter')(response.data.sObjectFields, { forMobile: true });
                            angular.forEach(response.data.sObjectFields, function (field) {
                                var ControllerSObjectField = undefined;
                                if (field.controllerName && (field.type === 'picklist' || field.type === 'multipicklist')) {
                                    angular.forEach(response.data.sObjectFields, function (ctrlField) {
                                        if (ctrlField.name === field.controllerName) {
                                            ControllerSObjectField = ctrlField;
                                        }
                                    });
                                }
                                var SObjectLayoutField = {
                                    SObjectField: field,
                                    ControllerSObjectField: ControllerSObjectField,
                                    label: field.label,
                                    type: null,
                                    hidden: false,
                                    deleted: false,
                                    recordid: field.type === 'id',
                                    SObjectLayoutId: $scope.layout.id
                                };
                                $scope.layout.SObject.fields.push(SObjectLayoutField);
                            });
                        } else {
                            $dialog.alert(response.message, 'Error', 'pficon pficon-error-circle-o');
                        }
                        $scope.blockUI.sObjectFields.stop();
                    })
                    .error(function (response) {
                        $dialog.alert('Error occured while loading sobject fields.', 'Error', 'pficon pficon-error-circle-o');
                        $scope.blockUI.sObjectFields.stop();
                    });
            }
        };
        $scope.loadChildSObjects = function () {
            if (!$scope.blockUI.childSObjects.state().blocking && $scope.layout.SObject != null) {
                $scope.blockUI.childSObjects.start('Loading ...');
                $scope.layout.SObject.mobile = true;
                sobjectService.loadChildSObjects($scope.layout.SObject)
                    .success(function (response) {
                        if (response.success) {
                            $scope.layoutRelatedLists = [];
                            angular.forEach(response.data.sObjectFields, function (sObjectField) {
                                $scope.layoutRelatedLists.push({
                                    SObject: sObjectField.SObject,
                                    title: sObjectField.SObject.labelPlural,
                                    active: true,
                                    deleted: false,
                                    readonly: false
                                });
                            });
                        } else {
                            $dialog.alert(response.message, 'Error', 'pficon pficon-error-circle-o');
                        }
                        $scope.blockUI.childSObjects.stop();
                    })
                    .error(function (response) {
                        $dialog.alert('Error occured while loading sobject fields.', 'Error', 'pficon pficon-error-circle-o');
                        $scope.blockUI.childSObjects.stop();
                    });
            }
        };
        $scope.loadCreateLayoutContents = function () {
            if (!$scope.blockUI.editCreateLayout.state().blocking && $scope.layout.SObject != null) {
                $scope.blockUI.editCreateLayout.start('Loading ...');
                mobileLayoutService.loadEditLayoutContents($scope.layout)
                    .success(function (response) {
                        if (response.success === true) {
                            var sObject = angular.copy($scope.layout.SObject);
                            var tempType = $scope.layout.tempType;
                            $scope.layout = response.data.sObjectLayout;
                            $scope.layout.SObject = angular.copy(sObject);
                            $scope.layout.tempType = tempType;
                            $scope.layoutSections = response.data.sObjectLayoutSections;
                            mobileLayoutService.loadLayoutRelatedLists($scope.layout)
                                .success(function (response2) {
                                    if (response2.success === true) {
                                        $scope.relatedLists = response2.data.sObjectLayoutRelatedLists;
                                        angular.forEach($scope.relatedLists, function (relatedlist, index) {
                                            if (relatedlist.SObject && relatedlist.SObject.name.indexOf("Invoice_Line_Item__c") > -1
                                                && relatedlist.amountCriteriaConfig !== undefined && relatedlist.amountCriteriaConfig !== null) {
                                                relatedlist.relatedListAmtFields = relatedlist.amountCriteriaConfig.relatedListAmtFields;
                                            }
                                            delete relatedlist.amountCriteriaConfig;
                                        });
                                    } else {
                                        $dialog.alert('Error occured while loading layout related lists.', 'Error', 'pficon pficon-error-circle-o');
                                    }
                                    $scope.blockUI.editCreateLayout.stop();
                                })
                                .error(function (response2) {
                                    $dialog.alert('Server error occured while loading layout related lists.', 'Error', 'pficon pficon-error-circle-o');
                                    $scope.blockUI.editCreateLayout.stop();
                                });
                        } else {
                            $dialog.alert('Error occured while loading layout contents.', 'Error', 'pficon pficon-error-circle-o');
                            $scope.blockUI.editCreateLayout.stop();
                        }
                    })
                    .error(function (response) {
                        $dialog.alert('Server error occured while loading layout contents.', 'Error', 'pficon pficon-error-circle-o');
                        $scope.blockUI.editCreateLayout.stop();
                    });
            }
        };
        $scope.returnToList = function () {
            $state.go('admin.mobile.layout.list');
        };
        $scope.components = function () {
            if ($scope.componentsValues === undefined) {
                $scope.componentsValues = [{
                    title: 'Layout Section',
                    deleted: false,
                    readonly: false,
                    active: true,
                    isComponent: false,
                    SObjectLayoutId: undefined,
                    columns: [
                        []
                    ]
                }];
            }
            return $scope.componentsValues;
        };
        $scope.sectionsDropCallBack = function (event, index, item, external, type) {
            item.order = index;
            if (item.SObjectLayoutId === undefined) {
                item.SObjectLayoutId = $scope.layout.id;
                $scope.openSectionPropertiesModal(item, index);
            }
            return item;
        };
        $scope.openSectionPropertiesModal = function (section, index) {
            $adminModals.layoutSectionProperties({
                layout: angular.copy($scope.layout),
                section: angular.copy(section)
            }, function (newSection) {
                $scope.layoutSections[index] = newSection;
            });
        };
        $scope.fieldsDropCallBack = function (event, index, item, external, type, section, columnNumber) {
            var sectionFields = section.columns[0];
            if (section.columns.length === 2) {
                sectionFields = section.columns[0].concat(section.columns[1]);
            }
            if ($scope.isDuplicate(sectionFields, item)) {
                return false;
            }
            item.type = 'Layout-Section-Field';
            item.column = columnNumber;
            item.order = index;
            item.readonly = (section.readonly !== undefined) ? section.readonly : false;
            item.active = (item.active !== undefined) ? item.active : true;
            item.enable = (item.enable !== undefined) ? item.enable : true;

            angular.forEach(section.columns, function (fields) {
                var fieldIndex = 0;
                angular.forEach(fields, function (field, fieldOrder) {
                    if (!field.deleted) {
                        field.order = fieldIndex;
                        fieldIndex++;
                    }
                });
            });
            return item;
        };
        $scope.isDuplicate = function (fields, item) {
            var duplicate = false;
            for (var index = 0; index < fields.length; index++) {
                if (!duplicate) {
                    if (fields[index].SObjectField.id === item.SObjectField.id && !fields[index].deleted) {
                        if (item.type === null) {
                            duplicate = true;
                        }
                        else {
                            fields[index].deleted = true;
                            fields.splice(index, 1);
                            index--;
                        }
                    }
                }
            }
            return duplicate;
        };
        $scope.openFieldPropertiesModal = function (section, sectionIndex, columnIndex, field, fieldIndex) {
            $adminModals.layoutFieldProperties({
                layout: angular.copy($scope.layout),
                section: angular.copy(section),
                field: angular.copy(field),
                refSObjects: angular.copy($scope.refSObjects)
            }, function (newField) {
                $scope.layoutSections[sectionIndex].columns[columnIndex][fieldIndex] = newField;
            });
        };
        $scope.relatedListsDropCallBack = function (event, index, item, external, type, dispaySection) {
            item.order = index;
            item.dispaySection = dispaySection;
            if (item.SObjectLayoutId === undefined) {
                item.SObjectLayoutId = $scope.layout.id;
                item.SObjectLayoutFields = [];
                angular.forEach(item.SObject.SObjectFields, function (field, fieldIndex) {
                    if (field.name === 'Name' || field.name === 'CreatedDate' || field.name === 'CreatedById' || field.name === 'LastModifiedDate' || field.name === 'LastModifiedById') {
                        item.SObjectLayoutFields.push({
                            SObjectField: field,
                            label: field.label,
                            type: 'Related-List-Field',
                            hidden: false,
                            deleted: false,
                        });
                    }
                });
                var itemIndex = 0;
                var newRLists = [];

                angular.forEach($scope.relatedLists, function (i, _index) {
                    if (i.dispaySection == dispaySection) {
                        if (itemIndex === index) {
                            itemIndex++;
                        }
                        i.order = itemIndex;
                        itemIndex++;
                        newRLists.push(i);
                    }
                });
                angular.forEach($scope.relatedLists, function (i, _index) {
                    if (i.dispaySection != dispaySection) {
                        if (itemIndex === index) {
                            itemIndex++;
                        }
                        i.order = itemIndex;
                        itemIndex++;
                        newRLists.push(i);
                    }
                });
                $scope['relatedLists'] = newRLists;
                $scope.openRelatedListPropertiesModal(item, index);
            }
            return item;
        };
        $scope.openRelatedListPropertiesModal = function (relatedList, index) {
            if (relatedList.SObject && relatedList.SObject.name.indexOf("Invoice_Line_Item__c") > -1) {
                if (!$scope.blockUI.editCreateLayout.state().blocking && $scope.layout.SObject != null) {
                    $scope.blockUI.editCreateLayout.start('Loading ...');
                    sobjectService.loadSObjectFields($scope.layout.SObject)
                        .success(function (response) {
                            if (response.success) {
                                relatedList.parentSObjectAmountFields = [];
                                if (relatedList.relatedListAmtFields === undefined || relatedList.relatedListAmtFields === null) {
                                    relatedList.relatedListAmtFields = [];
                                }
                                angular.forEach(response.data.sObjectFields, function (field, fieldOrder) {
                                    if (field.SObjectField == undefined) {
                                        field.SObjectField = angular.copy(field);
                                    }
                                    if (field.type == "currency" || field.type == "double") {
                                        relatedList.parentSObjectAmountFields.push(field);
                                    }
                                });

                                $scope.blockUI.editCreateLayout.stop();
                                $adminModals.relatedListProperties({
                                    layout: angular.copy($scope.layout),
                                    relatedList: angular.copy(relatedList)
                                }, function (newRelatedList) {
                                    $scope.relatedLists[index] = newRelatedList;
                                });
                            }
                        });
                }
            }
            else {
                $adminModals.relatedListProperties({
                    layout: angular.copy($scope.layout),
                    relatedList: angular.copy(relatedList)
                }, function (newRelatedList) {
                    $scope.relatedLists[index] = newRelatedList;
                });
            }
        };
        $scope.removeSectionFieldsStore = function (section) {
            section.deleted = true;
            if (section.id != undefined) {
                if ($scope.deletedSections == undefined) {
                    $scope.deletedSections = [];
                }
                $scope.deletedSections.push(section);
            }
        };
        $scope.removeRelatedListFieldsStore = function (relatedlist) {
            relatedlist.deleted = true;
            if (relatedlist.id != undefined) {
                if ($scope.deletedRelatedList == undefined) {
                    $scope.deletedRelatedList = [];
                }
                $scope.deletedRelatedList.push(relatedlist);
            }
        };
        $scope.removeAndReorder = function (items, item, index) {
            item.deleted = true;
            items.splice(index, 1);

            var itemIndex = 0;
            angular.forEach(items, function (i, _index) {
                if (!i.deleted) {
                    i.order = itemIndex;
                    itemIndex++;
                }
            });

            if (item.columns !== undefined && angular.isArray(item.columns)) {
                angular.forEach(item.columns, function (fields) {
                    angular.forEach(fields, function (field, fieldIndex) {
                        field.deleted = true;
                    });
                });
            }
        };
        $scope.removeFieldsStoreAndReorder = function (section, items, item, index) {
            $scope.removeFieldsStore(section, item);
            item.deleted = true;
            if (item.id === undefined || item.type == "Layout-Section-Field") {
                items.splice(index, 1);
            }

            var itemIndex = 0;
            angular.forEach(items, function (i, _index) {
                if (!i.deleted) {
                    i.order = itemIndex;
                    itemIndex++;
                }
            });

            if (item.columns !== undefined && angular.isArray(item.columns)) {
                angular.forEach(item.columns, function (fields) {
                    angular.forEach(fields, function (field, fieldIndex) {
                        field.deleted = true;
                    });
                });
            }
        };
        $scope.removeFieldsStore = function (section, item) {
            item.deleted = true;
            if (section.deletedFields == undefined) {
                section.deletedFields = [];
            }
            section.deletedFields.push(item);
        };
        $scope.isValidLayout = function () {
            if ($scope.layoutSections.length == 0) {
                $dialog.alert('Please add atleast one layout section with atleast one field.', 'Error', 'pficon pficon-error-circle-o');
                return false;
            }
            else {
                var deleted = true;
                angular.forEach($scope.layoutSections, function (section) {
                    if (!section.deleted) {
                        deleted = false;
                    }
                });
                if (deleted) {
                    $dialog.alert('Please add atleast one layout section with atleast one field.', 'Error', 'pficon pficon-error-circle-o');
                    return false;
                }
            }

            var atleastOneEmptyLayout = false;
            angular.forEach($scope.layoutSections, function (section) {
                if (!section.deleted && !section.isComponent) {
                    var fdeleted = true;
                    angular.forEach(section.columns, function (fields) {
                        if (fdeleted) {
                            angular.forEach(fields, function (field) {
                                if (fdeleted && !field.deleted) {
                                    fdeleted = false;
                                }
                            });
                        }
                    });
                    if (fdeleted) {
                        atleastOneEmptyLayout = true;
                    }
                }
            });
            if (atleastOneEmptyLayout) {
                $dialog.alert('Please add atleast one field in each layout section.', 'Error', 'pficon pficon-error-circle-o');
                return false;
            }

            var titleTooLong = false;
            angular.forEach($scope.layoutSections, function (section) {
                if (!section.deleted) {
                    if (section.title.length > 255) {
                        titleTooLong = true;
                    }
                }
                else {
                    if (section.title.length > 255) {
                        section.title = "Deleted Section";
                    }
                }
            });
            if (titleTooLong) {
                $dialog.alert('Section Title is too long. No more than 255 characters allowed.');
                return false;
            }

            var errorCount = 0;
            angular.forEach($scope.layoutSections, function (section) {
                if (!section.isComponent) {
                    angular.forEach(section.columns, function (fields) {
                        angular.forEach(fields, function (field) {
                            if ((field.SObjectField.type === 'picklist' || field.SObjectField.type === 'multipicklist') && field.SObjectField.controllerName) {
                                var controllerField = $scope.controllerField(field.SObjectField.controllerName);
                                if (controllerField === undefined) {
                                    field.error = 'Parent field is missing!';
                                    errorCount++;
                                } else {
                                    delete field.error;
                                }
                            }
                        });
                    });
                }
            });
            return errorCount === 0;
        };
        $scope.controllerField = function (name) {
            var controllerField = undefined;
            angular.forEach($scope.layoutSections, function (section) {
                angular.forEach(section.columns, function (fields) {
                    angular.forEach(fields, function (field) {
                        if (field.SObjectField.name === name && !field.deleted && controllerField === undefined) {
                            controllerField = field;
                            return controllerField;
                        }
                    });
                });
            });
            return controllerField;
        };
        $scope.saveCreateLayout = function () {
            if (!$scope.isValidLayout()) {
                return;
            }
            if (!$scope.blockUI.editCreateLayout.state().blocking && $scope.layout.SObject != null) {
                $scope.deletedSections ? $scope.layoutSections = $scope.layoutSections.concat($scope.deletedSections) : $scope.layoutSections;
                $scope.blockUI.editCreateLayout.start('Saving layout...');
                mobileLayoutService.saveEditLayout({
                    layoutSections: $scope.layoutSections,
                    type: $scope.layout.type,
                    id: $scope.layout.id,
                    SObjectId: $scope.layout.SObjectId,
                    primaryAttachmentRequired: $scope.layout.primaryAttachmentRequired ? $scope.layout.primaryAttachmentRequired : false
                })
                    .success(function (response) {
                        $scope.blockUI.editCreateLayout.stop();
                        if (response.success === true) {
                            $scope.saveLayoutRelatedLists();
                        } else {
                            $dialog.alert('Error occured while saving layout.', 'Error', 'pficon pficon-error-circle-o');
                        }
                    })
                    .error(function (response) {
                        $scope.blockUI.editCreateLayout.stop();
                        $dialog.alert('Server error occured while saving layout.', 'Error', 'pficon pficon-error-circle-o');
                    });
            }
        };
        $scope.saveLayoutRelatedLists = function () {
            if (!$scope.blockUI.editCreateLayout.state().blocking && $scope.layout.SObject != null) {
                if (($scope.relatedLists !== undefined && $scope.relatedLists.length > 0)
                    || ($scope.deletedRelatedList !== undefined && $scope.deletedRelatedList.length > 0)) {
                    if ($scope.isValidRelatedLists()) {
                        $scope.deletedRelatedList ? $scope.relatedLists = $scope.relatedLists.concat($scope.deletedRelatedList) : $scope.relatedLists;
                        $scope.blockUI.editCreateLayout.start('Saving layout related lists...');
                        mobileLayoutService.saveLayoutRelatedLists({
                            relatedLists: $scope.relatedLists,
                            type: $scope.layout.type,
                            id: $scope.layout.id
                        })
                            .success(function (response) {
                                $scope.blockUI.editCreateLayout.stop();
                                if (response.success === true) {
                                    $scope.loadCreateLayoutContents();
                                } else {
                                    $dialog.alert('Error occured while saving layout related lists.', 'Error', 'pficon pficon-error-circle-o');
                                }
                            })
                            .error(function (response) {
                                $scope.blockUI.editCreateLayout.stop();
                                $dialog.alert('Server error occured while saving layout related lists.', 'Error', 'pficon pficon-error-circle-o');
                            });
                    }
                } else {
                    $scope.loadCreateLayoutContents();
                }
            }
        };
        $scope.isValidRelatedLists = function () {
            var titleTooLong = false;
            angular.forEach($scope.relatedLists, function (relatedList) {
                if (!relatedList.deleted) {
                    if (relatedList.title.length > 255) {
                        titleTooLong = true;
                    }
                }
                else {
                    if (relatedList.title.length > 255) {
                        relatedList.title = "Deleted Related List";
                    }
                }
            });
            if (titleTooLong) {
                $dialog.alert('Related List Title is too long. No more than 255 characters allowed.');
                return false;
            }
            else {
                return true;
            }
        };
        $scope.initBlockUiBlocks = function () {
            $scope.blockUI = {
                sObjectFields: blockUI.instances.get('sObjectFields'),
                childSObjects: blockUI.instances.get('childSObjects'),
                editCreateLayout: blockUI.instances.get('editCreateLayout')
            };
        };
        $scope.init = function () {
            console.log('AdminMobileLayoutsCreateController loaded!');
            $scope.initBlockUiBlocks();
            $scope.layoutSections = [];
            $scope.layout = $stateParams.layout;
            $scope.loadSObjectFields();
            $scope.loadChildSObjects();
            $scope.loadCreateLayoutContents();
            $scope.templateUrl = 'slds/views/admin/mobile/layout/create.edit.html';
        };
        $scope.init();
    }
]);