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

// Write TypeScript code!
const main: HTMLElement = document.getElementById('main');

// ROUTING
// https://github.com/krasimir/navigo
import Navigo from 'navigo'

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
  ProjectsList,
  Form,
} from './components'

import {
  getProjects,
  generateReport,
  createGenerateReportCommand,
  getReport,
  getReportFileURL,
  Report
} from './api';
import { waitUntil } from './time'
import { downloadFile } from './utils'

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

      const handleGenerate = async (id: string) => {
        const command = createGenerateReportCommand(id)
        const scheduledReport = await generateReport(command)
        console.log(`scheduled: ${scheduledReport.id}`)
        let report: Report

        await waitUntil(async () => {
          report = await getReport(scheduledReport.id)
          console.log("CURRENT REPORT",
            report.ready ? 'finished' : 'unfinished',
            report)
          return report.ready
        }, 1000)

        // at this point, the report is ready
        downloadFile(getReportFileURL(report.id), report.filename)
      }
      const list = new ProjectsList(el.content, handleGenerate)
      list.header = 'Projekty'
      list.items = [
        {
          id: 'wevyeu6-cw3y537-f3h6c3-6hjf45',
          label: 'robota po godzinach - Jan Kowalski'
        },
        {
          id: 'ev57jn-yn-35cy3dn3f5yb-35dfh356-hfg35',
          label: 'smaczne naleśniki - Andrzej Nowak'
        },
        {
          id: 'w4fy35h6-35h3f56h3-s245hdg4fjy-f5yh',
          label: 'usługi księgowe - Krystyna Sochacka'
        }
      ];

      getProjects()
        .then(projects => {
          list.items = projects.map(({ id, name }) => ({
            id, label: name
          }))
        })
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
