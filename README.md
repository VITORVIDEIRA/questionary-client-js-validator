# questionary-client-js-validator

This is a Client Js validator to radio questionaries.
For use it following the steps.

The questions need to be contained with a div. Like the exemple:
------
```html
<div class="o-form-opinion__group--items" id="question-1"></div>
```
The id need to follow the this pattern question-(number)

For all radios with a textarea complement is required to add the following atribute
------
data-complement="/your-choice-name/"

The respect textarea need to recive and id with the same name.
------
id="/your-choice-name/"
