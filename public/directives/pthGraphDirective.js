angular.module('golfDataMeanApp')
	.directive('pthGraph', function() {
	    return {
	      restrict: 'E',
	      scope: {tournament: '@'},
	      controller: 'pthGraphCtrl',
      	link: function(scope, element, attrs, graphCtrl) {
            attrs.$observe('tournament', function(changedValue){
               console.log(attrs.tournament);
             
          	  	if (attrs.tournament){
                  graphCtrl.init(element[0], {tournamentId: attrs.tournament,
          	  								min: 50, 
          	  								max: 300, 
          	  								withGrid: true, 
          	  								withDots: false});
                }
            });    
		  }
		};

	});

angular.module('golfDataMeanApp')
  .controller('pthGraphCtrl', ['d3Service', 'DbService', function(d3Service, DbService) {
    this.margin = {top: 20, right: 20, bottom: 20, left: 20};
    this.width = 300;
    this.height = 300;

    this.min = 125;
    this.max = 150;

    var thisGraph = this;

    this.init = function(element, opts){
      d3Service.d3().then(function(d3) {

        thisGraph.width = element.parentNode.clientWidth - thisGraph.margin.left - thisGraph.margin.right;
        thisGraph.height = element.parentNode.clientWidth/2 - thisGraph.margin.top - thisGraph.margin.bottom;

        thisGraph.svg = d3.select(element).append('svg')
            .attr('width', thisGraph.width + thisGraph.margin.left + thisGraph.margin.right)
            .attr('height', thisGraph.height + thisGraph.margin.top + thisGraph.margin.bottom)
            .style('overflow', 'visible');

          thisGraph.graph = thisGraph.svg.append('g')
            .attr('class','graph')
            .attr('transform', 'translate(' + thisGraph.margin.left + ','+ thisGraph.margin.top+')');

          thisGraph.graph.append('circle')
            .attr('class', 'hole')
            .attr('cx', thisGraph.width/2)
            .attr('cy', thisGraph.height/2)
            .attr('r', 3);

        thisGraph.setMax(+opts.max);
        thisGraph.setMin(+opts.min);

        thisGraph.setup(d3);
        opts.withGrid && thisGraph.makeGrid(d3);// jshint ignore:line
        thisGraph.getData(opts.tournamentId);
        thisGraph.makeViz(opts.withDots);
//        thisGraph.addTitle(opts.min + ' to ' + opts.max +'m');

      });
    };

    this.setMax = function(max){
      thisGraph.max = max;
    };
    this.setMin = function(min){
      thisGraph.min = min;
    };

    this.setup = function(d3){
      thisGraph.x = d3.scale.linear()
          .domain([0,40])
          .range([0, thisGraph.width/2]);

        thisGraph.makeD3functions(d3);

    };

    this.makeD3functions = function(d3){

      thisGraph.lineFunction = d3.svg.line()
       .x(function(d) { return thisGraph.x(d.x); })
       .y(function(d) { return thisGraph.x(d.y); })
        .interpolate('cardinal-closed');

      thisGraph.textSize = d3.scale.linear()
        .domain([0, 1000])
        .rangeRound([10, 25]);
    };

    this.makeGrid = function(d3){

      var gridGroup = thisGraph.graph.append('g')
                            .attr('class', 'gridGroup');

      var grid = [5,10,15];
      var gridArc = d3.svg.arc()
        .innerRadius(function(d){ return thisGraph.x(d);})
        .outerRadius(function(d){ return thisGraph.x(d)+1;})
        .endAngle(90)
        .startAngle(0);

      gridGroup.selectAll('path.gridArc')
          .data(grid, function(d){ return d;})
        .enter().append('path')
          .attr('class', 'gridArc')
          .style('fill', 'rgba(210,210,210,.4)')
          .attr('d', gridArc)
          .attr('transform', 'translate(' + thisGraph.width/2 + ',' + thisGraph.height/2 + ')');

      gridGroup.selectAll('line.gridLine')
          .data([0,45,90,135,180,225,270,315])
        .enter().append('line')
          .attr('class', 'gridLine')
          .attr('transform', function(d){ return 'translate(' + thisGraph.width/2 + ',' + thisGraph.height/2 + ') rotate(' + d + ')';})
          .attr('stroke-width', 1)
          .attr('stroke', 'rgba(210,210,210,.4)')
          .attr('x1', 0)
          .attr('y1', thisGraph.x(grid[grid.length-1]))
          .attr('x2', 0)
          .attr('y2', 0);

      gridGroup.selectAll('text.gridText')
          .data(grid, function(d){ return d;})
        .enter().append('text')
          .attr('class', 'gridText')
          .attr('transform', 'translate(' + thisGraph.width/2 + ',' + thisGraph.height/2 + ')')
          .attr('x', 0)
          .attr('y', function(d){ return thisGraph.x(d)+10;})
          .style('fill', '#c7c7c7')
          .text(function(d){ return d + 'm';});
    };

    this.addTitle = function(text){
      thisGraph.svg.append('text')
        .attr('class','title')
        .attr('x', thisGraph.width-5)
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .attr('fill', '#ababab')
        .attr('font-size', thisGraph.textSize(thisGraph.width))
        .text(text);
    };

    this.getData = function(src){
      // var url   = src || '../data/Sam_PTH.csv';
      // thisGraph.data = $http.get(url).then(function(response){
      //   return new CSV(response.data, {header: true}).parse();
      // });

		thisGraph.data = DbService.getAllWithFieldId('pth', 'tournament', src);
    };

    this.makeViz = function(dots){

      thisGraph.data.then(function(response){

        var filteredData = response.data.filter(function(d){
          return (d.distance > thisGraph.min && d.distance <= thisGraph.max);
        });

        thisGraph.samCircle(filteredData);  
        dots && thisGraph.samDots(filteredData);// jshint ignore:line
      });


    };

    this.samDots = function(rows){
      console.log(rows);
      var dotGroup = thisGraph.graph.append('g')
        .attr('class', 'dots')
        .attr('transform', 'translate(' + thisGraph.width/2 + ',' + thisGraph.height/2 + ')');

      dotGroup.selectAll('.dot')
          .data(rows)
        .enter().append('svg:circle')
          .attr('class','dot')
          .attr('stroke', 'none')
          .style('fill', '#FF8A00')
          .attr('r', 3)
          .attr('cx', function(d){ 
             var returnThis = thisGraph.x(Math.round(Math.sin(thisGraph.convertHeading(d.direction)) * d.PTH));
             return returnThis;
          })
          .attr('cy', function(d){ 
            var returnThis =  Math.round(Math.cos(thisGraph.convertHeading(d.direction)) * d.PTH);
            return thisGraph.x(returnThis);
          });



    };

    this.convertHeading = function(heading){
      var o = {E:0, SE:1, S:2, SW:3, W:4, NW:5, N:6, NE:7};

      return o[heading] * (Math.PI/4);
    };

    this.samCircle = function(rows){
      //console.log(rows);
      var samCircle = {E: {value: 0, count: 0, angle: 0}, 
                    SE: {value: 0, count: 0, angle: Math.PI/4},
                    S: {value: 0, count: 0, angle: Math.PI/2},
                    SW: {value: 0, count: 0, angle: (3*Math.PI)/4},
                    W: {value: 0, count: 0, angle: Math.PI},
                    NW: {value: 0, count: 0, angle: (5*Math.PI)/4},
                    N: {value: 0, count: 0, angle: (3*Math.PI)/2},
                    NE: {value: 0, count: 0, angle: (7*Math.PI)/4} };
      var samCircleData = [];

      for (var i in rows){
        samCircle[rows[i].direction].value += rows[i].pth;
        samCircle[rows[i].direction].count++;
      }

      for (var head in samCircle){
        //console.log(samCircle[head]);
        var avg = (samCircle[head].value / samCircle[head].count) || 0;

        var ySam = Math.round(Math.sin(samCircle[head].angle) * avg);
        var xSam = Math.round(Math.cos(samCircle[head].angle) * avg);

        samCircleData.push({x: xSam, y: ySam});

      }
      //console.log(samCircleData);

      thisGraph.graph.append('path')
        .attr('class', 'samCircle')
          .attr('d', thisGraph.lineFunction(samCircleData))
        .attr('transform', 'translate(' + thisGraph.width/2 + ',' + thisGraph.height/2 + ')')
          .attr('stroke', '#0D5673')
          .attr('stroke-width', 3)
          .attr('fill', 'none');
    };

  }]);