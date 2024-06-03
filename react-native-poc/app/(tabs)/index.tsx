import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, View, Button } from 'react-native';

const HomeScreen = () => {
  const [status, setStatus] = useState('');
  const [workflowStatus, setWorkflowStatus] = useState('');

  useEffect(() => {
    const createSubscriber = async () => {
      const data = {
        subscriberId: '2',
        firstName: 'Milan',
        lastName: 'Lemaire',
        email: 'milan.lemaire@student.howest.be',
        phone: '+320493980474',
        locale: 'en-US',
        data: {
          kotgebouw: 'xy'
        }
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'ApiKey 892c1bd62ddebe51363446f870693d81',
        }
      };

      try {
        setStatus('Creating subscriber...');
        const response = await axios.post('https://api.novu.co/v1/subscribers', data, config);
        console.log('Subscriber created successfully:', response.data);
        setStatus('Subscriber created successfully');
      } catch (error) {
        console.error('Failed to create subscriber:', error);
        setStatus('Failed to create subscriber');
      }
    };

    createSubscriber();
  }, []);

  const triggerWorkflow = async () => {
    const data = {
      name: 'poc',
      to: {
        subscriberId: '2',
        email: 'milan.lemaire@student.howest.be',
      }
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'ApiKey 892c1bd62ddebe51363446f870693d81', // Replace with your actual API key
      }
    };

    try {
      setWorkflowStatus('Triggering workflow...');
      const response = await axios.post('https://api.novu.co/v1/events/trigger', data, config);
      console.log('Workflow triggered successfully:', response.data);
      setWorkflowStatus('Workflow triggered successfully');
    } catch (error) {
      console.error('Failed to trigger workflow:', error);
      setWorkflowStatus('Failed to trigger workflow');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{status}</Text>
      <Button title="Trigger Workflow" onPress={triggerWorkflow} />
      <Text>{workflowStatus}</Text>
    </View>
  );
};

export default HomeScreen;
