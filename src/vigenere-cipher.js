const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(reverse = true) {
    this.reverse = reverse;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  checkArguments(message, key) {
    if (!message || !key) {
      throw new Error('Invalid input. Both message and key are required.');
    }
  }

  encrypt(message, key) {
    this.checkArguments(message, key);

    message = message.toUpperCase();
    key = key.toUpperCase();

    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const char = message[i];

      if (this.alphabet.includes(char)) {
        const messageIndex = this.alphabet.indexOf(char);
        const keyChar = key[keyIndex % key.length];
        const keyIndexInAlphabet = this.alphabet.indexOf(keyChar);

        const encryptedIndex = (messageIndex + keyIndexInAlphabet) % 26;
        const encryptedChar = this.alphabet[encryptedIndex];

        result += encryptedChar;
        keyIndex++;
      } else {
        result += char;
      }
    }

    return this.reverse ? result : result.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    this.checkArguments(encryptedMessage, key);

    encryptedMessage = encryptedMessage.toUpperCase();
    key = key.toUpperCase();

    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < encryptedMessage.length; i++) {
      const char = encryptedMessage[i];

      if (this.alphabet.includes(char)) {
        const encryptedIndex = this.alphabet.indexOf(char);
        const keyChar = key[keyIndex % key.length];
        const keyIndexInAlphabet = this.alphabet.indexOf(keyChar);

        const decryptedIndex = (encryptedIndex - keyIndexInAlphabet + 26) % 26;
        const decryptedChar = this.alphabet[decryptedIndex];

        result += decryptedChar;
        keyIndex++;
      } else {
        result += char;
      }
    }

    return this.reverse ? result : result.split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
