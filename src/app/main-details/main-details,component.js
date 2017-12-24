import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'mat-select': {
    // width: 25%;
    'backgroundColor': '#e79950',
    'marginLeft': [{ 'unit': '%H', 'value': 0.05 }],
    'marginBottom': [{ 'unit': '%V', 'value': 0.05 }],
    'height': [{ 'unit': '%V', 'value': 1.5 }]
  },
  'mat-select :hover': {
    'backgroundColor': '#e07b1c'
  }
});
