import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const InputField = ({ label, value, onChangeText, placeholder, icon, keyboardType = 'default', multiline = false }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.inputWrapper}>
      <Ionicons name={icon} size={20} color="#666" style={styles.inputIcon} />
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
    </View>
  </View>
);

const MaterialRegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Granite',
    color: '',
    finish: '',
    origin: '',
    supplier: '',
    pricePerUnit: '',
    minStock: '',
    currentStock: '',
    description: '',
  });

  const materialTypes = ['Granite', 'Quartz', 'Marble', 'Quartzite', 'Other'];

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.type || !formData.pricePerUnit) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Success',
      'Material registered successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Register Material</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            <InputField
              label="Material Name *"
              value={formData.name}
              onChangeText={(value) => updateField('name', value)}
              placeholder="e.g., Black Galaxy Granite"
              icon="layers-outline"
            />

            <Text style={styles.sectionTitle}>Type *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeContainer}>
              {materialTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    formData.type === type && styles.typeButtonActive
                  ]}
                  onPress={() => updateField('type', type)}
                >
                  <Text style={[
                    styles.typeText,
                    formData.type === type && styles.typeTextActive
                  ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <InputField
              label="Color"
              value={formData.color}
              onChangeText={(value) => updateField('color', value)}
              placeholder="e.g., Black, White, Gray"
              icon="color-palette-outline"
            />

            <InputField
              label="Finish"
              value={formData.finish}
              onChangeText={(value) => updateField('finish', value)}
              placeholder="e.g., Polished, Honed, Flamed"
              icon="brush-outline"
            />

            <InputField
              label="Origin"
              value={formData.origin}
              onChangeText={(value) => updateField('origin', value)}
              placeholder="e.g., India, Brazil, Italy"
              icon="location-outline"
            />

            <InputField
              label="Supplier"
              value={formData.supplier}
              onChangeText={(value) => updateField('supplier', value)}
              placeholder="Supplier name"
              icon="business-outline"
            />

            <InputField
              label="Price per Unit ($) *"
              value={formData.pricePerUnit}
              onChangeText={(value) => updateField('pricePerUnit', value)}
              placeholder="120"
              icon="pricetag-outline"
              keyboardType="numeric"
            />

            <View style={styles.stockRow}>
              <View style={styles.stockInput}>
                <InputField
                  label="Current Stock"
                  value={formData.currentStock}
                  onChangeText={(value) => updateField('currentStock', value)}
                  placeholder="50"
                  icon="cube-outline"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.stockInput}>
                <InputField
                  label="Min Stock Level"
                  value={formData.minStock}
                  onChangeText={(value) => updateField('minStock', value)}
                  placeholder="10"
                  icon="warning-outline"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <InputField
              label="Description"
              value={formData.description}
              onChangeText={(value) => updateField('description', value)}
              placeholder="Additional details about the material..."
              icon="document-text-outline"
              multiline={true}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Register Material</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 24,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  typeContainer: {
    marginBottom: 20,
  },
  typeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  typeButtonActive: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  typeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  typeTextActive: {
    color: '#fff',
  },
  stockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  stockInput: {
    flex: 1,
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#28a745',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MaterialRegisterScreen;