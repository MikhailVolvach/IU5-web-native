import {View, Text, Button, ScrollView, Image, StyleSheet, TextInput, SafeAreaView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axiosInstance, { HOST } from '../API';
import { store } from '../store';
import { setData } from '../store/DataListSlice';
import { useDispatch, useSelector } from "react-redux";
import { getMockDataList } from '../utils/mockdata';

export default function DataList({ navigation }) {
    const dispatch = useDispatch();
    const { data } = useSelector((store) => store.dataList);

    const [ search, setSearch ] = useState('');

    useEffect(() => {
        async function getData() {
            await axiosInstance.get('/data', {
                params: {search: search}
            }).then((response) => {
                return dispatch(setData(response?.data))
            }).catch(e => console.error(e));
        }

        getData();

        // dispatch(setData(getMockDataList()));
    }, [dispatch, search]);

    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            // fontFamily: 'Arial, sans-serif',
            // color: '#000000',
            backgroundColor: '#ffffff',
            padding: 15
        },
        card: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
            width: 320,
            backgroundColor: '#E9EDF1',
            borderRadius: 12,
            padding: 10,
            gap: 12,
            margin: 8,
            borderWidth: 1,
            // borderColor: '#000000',
            borderColor: '#E9EDF1',
        },
        elevation: {
            elevation: 20,
            shadowColor: '#000000',
        },
        title: {
            fontSize: 18,
            lineHeight: 24,
            fontWeight: '600',
            marginBottom: 10
        },
        image: { height: 320, alignSelf: 'stretch', borderRadius: 10 },
        input: {
            borderWidth: 1,
            padding: 10,
            borderRadius: 12,
            borderColor: '#E9EDF1',
            width: 320
        },
        button: {
            borderRadius: 12
        }
    });

    return (
        <ScrollView>
            <View style={styles.page}>
                <SafeAreaView>
                <TextInput
                    style={styles.input}
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Поиск"
                />
                </SafeAreaView>
                {!!data && data?.data?.map(dataItem => <View key={dataItem.id} style={[styles.card, styles.elevation]}>
                    <Image source={{uri: `${HOST}${dataItem.img.substring(dataItem.img.indexOf(':9000/'), dataItem.img.length)}`}} resizeMode='contain' style={styles.image}/>
                    <View>
                        <Text style={styles.title}>{dataItem.title}</Text>
                        <Button style={styles.button} title='Подробнее' onPress={() => navigation.navigate('Услуга', { id: dataItem.id })} />
                    </View>
                </View>)}

                {!data?.data?.length && <View><Text>Ничего не найдено</Text></View>}
            </View>
        </ScrollView>
    );
}