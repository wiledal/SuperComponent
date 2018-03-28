/**
  The base component of all living things.

  Extend this to create fast components with built-in event handling
  and auto child-reference assignment.

  A _SuperComponent_ follows the `CustomElement` lifecycle, with some additions:
  - `connected()`: Called when the element is added to the DOM
  - `willRender()`: Everytime before the element renders
  - `get template()`: Gets the template of the element
  - `didRender()`: Called immediately after the rendering is done
  - `disconnected()`: Called when and if the element is removed from the DOM

  Special child attributes:
  - `data-on`: Assigns a callback on the nearest parent for the event supplied.
  Multiple events can be added by separating with a comma (,).
  ```html
<custom-element>
  <!-- Call this._onClick on the parent upon click, and this._onHover on mouseenter -->
  <div data-on="click:_onClick, mouseenter: _onHover">Click or hover me</div>
</custom-element>
  ```

  - `data-ref`: Assigns a variable reference to the element on the parent.
  The reference is available in the scope as `this.referenceName`
  ```html
<custom-element>
  <!-- This child is available as this._childElement on the parent custom element -->
  <div data-ref="_childElement"></div>
</custom-element>
  ```

  Usage example:
```html
  <script>
    class MyCoolElement extends SuperComponent {
      get template () { return `
        <h1 data-ref="_title">I will turn red if the button is clicked.</h1>
        <button data-on="click: _onClickButton, mouseenter: _onHoverButton">Click me</button>
      `}

      get autoBind () { return [
        'someMethod'
      ]}

      _someMethod () {
        // Do stuff
      }

      _onHoverButton (event) {
        this._title.style.background = 'blue'
      }

      _onClickButton (event) {
        this._title.style.background = 'red'
        alert('Child was clicked!')
      }
    }
    customElements.define('my-cool-element', MyCoolElement)
  </script>

  <my-cool-element></my-cool-element>
```

  @extends HTMLElement
*/
class SuperComponent extends HTMLElement {
  /**
    Called natively when the element is added to the DOM
    Calls `this.connected()`
    Calls `this.render()`

    @private
  */
  connectedCallback () {
    this.connected()
    if (this.autoBind) this.bindAll(this.autoBind)
    this.render()
  }

  /**
   * Called when the element is added to the DOM
   *
   * @public
   */
  connected () {}

  /**
    Called natively when the element is removed from the DOM
    Calls `this.disconnected()` if defined.

    @private
  */
  disconnectedCallback () {
    if (this.disconnected) this.disconnected()
  }

  /**
   * Called when the element is removed from the DOM
   *
   * @public
   */
  disconnected () {}

  /**
    Returns the html of the element, should be defined as a `{Getter}`

    @returns {String}
    @public
  */
  get template () {
    return false
  }

  /**
   * Auto-binds and array of method names to this object.
   * An automatic way of calling `this.bindAll(['methodOne', 'methodTwo'])`.
   *
   * @return {Array} The array of method names
   * @example
   *  get autoBind () { [
   *    '_methodOne',
   *    '_metbodTwo'
   *  ] }
   */
  get autoBind () { return null }

  /**
   * Called first on `render()`, before the innerHTML is updated.
   *
   * @public
   */
  willRender () {}

  /**
    Renders the template in the element.
    Called when the element is added to the DOM.
    Can be called when template needs to be updated, but should be used sparingly.

    @public
  */
  render () {
    this.willRender()
    if (this.template) this.innerHTML = this.template
    this.parseChildren()
    this.didRender()
  }

  /**
   * Called last on `render()`, after the innerHTML is updated and children are parsed.
   *
   * @public
   */
  didRender () {}

  /**
    Goes through all relevant children and assigns references as well as events to them.
    - Children with `data-on` will get attached handlers to their events
    - Children with `data-ref` will be attached to a variable on this element

    @public
  */
  parseChildren () {
    ;[].slice.call(this.querySelectorAll('[data-on]')).forEach((el) => {
      var split = el.dataset.on.split(',')
      split.forEach((s) => {
        var splat = s.split(':')
        // Autobind? Kind of weird, might want to assess in future
        if (this[splat[1].trim()]) el['on' + splat[0].trim()] = this[splat[1].trim()].bind(this)
      })
    })

    ;[].slice.call(this.querySelectorAll('[data-ref]')).forEach((el) => {
      this[el.dataset.ref] = el
    })
  }

  /**
    Binds an array of method names to the element

    @example
this.bindAll([
  '_onClick',
  '_onHover',
  '_onClickItem'
])
    @param {Array} methods An array of method names to be bound
    @public
  */
  bindAll (methods) {
    methods.forEach(meth => {
      // Meth, not even once
      this[meth] = this[meth].bind(this)
    })
  }

  /**
    Triggers an event and callback-method if assigned

    @example
el.triggerEvent('coolcustomevent', {
  someCustomData: 'here',
  andMaybeSome: 'more'
})
    @param {String} eventName The name of the event to be called
    @param {Object} [detail] An object with information to be used by listeners
    @public
  */
  triggerEvent (eventName, detail) {
    var ce = new CustomEvent(eventName, {
      detail
    })
    this.dispatchEvent(ce)
    if (this[`on${eventName}`]) this[`on${eventName}`](ce)
  }
}

SuperComponent.version = '2.0.0'

if (typeof module != 'undefined') module.exports = SuperComponent
if (typeof exports != 'undefined') exports['default'] = SuperComponent
