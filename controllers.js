import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import env from "./env"
import jwtToken from './src/helper/jwtToken';
export class TextConverter {
  // Convert UTF-8 string to Base64
  static utf8ToBase64(text) {
    return btoa(encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode(parseInt(p1, 16))
    }));
  }

  // Convert Base64 to UTF-8 string
  static base64ToUtf8(base64) {
    return decodeURIComponent(Array.prototype.map.call(atob(base64), function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
}
function getId(language) {
  switch (language) {
    case "python": return 71;
    case "Java": return 62;
    case "Cpp": return 54;
  }
}


export async function Run(props) {
  // alert(JSON.stringify(props));
  return new Promise((resolve, reject) => {
    let { code, language, custominput, customInputData, currentProblemId, moduleId,
      courseid } = props;
    if (custominput) {
      let stdin = TextConverter.utf8ToBase64(customInputData);
      let source_code = TextConverter.utf8ToBase64(code);
      let language_id = getId(language);
      let data = JSON.stringify({
        "source_code": source_code,
        "language_id": language_id,
        "stdin": stdin,
      });
      // alert((data));
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${env.SERVER_URL}/judge/customtestcases`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken()}`
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log((response.data));
          // alert(JSON.stringify(response.data));
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          alert(JSON.stringify(error));
        });
    } else {
      let data = JSON.stringify({
        "problem_id": currentProblemId,
        "source_code": TextConverter.utf8ToBase64(code),
        "language_id": getId(language)
      });
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${env.SERVER_URL}/judge/runcode`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken()}`
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          // alert(JSON.stringify(response.data));
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

}

export async function Submit(props) {
  // alert(JSON.stringify(props));
  return new Promise((resolve, reject) => {
    let { code, language, custominput, customInputData, currentProblemId ,moduleId,courseid,lessonPoints,lessonId} = props;
    let data = JSON.stringify({
      "problem_id": currentProblemId,
      "source_code": TextConverter.utf8ToBase64(code),
      "language_id": getId(language),
      "moduleId":moduleId,
      "courseid":courseid,
      "lessonPoints":lessonPoints,
      "lessonId":lessonId
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${env.SERVER_URL}/judge/submitcode`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken()}`
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        // alert(JSON.stringify(response.data));
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  });

}
