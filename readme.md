# SuperComponent?

This is a component designed to be used as the extended base of all your
application's elements.
It follows the class-based v1 CustomElement pattern, with some nifty additions,
such as:

- Element attribute child-reference binding
- Element attribute event binding

The lowest level of your _frameworkless js_ app.

Can be used with _server-side_ rendering to provide js sprinkles on top of your prerendered elements, or for rendering complete applications _client-side_.

Check out the `/examples` for some test-uses.  
Check out the `/docs` for actual documentation.  

It's like, if you don't want to commit to _React_ or _Angular_ or _Vue_ but want to skip writing event listeners and querySelectors all the time, kinda.
Anyone with js knowledge can use it.

Compile it with [Babel](https://babeljs.io/) and use with the [CustomElements polyfill](https://github.com/webcomponents/custom-elements) for cross-browser support.
