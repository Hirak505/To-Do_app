import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  useColorScheme,
  StyleSheet,
} from "react-native";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { id: Date.now().toString(), text: input, done: false }]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(t => !t.done));
  };

  const styles = getStyles(dark);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📝 My To-Do App</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task..."
          placeholderTextColor={dark ? "#aaa" : "#666"}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.taskTextContainer}>
              <Text style={[styles.taskText, item.done && styles.doneText]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteButton}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {tasks.some(t => t.done) && (
        <TouchableOpacity style={styles.clearButton} onPress={clearCompleted}>
          <Text style={styles.clearText}>Clear Completed</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const getStyles = (dark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: dark ? "#121212" : "#f5f5f5",
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      color: dark ? "#fff" : "#000",
      marginBottom: 20,
    },
    inputRow: {
      flexDirection: "row",
      marginBottom: 20,
    },
    input: {
      flex: 1,
      borderColor: dark ? "#333" : "#ccc",
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      color: dark ? "#fff" : "#000",
    },
    addButton: {
      backgroundColor: "#007bff",
      borderRadius: 8,
      paddingHorizontal: 15,
      justifyContent: "center",
      marginLeft: 10,
    },
    addButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    taskRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: dark ? "#1e1e1e" : "#fff",
      padding: 10,
      marginVertical: 5,
      borderRadius: 8,
    },
    taskText: {
      color: dark ? "#fff" : "#000",
      fontSize: 16,
    },
    doneText: {
      textDecorationLine: "line-through",
      color: "#888",
    },
    deleteButton: {
      fontSize: 20,
      color: "red",
    },
    clearButton: {
      marginTop: 20,
      alignSelf: "center",
      backgroundColor: "#ff4444",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
    },
    clearText: {
      color: "#fff",
      fontWeight: "bold",
    },
  });
