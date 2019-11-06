export const benefitsPage = () => ({
  getElements: (root) => ({
    content: root.querySelector('.content'),
  }),
  getTemplate: () => `
    <div class="content">
    List:
      <ul>
      <li>hello</li>
      <li>benefits</li>
      </ul>
    </div>
  `
})
