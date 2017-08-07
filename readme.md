# SuperComponent?

This is a component designed to be used as the extended base of all your
application's elements.
It extends the standard `HTMLElement` and follows the class-based v1 CustomElement pattern, with some nifty additions,
such as:

- Element attribute child-reference binding
- Element attribute event binding

The lowest level of your _frameworkless js_ app. It's also something like 1kb gzipped 🔥. So that's nice.

Can be used with _server-side_ rendering to provide js sprinkles on top of your pre-rendered elements, or for rendering complete applications _client-side_.

Check out the `/examples` for some test-uses.  
Check out the `/docs` for actual documentation.  

It's like, if you don't want to commit to _React_ or _Angular_ or _Vue_ but want to skip writing event listeners and querySelectors all the time, kinda.
Anyone with JS knowledge can use it.  
It works really well in a [vanilla bean type codebase](https://github.com/wiledal/vanilla-bean).

Compile it with [Babel](https://babeljs.io/) and use with a [CustomElements polyfill](https://github.com/WebReflection/document-register-element) for cross/old-browser support.

Add cool animations with [AnimationService](https://github.com/wiledal/animation-service)
