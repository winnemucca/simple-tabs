;(function(window) {

	angular.module('app', [])

	// Define directives here
	.directive('tab', function() {
	  return {
	    restrict: 'E',
	    transclude: true,
	    template: ' <div role="tabpanel" ng-transclude ng-show="active"></div>',
	    require: '^tabset',
	    //which scope should be used default is parent
	    //empty is isolated scope
	    //usually for an element scope
	    //not for decorator directives
	    scope: {
	    	//heading should correspond to the dom attribute as a string
	    	// '=' would require a variable
	    	// '=' great for complex variables
	    	// & for a function
	    	// useful for callbacks 
	    	heading: '@'
	    },
	    link: function(scope, elem, attr, tabsetCtrl) {
	    	scope.active = false;

	    	if(attr.disable) {
	    		attr.$observe('disable', function(value) {
	    			scope.disabled = (value !== 'false');
	    		})
	    	}

	    	tabsetCtrl.addTab(scope);
	    }
	  }
	})

	.directive('tabset', function() {
		return {
			restrict: 'E',
			transclude: true,
			scope: {
				type: '@',
				vertical: '@',
				justified: '@'
			},
			templateUrl: 'tabset.html',
			bindToController: true,
			controllerAs: 'tabset',
			controller: function() {
				var self = this;

				self.tabs = [];

				self.classes = {};

				if(self.type === 'pills') {
					self.classes['nav-pills'] = true;
				}else {
					self.classes['nav-tabs'] = true;
				}

				if(self.justified) {
					self.classes['nav-justified'] = true;
				}

				if(self.vertical) {
					self.classes['nav-stacked'] = true;
				}

				self.select = function(selectedTab) {
					if(selectedTab.disabled) {return};

					angular.forEach(self.tabs, function(tab) {
						if(tab.active && tab !== selectedTab) {
							tab.active = false;
						}
					})
					selectedTab.active = true;
				}

				self.addTab = function addTab(tab) {
					self.tabs.push(tab);
					if(self.tabs.length ===1) {
						tab.active = true;
					}
				}
				console.log(self.tabs);
			}
		}
	})
})(window);

