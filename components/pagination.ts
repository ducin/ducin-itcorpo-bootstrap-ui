export class Pagination {
  constructor(
    private el: HTMLElement
  ){
    this.render()
  }

  private _pages: string[] = []
  set pages(value){
    this._pages = value
    this.render()
  }

  private onClick = (e) => {
    console.log((e.target as HTMLElement).dataset.page)
    e.preventDefault()
  }

  bind(): void {
    this.el.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', this.onClick);
    });
  }

  unbind(): void {
    this.el.querySelectorAll('li').forEach(li => {
      li.removeEventListener('click', this.onClick);
    });
  }

  render(): void {
    this.unbind();

    this.el.innerHTML = `
<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" data-page="prev" href="#">Previous</a></li>
    ${ this._pages.map(p =>
      `<li class="page-item"><a class="page-link" data-page="${p}" href="#">${ p }</a></li>`
    ).join('\n') }
    <li class="page-item"><a class="page-link" data-page="next" href="#">Next</a></li>
  </ul>
</nav>
`

    this.bind()
  }
}
