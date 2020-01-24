import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList , ScrollView} from 'react-native';
import SearchBar from '../components/SearchBar';
import ResultsList from '../components/ResultsList';
import useResults from '../hooks/useResults';

const SearchScreen = () => {
    const [term, setTerm] = useState('');  // search bar
    const [searchApi, results, errorMessage] = useResults() // api

    const filterResultByPrice = (price) => {
        return results.filter( result => {
            return result.price === price;
        })
    }

    return (
        <>    
            <SearchBar 
                term={term} 
                onTermChange={ newTerm => setTerm(newTerm)} 
                onTermSubmit={() => searchApi(term)}
            />
            {errorMessage ? <Text> {errorMessage}</Text> : null }
            <ScrollView>
                <ResultsList results={filterResultByPrice('$')} title="Cost Effective"/>
                <ResultsList results={filterResultByPrice('$$')} title="Bit Pricier"/>
                <ResultsList results={filterResultByPrice('$$$')} title="Big Spender"/>
            </ScrollView>
        </>
    );
};

const style = StyleSheet.create({});


export default SearchScreen;

 