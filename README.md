# HeatMapper
## A JavaScript tool for creating a custom heat map

HeatMapper allows you to easily create a scale of colors to fetch values from. It automatically calculates the midpoint between two specified colors and returns it in a usable hex format. Preload data when you create the object or create new HeatMappers as needed (see interface code as example). It can be as simplistic or powerful as is desired.

A HeatMapper object can be very easily created using the [HeatMapper Generator Web Interface](https://rawgit.com/dankramp/HeatMapper.js/master/generator.html) and copying the code provided. Otherwise, the process of constructing/using the HeatMapper class is as follows:

Construct a HeatMapper object with an array of colors and corresponding scale.
  - The HeatMapper object will accept the arguments provided that:
    - The arrays are of equal length
    - The colors are in hex format ('#rrggbb' or '#rgb')
    - The scale numbers are in order from least to greatest
  - Colors are mapped to values at the same index in the scale array
  - Values below or above the min and max scale values will return the color at the min or max accordingly
  - Values between two colors will return a color calculated linearly (or logarithmically) between its surrounding colors.

### Example Usage
Let's suppose you are creating a topographical map based on a 2D array of height values. You could write a function that takes the value of the height and calculates a color based on a quadratic curve that eventually approaches 255 for red, starts at 50 then decreases towards 0 for green, and so on. Then, if the height is greater than some value, you apply a different function so it maps towards a different color. This approach is incredibly limiting and is only practical for two colors at most.

With HeatMapper, simply specify an array of colors in hex format and a corresponding array of numbers at which each color is set and the rest is done for you:
```
var colors = ['#ffffff', '#ff0000', '#ffff00', '#0000ff'];
var scale = [1, 5, 15, 50];
var heatmap = new HeatMapper(colors, scale);
```
To get the color at any value just use the `getHexColor()` function:

```heatmap.getHexColor(12); // '#ffb200'```;

See _generatorScript.js_ or _test.html_ for examples of HeatMapper in use.