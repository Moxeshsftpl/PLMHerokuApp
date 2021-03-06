'use strict';

admin.controller('AdminClientDashboardDesignController',[
            '$scope','$rootScope','$state','$adminModals','genericComponentService','clientDashboardContainerService','$dialog','blockUI',
    function($scope , $rootScope , $state , $adminModals , genericComponentService , clientDashboardContainerService , $dialog , blockUI){
        $scope.loadDashboardContainers = function(){
            $scope.blockUI.ClientDashboardEditLayoutBlockUI.start('Loading components...');
            clientDashboardContainerService.loadClientDashboardContainers()
                .success(function(response){
                    if(response.success){
                        $scope.dashboardContainers = response.data.containers;
                    }else{
                        $dialog.alert(response.message,'Error','pficon pficon-error-circle-o');
                    }
                    $scope.blockUI.ClientDashboardEditLayoutBlockUI.stop();
                })
                .error(function(response){
                    $dialog.alert('Error occured while loading dashboard containers.','Error','pficon pficon-error-circle-o');
                    $scope.blockUI.ClientDashboardEditLayoutBlockUI.stop();
                });
        };
        $scope.saveDashboardConfiguration = function(){
            $scope.reOrder($scope.dashboardContainers);
            if(!$scope.blockUI.ClientDashboardEditLayoutBlockUI.state().blocking){
                $scope.blockUI.ClientDashboardEditLayoutBlockUI.start('Saving layout...');
                angular.forEach($scope.dashboardContainers, function (container) {
                    container.deletedComponents ? container.components = container.components.concat(container.deletedComponents) : container.components,
                        container.deletedComponents = undefined;
                });
                $scope.deletedContainers ? $scope.dashboardContainers = $scope.dashboardContainers.concat($scope.deletedContainers) : $scope.dashboardContainers,
                clientDashboardContainerService.saveClientDashboardContainers({ 
                    containers: $scope.dashboardContainers
                })
                .success(function(response){
                    $scope.blockUI.ClientDashboardEditLayoutBlockUI.stop();
                    if(response.success === true){
                        // $scope.loadEditLayoutContents();
                        $scope.loadDashboardContainers();
                    }else{
                        $dialog.alert('Error occured while saving layout.','Error','pficon pficon-error-circle-o');
                    }
                })
                .error(function(response){
                    $scope.blockUI.ClientDashboardEditLayoutBlockUI.stop();
                    $dialog.alert('Server error occured while saving layout.','Error','pficon pficon-error-circle-o');
                });
            }
        };
        $scope.containerDropCallBack = function(event, index, item, external, type){
            item.order = index;
            if(angular.isUndefined(item.label))
                $scope.dashboardContainerPropertiesModal(item, index);
            return item;
        };
        $scope.dashboardContainerPropertiesModal = function(container,index){
            $adminModals.adminClientDashboardContainerProperties({
                container: angular.copy(container),
            },function(container){
                $scope.dashboardContainers[index] = container;
            });
        };
        $scope.componentDropCallBack = function(event, index, item, external, type, container, containerIndex, columnNumber){
            item.order = index;
            if ($scope.isDuplicate(item)) {
                return false;
            }
            if(angular.isUndefined(item.columns))
                item.columns = 3;
            if(angular.isUndefined(item.label))
                $scope.dashboardContainerComponentPropertiesModal(containerIndex, item, index);
            return item;
        };
        $scope.isDuplicate = function (item) {
            var duplicate = false;
            angular.forEach($scope.dashboardContainers, function (container, index) {
                angular.forEach(container.components, function (component, index) {
                    if (!duplicate) {
                        if (((component.ComponentId != undefined && component.ComponentId === item.id) || (component.component != undefined && component.component.id === item.id)) && !component.deleted) {
                            duplicate = true;
                        }
                    }
                });
            });
            return duplicate;
        }
        $scope.dashboardContainerComponentPropertiesModal = function(containerIndex, component, index){
            if (component.component != undefined) {
                if (component.ComponentId == undefined) {
                    component.id = component.component.id;
                }
                delete component.component;
            }
            if (component.SObject != undefined) {
                delete component.SObject;
            }
            component.component = angular.copy(component);
            if (component.ComponentId == undefined) {
                delete component.id;
            }
            component.deleted = component.component.deleted;
            component.order = component.component.order;
            component.active = component.component.active;
            component.columns = component.component.columns;
            component.title = component.component.title;
            delete component.component.deleted;
            delete component.component.order;
            delete component.component.columns;
            $adminModals.adminClientDashboardContainerComponentProperties({
                component: angular.copy(component),
            },function(component){
                $scope.dashboardContainers[containerIndex].components[index] = component;
            });
        };
        $scope.reOrder = function(items){
            var itemIndex = 0;
            angular.forEach(items, function(item){
                item.order = itemIndex;
                itemIndex++;
                if(item.hasOwnProperty('components') && item.components.length > 0){
                    $scope.reOrder(item.components);
                }
            });
        }
        $scope.removeFieldsStore = function (container, item) {
            if(item.id != undefined){
                if (container.deletedComponents == undefined) {
                    container.deletedComponents = [];
                }
                item.deleted = true;
                container.deletedComponents.push(item);
            }
        };
        $scope.removeFieldsStoreOfContainer = function (item) {
            if(item.id != undefined){
                if ($scope.deletedContainers == undefined) {
                    $scope.deletedContainers = [];
                }
                item.deleted = true;
                $scope.deletedContainers.push(item);
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
            
            if(item.components && item.components.length > 0){
                angular.forEach(item.components,function(component){
                    component.deleted = true;
                });
            }
        };
        $scope.loadDashboardComponents = function(){
            // $scope.blockUI.loadComponents.start('Loading components...');

            genericComponentService.loadDashboardComponent({active: true, forMobile: false})
                .success(function(response){
                    if(response.success){
                        angular.forEach(response.data.components,function (component){
                            component.deleted = false;
                        });
                        $scope.components = response.data.components;
                    }else{
                        $dialog.alert(response.message,'Error','pficon pficon-error-circle-o');
                    }
                    // $scope.blockUI.loadComponents.stop();
                })
                .error(function(response){
                    $dialog.alert('Error occured while loading components.','Error','pficon pficon-error-circle-o');
                    // $scope.blockUI.loadComponents.stop();
                });
        };
        $scope.initBlockUiBlocks = function(){
            $scope.blockUI = {
                ClientDashboardEditLayoutBlockUI: blockUI.instances.get('ClientDashboardEditLayoutBlockUI')
            };
        };
        $scope.init = function(){
            console.log('AdminClientDashboardDesignController loaded!');
            $scope.sidePanel = 'slds/views/admin/clientdashboard/side-panel.html';
            $scope.dropZone = 'slds/views/admin/clientdashboard/drop-zone.html';
            $scope.dashboardContainers = [];
            $scope.containers = [{
                    title: 'My Task Container',
                    type: 'container',
                    deleted: false,
                    active: true,
                    columns: 0,
                    components: [],
                    allowedType: 'ClientDashbordMyTaskContainerComponent'
                },
                // {
                //     title: 'Chart Container',
                //     type: 'container',
                //     deleted: false,
                //     active: true,
                //     columns: 0,
                //     components: [],
                //     allowedType: 'ClientDashbordChartContainerComponent'
                // }
            ];
            $scope.initBlockUiBlocks();
            $scope.loadDashboardComponents();
            $scope.loadDashboardContainers();
        };
        $scope.init();
    }
]);