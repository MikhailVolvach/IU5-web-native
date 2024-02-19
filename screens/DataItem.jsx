import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../store/DataItemSlice";
import { getMockDataItem } from "../utils/mockdata";
import axiosInstance, { HOST } from "../API";
import axios from "axios";

export default function DataItem({ route }) {
    // console.log(route);
    const { id } = route.params;
    const dispatch = useDispatch();
    const { data, isLoaded } = useSelector((store) => store.dataItem);
    const [ fileData, setFileData ] = useState('');

    const getFileData = async () => {
        if (id === undefined) return;

        if (!data?.file) return;

        if (+id !== data?.id) return;

        console.log(`${HOST}${data.file.substring(data.file.indexOf(':9000/'), data.file.length)}`);

        await axios.get(`${HOST}${data.file.substring(data.file.indexOf(':9000/'), data.file.length)}`).then((response) => {
            setFileData(response.data);
        }).catch(e => console.error(e));
    };

    useEffect(() => {
        getFileData();
    }, [isLoaded, data.id, id]);

    useEffect(() => {
        async function getData() {
            await axiosInstance.get(`/data/${id}`).then((response) => {
                return dispatch(setData(response?.data))
            }).catch(e => console.error(e));
        }

        getData();
    }, [dispatch, id, data.id]);

    const styles = StyleSheet.create({
        image: {
            height: 320,
        },
        title: {
            fontSize: 18,
            lineHeight: 24,
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: 5
        },
        page: {
            padding: 10,
        },
        text: {
            fontSize: 14,
            lineHeight: 18,
            fontWeight: '400'
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            borderRadius: 12,
            color: '#000000',
            borderColor: '#E9EDF1',
            borderWidth: 1,
            backgroundColor: '#E9EDF1',
            overflow: 'hidden'
        },
        elevation: {
            elevation: 20,
            shadowColor: '#000000',
        },
        text_container: {
            padding: 10
        }
    });

    return (
        <ScrollView>
            <View style={styles.page}>
                <View style={[styles.container, styles.elevation]}>
                    {!!data.img && <Image style={styles.image} source={{uri: `${HOST}${data.img.substring(data.img.indexOf(':9000/'), data.img.length)}`}} />}
                    <View style={styles.text_container}>
                        <Text style={styles.title}>{data?.title}</Text>
                        <Text style={styles.text}>{fileData}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
