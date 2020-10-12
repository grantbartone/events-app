import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import moment from 'moment'

export default function SearchResults({ data }) {
    const { events, performers, venues } = data
    
    const renderCategoryHeader = (name) => (
        <View style={styles.categoryHeader}>
            <Text style={styles.categoryHeaderText}>{name}</Text>
        </View>
    )

    const renderEvents = () => {
        if (events.length === 0) return null
        return (
            <View style={styles.categoryContainer}>
                {renderCategoryHeader('Events')}
                    {events.slice(0,3).map((item, idx) => {
                        const formattedDate = moment(item.event.datetime_local).format('M/D')
                        const dayOfWeek = moment(item.event.datetime_local).format('ddd')
                        
                        return (
                            <View style={styles.itemContainer} key={idx}>
                                <View style={styles.leftContainer}>
                                    <Text style={styles.dateText}>{formattedDate}</Text>
                                    <Text style={styles.subtitleText}>{dayOfWeek}</Text>
                                </View>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.titleText}>{item.event.name}</Text>
                                    <Text style={styles.subtitleText}>{item.venue.name}</Text>
                                </View>
                            </View>
                        )
                    })}
            </View>
        )
    }

    const renderPerformers = () => {
        if (performers.length === 0) return null
        return (
            <View style={styles.categoryContainer}>
                {renderCategoryHeader('Performers')}
                    {performers.slice(0,3).map((item, idx) => (
                        <View style={styles.itemContainer} key={idx}>
                            <View style={styles.leftContainer}>
                                <Image source={{ uri: item.hero_image_url }} style={styles.image} />
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.titleText}>{item.name}</Text>
                                <Text style={styles.subtitleText}>{item.category.toUpperCase()}</Text>
                            </View>
                        </View>
                    ))}
            </View>
        )
    }

    const renderVenues = () => {
        if (venues.length === 0) return null
        return (
            <View style={styles.categoryContainer}>
                {renderCategoryHeader('Venues')}
                    {venues.slice(0,3).map((item, idx) => (
                        <View style={styles.itemContainer} key={idx}>
                            <View style={styles.leftContainer}>
                                <Image source={{ uri: item.image_url }} style={styles.image} />
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.titleText}>{item.name}</Text>
                                <Text style={styles.subtitleText}>VENUE • {item.city}, {item.state}</Text>
                            </View>
                        </View>
                    ))}
            </View>
        )
    }
    
    return (
        <View style={styles.container}>
            {renderEvents()}
            {renderPerformers()}
            {renderVenues()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        marginHorizontal: 10,
        marginTop: 10,
    },
    categoryContainer: {
        marginTop: 10,
    },
    categoryHeader: {
        padding: 8,
        backgroundColor: '#21232B',
    },
    categoryHeaderText: {
        color: 'gainsboro',
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#282C34',
        marginBottom: 1,
    },
    leftContainer: {
        flex: 1,
    },
    infoContainer: {
        flex: 5,
        justifyContent: 'center',
    },
    dateText: {
        fontSize: 18,
        color: 'white',
    },
    titleText: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
    },
    subtitleText: {
        color: 'darkgray',
        fontWeight: 'bold',
    },
    image: {
        width: 47,
        height: 47,
        borderRadius: 47,
    },
})
