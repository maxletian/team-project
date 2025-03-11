import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function HealthPredictionApp() {
  const [age, setAge] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [risk, setRisk] = useState(null);

  const predictRisk = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age, lifestyle, medicalHistory })
      });
      const data = await response.json();
      setRisk(data.risk);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setRisk('Error getting prediction');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Risk Predictor</Text>
      <TextInput style={styles.input} placeholder="Enter Age" keyboardType="numeric" value={age} onChangeText={setAge} />
      <TextInput style={styles.input} placeholder="Lifestyle Score (0-10)" keyboardType="numeric" value={lifestyle} onChangeText={setLifestyle} />
      <TextInput style={styles.input} placeholder="Medical History Score (0-10)" keyboardType="numeric" value={medicalHistory} onChangeText={setMedicalHistory} />
      <TouchableOpacity style={styles.button} onPress={predictRisk}>
        <Text style={styles.buttonText}>Predict Risk</Text>
      </TouchableOpacity>
      {risk && <Text style={styles.result}>Predicted Risk: {risk}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
