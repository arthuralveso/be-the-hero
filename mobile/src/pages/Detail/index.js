import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import styles from './styles.js'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer';

import { Feather } from '@expo/vector-icons';
import logoImg from '../../assets/logo.png'

// import { Container } from './styles';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;

  const message = `Olá ${incident.name}, estou entrando em contato sobre o caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}`

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Heroi do caso: ${incident.title}`,
      recipients: [incident.email],
      body : message,
    })
  }

  function sendWhatsapp(){
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    

  }

  return (
    <View style={styles.container}>
      <View style={styles.detailHeader}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={25} color="#e02041" />
        </TouchableOpacity>
      </View>
      <View style={styles.details}>
          <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
  <Text style={styles.incidentValue}>{incident.name} de {incident.city}</Text>

          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>
      </View>

      <View style={styles.contenBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o Heroi desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
          
        </View>
      </View>

    </View>
  );
}
