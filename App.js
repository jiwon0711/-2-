import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text } from 'react-native';

export default function TodoListApp() {
  const [newTodo, setNewTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  const addTodo = () => {
    if (newTodo !== '') {
      const todoItem = {
        id: Date.now().toString(), // 고유한 ID 생성
        title: newTodo,
        completed: false, // 완료 상태 초기값은 false로 설정
      };

      setTodoList([...todoList, todoItem]);
      setNewTodo('');
    }
  };

  const toggleTodo = id => {
    const updatedTodoList = todoList.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    setTodoList(updatedTodoList);
  };

  const deleteTodo = id => {
    const updatedTodoList = todoList.filter(item => item.id !== id);
    setTodoList(updatedTodoList);
  };

  const renderTodoItem = ({ item }) => {
    return (
      <View style={styles.todoItem}>
        <Text style={item.completed ? styles.completedTodo : styles.todoText}>{item.title}</Text>
        <Button
          title={item.completed ? '완료 취소' : '완료'}
          onPress={() => toggleTodo(item.id)}
        />
        <Button title="삭제" onPress={() => deleteTodo(item.id)} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={text => setNewTodo(text)}
          placeholder="새로운 TODO 입력"
        />
        <Button title="추가" onPress={addTodo} />
      </View>
      <FlatList
        data={todoList}
        renderItem={renderTodoItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  list: {
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  todoText: {
    flex: 1,
  },
  completedTodo: {
    flex: 1,
    textDecorationLine: 'line-through',
  },
});
