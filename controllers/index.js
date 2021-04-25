const { uploadFile } = require('../services/uploader');
const path = require('path');
const fu = require('../utils/file');

const FROM = 1;
const TO = parseInt(process.env.TO || 100);

/**
 * Check string is an alphabetical string
 * @param {*} str input string
 * @returns
 */
const isAlphabetical = (str) => {
  let notAlphabeticalChar = "0123456789.";
  for (let i = 0; i < notAlphabeticalChar.length; i++) {
    if (str.indexOf(notAlphabeticalChar.charAt(i)) !== -1) {
      return false;
    }
  }
  return true;
};

/**
 * Check string is a real number
 * @param {*} str input string
 * @returns
 */
const isRealNumber = (str) => {
  let num = Number(str);
  return num && num >= 0 && String(num) === str ? true : false;
};

/**
 * Check string is an integer
 * @param {*} str input string
 * @returns
 */
const isInteger = (str) => {
  let num = Math.floor(Number(str));
  return num && num >= 0 && String(num) === str ? true : false;
};

/**
 * Check string is an alphanumeric string
 * @param {*} str input string
 * @returns
 */
const isAlphaNumeric = (str) => {
  if (str.indexOf(".") !== -1) {
    return false;
  }
  return true;
};

/**
 * Generate random number in range [from, to]
 * @param {*} from minimum value
 * @param {*} to maximum value
 * @returns
 */
const randomNumberInRange = (from, to) => {
  return Math.floor(Math.random() * (to - from + 1)) + from;
};

/**
 * Generate Objects handler
 * @returns
 */
const generateObjects = () => {
  let charSet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789123456789123456789....,";
  let length = randomNumberInRange(FROM, TO);
  let result = [];
  let alphabeticalList = [],
    realNumberList = [],
    integerList = [],
    alphaNumericList = [],
    objectList = [];
  let resultStr = "";
  for (let i = 0; i < length; i++) {
    //random characters
    resultStr = resultStr.concat(
      charSet.charAt(randomNumberInRange(0, charSet.length - 1))
    );
  }
  //break string by split ','
  result = resultStr.split(",");
  for (let i = 0; i < result.length; i++) {
    if (result[i].length === 0) {
      continue;
    }
    if (isInteger(result[i])) {
      //string is integer
      integerList.push(result[i]);
      objectList.push(result[i]);
    } else if (isRealNumber(result[i])) {
      //string is real number
      realNumberList.push(result[i]);
      objectList.push(result[i]);
    } else if (isAlphabetical(result[i])) {
      //string is alphabetical
      alphabeticalList.push(result[i]);
      objectList.push(result[i]);
    } else if (isAlphaNumeric(result[i])) {
      //string is alphanumeric
      alphaNumericList.push(result[i]);
      objectList.push(result[i]);
    }
  }
  let returnObj = {
    realNumberList,
    alphabeticalList,
    integerList,
    alphaNumericList,
    content: objectList.join(",")
  };
  return returnObj;
};

const raw = async (req, res) => {
  try {
    const { file } = req.params

    const filePath = path.join(process.cwd(), 'uploads', file)

    if (!await fu.exists(filePath)) {
      res.status(404).send({
        message: `Unknown file ${file}`
      })

      return
    }

    res.download(filePath);
  } catch (error) {
    console.error(error)

    res.status(500).send({
      message: 'An error occurred while processing your request.'
    })
  }
};

const generateRandomObjectsFile = async (req, res) => {
  try {
    const host = req.headers.origin || `${req.protocol}://${req.headers.host}`;
    //generate random objects of 4 types
    const objects = generateObjects();
    //upload the text to file
    const data = await uploadFile(host, objects)

    res.status(200).send({
      message: 'OK',
      data
    })
  } catch (error) {
    console.error(error)

    res.status(500).send({
      message: 'An error occurred while processing your request.'
    })
  }
};

module.exports = { generateRandomObjectsFile, raw }
