import React, { useState, useEffect } from 'react'

import {View, Text, ActivityIndicator, ScrollView, Image, Button, TouchableOpacity } from 'react-native'

import FilmDetailStyles from '../FilmDetail/FilmDetail.style'
import { getFilmDetailFromApi, getImageFromApi } from '../../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { useDispatch, useSelector } from 'react-redux'


const FilmDetail = ( navigation ) => {
  const idFilm = navigation.route.params.idFilm
  const [film, setFilm] = useState();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch()
  const { favoritesFilm } = useSelector(state => state);

  const _toggleFavorite = () => {
    // définition de notre action ici
    const action = { type: "TOGGLE_FAVORITE", value: film }
    dispatch(action)
  }


  useEffect( () => {
    (async () => {
      const data = await getFilmDetailFromApi(idFilm);
      setFilm(data)
      console.log(data)
      setLoading(false)
      console.log(favoritesFilm)
    } )()
  }, [])

  const _displayFavoriteImage = () => {
    let sourceImage = require('../../images/ic_favorite_border.png')
    if (favoritesFilm.findIndex(item => item.id === film.id) !== -1) {
      sourceImage = require ('../../images/ic_favorite.png')
    }
    return (
      <Image
        source={sourceImage}
        style={FilmDetailStyles.favorite_image}
      />
    )
  }

  const _displayFilm = () => {
    if (film != undefined) {
      return (
        <ScrollView 
          style={FilmDetailStyles.scrollview_container}>
          <Image 
            style={FilmDetailStyles.image}
            source={{uri: getImageFromApi(film.backdrop_path)}}
          />
          <Text style={FilmDetailStyles.title_text}>{film.title}</Text> 
          <TouchableOpacity
            style={FilmDetailStyles.favorite_container}
            onPress={() => _toggleFavorite()}>
            {_displayFavoriteImage()}
          </TouchableOpacity>
          <Text 
            style={FilmDetailStyles.description_text}>{film.overview}
          </Text>
          <Text 
            style={FilmDetailStyles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}
          </Text>
          <Text 
            style={FilmDetailStyles.default_text}>Note : {film.vote_average} / 10
          </Text>
          <Text 
            style={FilmDetailStyles.default_text}>Nombre de votes : {film.vote_count}
          </Text>
          <Text 
            style={FilmDetailStyles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}
          </Text>
          <Text 
            style={FilmDetailStyles.default_text}>Genre(s) : {film.genres.map(function(genre){
              return genre.name;
            }).join(" / ")}
          </Text>
          <Text 
            style={FilmDetailStyles.default_text}>Companie(s) : {film.production_companies.map(function(company){ 
              return company.name;
            }).join(" / ")}
          </Text>
        </ScrollView>
      )
    }
  }

  const _displayLoading = ()  => {
    if (loading) {
      return (
        <View style={FilmDetailStyles.loadingStyles}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }
  }

  return (
    <View 
      style={FilmDetailStyles.main_container}>
      {_displayFilm()}
      {_displayLoading()}
    </View>
  )
}


export default FilmDetail;