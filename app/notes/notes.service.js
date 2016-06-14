(function() {
  angular.module('meganote.notes')
    .service('NotesService', NotesService);

  NotesService.$inject = ['$http'];
  function NotesService($http) {
    var service = this;
    service.notes = [];

    service.getNotes = function() {
      var notesPromise = $http.get('https://meganote.herokuapp.com/notes');

      notesPromise.then(function(response) {
        service.notes = response.data;
      });

      return notesPromise;
    };

    service.create = function(note) {
      var notesPromise = $http.post('https://meganote.herokuapp.com/notes', {
        note: note
      });

      notesPromise.then(function(response) {
        service.notes.unshift(response.data.note);
      });

      return notesPromise;
    };
  }
})();
