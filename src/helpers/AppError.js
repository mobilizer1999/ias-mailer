class AppError extends Error {
  constructor(data) {
    super(data.info);
    this.innerErrorCode = data.code || 500;
    this.innerErrorText = data.errorRes || 'INTERNAL_SERVER_ERROR';
    this.innerInfo = data.info || data.errorRes;
  }

  get errorCode() {
    return this.innerErrorCode;
  }

  get errorText() {
    return this.innerErrorText;
  }

  get info() {
    return this.innerInfo;
  }
}

module.exports = {
  AppError,
};
