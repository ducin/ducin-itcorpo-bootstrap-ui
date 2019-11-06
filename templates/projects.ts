export const projectsPage = () => ({
  getElements: (root) => ({
    content: root.querySelector('.content'),
  }),
  getTemplate: () => `
    <div class="content">
    List:
      <ul>
      <li>hello</li>
      <li>projects</li>
      </ul>
    </div>
  `
})
