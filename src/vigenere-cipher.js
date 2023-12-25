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

  process(message, key, operation) {
    if (typeof message !== 'string' || typeof key !== 'string') {
      throw new Error('Both message and key must be strings');
    }

    const result = [];
    let keyIndex = 0;

    for (const char of message.toUpperCase()) {
      if (this.isUpperCase(char)) {
        const keyChar = key[keyIndex % key.length].toUpperCase();
        result.push(operation(char, keyChar));
        keyIndex++;
      } else {
        result.push(char);
      }
    }

    return this.reverse ? result.reverse().join('') : result.join('');
  }

  encrypt(message, key) {
    return this.process(message, key, (char, keyChar) =>
      this.isUpperCase(char)
        ? this.alphabet[(this.alphabet.indexOf(char) + this.alphabet.indexOf(keyChar)) % 26]
        : char
    );
  }

  decrypt(encryptedMessage, key) {
    return this.process(encryptedMessage, key, (char, keyChar) =>
      this.isUpperCase(char)
        ? this.alphabet[(this.alphabet.indexOf(char) - this.alphabet.indexOf(keyChar) + 26) % 26]
        : char
    );
  }

  isUpperCase(char) {
    return char >= 'A' && char <= 'Z';
  }
}

module.exports = {
  VigenereCipheringMachine
};
