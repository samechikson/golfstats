angular.module('golfDataMeanApp')
	.directive('lineGraph', ['d3', function(d3) {
	    return {
	      restrict: 'EA',
	      scope: '=',
      	  link: function(scope, element, attrs, graphCtrl) {

      	  	console.log(scope.tournament);

      	  	d3Service.d3().then(function(d3) {
	      	  	var margin = {top: 20, right: 20, bottom: 30, left: 40};
	      	  	var width = element[0].offsetWidth - margin.left - margin.right;
		        var height = element[0].offsetWidth/2 - margin.top - margin.bottom;

		        var svg = d3.select(element).append('svg')
		            .attr('width', width + margin.left + margin.right)
		            .attr('height', height + margin.top + margin.bottom)
		            .style('overflow', 'visible');

		        graph = svg.append('g')
		            .attr('class','graph')
		            .attr('transform', 'translate(' + margin.left + ','+ margin.top+')');

		        var yAxis = d3.svg.axis()
				    .scale(yScale)
				    .orient("left")

				svg.append("g")
				    .attr("class", "y axis")
				    .call(yAxis);
		    });

			}
		};

	}]);