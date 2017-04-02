
const methods = [
  'get',
  'post',
  'put',
  'delete',
  'head'
];

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { data } = {}) => new Promise((resolve, reject) => {

        const request = new Request(path, {
          mode: 'cors',
          method: method,
        	headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': 'uZEFnLPe7P6H3VROSEXmH4AAStOXBSNo3okUUXUd'
        	},
          body: JSON.stringify(data)
        });

        // console.log('request: ', request);
        fetch(request)
          .then(response => {
            if (!response.ok) {
             throw Error(response.statusText);
            }
            // console.log('response: ', response.status);
            if (response.status < 400) {
              resolve(response.json());
            } else {
              reject(response.json());
            }
          })
          .catch((err) => reject(err));
      }));
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
