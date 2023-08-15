const axios = require('axios');

exports.handler = async function (event) {
  const sendInfo = JSON.parse(event.body);
  if (!sendInfo) {
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'error' }),
    };
  }
  if (Object.values(sendInfo).length < 3) {
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'error' }),
    };
  }
  const { name, country, message } = sendInfo;

  const { VITE_API_TELEGRAM_TOKEN, VITE_GROUP_TELEGRAM } = process.env;

  await axios.get(
    `https://api.telegram.org/bot${VITE_API_TELEGRAM_TOKEN}/sendMessage?text=${encodeURI(
      `Name: ${name}\nCountry: ${country}\nText: ${message}&chat_id=${VITE_GROUP_TELEGRAM}`
    )}`
  );
  return {
    statusCode: 200,
    body: JSON.stringify({ status: 'ok' }),
  };
};
