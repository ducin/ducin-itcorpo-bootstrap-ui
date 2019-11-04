export const employeesPage = () => ({
  getElements: (root) => ({
    autocomplete: root.querySelector('.autocomplete'),
    form: root.querySelector('.form'),
    content: root.querySelector('.content'),
    pagination: root.querySelector('.pagination'),
  }),
  getTemplate: () => `
    <div class="autocomplete">
    </div>
    <div class="form">
    </div>
    <div class="content">
      <ul>
        <li>hello</li>
        <li>employees</li>
      </ul>
    </div>
    <div class="pagination">
    </div>
  `
})
