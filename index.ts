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
  projectsTpl,
  benefitsTpl,
} from './templates'
import {
  Pagination,
  AutoComplete,
  Table,
  Form,
} from './components'

// Write TypeScript code!
const main: HTMLElement = document.getElementById('main');

// ROUTING
// https://github.com/krasimir/navigo
import Navigo from 'navigo'

var root = null;
var useHash = true; // Defaults to: false
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
      table.columns = ['elo', 'mordo', 'ładna']
      table.items = [
        ['elo1', 'mordo1', 'ładna1'],
        ['elo2', 'mordo2', 'ładna2'],
        ['elo3', 'mordo3', 'ładna3'],
      ]

      const pagination = new Pagination(el.pagination)
      pagination.pages = [1,2,3,4]
    },
    'projects': function () {
      main.innerHTML = projectsTpl()
    },
    'benefits': function () {
      main.innerHTML = benefitsTpl()
    },
    '': function () {
      main.innerHTML = mainTpl()
      // const autocomplete = new AutoComplete(paginationEl)
    }
  })
  .resolve();

// redirect with:
// router.navigate('/benefits')
