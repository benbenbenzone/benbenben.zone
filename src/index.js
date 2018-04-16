import {
  h,
  render
} from 'preact'
import 'preact/devtools'
import Heading from './components/Heading'

const mountNode = document.getElementById('root')

render((
  <Heading text='Hello World!' />
), mountNode, mountNode.lastChild)
