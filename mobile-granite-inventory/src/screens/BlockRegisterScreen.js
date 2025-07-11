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

const StatusButton = ({ status, isSelected, onPress, color }) => (
  <TouchableOpacity
    style={[
      styles.statusButton,
      isSelected && { backgroundColor: color },
      !isSelected && styles.statusButtonInactive
    ]}
    onPress={onPress}
  >
    <Text style={[
      styles.statusButtonText,
      isSelected && styles.statusButtonTextActive
    ]}>
      {status}
    </Text>
  </TouchableOpacity>
);

const BlockRegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    material: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    location: '',
    supplier: '',
    price: '',
    status: 'Available',
    quarryLocation: '',
    arrivalDate: '',
    notes: '',
  });

  const statusOptions = [
    { name: 'Available', color: '#28a745' },
    { name: 'In Processing', color: '#007bff' },
    { name: 'Reserved', color: '#17a2b8' },
  ];

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateEstimatedBundles = () => {
    const { length, width, height } = formData;
    if (length && width && height) {
      // Rough calculation assuming standard bundle size of 120x60x3cm
      const blockVolume = parseFloat(length) * parseFloat(width) * parseFloat(height);
      const bundleVolume = 120 * 60 * 3; // cm³
      return Math.floor(blockVolume / bundleVolume);
    }
    return 0;
  };

  const handleSubmit = () => {
    if (!formData.material || !formData.length || !formData.width || !formData.height || !formData.price) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Success',
      'Block registered successfully!',
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
        <Text style={styles.headerTitle}>Register Block</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            <InputField
              label="Material *"
              value={formData.material}
              onChangeText={(value) => updateField('material', value)}
              placeholder="e.g., Granite Black Galaxy"
              icon="layers-outline"
            />

            <Text style={styles.sectionTitle}>Dimensions (cm)</Text>
            <View style={styles.dimensionsGrid}>
              <View style={styles.dimensionInput}>
                <InputField
                  label="Length *"
                  value={formData.length}
                  onChangeText={(value) => updateField('length', value)}
                  placeholder="320"
                  icon="resize-outline"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.dimensionInput}>
                <InputField
                  label="Width *"
                  value={formData.width}
                  onChangeText={(value) => updateField('width', value)}
                  placeholder="180"
                  icon="resize-outline"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.dimensionsRow}>
              <View style={styles.dimensionInput}>
                <InputField
                  label="Height *"
                  value={formData.height}
                  onChangeText={(value) => updateField('height', value)}
                  placeholder="180"
                  icon="layers-outline"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.dimensionInput}>
                <InputField
                  label="Weight (kg)"
                  value={formData.weight}
                  onChangeText={(value) => updateField('weight', value)}
                  placeholder="18500"
                  icon="scale-outline"
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Estimated Bundles Calculator */}
            <View style={styles.calculatorContainer}>
              <Text style={styles.calculatorTitle}>Estimated Bundle Production</Text>
              <View style={styles.calculatorResult}>
                <Ionicons name="calculator-outline" size={24} color="#007bff" />
                <Text style={styles.calculatorText}>
                  Approximately {calculateEstimatedBundles()} bundles possible
                </Text>
              </View>
            </View>

            <InputField
              label="Location"
              value={formData.location}
              onChangeText={(value) => updateField('location', value)}
              placeholder="Yard A, Section 1"
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
              label="Quarry Location"
              value={formData.quarryLocation}
              onChangeText={(value) => updateField('quarryLocation', value)}
              placeholder="e.g., Karnataka, India"
              icon="location-outline"
            />

            <InputField
              label="Arrival Date"
              value={formData.arrivalDate}
              onChangeText={(value) => updateField('arrivalDate', value)}
              placeholder="YYYY-MM-DD"
              icon="calendar-outline"
            />

            <InputField
              label="Price ($) *"
              value={formData.price}
              onChangeText={(value) => updateField('price', value)}
              placeholder="45000"
              icon="pricetag-outline"
              keyboardType="numeric"
            />

            <Text style={styles.sectionTitle}>Status</Text>
            <View style={styles.statusContainer}>
              {statusOptions.map((status) => (
                <StatusButton
                  key={status.name}
                  status={status.name}
                  isSelected={formData.status === status.name}
                  onPress={() => updateField('status', status.name)}
                  color={status.color}
                />
              ))}
            </View>

            <InputField
              label="Notes"
              value={formData.notes}
              onChangeText={(value) => updateField('notes', value)}
              placeholder="Additional information about the block..."
              icon="document-text-outline"
              multiline={true}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Register Block</Text>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 15,
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
  dimensionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  dimensionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  dimensionInput: {
    flex: 1,
  },
  calculatorContainer: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  calculatorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  calculatorResult: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calculatorText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#007bff',
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  statusButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusButtonInactive: {
    backgroundColor: '#fff',
    borderColor: '#e9ecef',
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  statusButtonTextActive: {
    color: '#fff',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  submitButton: {
    backgroundColor: '#17a2b8',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#17a2b8',
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

export default BlockRegisterScreen;