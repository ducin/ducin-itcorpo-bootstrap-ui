export class Table {
  constructor(
    private el: HTMLElement
  ){
    this.render()
  }

  private _columns: string[] = []
  set columns(data: string[]) {
    this._columns = data
    this.render()
  }

  private _items: string[][] = []
  set items(data){
    this._items = data
    this.render()
  }

  bind(): void {}

  render(): void {
    this.el.innerHTML = `
<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      ${ this._columns.map(col =>
        `<th scope="col">${ col }</th>`
      ).join('\n')}
    </tr>
  </thead>
  <tbody>
  ${ this._items.map((item, idx) =>
    `<tr>
      <th scope="row">${ idx + 1 }</th>
      ${ item.map(cell =>
        `<td>${ cell }</td>`
      ).join('\n')}
    </tr>`
  ).join('\n')}
  </tbody>
</table>`

    this.bind()
  }
}
