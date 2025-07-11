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

const SupplierRegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    website: '',
    notes: '',
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    Alert.alert(
      'Success',
      'Supplier registered successfully!',
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
        <Text style={styles.headerTitle}>Register Supplier</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            <Text style={styles.sectionTitle}>Company Information</Text>
            
            <InputField
              label="Company Name *"
              value={formData.name}
              onChangeText={(value) => updateField('name', value)}
              placeholder="e.g., Stone Masters Ltd"
              icon="business-outline"
            />

            <InputField
              label="Contact Person"
              value={formData.contactPerson}
              onChangeText={(value) => updateField('contactPerson', value)}
              placeholder="Full name of primary contact"
              icon="person-outline"
            />

            <InputField
              label="Website"
              value={formData.website}
              onChangeText={(value) => updateField('website', value)}
              placeholder="https://www.company.com"
              icon="globe-outline"
              keyboardType="url"
            />

            <Text style={styles.sectionTitle}>Contact Information</Text>

            <InputField
              label="Email *"
              value={formData.email}
              onChangeText={(value) => updateField('email', value)}
              placeholder="contact@company.com"
              icon="mail-outline"
              keyboardType="email-address"
            />

            <InputField
              label="Phone Number *"
              value={formData.phone}
              onChangeText={(value) => updateField('phone', value)}
              placeholder="+1 (555) 123-4567"
              icon="call-outline"
              keyboardType="phone-pad"
            />

            <Text style={styles.sectionTitle}>Address</Text>

            <InputField
              label="Street Address"
              value={formData.address}
              onChangeText={(value) => updateField('address', value)}
              placeholder="123 Main Street"
              icon="location-outline"
            />

            <View style={styles.addressRow}>
              <View style={styles.addressInput}>
                <InputField
                  label="City"
                  value={formData.city}
                  onChangeText={(value) => updateField('city', value)}
                  placeholder="New York"
                  icon="location-outline"
                />
              </View>
              <View style={styles.addressInput}>
                <InputField
                  label="State"
                  value={formData.state}
                  onChangeText={(value) => updateField('state', value)}
                  placeholder="NY"
                  icon="map-outline"
                />
              </View>
            </View>

            <InputField
              label="ZIP Code"
              value={formData.zipCode}
              onChangeText={(value) => updateField('zipCode', value)}
              placeholder="10001"
              icon="pin-outline"
              keyboardType="numeric"
            />

            <Text style={styles.sectionTitle}>Additional Information</Text>

            <InputField
              label="Notes"
              value={formData.notes}
              onChangeText={(value) => updateField('notes', value)}
              placeholder="Additional notes about the supplier..."
              icon="document-text-outline"
              multiline={true}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Register Supplier</Text>
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
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  addressInput: {
    flex: 1,
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  submitButton: {
    backgroundColor: '#6f42c1',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#6f42c1',
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

export default SupplierRegisterScreen;