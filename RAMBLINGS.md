# DELEGATE


## Examples

### Visualizing a file upload

## Differneces to dojo.connect

- Events <-> methods

  Dojo:
  - explicit
  - src event -> method or dest obj's method

  Delegate:
  - implicit
  - src event -> dest obj's method
  - optionally translated through proxy


- Multiple events

  Dojo: One source event to one target method
  Delegate: Forward all events, routed by a map


- Binding to obj's events

  Dojo: Overrides method with dispatcher
  Delegate: Unobtrusive, explicit mixin


## Ideas

- Drop map parameter and proxy dest

    # delegate and proxy are library methods

    delegate(src, proxy({foo: 'bar'})(dest))

    delegate(src, proxy({
        foo: function(){
            this.bar();
            this.bar();
        }
    })(dest))

    var clickToClose = proxy({click: 'close'})

    delegate(src, clickToClose(dest))

- number of sources: one or many
- number of targets: one or many
- number of events: none/one/some/all
- translation of events via map
- event source dom or obj

    # one: src 'click' -> 'close' dest
    delegate(src, 'click', 'close', dest)

    # some: src 'touchstart', 'touchmove', 'touchend' -> 'touch' dest
    delegate(src, ['touchstart', 'touchmove', 'touchend'], 'touch', dest)

    # all: src -> dest
    delegate(src, dest)
