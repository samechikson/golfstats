angular.module('golfDataMeanApp')
	.directive('lineGraph', function() {

  	  	var margin = {top: 20, right: 20, bottom: 30, left: 40};

	    return {
	      restrict: 'EA',
	      scope: {data: '='},
      	  link: function(scope, element, attrs, graphCtrl) {
	  	  	var width = element[0].offsetWidth - margin.left - margin.right;
	        var height = element[0].offsetWidth/2 - margin.top - margin.bottom;

	        var x = d3.scale.linear()
         			 .domain([0,310])			    
         			 .range([0, width]);

			var y = d3.scale.linear()
         			 .domain([0,50])
			    	 .range([height, 0]);

	        var svg = d3.select(element[0]).append('svg')
	            .attr('width', width + margin.left + margin.right)
	            .attr('height', height + margin.top + margin.bottom)
	            .style('overflow', 'visible');

	        graph = svg.append('g')
	            .attr('class','graph')
	            .attr('transform', 'translate(' + margin.left + ','+ margin.top+')');

			scope.$watch('data', function(data){
				console.log(data);

		        graph.selectAll('.point')
		        	.data(data)
		          .enter().append('circle')
		          	.attr('r', 3)
		          	.attr('cx', function(d) {return x(d.distance);})
		          	.attr('cy', function(d) {return y(d.pth); });
			});

		  }
		};

	});