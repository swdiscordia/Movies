import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import FilmItemStyles from './FilmItem.style';
import { getImageFromApi } from '../../API/TMDBApi'


const FilmItem = ({ film, displayDetailForFilm, isFilmFavorite }) => {

  const _displayFavoriteImage = () => {
    if (isFilmFavorite) {
      // Si la props isFilmFavorite vaut true, on affiche le 🖤
      return (
        <Image
          style={FilmItemStyles.favorite_image}
          source={require('../../images/ic_favorite.png')}
        />
      )
    }
  }

  return (
    <TouchableOpacity 
      onPress={() => displayDetailForFilm(film.id)}
      style={FilmItemStyles.main_container}>
      <Image
        style={FilmItemStyles.image}
        source={{uri: getImageFromApi(film.poster_path)}}
      />
      <View style={FilmItemStyles.content_container}>
        <View style={FilmItemStyles.header_container}>
          {_displayFavoriteImage()}
          <Text style={FilmItemStyles.title_text}>{film.title}</Text>
          <Text style={FilmItemStyles.vote_text}>{film.vote_average}</Text>
        </View>
        <View style={FilmItemStyles.description_container}>
          <Text style={FilmItemStyles.description_text} numberOfLines={6}>{film.overview}</Text>
          {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
        </View>
        <View style={FilmItemStyles.date_container}>
          <Text style={FilmItemStyles.date_text}>{film.release_date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default FilmItem
