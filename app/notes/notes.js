(function() {
  angular.module('meganote.notes', ['ui.router'])
    .config(notesConfig)
    .controller('NotesController', NotesController);

  notesConfig.$inject = ['$stateProvider'];
  function notesConfig($stateProvider) {
    $stateProvider

    .state('notes', {
      url: '/notes',
      templateUrl: 'notes/notes.html',
      controller: 'NotesController',
      resolve: {
        notesLoaded: notesLoaded
      }
    })

    .state('notes.form', {
      url: '/:noteId',
      templateUrl: 'notes/notes-form.html',
      controller: 'NotesController'
    });
  }

  notesLoaded.$inject = ['NotesService'];
  function notesLoaded(NotesService) {
    return NotesService.getNotes();
  }

  NotesController.$inject = ['$state', '$scope', 'Flash', 'NotesService'];
  function NotesController($state, $scope, Flash, NotesService) {

    // $scope.note = NotesService.notes;

    NotesService.getNotes()
      .then(function() {
        $scope.notes = NotesService.notes;
        $scope.note = NotesService.find($state.params.noteId);
      });


    $scope.clearForm = function() {
      $scope.note = { title: '', body_html: '' };
      $scope.editing = false;
    };

    $scope.add = function() {
      NotesService.create($scope.note)
        .then(
          function(response) {
            $scope.note = response.data.note;
            Flash.create('success', response.data.message, 3000, {class: 'fade in', id: 'add-success'}, false);
            $scope.clearForm();
          },
          function() {
            Flash.create('danger', 'Oops, something went wrong!', 3000, {class: 'fade in', id: 'add-fail'}, false);
          });
    };

    $scope.edit = function(note, index) {
      $scope.editing = true;
      $scope.note = note;
      $scope.current_index = index;
    };

    $scope.save = function() {
      NotesService.update($scope.note)
        .then(
          function(response) {
            $scope.note = response.data.note;
            Flash.create('success', response.data.message, 3000, {class: 'fade in', id: 'save-success'}, false);
            $scope.clearForm();
          },
          function() {
            Flash.create('danger', 'Oops, something went wrong!', 3000, {class: 'fade in', id: 'save-fail'}, false);
          });
    };

    $scope.delete = function(index) {
      NotesService.remove($scope.note, index)
        .then(
          function(response) {
            $scope.note = response.data.note;
            Flash.create('success', response.data.message, 3000, {class: 'fade in', id: 'delete-success'}, false);
            $scope.clearForm();
          },
          function() {
            Flash.create('danger', 'Oops, something went wrong!', 3000, {class: 'fade in', id: 'delete-fail'}, false);
          });
    };
  }
})();
