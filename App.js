import React, { useState, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { throttle } from 'lodash'
import SearchResults from './components/SearchResults'

export default function App() {
  const [ data, setData ] = useState({})
  const [ query, setQuery ] = useState("")

  const callAPI = useCallback(
    throttle(async (query) => {
      if (query === '') return setData({})
      console.log(`API query = ${query}`)

      const url = `https://mobile-staging.gametime.co/v1/search?q=${query}`
      try {
        const res = await (fetch(url))
        const data = await (res.json())
        setData(data)
      } catch (err) {
        console.log("Error fetching data:\n", err)
      }
    }, 200), [])
    
    const handleChangeText = (text) => {
      setQuery(text)
      callAPI(text)
    }

  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.inputContainerStyle}
        placeholder="Team, performer or venue"
        onChangeText={handleChangeText}
        value={query} />
      {Object.keys(data).length !== 0 && (
        <SearchResults data={data} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    marginTop: 30,
    backgroundColor: '#000',
  },
  inputContainerStyle: {
    borderRadius: 100,
  },
})
