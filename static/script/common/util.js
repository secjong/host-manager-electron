module.exports = {
    // [], {} 도 빈값으로 처리
    isEmpty(value) {
      if (
        value === "" ||
        value === null ||
        value === undefined ||
        (value !== null && typeof value === "object" && !Object.keys(value).length)
      ) {
        return true;
      } else {
        return false;
      }
    },
    excludeQueryParams(to, from) {
      console.log("excludeQueryParams@@", to, from);
      let targetObj = from;
      let nonTargetObj = to;
      if (!from.name) {
        targetObj = to;
        nonTargetObj = {
          query: {}
        };
      }
      let fromType = targetObj.name.toLowerCase();
      let diffTarget = paramsType[fromType];
      let targetQuery = Object.assign({}, targetObj.query);
      if (!fromType) {
        return targetQuery;
      }
      if (typeof diffTarget !== "undefined") {
        // 해당 Router Query 검사
        for (var key in targetQuery) {
          if (diffTarget.indexOf(key) > -1) {
            delete targetQuery[key];
          }
        }
      }
      return Object.assign({}, nonTargetObj.query, targetQuery);
    },
    /**
     * json 객체에서 ?key1=value1&key2=value2 형식으로 변환
     * 객체가 아니거나 빈 객체인 경우는 빈 문자열 반환
     * @param {object} obj - 변환할 json 객체
     * @returns {string} - 쿼리스트링 문자열
     */
    getQueryStringFromJson(obj) {
      return this.isEmpty(obj) || typeof obj !== "object"
        ? ""
        : Object.keys(obj).reduce((acc, item, index, thisArr) => {
            acc += item + "=" + obj[item].toString();
            if (thisArr.length - 1 !== index) {
              acc += "&";
            }
            return acc;
          }, "?");
    }
  };