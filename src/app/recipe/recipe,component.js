import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'this': {
    'textAlign': 'center !important'
  },
  'bigIcon': {
    'width': [{ 'unit': 'px', 'value': 250 }],
    'height': [{ 'unit': 'px', 'value': 250 }],
    'opacity': '20%'
  },
  'nameRecipe': {
    'fontSize': [{ 'unit': 'string', 'value': 'xx-large' }]
  },
  'mat-stepper-vertical': {
    'display': 'block'
  },
  'mat-stepper-horizontal': {
    'display': 'block'
  },
  'mat-horizontal-stepper-header-container': {
    'whiteSpace': 'nowrap',
    'display': 'flex',
    'alignItems': 'center'
  },
  'mat-stepper-horizontal-line': {
    'borderTopWidth': [{ 'unit': 'px', 'value': 1 }],
    'borderTopStyle': 'solid',
    'flex': 'auto',
    'height': [{ 'unit': 'px', 'value': 0 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': -16 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': -16 }],
    'minWidth': [{ 'unit': 'px', 'value': 32 }]
  },
  'mat-horizontal-stepper-header': {
    'display': 'flex',
    'height': [{ 'unit': 'px', 'value': 72 }],
    'overflow': 'hidden',
    'alignItems': 'center',
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 24 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 24 }]
  },
  'mat-horizontal-stepper-header mat-step-icon': {
    'marginRight': [{ 'unit': 'px', 'value': 8 }],
    'flex': 'none'
  },
  'mat-horizontal-stepper-header mat-step-icon-not-touched': {
    'marginRight': [{ 'unit': 'px', 'value': 8 }],
    'flex': 'none'
  },
  '[dir='rtl'] mat-horizontal-stepper-header mat-step-icon': {
    'marginRight': [{ 'unit': 'px', 'value': 0 }],
    'marginLeft': [{ 'unit': 'px', 'value': 8 }]
  },
  '[dir='rtl']
mat-horizontal-stepper-header mat-step-icon-not-touched': {
    'marginRight': [{ 'unit': 'px', 'value': 0 }],
    'marginLeft': [{ 'unit': 'px', 'value': 8 }]
  },
  'mat-vertical-stepper-header': {
    'display': 'flex',
    'alignItems': 'center',
    'padding': [{ 'unit': 'px', 'value': 24 }, { 'unit': 'px', 'value': 24 }, { 'unit': 'px', 'value': 24 }, { 'unit': 'px', 'value': 24 }],
    'maxHeight': [{ 'unit': 'px', 'value': 24 }]
  },
  'mat-vertical-stepper-header mat-step-icon': {
    'marginRight': [{ 'unit': 'px', 'value': 12 }]
  },
  'mat-vertical-stepper-header mat-step-icon-not-touched': {
    'marginRight': [{ 'unit': 'px', 'value': 12 }]
  },
  '[dir='rtl'] mat-vertical-stepper-header mat-step-icon': {
    'marginRight': [{ 'unit': 'px', 'value': 0 }],
    'marginLeft': [{ 'unit': 'px', 'value': 12 }]
  },
  '[dir='rtl']
mat-vertical-stepper-header mat-step-icon-not-touched': {
    'marginRight': [{ 'unit': 'px', 'value': 0 }],
    'marginLeft': [{ 'unit': 'px', 'value': 12 }]
  },
  'mat-horizontal-stepper-content': {
    'overflow': 'hidden'
  },
  'mat-horizontal-stepper-content[aria-expanded='false']': {
    'height': [{ 'unit': 'px', 'value': 0 }]
  },
  'mat-horizontal-content-container': {
    'overflow': 'hidden',
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 24 }, { 'unit': 'px', 'value': 24 }, { 'unit': 'px', 'value': 24 }]
  },
  'mat-vertical-content-container': {
    'marginLeft': [{ 'unit': 'px', 'value': 36 }],
    'border': [{ 'unit': 'px', 'value': 0 }],
    'position': 'relative'
  },
  '[dir='rtl'] mat-vertical-content-container': {
    'marginLeft': [{ 'unit': 'px', 'value': 0 }],
    'marginRight': [{ 'unit': 'px', 'value': 36 }]
  },
  'mat-stepper-vertical-line::before': {
    'content': '''',
    'position': 'absolute',
    'top': [{ 'unit': 'px', 'value': -16 }],
    'bottom': [{ 'unit': 'px', 'value': -16 }],
    'left': [{ 'unit': 'px', 'value': 0 }],
    'borderLeftWidth': [{ 'unit': 'px', 'value': 1 }],
    'borderLeftStyle': 'solid'
  },
  '[dir='rtl'] mat-stepper-vertical-line::before': {
    'left': [{ 'unit': 'string', 'value': 'auto' }],
    'right': [{ 'unit': 'px', 'value': 0 }]
  },
  'mat-vertical-stepper-content': {
    'overflow': 'hidden'
  },
  'mat-vertical-content': {
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 24 }, { 'unit': 'px', 'value': 24 }, { 'unit': 'px', 'value': 24 }]
  },
  'mat-step:last-child mat-vertical-content-container': {
    'border': [{ 'unit': 'string', 'value': 'none' }]
  }
});
