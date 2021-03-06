
function HttpUtil() {

}

HttpUtil.getData = function(url, params, callback) {
  $.ajax({
    url: url,
    type: 'GET',
    data: params,
    error: function errorHandler(jqXHR) {
      alert(jqXHR.responseText);
      callback(jqXHR.responseText || "Error");
    },
    success: function successHandler(data) {
      if (data.status && data.status === "ERROR") {
        alert(data.errors);
      }
      callback(null, data)
    }
  });
};

HttpUtil.postData = function(url, params, callback) {
  $.ajax({
    url: url,
    type: 'POST',
    contentType: 'application/json;charset=UTF-8',
    dataType: 'json',
    data: JSON.stringify(params),
    error: function errorHandler(jqXHR) {
      alert(jqXHR.responseText);
      callback(jqXHR.responseText || "Error");
    },
    success: function successHandler(data) {
      if (data.status && data.status === "ERROR") {
        alert(data.errors);
      }
      callback(null, data)
    }
  });
};

HttpUtil.putData = function(url, params, callback) {
  $.ajax({
    url: url,
    type: 'PUT',
    contentType: 'application/json;charset=UTF-8',
    dataType: 'json',
    data: JSON.stringify(params),
    error: function errorHandler(jqXHR) {
      alert(jqXHR.responseText);
      callback(jqXHR.responseText || "Error");
    },
    success: function successHandler(data) {
      if (data.status && data.status === "ERROR") {
        alert(data.errors);
      }
      callback(null, data)
    }
  });
};

HttpUtil.deleteData = function(url, params, callback) {
  $.ajax({
    url: url,
    type: 'DELETE',
    contentType: 'application/json;charset=UTF-8',
    dataType: 'json',
    data: JSON.stringify(params),
    error: function errorHandler(jqXHR) {
      alert(jqXHR.responseText);
      callback(jqXHR.responseText || "Error");
    },
    success: function successHandler(data) {
      if (data.status && data.status === "ERROR") {
        alert(data.errors);
      }
      callback(null, data)
    }
  });
};

export default HttpUtil;
