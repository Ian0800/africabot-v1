import { BotConfig } from '../types';

export interface WhatsAppCredentials {
  phoneNumberId: string;
  accessToken: string;
}

export interface BusinessProfileData {
  about?: string;
  address?: string;
  description?: string;
  email?: string;
  vertical?: string;
  websites?: string[];
}

const API_VERSION = 'v21.0';

/**
 * Tests the connection to WhatsApp Servers by sending a template message.
 * This validates that the Phone Number ID and Access Token are correct.
 */
export const testWhatsAppConnection = async (
  creds: WhatsAppCredentials, 
  recipientPhone: string
): Promise<boolean> => {
  
  const url = `https://graph.facebook.com/${API_VERSION}/${creds.phoneNumberId}/messages`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${creds.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: recipientPhone,
        type: 'template',
        template: {
          name: 'hello_world',
          language: {
            code: 'en_US'
          }
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to connect to WhatsApp Servers');
    }

    return true;
  } catch (error) {
    console.error('WhatsApp Connection Error:', error);
    throw error;
  }
};

/**
 * Sends a text message via the WhatsApp Cloud API.
 */
export const sendWhatsAppText = async (
  creds: WhatsAppCredentials,
  recipientPhone: string,
  message: string
): Promise<any> => {
  const url = `https://graph.facebook.com/${API_VERSION}/${creds.phoneNumberId}/messages`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${creds.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: "individual",
        to: recipientPhone,
        type: "text",
        text: { 
          preview_url: true, 
          body: message 
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
        // Handle specific WhatsApp policy errors (e.g., 24h window)
        if (data.error?.code === 131047) {
            throw new Error("Message failed: The 24-hour window is closed. Send a Template message first.");
        }
        throw new Error(data.error?.message || 'Failed to send WhatsApp message');
    }
    
    return data;
  } catch (error) {
    console.error('WhatsApp API Error:', error);
    throw error;
  }
};

/**
 * Updates the WhatsApp Business Profile (Description, About, etc.)
 */
export const updateBusinessProfile = async (
  creds: WhatsAppCredentials,
  profileData: BusinessProfileData
): Promise<any> => {
  const url = `https://graph.facebook.com/${API_VERSION}/${creds.phoneNumberId}/whatsapp_business_profile`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${creds.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        ...profileData
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to update Business Profile');
    }

    return data;
  } catch (error) {
    console.error('WhatsApp Profile Update Error:', error);
    throw error;
  }
};

/**
 * Simulates saving the credentials to a backend database.
 */
export const saveBotConfiguration = async (_config: BotConfig, _creds: WhatsAppCredentials) => {
  // In a real app, this would POST to your backend database (Firebase, Supabase, etc.)
  // For now, we simulate a delay and success
  await new Promise(resolve => setTimeout(resolve, 1500));
  return true;
};