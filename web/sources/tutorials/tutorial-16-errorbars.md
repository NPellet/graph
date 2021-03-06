---
layout: page-sidemenu
subtitle: 'Error bars'
---
## Error bars
<script>

</script>

jsGraph can display error bars and error boxes in `scatter`, `line` and `bar` series. Error bars are used to display the uncertainty in a measurement that can be represented by one standard deviation, one standard error, or a certain interval of considence. They are used to visually check for stastical significance between different measurements. jsGraph implements multiple levels of error bars.
For instance, you could assign 1 &sigma; to the box and 3 &sigma; to the bars. (**Note: ** The syntax used to define error bars in line and scatter series is exactly the same. It can be used interchangeably.)

### <a id="format"></a>Error bar format

Error data are essentially stored in multi-level array, such as : `[ [ [ [ 0.5, 0.2 ], [ 0.8, 0.2 ] ] ] ]`

- The first level corresponds to your data. Error at index n of the array will be assigned to dat at index n.
- The second level differentiates error bars in the x or the y direction. First argument is y, second is x. You can omit the x value if needed, but there still needs to be an array.
- The third level reprensents bars or boxes. To know which one is which, refer to the order you specified in the `setErrorStyle` function. Use `false` or `null` not to display errors of this level for this particular point
- The fourth level represents above/below or lefthand/righthand error bars/boxes. Use only one argument to make it symmetric.

#### <a id="format-example"></a>Example

Here are a few examples to help the reader understand

- [ null, [ [ 3 ], [ [ 4, 5 ] ] ] ] Assigns to the second point of your data a value in the y direction (3) and a value in the x direction (4 and 5). Both of these values are in the first level of error (they have the same type). The value in the y direction (3) is symmetrical above and below the point (+3 and -3). While in the x dimension, the value on the lefthand side is 4 and on the righthand side 5.

- [ null, null, [ null, [ 4, 5 ] ] ] assigns to the third point of your data no error bar in the y dimension, and two error bar (or boxes) in the x dimension (level 3, remember ?). Both values are symmetrical left and right of the point.

- [ null, null, [ null, [ 4, [ 3, 2 ] ] ] ] same as before, except that the second error level is no more symmetrical, but takes the value 3 (left) and 2 (right).

### <a id="styling"></a>Styling

Setting error data is not enough. You need to tell jsGraph how you want the error to be handled. For that, you need to call the method `setErrorStyle` that takes only one parameter: an array which elements are styles for each level of error. Example:

```javascript
serie.setErrorStyle([
  { type: 'bar', x: {} }, // First level: bars, only displayed in the x direction (top and bottom)
  {
    type: 'box', // Second level: boxes
    top: { strokeColor: 'black', fillColor: 'olive' }, // Displayed in green for boxes above the point
    bottom: { strokeColor: 'black', fillColor: 'crimson' } // And in red for those below
  }
]);
```

### <a id="example"></a>Example with 2 level error bars

Here is an example that displays error bars over a scatter plot

```javascript
var data = [
  [0, 0],
  [0.5, 0.479425538604203],
  [1, 0.8414709848078965],
  [1.5, 0.9974949866040544],
  [2, 0.9092974268256817],
  [2.5, 0.5984721441039564],
  [3, 0.1411200080598672],
  [3.5, -0.35078322768961984],
  [4, -0.7568024953079282],
  [4.5, -0.977530117665097]
];
var errors = [
  [[false, [0.364, 0.278]], [[0.355, 0.1]]],
  [[false, [0.376, 0.398]], [[0.055, 0.37]]],
  [[false, [0.39, 0.286]], [[0.34, 0.205]]],
  [[false, [0.22999999999999998, 0.356]], [[0.39, 0.41]]],
  [[false, [0.27599999999999997, 0.21800000000000003]], [[0.455, 0.345]]],
  [[false, [0.396, 0.328]], [[0.145, 0.33]]],
  [[false, [0.24, 0.266]], [[0.455, 0.46]]],
  [[false, [0.20600000000000002, 0.274]], [[0.215, 0.47]]],
  [[false, [0.20400000000000001, 0.23399999999999999]], [[0.195, 0.305]]],
  [[false, [0.302, 0.282]], [[0.46, 0.49]]]
];

var graph = new Graph('someHTMLId');
var serie = graphinstance.newSerie('serieTest', {}, 'scatter');

serie
  .setLabel('My serie')
  .autoAxis()
  .setData(data)
  .setDataError(error)
  .setErrorStyle([
    { type: 'bar', x: {} },
    {
      type: 'box',
      top: { strokeColor: 'green', fillColor: 'olive' },
      bottom: { strokeColor: 'red', fillColor: '#800000' }
    }
  ]);

graph.draw();
```

<div id="example-1" class="jsgraph-example"></div>

<script>
	
	( function() {

		var data = [[0,0],[0.5,0.479425538604203],[1,0.8414709848078965],[1.5,0.9974949866040544],[2,0.9092974268256817],[2.5,0.5984721441039564],[3,0.1411200080598672],[3.5,-0.35078322768961984],[4,-0.7568024953079282],[4.5,-0.977530117665097]];
		var errors = [[[false,[0.364,0.278]],[[0.355,0.1]]],[[false,[0.376,0.398]],[[0.055,0.37]]],[[false,[0.39,0.286]],[[0.34,0.205]]],[[false,[0.22999999999999998,0.356]],[[0.39,0.41]]],[[false,[0.27599999999999997,0.21800000000000003]],[[0.455,0.345]]],[[false,[0.396,0.328]],[[0.145,0.33]]],[[false,[0.24,0.266]],[[0.455,0.46]]],[[false,[0.20600000000000002,0.274]],[[0.215,0.47]]],[[false,[0.20400000000000001,0.23399999999999999]],[[0.195,0.305]]],[[false,[0.302,0.282]],[[0.46,0.49]]]];

		var graph = new Graph( "example-1" );
		graph.resize( 400, 300 );
		var serie = graph.newSerie("serieTest", {}, "scatter" );

		serie
			.setLabel( "My serie" )
			.autoAxis()
			.setData( data )
			.setDataError( errors )
			.setErrorStyle( [ 
				{ type: 'bar', x: {} }, 
				{ type: 'box', 
					top: { strokeColor: 'green', fillColor: 'olive' }, 
					bottom: { strokeColor: 'red', fillColor: "#800000" }
				} ] 
			);

		graph.draw();


	} ) ();
</script>