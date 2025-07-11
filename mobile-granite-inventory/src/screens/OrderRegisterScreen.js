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

const InputField = ({ label, value, onChangeText, placeholder, icon, keyboardType = 'default' }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.inputWrapper}>
      <Ionicons name={icon} size={20} color="#666" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  </View>
);

const PriorityButton = ({ priority, isSelected, onPress, color }) => (
  <TouchableOpacity
    style={[
      styles.priorityButton,
      isSelected && { backgroundColor: color },
      !isSelected && styles.priorityButtonInactive
    ]}
    onPress={onPress}
  >
    <Text style={[
      styles.priorityButtonText,
      isSelected && styles.priorityButtonTextActive
    ]}>
      {priority}
    </Text>
  </TouchableOpacity>
);

const OrderRegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    projectName: '',
    dueDate: '',
    priority: 'Medium',
    notes: '',
  });

  const priorityOptions = [
    { name: 'Low', color: '#28a745' },
    { name: 'Medium', color: '#ffc107' },
    { name: 'High', color: '#dc3545' },
  ];

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.customerName || !formData.customerEmail || !formData.projectName || !formData.dueDate) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.customerEmail)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    Alert.alert(
      'Success',
      'Order created successfully!',
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
        <Text style={styles.headerTitle}>New Order</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            <Text style={styles.sectionTitle}>Customer Information</Text>
            
            <InputField
              label="Customer Name *"
              value={formData.customerName}
              onChangeText={(value) => updateField('customerName', value)}
              placeholder="Enter customer name"
              icon="person-outline"
            />

            <InputField
              label="Email *"
              value={formData.customerEmail}
              onChangeText={(value) => updateField('customerEmail', value)}
              placeholder="customer@example.com"
              icon="mail-outline"
              keyboardType="email-address"
            />

            <InputField
              label="Phone Number"
              value={formData.customerPhone}
              onChangeText={(value) => updateField('customerPhone', value)}
              placeholder="+1 (555) 123-4567"
              icon="call-outline"
              keyboardType="phone-pad"
            />

            <Text style={styles.sectionTitle}>Project Details</Text>

            <InputField
              label="Project Name *"
              value={formData.projectName}
              onChangeText={(value) => updateField('projectName', value)}
              placeholder="e.g., Kitchen Renovation"
              icon="home-outline"
            />

            <InputField
              label="Due Date *"
              value={formData.dueDate}
              onChangeText={(value) => updateField('dueDate', value)}
              placeholder="YYYY-MM-DD"
              icon="calendar-outline"
            />

            <Text style={styles.sectionTitle}>Priority Level</Text>
            <View style={styles.priorityContainer}>
              {priorityOptions.map((priority) => (
                <PriorityButton
                  key={priority.name}
                  priority={priority.name}
                  isSelected={formData.priority === priority.name}
                  onPress={() => updateField('priority', priority.name)}
                  color={priority.color}
                />
              ))}
            </View>

            <Text style={styles.sectionTitle}>Order Items</Text>
            <View style={styles.itemsContainer}>
              <TouchableOpacity style={styles.addItemButton}>
                <Ionicons name="add-circle-outline" size={24} color="#007bff" />
                <Text style={styles.addItemText}>Add Items to Order</Text>
              </TouchableOpacity>
              
              <Text style={styles.itemsNote}>
                Tap to select materials and bundles for this order
              </Text>
            </View>

            <InputField
              label="Special Notes"
              value={formData.notes}
              onChangeText={(value) => updateField('notes', value)}
              placeholder="Any special requirements or notes..."
              icon="document-text-outline"
            />

            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Items:</Text>
                <Text style={styles.summaryValue}>0 items</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal:</Text>
                <Text style={styles.summaryValue}>$0.00</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax (8.5%):</Text>
                <Text style={styles.summaryValue}>$0.00</Text>
              </View>
              <View style={[styles.summaryRow, styles.summaryTotal]}>
                <Text style={styles.summaryTotalLabel}>Total:</Text>
                <Text style={styles.summaryTotalValue}>$0.00</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Create Order</Text>
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
  priorityContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  priorityButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  priorityButtonInactive: {
    backgroundColor: '#fff',
    borderColor: '#e9ecef',
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  priorityButtonTextActive: {
    color: '#fff',
  },
  itemsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 20,
    alignItems: 'center',
  },
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  addItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#007bff',
    fontWeight: '500',
  },
  itemsNote: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginTop: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 15,
    marginTop: 10,
  },
  summaryTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  submitButton: {
    backgroundColor: '#fd7e14',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#fd7e14',
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

export default OrderRegisterScreen;