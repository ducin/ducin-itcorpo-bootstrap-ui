export class List {
  constructor(
    private el: HTMLElement
  ){
    this.render()
  }

  private _items: string[] = []
  set items(data: string[]) {
    this._items = data
    this.render()
  }

  private _header: string = '';
  set header(data: string) {
    this._header = data
    this.render()
  }

  bind(): void {}

  render(): void {
    this.el.innerHTML = `
<h2>${ this._header }</h2>
<ul>
${ this._items.map(item =>
  `<li>${ item }</li>`
).join('\n')}
</ul>`

    this.bind()
  }
}
