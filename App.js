import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from "./Colors";
import { AntDesign } from '@expo/vector-icons';
import tempData from './tempData';
import TodoList from './TodoList';
import AddListModal from './AddListModal';




export default class App extends React.Component {
    state = {
        addTodoVisible: false,
        lists: tempData
    }

    toggleAddTodoModal() {
        this.setState({ addTodoVisible: !this.state.addTodoVisible });
    }

    renderList = ({ item }) => {
        return <TodoList list={item} updateList={this.updateList} />;
    }

    addList = list => {
        this.setState(prevState => ({
            lists: [...prevState.lists, { ...list, id: prevState.lists.length + 1, todos: [] }]
        }));
    };

    updateList = updatedList => {
        const { lists } = this.state;
        const index = lists.findIndex(list => list.id === updatedList.id);
        if (index !== -1) {
            const updatedLists = [...lists];
            updatedLists[index] = updatedList;
            this.setState({ lists: updatedLists });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal animationType="slide" 
                       visible={this.state.addTodoVisible}
                       onRequestClose={() => this.toggleAddTodoModal}
                       >
                    <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList} />
                </Modal>
    
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Todo <Text style={{ fontWeight: "300", color: colors.blue }}>Lists</Text>
                    </Text>
                </View>
    
                <View style={styles.addButtonContainer}>
                    <TouchableOpacity style={styles.addListButton} onPress={() => this.toggleAddTodoModal()}>
                        <AntDesign name="plus" size={16} color={colors.blue} />
                    </TouchableOpacity>
                    <Text style={styles.addListText}>Add List</Text>
                </View>
    
                <View style={styles.listContainer}>
                    <FlatList 
                        data={this.state.lists} 
                        keyExtractor={item => item.id.toString()} 
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={this.renderList} 
                        keyboardShouldPersistTaps="always" 
                    />
                </View>
            </View>
        );
    }
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            marginTop: 48,
            paddingHorizontal: 16,
        },
        title: {
            fontSize: 36,
            fontWeight: "800",
            color: colors.black,
            paddingHorizontal: 64,
            textAlign: 'center'
        },
        addButtonContainer: {
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 16,
            paddingHorizontal: 16,
        },
        addListButton: {
            borderWidth: 2,
            borderColor: colors.lightBlue,
            borderRadius: 4,
            padding: 16,
            alignItems: "center",
            justifyContent: "center"
        },
        addListText: {
            color: colors.blue,
            fontWeight: "600",
            fontSize: 14,
            marginLeft: 8
        },
        listContainer: {
            height: 275,
            paddingLeft: 32,
            marginBottom: 32
        }
    });
    