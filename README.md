# HeatMapper
## A JavaScript tool for creating a custom heat map

HeatMapper allows you to easily create a scale of colors to fetch values from. It automatically calculates the midpoint between two specified colors and returns it in a usable hex format. Either preload data when you create the object, or dynamically update it as you go using provided helper functions. It can be as simplistic or powerful as is desired.

### Example
Let's suppose you are creating a topographical map based on a 2D array of height values. You could write a function that takes the value of the height and calculates a color based on a quadratic curve that eventually approaches 255 for red, starts at 50 then decreases towards 0 for green, and so on. Then, if the height is greater than some value, you apply a different function so it maps towards a different color. This approach is incredibly limiting and is only practical for two colors at most.

With HeatMapper, simply specify an array of colors in hex format and a corresponding array of numbers at which each color is set and the rest is done for you:
```var colors = ['#ffffff', '#ff0000', '#ffff00', '#0000ff'];
var scale = [1, 5, 15, 50];
var heatmap = new HeatMapper(colors, scale);
```
To get the color at any value just use the `getHexColor()` function:

```heatmap.getHexColor(12); // '#'```;