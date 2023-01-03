import {
  Timestamp
} from 'firebase/firestore'
import ldGet from 'lodash.get'
import moment from 'moment'

export const snapshotToArray = (snapshot) => {
  const data = [];
  if (snapshot) {
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
  }
  return data;
};

export const sortCallBack = (keyString, asc = true, type, getValueFunction) => {
  return function (item1, item2) {
    let compareValue1 = item1
    let compareValue2 = item2
    if (keyString) {
      compareValue1 = ldGet(compareValue1, keyString)
      compareValue2 = ldGet(compareValue2, keyString)
    }
    if (typeof getValueFunction === 'function') {
      compareValue1 = getValueFunction(compareValue1)
      compareValue2 = getValueFunction(compareValue2)
    }

    switch (String(type).toLowerCase()) {
      case 'number':
        compareValue1 = Number(compareValue1) || 0
        compareValue2 = Number(compareValue2) || 0
        break
      case 'string':
        compareValue1 = String(compareValue1 || '').toUpperCase()
        compareValue2 = String(compareValue2 || '').toUpperCase()
        break
      case 'date':
        if (!compareValue1 && !compareValue2) {
          return 0
        }
        if (!compareValue1 && compareValue2) {
          return -1 * (asc ? 1 : -1)
        }
        if (compareValue1 && !compareValue2) {
          return (asc ? 1 : -1)
        }
        compareValue1 = Timestamp(compareValue1)
        compareValue2 = Timestamp(compareValue2)
        return (compareValue1 > compareValue2 ? 1 : -1) * (asc ? 1 : -1)
      case 'boolean':
        compareValue1 = typeof compareValue1 === 'boolean' ? String(compareValue1) : ''
        compareValue2 = typeof compareValue2 === 'boolean' ? String(compareValue2) : ''
        return (compareValue1 > compareValue2 ? 1 : -1) * (asc ? 1 : -1)
    }
    return (compareValue1 > compareValue2 ? 1 : -1) * (asc ? 1 : -1)
  }
}

export const formatDate = (date, options = {}) => {
  const { format = 'DD/MM/YYYY - hh:mm:ss', isGetFromNow = false } = options
  if (
    ['boolean', 'undefined'].indexOf(typeof date) === -1 &&
    (!Number(date) || Number(date) > 24339600000)
  ) {
    const tmpDate = moment(date)
    if (date && String(tmpDate) !== 'Invalid Date') {
      if (isGetFromNow && moment().isSame(tmpDate, 'day')) {
        return tmpDate.fromNow()
      }
      return tmpDate.format(format)
    }
  }

  return date
}