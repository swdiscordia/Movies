import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, FlatList, Text, ActivityIndicator } from 'react-native';
// import films from '../../Helpers/filmsData'
import { getFilmsFromApiWithSearchedText } from '../../API/TMDBApi'
import SearchStyle from './Search.style';
import FilmList from '../FilmList/FilmList';



const Search = ({ navigation }) => {

  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState('')


  const _loadFilms = async () => {
    if (searchString.length > 0) {
      setLoading(true)
      const data = await getFilmsFromApiWithSearchedText(searchString);

      setFilms(data.results)
      setLoading(false)
    }
  }
 

  return (
    <View style={SearchStyle.container}>
      <TextInput onSubmitEditing={() => _loadFilms()} style={SearchStyle.input} onChangeText={value => setSearchString(value)} placeholder="Titre du film" />
      <Button style={SearchStyle.button} title="Rechercher" onPress={() => _loadFilms()} />
      {!loading ? 
        <FilmList
          films={films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
          navigation={navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
          loadFilms={_loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
          favoriteList={false} // Ici j'ai simplement ajouté un booléen à false pour indiquer qu'on n'est pas dans le cas de l'affichage de la liste des films favoris. Et ainsi pouvoir déclencher le chargement de plus de films lorsque l'utilisateur scrolle.
      />
      : 
        <View style={SearchStyle.loading_container}>
          <ActivityIndicator size='large'/>
          <Text style={SearchStyle.textLoadingStyles}>loading</Text>
        </View>
      }
    </View>
  )
};


export default Search;