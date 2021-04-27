# questionary-client-js-validator

This is a Client Js validator to radio questionaries.
To use it follow the steps.

The questions need to be contained in a div. Like the exemple:
------
```html
<div class="o-form-opinion__group--items" id="question-1"></div>
```
The id needs to follow this pattern 'question-(number)'

For all radios with a complement textarea, it is required to add the following atribute
------
data-complement="/your-choice-name/"

The respective textarea needs to recive an id with the same name.
------
id="/your-choice-name/"
