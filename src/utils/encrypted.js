export function encryptData(usuario) {
  const currentDateObj = new Date();
  const numberOfMlSeconds = currentDateObj.getTime();
  const addMlSeconds = 60 * 60000;
  const newDateObj = new Date(numberOfMlSeconds + addMlSeconds);/// una hora sumada a la fecha
  const data = JSON.stringify({ fecha: newDateObj, usuario, llave: "123" });
  const shift = 3;
  let encrypted = "";
  for (let i = 0; i < data.length; i++) {
    let char = data.charCodeAt(i);
    encrypted += String.fromCharCode(char + shift);
  }
  return encrypted;
}

export function decryptData(encrypted) {
  const shift = 3;
  let decrypted = "";
  for (let i = 0; i < encrypted.length; i++) {
    let char = encrypted.charCodeAt(i);
    decrypted += String.fromCharCode(char - shift);
  }
  const decryptedObject = JSON.parse(decrypted);
  const localDate = new Date(decryptedObject.fecha).toString();
  decryptedObject.fecha = localDate;
  return decryptedObject;
}
