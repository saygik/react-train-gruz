import "@babel/polyfill";
import "isomorphic-fetch";

import React from 'react'
import {ViewScroll} from './containers/index'
import Navbar from './navbar'

import "./app.css"
import 'bootstrap/dist/css/bootstrap.min.css'

const  App = () =>
              <ViewScroll>
                    <Navbar />
              </ViewScroll>
export default App
