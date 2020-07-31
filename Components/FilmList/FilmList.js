// Components/FilmList.js

import React from 'react';
import { useSelector } from 'react-redux'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from '../FilmItem/FilmItem'

const FilmList = ({ navigation, films }) => {

  const _displayDetailForFilm = (idFilm) => {
    // On a récupéré les informations de la navigation, on peut afficher le détail du film
    navigation.navigate('FilmDetail', {idFilm: idFilm})
  }

  const { favoritesFilm } = useSelector(state => state)

  return (
    <FlatList
      style={styles.list}
      data={films}
      extraData={favoritesFilm}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <FilmItem
          film={item}
          isFilmFavorite={(favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false} // Bonus pour différencier les films déjà présent dans notre state global et qui n'ont donc pas besoin d'être récupérés depuis l'API
          displayDetailForFilm={_displayDetailForFilm}
        />
      )}
    />
  )
}
const styles = StyleSheet.create({
  list: { 
    flex: 1 
  },
})
export default FilmList