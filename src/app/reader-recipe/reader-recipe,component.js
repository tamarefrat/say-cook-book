import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'animate-enter': {
    'WebkitTransition': '300ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all',
    'MozTransition': '300ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all',
    'MsTransition': '300ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all',
    'OTransition': '300ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all',
    'transition': '300ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all'
  },
  'animate-leave': {
    'WebkitTransition': '300ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all',
    'MozTransition': '300ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all',
    'MsTransition': '300ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all',
    'OTransition': '300ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all',
    'transition': '300ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all'
  },
  'animate-enter': {
    'left': [{ 'unit': '%H', 'value': 1 }]
  },
  'animate-enteranimate-enter-active': {
    'left': [{ 'unit': 'px', 'value': 0 }]
  },
  'animate-leave': {
    'left': [{ 'unit': 'px', 'value': 0 }]
  },
  'animate-leaveanimate-leave-active': {
    'left': [{ 'unit': '%H', 'value': -1 }]
  },
  'mat-iconrecord_iconanimatedflashinfinitemat-iconmaterial-icons': {
    'fontSize': [{ 'unit': 'px', 'value': 200 }],
    'color': 'red',
    'marginBottom': [{ 'unit': 'px', 'value': 120 }],
    'textAlign': 'center',
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  '#rec': {
    'fontSize': [{ 'unit': 'px', 'value': 200 }],
    'color': 'red',
    'marginBottom': [{ 'unit': 'px', 'value': 120 }],
    'textAlign': 'center',
    'width': [{ 'unit': '%H', 'value': 1 }]
  }
});
