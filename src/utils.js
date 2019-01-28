
export function checkTelNumber(phone) {
  if (/^(\+7)\([0-9]{3}\)[0-9]{3}[-][0-9]{2}[-][0-9]{2}$/.test(phone)){
    return true
  }
    return false
}