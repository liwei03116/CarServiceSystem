import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import api from "../api/api";

const DashboardScreen = () => {
  const [stats, setStats] = useState({ requests: 0, mechanics: 0, services: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const requestsRes = await api.get('/requests');
      const mechanicsRes = await api.get('/mechanics');
      const servicesRes = await api.get('/services');
      const usersRes = await api.get('/users');
      setStats({
        requests: requestsRes.data.length,
        mechanics: mechanicsRes.data.length,
        services: servicesRes.data.length,
        users: usersRes.data.length,
      });
    } catch (error) {
      console.error('Error fetching stats', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Admin Dashboard</Title>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Total Requests</Title>
          <Paragraph>{stats.requests}</Paragraph>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Total Mechanics</Title>
          <Paragraph>{stats.mechanics}</Paragraph>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Total Services</Title>
          <Paragraph>{stats.services}</Paragraph>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Total Users</Title>
          <Paragraph>{stats.users}</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', alignItems:'center' },
  title: { marginBottom: 20, fontSize: 28, fontWeight: 'bold' },
  card: { width: '100%', marginBottom: 15 },
  loader: { flex:1, justifyContent: 'center', alignItems: 'center' },
});

export default DashboardScreen;
