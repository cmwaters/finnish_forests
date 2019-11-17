var routes = document.currentScript.getAttribute('routes');
var JSONroutes = JSON.parse(routes);
//alert(JSONroute.name)

google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

        // Set chart options
        var options = {'title':'Traffic prediction today',
                       'width':400,
                       'height':300,
                       'colors': ['Green'],
                       'backgroundColor': { fill:'transparent' },
                       'chartArea': {'width': '80%', 'height': '80%'},
                       'legend': {'position': 'bottom'}
                    };

        // Instantiate and draw our chart, passing in some options.
        //alert('chart_div' + JSONroute._id)
        for (let i = 0; i < JSONroutes.length; i++) {
            
            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Hour');
            data.addColumn('number', 'Visitors');
            /*
            data.addRows([
              ['12', 3],
              ['Onions', 1],
              ['Olives', 1],
              ['Zucchini', 1],
              ['Pepperoni', 2]
            ]);
            */

            
            //var dataTableData = google.visualization.arrayToDataTable(JSONroutes[i].prediction);
            predictions = JSONroutes[i].prediction;
            var twod = [];
            for(let i = 0; i < predictions.length;i++)
            {
              twod.push([i,predictions[i]]);
            }
            console.log(twod);
            data.addRows(twod);


            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div' + JSONroutes[i]._id));
            chart.draw(data, options);
        }

      }