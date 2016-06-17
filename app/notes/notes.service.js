(function() {
  angular.module('meganote.notes')
    .service('NotesService', NotesService);

  NotesService.$inject = ['$http'];
  function NotesService($http) {
    var service = this;
    service.notes = [];

    service.getNotes = function() {
      var notesPromise = $http.get('http://localhost:3030');

      notesPromise.then(function(response) {
        service.notes = response.data;
      });

      return notesPromise;
    };

    service.create = function(note) {
      var notesPromise = $http.post('http://localhost:3030', {
        note: note
      });

      notesPromise.then(function(response) {
        service.notes.unshift(response.data.note);
      });

      return notesPromise;
    };

    service.update = function(note) {
      return $http.put('http://localhost:3030/' + note._id, {
        note: note
      });
    };

    service.remove = function(note, index) {
      var notesPromise = $http.delete('http://localhost:3030/' + note._id);

      notesPromise.then(function() {
        service.notes.splice(index, 1);
      });

      return notesPromise;
    };
  }
})();
