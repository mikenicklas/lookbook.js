# Lookbook.js
A simple jQuery plugin to create interactive lookbooks.

#### Dependencies
1. jQuery
2. Bootstrap CSS and JavaScript for popovers

#### Screenshot
![alt text](http://i.imgur.com/7p7TYx4g.png "Lookbook.js Example")

## Usage

**Add an image to the page with a JSON string of the various focal points of the image:**

```html
<img src="https://unsplash.it/1000/1000/?image=856" data-lookbook-points='[{"posX":617,"posY":321,"title":"White Shirt","description":"White shirts lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse aliquam elit ut ipsum volutpa."},{"posX":800,"posY":650,"title":"Pocket Square","description":"Pocket squares lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse aliquam elit ut ipsum volutpa."}]' class="lookbook" alt="Some Image">
```

**Initialize the jQuery lookbook plugin:**

```javascript
$(document).ready(function() {
    $('.lookbook').lookbook();
 });
```
