type Item = {
  id: string
  label: string
}

export class ProjectsList {
  constructor(
    private el: HTMLElement,
    private handleGenerate?: (id: string) => void
  ){
    this.render()
  }

  private _items: Item[] = []
  set items(data: Item[]) {
    this._items = data
    this.render()
  }

  private _header: string = '';
  set header(data: string) {
    this._header = data
    this.render()
  }

  private onGenerateClick = (e) => {
    e.preventDefault()
    const id = (e.target as HTMLElement).parentElement.dataset.id;
    this.handleGenerate && this.handleGenerate(id);
  }

  bind(): void {
    this.el.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', this.onGenerateClick);
    });
  }

  unbind(): void {
    this.el.querySelectorAll('button').forEach(btn => {
      btn.removeEventListener('click', this.onGenerateClick);
    });
  }

  render(): void {
    this.unbind();

    this.el.innerHTML = `
<h2>${ this._header }</h2>
<ul>
${ this._items.map(item =>
  `<li data-id="${item.id}">
    ${ item.label }
    <button>📝</button>
  </li>`
).join('\n')}
</ul>`

    this.bind()
  }
}
