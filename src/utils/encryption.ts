// Utility functions for end-to-end encryption using Web Crypto API

// Generate a new key pair for a user
export async function generateKeyPair() {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );
  return keyPair;
}

// Export public key to share with other users
export async function exportPublicKey(publicKey: CryptoKey) {
  const exported = await window.crypto.subtle.exportKey("spki", publicKey);
  return btoa(String.fromCharCode(...new Uint8Array(exported)));
}

// Import a public key received from another user
export async function importPublicKey(publicKeyString: string) {
  const binaryString = atob(publicKeyString);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  return await window.crypto.subtle.importKey(
    "spki",
    bytes,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt"]
  );
}

// Encrypt a message using recipient's public key
export async function encryptMessage(message: string, publicKey: CryptoKey) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP"
    },
    publicKey,
    data
  );
  
  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}

// Decrypt a message using recipient's private key
export async function decryptMessage(encryptedMessage: string, privateKey: CryptoKey) {
  const binaryString = atob(encryptedMessage);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP"
    },
    privateKey,
    bytes
  );
  
  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

// Generate a random AES key for message encryption
export async function generateMessageKey() {
  return await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256
    },
    true,
    ["encrypt", "decrypt"]
  );
}

// Export an AES key to string format
export async function exportMessageKey(key: CryptoKey) {
  const exported = await window.crypto.subtle.exportKey("raw", key);
  return btoa(String.fromCharCode(...new Uint8Array(exported)));
}

// Import an AES key from string format
export async function importMessageKey(keyString: string) {
  const binaryString = atob(keyString);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  return await window.crypto.subtle.importKey(
    "raw",
    bytes,
    {
      name: "AES-GCM",
      length: 256
    },
    true,
    ["encrypt", "decrypt"]
  );
} 