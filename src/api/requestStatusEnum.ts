/**
 * Enum representing the possible states of a request.
 * @enum {string}
 * @property {string} INITIAL - The initial state of the request.
 * @enum {string}
 * @property {string} SEND_DATA - The state when data is ready to be sent.
 * @property {string} INITIAL - Initial state before the request is sent.
 * @property {string} SENDING_DATA - The state when data is being sent.
 * @property {string} DATA_SENDED - The state when data has been successfully sent.
 * @property {string} SEND_DATA - State when the request is ready to be sent.
 * @property {string} ERROR_SENDING_DATA - The state when there was an error sending the data.
 */
enum RequestStatus {
  INITIAL = 'INITIAL',
  SEND_DATA = 'SEND_DATA',
  SENDING_DATA = 'SENDING_DATA',
  DATA_SENDED = 'DATA_SENDED',
  ERROR_SENDING_DATA = 'ERROR_SENDING_DATA',
}

export default RequestStatus;
