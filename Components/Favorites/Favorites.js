import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FilmList from '../FilmList/FilmList';
import { useSelector } from 'react-redux';


const Favorites = ({navigation}) => {

  console.log('PASSAGE DANS Favorites')

  const {favoritesFilm} = useSelector(state => state.toggleFavorite);

  return (
    <View style={styles.main_container}>
      <View style={styles.avatar_container}>
        <Text></Text>
      </View>
      <FilmList
        films={favoritesFilm}
        navigation={navigation}
        favoriteList={true} // Ici on est bien dans le cas de la liste des films favoris. Ce booléen à true permettra d'empêcher de lancer la recherche de plus de films après un scroll lorsqu'on est sur la vue Favoris.
      />
    </View>
  )
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  avatar_container: {
    alignItems: 'center'
  }
})

export default Favorites