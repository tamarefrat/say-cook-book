import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  '#searchImg': {
    'width': [{ 'unit': 'px', 'value': 40 }],
    'height': [{ 'unit': 'px', 'value': 40 }],
    'marginBottom': [{ 'unit': 'px', 'value': 12 }]
  },
  '#myInput': {
    'float': 'left',
    'backgroundPosition': '10px 12px',
    // background-repeat: no-repeat;
    'width': [{ 'unit': '%H', 'value': 0.8 }],
    'fontSize': [{ 'unit': 'px', 'value': 16 }],
    'padding': [{ 'unit': 'px', 'value': 12 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 12 }, { 'unit': 'px', 'value': 40 }],
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#ddd' }],
    'marginBottom': [{ 'unit': 'px', 'value': 12 }]
  }
});
