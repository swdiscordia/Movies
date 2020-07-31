import { StyleSheet } from 'react-native';

const SearchStyles = StyleSheet.create({ 
  container: {
    flex: 1,
    paddingTop: 30,
  },

  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

  input: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    paddingLeft: 5,
  },

  button: {
    height: 50,
  },
})

export default SearchStyles;