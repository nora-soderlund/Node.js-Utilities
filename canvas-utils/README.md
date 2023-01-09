# Context2DTextUtils

A class for handling text rendering in a `CanvasRenderingContext2D` context.

## Properties

- `wordBreak`: A string that determines how the text is wrapped. Can be either `"break-words"` or `"break-all"`. Default is `"break-words"`.

## Constructor

### `constructor(context: CanvasRenderingContext2D | any)`

Creates a new `Context2DTextUtils` instance.

**Parameters:**

- `context`: The `CanvasRenderingContext2D` context in which the text will be rendered.

## Methods

### `getFontSize()`

Returns the size of the font in pixels.

**Return value:**

- A number representing the font size in pixels.

### `fillTextBounds(text: string, x: number, y: number, width: number, height: number): TextBounds`

Renders the given text in the given `CanvasRenderingContext2D` context, and returns the bounding box of the rendered text.

**Parameters:**

- `text`: The text to be rendered.
- `x`: The x coordinate of the top-left corner of the bounding box in which the text will be rendered.
- `y`: The y coordinate of the top-left corner of the bounding box in which the text will be rendered.
- `width`: The width of the bounding box in which the text will be rendered.
- `height`: The height of the bounding box in which the text will be rendered.

**Return value:**

- A `TextBounds` object containing the `actualWidth` and `actualHeight` of the rendered text.

## Types

### `TextBounds`

An object containing the `actualWidth` and `actualHeight` of the rendered text.

- `actualWidth`: The actual width of the rendered text.
- `actualHeight`: The actual height of the rendered text.
