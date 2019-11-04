export class AutoComplete {
  constructor(
    private el: HTMLElement
  ){
    this.render()
  }

  bind(): void {
    const $el = $(this.el);

    $('.complex').autoComplete({
      resolver: 'custom',
      formatResult: function(item){
        return { id: item, text: item, html: item }
      },
      events: {
        search: function (query, callback) {
          fetch(`http://localhost:3000/employees?name_like=${query}`)
            .then(resp => resp.json())
            .then(data => callback([
              'Józek',
              'Marta'
            ]))
        }
      }
    });

    $('.complex').on('autocomplete.select', function (e, item) {
      console.log(item);
      e.preventDefault();
      e.stopPropagation();
    });

    $el.on('click', 'a', function(e){
      e.preventDefault();
      e.stopPropagation();
    })
  }

  render(): void {
    this.el.innerHTML = `
<div>
<input class="form-control complex" type="text" autocomplete="off">
</div>
`

    this.bind()
  }
}
