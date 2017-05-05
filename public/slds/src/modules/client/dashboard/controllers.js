client.controller('ClientDashboardController',[
            '$scope','$rootScope','$state','$stateParams','DashboardService','$dialog','blockUI','$filter','$appCache','CriteriaHelper',
    function($scope , $rootScope , $state , $stateParams , DashboardService , $dialog , blockUI , $filter , $appCache , CriteriaHelper){
        var orderBy = $filter('orderBy');
        $scope.getDashboardComponentMetadata = function(){
            if(!$scope.blockUI.ClientDashboardBlockUI.state().blocking){
                if($scope.stateCache === undefined){
                    $scope.stateCache = {
                        containersMetadata: undefined,
                        searchResult: {},
                        orderByField: undefined
                    };
                }
                else{
                	$scope.stateCache = $appCache.get($state.current.name);
                	if($scope.stateCache.btnClick === "save" && $scope.stateCache.cacheReference !== undefined && $scope.stateCache.recordReference !== undefined){
                		$scope.stateCache.searchResult[$scope.stateCache.cacheReference].splice($scope.stateCache.searchResult[$scope.stateCache.cacheReference].indexOf($scope.stateCache.recordReference),1);
                		$scope.searchResult = $scope.stateCache.searchResult;
                		$appCache.put($state.current.name, $scope.stateCache);
                	}
                }
                if($scope.stateCache.containersMetaData === undefined){
                    $scope.blockUI.ClientDashboardBlockUI.start('Loading dashboard metadata...');
                    DashboardService.getDashboardComponentMetadata()
                        .success(function(response){
                            $scope.blockUI.ClientDashboardBlockUI.stop();
                            if(response.success){
                                $scope.containersMetaData = response.data.containerMetadata;
                                $scope.stateCache.containersMetaData = $scope.containersMetaData;
                                $appCache.put($state.current.name, $scope.stateCache);
                            }
                            else{
                                $dialog.alert(response.message,'Error','pficon pficon-error-circle-o');
                            }
                        })
                        .error(function(){
                            $scope.blockUI.ClientDashboardBlockUI.stop();
                            $dialog.alert('Server error occured while loading dashboard metadata.','Error','pficon pficon-error-circle-o');
                        });
                }
                else{
                    $scope.containersMetaData = $scope.stateCache.containersMetaData;
                    $scope.searchResult = $scope.stateCache.searchResult;
                }
            }
        };
        $scope.applyOrderBy = function(field, records){
            if($scope.searchResult[records] && $scope.searchResult[records].length > 0){
                $scope.predicate = field.SObjectField.name;
                $scope.reverse = ($scope.predicate === field.SObjectField.name) ? !$scope.reverse : false;
                $scope.searchResult[records] = orderBy($scope.searchResult[records], field.SObjectField.name, $scope.reverse);
                
                $scope.stateCache.orderByField = field;
                $appCache.put($state.current.name, $scope.stateCache);
            }
        };
        $scope.refresh = function(){
            $appCache.remove($state.current.name);
            $scope.init();   
        };
        $scope.doAction = function(stateCacheName, action, record, recordActions, relativeField){
			$scope.stateCache = $appCache.get($state.current.name);
			$scope.stateCache.cacheReference = stateCacheName;
			$scope.stateCache.recordReference = record;
			$appCache.put($state.current.name, $scope.stateCache);
            var _editAction = undefined;
            if(relativeField){
                record.id = record[relativeField.name];
                record.attributes = record[relativeField.relationshipName].attributes;
            }
            if(recordActions.length > 1){
                angular.forEach(recordActions,function(action){
                    if(action.label === 'Edit' && !_editAction){
                        _editAction = action;
                    }
                });
            }
            try{
                $state.go(action.state, {
                    data: {
                        record: record,
                        editAction: _editAction,
                        isFromDashboard : true
                    }
                });
            }catch(e){
                $dialog.alert('It seems like there is some configuration issue.\nPlease contact your admin.','Error','pficon pficon-error-circle-o');
            }
        };
        $scope.doDefaultAction = function(record, recordActions){
            if(recordActions){
                var _action = undefined;
                var _editAction = undefined;
                if(recordActions.length === 1){
                    if(recordActions[0].label === 'Edit' && $scope.criteriaValidation(recordActions[0],record)){
                        _action = recordActions[0];
                    }
                    else if(recordActions[0].label !== 'Edit' ){
                        _action = recordActions[0];
                    }
                    
                }else{
                    angular.forEach(recordActions,function(action){
                        if(action.label === 'Details' && !_action){
                            _action = action;
                        }else if(action.label === 'Edit' && $scope.criteriaValidation(action,record) && !_editAction){
                            _editAction = action;
                        }
                    });
                }
                if(_action){
                    try{
                        $state.go(_action.state, {
                            data: {
                                record: record,
                                editAction: _editAction 
                            }
                        });
                    }catch(e){
                        $dialog.alert('It seems like there is some configuration issue.\nPlease contact your admin.','Error','pficon pficon-error-circle-o');
                    }
                }
            }  
        };
        $scope.criteriaValidation = function(action,model){
            if(action.criteria === undefined){
                return true;
            }
            var criteriaMatched = CriteriaHelper.validate(action.criteria,model);
            if(criteriaMatched){
                return true;
            }else{
                return false;
            }
        };
        $scope.loadData = function(configuration, records, blockId, componentTitle, componentType, refreshFlag){
            if($scope.stateCache.searchResult[records] === undefined || refreshFlag === true){
            	var payload = {
                    config : configuration,
                    type: componentType
                };
                var blockui = blockUI.instances.get(blockId);
                blockui.start("Loading " + componentTitle + "...");
                DashboardService.loadData(payload)
                    .success(function(response){
                        blockui.stop();
                        if(response.success){
                            $scope.searchResult[records] = response.data.records;
                            $scope.stateCache.searchResult = $scope.searchResult;
                            $appCache.put($state.current.name, $scope.stateCache);
                        }
                        else{
                            $dialog.alert(response.message,'Error','pficon pficon-error-circle-o');
                        }
                    })
                    .error(function(){
                        blockui.stop();
                        $dialog.alert('Server error occured while loading '+ componentTitle + ' data.','Error','pficon pficon-error-circle-o');
                    });
            }
            else{
                $scope.searchResult[records] = $scope.stateCache.searchResult[records];
            }

        };
        $scope.initBlockUiBlocks = function(){
            $scope.blockUI = {
                ClientDashboardBlockUI: blockUI.instances.get('ClientDashboardBlockUI'),
            };
        };
        $scope.showHideContainers = function(container,containers){
            var isCollapse=container.isCollapse?false:true;
            if(isCollapse){
                angular.forEach(containers,function(datacontainer){
                    datacontainer.isCollapse=false;
                });
            }
            container.isCollapse=isCollapse;
        };
        $scope.showHideComponent = function(container,component){
            var isCollapse=component.isCollapse?false:true;
            if(isCollapse){
                angular.forEach(container.DashboardContainersComponents,function(containersComponent){
                    containersComponent.isCollapse=false;
                });
            }
            component.isCollapse=isCollapse;
        };
        $scope.init = function(){
            console.log('ClientDashboardController loaded!');
            $scope.initBlockUiBlocks();
            $scope.icon = $stateParams.icon;
            $scope.showRefreshResult = $stateParams.showRefreshResult;
            $scope.searchResult = {};
            $scope.stateCache = $appCache.get($state.current.name)
            $scope.getDashboardComponentMetadata();
        };
        $scope.init();
    }
]);