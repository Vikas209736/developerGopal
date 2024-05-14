/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
// / eslint-disable react-native/no-inline-styles /
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, Platform, FlatList, PermissionsAndroid, ImageBackground, Dimensions } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, CameraOptions, launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { stackScreens } from '../Navigation/StackNavigation';
import moment from 'moment';
type Props = NativeStackScreenProps<stackScreens, 'AddExpences'>

const AddExpencess = (props: Props) => {
    const { navigation } = props;
    const [selectedPdf, setSelectedPdf] = useState<any[]>([]);
    const [imageCamera, setImageCamera] = useState<any>('');
    const [showData, setShowData] = useState<any>();
    const [name, setName] = useState<any>('');
    const [date, setDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };
    console.log(moment(date).format('DD/MM/YYYY'));
    const showDatepicker = () => {
        setShowDatePicker(true);
    };
    const togglePasswordVisibility = () => {
        setShowData(showData.slice(0, -1));
    };
    const BackIcon = () => {
        navigation.navigate('BottomTab');
    };
    const CancelPdf = () => Alert.alert(
        'Cancel Pdf',
        'Select new Pdf',
        [
            { text: 'Cancel' },
            {
                text: 'Clear',
                onPress: () => onCancel(),
            },
            { text: 'SelectPdf', onPress: () => onGalleryPdf() },
        ]
    );
    const onCancel = () => {
        setSelectedPdf('');
    };
    const onCancelimage = () => {
        setImageCamera('');
    };
    const ViewDetails = () => {
        navigation.navigate('AddExpensesNavigation', {
            name: name,
            ShowData: showData,
            Images: imageCamera,
            Pdf: selectedPdf,
        });
    };
    const onHandelView = () => Alert.alert(
        'Add Invoice Galary',
        'Add Camera Photo',
        [
            { text: 'Cancel' },
            {
                text: 'Galary',
                onPress: () => onGalleryImage(),
            },
            {
                text: 'Camera',
                onPress: () => onCameraPdf(),
            },
        ]
    );
    const handleAddProfile = () =>
        Alert.alert(
            'Add Invoice Pdf',
            'Add Camera Photo',
            [
                { text: 'Cancel' },
                {
                    text: 'Pdf',
                    onPress: () => onGalleryPdf(),
                },
                {
                    text: 'Images',
                    onPress: () => onHandelView(),
                },
            ]
        );
    const onGalleryPdf = async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'formSheet',
                type: [DocumentPicker.types.pdf],
                allowMultiSelection: true,
            });
            setSelectedPdf(response);
        } catch (err) {
            console.warn(err);
        }
    };
    const onCameraPdf = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'This app requires camera permission to function properly.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Camera permission granted');
                launchCameraa();
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };
    const launchCameraa = () => {
        const options: CameraOptions = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2200,
            maxWidth: 2200,
        };
        launchCamera(options, (response: any) => {
            console.log('Response = ', response);
            if (response.error) {
                console.log('Camera Error: ', response.error);
            }
            else {
                setImageCamera(response.uri || response.assets?.[0]);
            }
        });
    };
    const onGalleryImage = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2200,
            maxWidth: 2200,
        };
        launchImageLibrary(options, (response: any) => {
            if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                setImageCamera(response.uri || response.assets?.[0]);
            }
        });

    };
    const ViewPdf = () => {
        navigation.navigate('Testing', { PdfView: selectedPdf });
    };
    return (
        <View style={styles.Container} >
            <View style={{ flex: 1, position: 'absolute' }}>
                <View style={styles.Header}>

                    <View style={styles.UpperHeader}>
                        <TouchableOpacity onPress={BackIcon} style={styles.ArrowIcon}>
                            <MaterialIcons name="keyboard-arrow-left" color={'white'} size={29} />
                        </TouchableOpacity>
                        <View style={styles.UpperHeaderText}>
                            <Text style={styles.Text}>Add Expense</Text>
                        </View>
                        <TouchableOpacity style={styles.DeleteIcon} onPress={ViewDetails}>
                            <Entypo name="check" color={'white'} size={28} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.KanHeader}>
                <View style={styles.HeaderContainer}>
                    <View style={styles.KanHeaderTextContainer} />
                    <ScrollView style={styles.Description}>
                        <Text style={styles.TextInput}>Name</Text>
                        <View style={styles.HeaderContainerName}>
                            <TextInput style={styles.textinput}
                                placeholder="name "
                                placeholderTextColor="black"
                                onChangeText={(text) => setName(text)}
                                value={name}
                                autoComplete="name"
                            />
                        </View>
                        <Text style={styles.TextInput}>Amount</Text>
                        <View style={styles.HeaderContainerAmount}>
                            <TextInput style={styles.textinput}
                                placeholder="Amount"
                                placeholderTextColor="black"
                                keyboardType="numeric"
                                value={showData}
                                onChangeText={(Text) => setShowData(Text)}
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility}>
                                <MaterialIcons name="clear" color={'black'} size={24} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.TextInput}>Date</Text>
                        <View style={[styles.HeaderContainerDate, { justifyContent: 'space-between'}]}>
                            <Text style={{  fontSize: 20,marginLeft:10,width:230,color:'black'}}>
                                {moment(date).format('DD/MM/YYYY')}
                                {/* {moment(date).format('hh:mm,A')} */}
                            </Text>
                            <TouchableOpacity style={styles.ArrowIcon} onPress={showDatepicker}>
                                <MaterialIcons name="calendar-month" color={'black'} size={29} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.TextInput}>Invoice</Text>
                            <View style={styles.AddInvoice}>
                                <TouchableOpacity style={styles.AddIcon} onPress={handleAddProfile}>
                                    <MaterialIcons name="add-circle" color={'black'} size={29} />
                                    <Text style={styles.AddInvoiceInput}>
                                        Add Invoice
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <FlatList
                                data={selectedPdf}
                                keyExtractor={(item: any) => item.path}
                                renderItem={({ item }) => (
                                    <View style={styles.uri}>
                                        <TouchableOpacity style={{ flexDirection: 'row', flex: 1, width: '80%' }} onPress={ViewPdf}>
                                            <View style={{ width: '12%' }}>
                                                <MaterialIcons name="picture-as-pdf" color={'red'} size={29} />
                                            </View>
                                            <View style={{ width: '86%', justifyContent: 'center' }}>
                                                <Text style={{ color: 'blue' }}>{item?.uri}</Text>

                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ width: '10%' }}>
                                            <TouchableOpacity style={{ backgroundColor: '#F0F2F0', borderRadius: 20, alignItems: 'center', height: 30, justifyContent: 'center', alignContent: 'center' }} onPress={CancelPdf}>
                                                <MaterialIcons name="delete-forever" color={'black'} size={24} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                        {imageCamera !== '' && (

                            <ImageBackground style={styles.image}
                                source={{ uri: imageCamera?.uri }}
                                resizeMode="center"
                                imageStyle={{ borderRadius: 10 }}
                            >
                                <TouchableOpacity style={{
                                    backgroundColor: 'white',
                                    padding: 5,
                                    borderRadius: 30,
                                    alignSelf: 'flex-end',
                                }}
                                    onPress={onCancelimage}>
                                    <MaterialIcons name="delete-forever" color={'black'} size={20} />
                                </TouchableOpacity>
                            </ImageBackground>
                        )}
                        {showDatePicker && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default AddExpencess;
const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    Header: {
        height: 195,
        backgroundColor: '#4a9591',
        width: 360,
        borderWidth: 1,
        borderColor: '#4a9591',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    UpperHeader: {
        flexDirection: 'row',
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },

    Text: {
        color: 'white',
        fontSize: 21,
        fontWeight: '600',
    },
    DeleteIcon: {
        marginLeft: 80,
        marginRight: 20,
    },
    ArrowIcon: {
        marginLeft: 10,
        marginRight: 42,
    },
    UpperHeaderText: {
        marginLeft: 40,
    },
    KanHeader: {
        flex: 1,
        marginTop: 130,
    },
    HeaderContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#4a9591',
        width: '90%',
        marginLeft: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    HeaderContainerName: {
        borderWidth: 1,
        borderColor: '#000',
        width: '90%',
        marginLeft: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    HeaderContainerAmount: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        borderRadius: 10,
        width: '90%',
        marginLeft: 20,
    },
    HeaderContainerDate: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        borderRadius: 10,
        width: '90%',
        height:50,
        marginLeft: 20,
    },
    KanHeaderTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 20,
    },
    Description: {
        height: 525,
    },
    textinput: {
        width: '90%',
        color: 'black',
        height: 50,
    },
    textinputDate: {
        width: '85%',
        color: 'black',
        height: 50,
    },
    AddInvoice: {
        borderWidth: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderColor: '#000',
        width: '90%',
        marginLeft: 20,
        borderRadius: 10,
        height: 50,
    },
    AddInvoiceInput: {
        color: 'black',
        fontSize: 18,
        marginLeft: 10,
    },
    AddIcon: {
        flexDirection: 'row',
    },
    TextInput: {
        color: 'black',
        fontSize: 15,
        margin: 5,
        marginLeft: 20,
    },
    uri: {
        flex: 1,
        width: '100%',
        marginVertical: 20,
        flexDirection: 'row',
    },
    image: {
        height: 380,
        marginTop: 20,
        width: '100%',
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

});
