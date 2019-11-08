// Import stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css';

// jquery is required for bootstrap
import $ from 'jquery'
// @ts-ignore
window.jQuery = window.$ = $

// bootstrap
import 'bootstrap'

import './lib/bootstrap-autocomplete/dist/latest/bootstrap-autocomplete'

// import 'bootstrap-autocomplete'

import {
  mainTpl,
  employeesPage,
  projectsPage,
  benefitsPage,
} from './templates'
import {
  Pagination,
  AutoComplete,
  Table,
  List,
  Form,
} from './components'

// Write TypeScript code!
const main: HTMLElement = document.getElementById('main');

// ROUTING
// https://github.com/krasimir/navigo
import Navigo from 'navigo'
import { getProjects, generateReport, GenerateReportCommand } from './api';

var root = null;
var useHash = false; // Defaults to: false
var hash = '#!'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

router
  .on({
    'employees': function () {
      const { getTemplate, getElements } = employeesPage()
      main.innerHTML = getTemplate()
      const el = getElements(main)

      const autocomplete = new AutoComplete(el.autocomplete)

      const form = new Form(el.form)

      const table = new Table(el.content)
      table.columns = ['kolumna A', 'kolumna B', 'kolumna C']
      table.items = [
        ['456', '5874567', '345'],
        ['5467', '234523', '43567456'],
        ['24356', '34523', '234523'],
      ]

      const pagination = new Pagination(el.pagination)
      pagination.pages = [1,2,3,4]
    },
    'projects': function () {
      const { getTemplate, getElements } = projectsPage()
      main.innerHTML = getTemplate()
      const el = getElements(main)

      const list = new List(el.content)
      list.header = 'Projekty'
      list.items = [
        'robota po godzinach - Jan Kowalski',
        'smaczne naleśniki - Andrzej Nowak',
        'usługi księgowe - Krystyna Sochacka',
      ];

      getProjects()
        .then(projects => {
          list.items = projects.map(p => p.name)
        })
      
      const exampleCommand: GenerateReportCommand = {
        id: '731f8760-f251-4d9f-93d6-0bbe27fe3377',
        extention: "pdf",
        type: "project",
        scheduledAt: (new Date()).toISOString()
      }
      generateReport(exampleCommand)
    },
    'benefits': function () {
      const { getTemplate, getElements } = benefitsPage()
      main.innerHTML = getTemplate()
      const el = getElements(main)

      const list = new List(el.content)
      list.header = 'Benefity pracownicze'
      list.items = [
        'multi sport',
        'bony centrum handlowe',
        'bony biedronka',
      ]
    },
    '*': function () {
      main.innerHTML = mainTpl()
    }
  })
  .resolve();

// redirect with:
// router.navigate('/benefits')
