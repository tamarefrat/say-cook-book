import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'link': {
    'cursor': 'pointer',
    'WebkitTapHighlightColor': 'transparent'
  },
  'body-margin': {
    'margin': [{ 'unit': 'px', 'value': 15 }, { 'unit': 'px', 'value': 15 }, { 'unit': 'px', 'value': 15 }, { 'unit': 'px', 'value': 15 }],
    'padding': [{ 'unit': 'px', 'value': 3 }, { 'unit': 'px', 'value': 3 }, { 'unit': 'px', 'value': 3 }, { 'unit': 'px', 'value': 3 }]
  },
  'main': {
    'height': [{ 'unit': '%V', 'value': 0.8 }],
    'backgroundColor': '#484242',
    'minHeight': [{ 'unit': 'px', 'value': 400 }]
  },
  'h1': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'em', 'value': 0.67 }, { 'unit': 'em', 'value': 0.3 }, { 'unit': 'em', 'value': 0.67 }, { 'unit': 'em', 'value': 0.3 }],
    'color': '#FF9800'
  }
});
