
// Sweet-Alert Bindings

Shiny.addCustomMessageHandler('sweetalert-sw', function(data) {
  if (data.as_html) {
    var elsw = document.createElement("span");
    elsw.innerHTML = data.config.text;
    data.config.html = elsw;
    Swal.fire(data.config)
      .then(function(value){
        var els = $("#" + data.sw_id);
        els.each(function (i, el) {
          window.Shiny.unbindAll(el, true);
          $(el).remove();
          return true;
        });
      });
  } else {
    Swal.fire(data.config);
  }
});


Shiny.addCustomMessageHandler('sweetalert-sw-confirm', function(data) {
  Shiny.onInputChange(data.id, null);
  if (!data.as_html) {
    Swal.fire(data.swal).then(function(result) {
      if (result.value) {
        Shiny.onInputChange(data.id, true);
      } else {
        Shiny.onInputChange(data.id, false);
      }
    });
  } else {
    //var elsw = document.createElement("span");
    //elsw.innerHTML = data.swal.text;
    //data.swal.html = elsw;
    Swal.fire(data.swal)
      .then(function(result) {
        if (result.value) {
          Shiny.onInputChange(data.id, true);
        } else {
          Shiny.onInputChange(data.id, false);
        }
        var els = $("#" + data.sw_id);
        els.each(function (i, el) {
          window.Shiny.unbindAll(el, true);
          $(el).remove();
          return true;
        });
      });
  }
});


Shiny.addCustomMessageHandler('sweetalert-sw-input', function(data) {
  if (data.reset_input) {
    Shiny.setInputValue(data.id, null);
  }
  Swal.fire(data.swal).then(function(result) {
    Shiny.setInputValue(data.id, result.value, {priority: "event"});
  });
});


Shiny.addCustomMessageHandler('sweetalert-sw-progress', function(data) {
  var itm = document.getElementById(data.idel);
  itm.style.display = "block";
  data.content = itm;
  Swal.fire(data);
});


Shiny.addCustomMessageHandler('sweetalert-toast', function(data) {
  Swal.fire(data);
});


// https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        if (this.parentNode === null) {
          return;
        }
        this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);


Shiny.addCustomMessageHandler('sweetalert-sw-close', function(data) {
  Swal.close();
});
