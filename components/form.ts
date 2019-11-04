export class Form {
  constructor(
    private el: HTMLElement
  ){
    this.render()
  }

  private toJSONString( form ) {
		var obj = {};
		var elements = form.querySelectorAll( "input, select, textarea" );
		for( var i = 0; i < elements.length; ++i ) {
			var element = elements[i];
			var name = element.name;
			var value = element.value;

			if( name ) {
				obj[ name ] = value;
			}
		}
    return obj;
  }

  private onSubmit = (e) => {
    // all inputs must have `name`s
    const data = this.toJSONString(this.el.querySelector('form'))
    console.log(data);

    e.preventDefault();
    return false; // don't submit
  }

  bind(): void {
    this.el.querySelector('button')
      .addEventListener('click', this.onSubmit);
  }

  unbind(): void {
    const $btn = this.el.querySelector('button')
    if ($btn) {
      $btn.removeEventListener('click', this.onSubmit);
    }
  }

  render(): void {
    this.unbind();

    this.el.innerHTML = `
<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input name="exampleInputEmail1" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input name="exampleInputPassword1" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-group form-check">
    <input name="exampleCheck1" type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
`

    this.bind()
  }
}
